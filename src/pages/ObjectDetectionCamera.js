import React, { useEffect, useState, useRef } from 'react';
// Tensorflow
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// material-ui
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
// Services
import LocalizationService from 'services/LocalizationService';

function ObjectDetectionCamera(props) {
  const [locData, setLocData] = useState({});
  const [messages, setMessages] = useState('');
  const [model, setModel] = useState();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [objectDetectionOccuring, setObjectDetectionOccuring] = useState(false);
  const [objectDetectionEnvironment, setObjectDetectionEnvironment] = useState('environment');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const localizationService = LocalizationService();

  const aspectRatioFactor = 0.75; // 0.75 = 4by3 and 0.5625 = 16by9

  let videoTop = 280;
  let videoLeft = 10;

  // localization
  useEffect(() => {
    async function loadLocalization() {
      const locCode = localizationService.getUserLocale();
      const locDataLoaded = await localizationService.getLocalizedTextSet(
        ['objectdetectioncamera', 'objectdetectiondescriptioncamera', 'objectdetectioninstructionscamera', 'moreinfo'],
        locCode
      );
      setLocData(locDataLoaded);
    }
    loadLocalization();
  }, []);

  // model then camera initialization
  useEffect(() => {
    tf.ready().then(() => {
      setMessages('Model loading...');
      loadModel().then(() => {
        setMessages('Model loaded...');
        initWebCam();
      });
    });
  }, []);

  // camera object detection toggle
  useEffect(() => {
    detectFromVideoFrame(model, videoRef.current, objectDetectionOccuring);
  }, [objectDetectionOccuring]);

  const initWebCam = () => {
    if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
      // define a Promise that'll be used to load the webcam and read its frames
      setMessages('Initializing web cam...');
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: objectDetectionEnvironment },
          audio: false,
        })
        .then(
          (stream) => {
            // pass the current frame to the window.stream
            window.stream = stream;
            // pass the stream to the videoRef
            videoRef.current.srcObject = stream;
            return new Promise((resolve) => {
              videoRef.current.onloadedmetadata = () => {
                setMessages('Camera ready...click "Perform Object Detection" to continue');
                setCameraReady(true);
                resolve();
              };
            });
          },
          (error) => {
            setMessages('Couldn\t start the webcam');
            console.error(error);
          }
        );
      return webcamPromise;
    }
  };

  const loadModel = async () => {
    try {
      const model = await cocoSsd.load();
      setModel(model);
      setModelLoaded(true);
    } catch (err) {
      setMessages('Couldn\t load the model');
      setModelLoaded(false);
      console.log(err);
    }
  };

  const detectFromVideoFrame = (model, video, enableDetection) => {
    if (enableDetection) {
      model.detect(video).then(
        (predictions) => {
          showDetections(predictions, enableDetection);
          requestAnimationFrame(() => {
            detectFromVideoFrame(model, video, enableDetection);
          });
        },
        (error) => {
          setMessages('Couldn\t start the webcam');
          setCameraReady(false);
          console.error(error);
        }
      );
    } else {
      showDetections([], enableDetection);
    }
  };

  const showDetections = (predictions, enableDetection) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (enableDetection) {
      const font = '20px monospace';
      const outlineColor = '#00e5ff';
      ctx.font = font;
      ctx.textBaseline = 'top';

      predictions.forEach((prediction) => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = outlineColor;
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        // draw top left rectangle
        ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
        // draw bottom left rectangle
        ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

        // Draw the text last to ensure it's on top.
        ctx.fillStyle = '#000000';
        ctx.fillText(prediction.class, x, y);
        ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
      });
    }
  };

  const handleImageObjectDetection = () => {
    performImageObjectDetection();
  };

  const performImageObjectDetection = () => {
    setObjectDetectionOccuring(true);
    setMessages('Detecting objects in the webcam...');
  };

  const stopImageObjectDetection = () => {
    setObjectDetectionOccuring(false);
    toggleWebCamStream(false);
    setMessages('Stopped detecting objects in the webcam...');
  };

  const toggleWebCamStream = (activate) => {
    return navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        stream.getTracks().forEach((track) => {
          if (activate) {
            track.start();
          } else {
            track.stop();
          }
        });
      });
  };

  const toggleWebCamEnvironment = () => {
    if (objectDetectionEnvironment === 'environment') {
      setObjectDetectionEnvironment('user');
    } else {
      setObjectDetectionEnvironment('environment');
    }
  };

  const CameraActionButton = () => {
    if (modelLoaded && cameraReady && !objectDetectionOccuring) {
      return (
        <Button color="primary" onClick={() => handleImageObjectDetection()}>
          Perform Object Detection
        </Button>
      );
    }
    if (modelLoaded && cameraReady && objectDetectionOccuring) {
      return (
        <Button color="primary" onClick={() => stopImageObjectDetection()}>
          Stop Object Detection
        </Button>
      );
    }
    return <></>;
  };

  const CameraEnvironmentButton = () => {
    if (modelLoaded && cameraReady && objectDetectionOccuring) {
      return (
        <Button color="primary" onClick={() => toggleWebCamEnvironment()}>
          Change Camera
        </Button>
      );
    }
    return <></>;
  };

  const calcVideoWidth = () => {
    if (isWidthUp('md', props.width)) {
      return 720;
    } else {
      return window.innerWidth - 20;
    }
  };

  const calcVideoHeight = () => {
    let h = calcVideoWidth();
    return Math.ceil(h * aspectRatioFactor); // 16by9 aspect ratio
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <Card className="card white-bg-color bl-1 bb-1">
          <CardContent className="p-2">
            <h2>{locData.objectdetectioncamera}</h2>
            {!modelLoaded && !cameraReady ? <p>{locData.objectdetectioninstructionscamera}</p> : <></>}
            <Alert>{messages}</Alert>
          </CardContent>
          <CardActions className="p-2">
            <CameraActionButton />
            <CameraEnvironmentButton />
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
        <video
          ref={videoRef}
          style={{
            position: 'fixed',
            top: videoTop,
            left: videoLeft,
            zIndex: 9000,
          }}
          width={calcVideoWidth()}
          height={calcVideoHeight()}
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: videoTop,
            left: videoLeft,
            zIndex: 10001,
          }}
          width={calcVideoWidth()}
          height={calcVideoHeight()}
        />
      </Grid>
    </Grid>
  );
}

export default withWidth()(ObjectDetectionCamera);
