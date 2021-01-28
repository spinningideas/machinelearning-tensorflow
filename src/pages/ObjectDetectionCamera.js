import React, { useEffect, useState, useRef } from 'react';
// Tensorflow
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// material-ui
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
  const [videoWidth, setVideoWidth] = useState(700);
  const [videoHeight, setVideoHeight] = useState(600);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  let videoTop = 250;
  let videoLeft = 20;
  
  let styles = {
    position: 'fixed',
    top: videoTop,
    left: videoLeft
  };

  const localizationService = LocalizationService();

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

  // model
  useEffect(() => {
    tf.ready().then(() => {
      setMessages('Model loading...');
      loadModel().then(() => {
        setModelLoaded(true);
        setMessages('Model loaded...');
        initWebCam();
      });
    });
  }, []);

  const initWebCam = () => {
    if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
      // define a Promise that'll be used to load the webcam and read its frames
      setMessages('Initializing web cam...');
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
          video: true,
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
                calcCanvasSize();
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
    } catch (err) {
      setMessages('Couldn\t load the model');
      setModelLoaded(false);
      console.log(err);
    }
  };

  const detectFromVideoFrame = (model, video) => {
    model.detect(video).then(
      (predictions) => {
        showDetections(predictions);
        requestAnimationFrame(() => {
          detectFromVideoFrame(model, video);
        });
      },
      (error) => {
        setMessages('Couldn\t start the webcam');
        setCameraReady(false);
        console.error(error);
      }
    );
  };

  const calcCanvasSize = () => {
    let calculatedVideoWidth = 720;
    let calculatedVideoHeight = 600;
    if (isWidthUp('sm', props.width)) {      
      calculatedVideoWidth = videoRef.current ? videoRef.current.width : 700;
    } else {
      calculatedVideoWidth = window.innerWidth - 40;
      calculatedVideoHeight = calculatedVideoWidth;    
    }    
    setVideoWidth(calculatedVideoWidth);
    setVideoHeight(calculatedVideoHeight);
  };

  const showDetections = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
  };

  const handleImageObjectDetection = async () => {
    await performImageObjectDetection();
  };

  const performImageObjectDetection = async () => {
    calcCanvasSize();
    detectFromVideoFrame(model, videoRef.current);
    setMessages('Detecting objects in the webcam...');
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className="contentpanel-site mb-3">
        <h3>{locData.objectdetectioncamera}</h3>

        <Card className="card white-bg-color bl-1 bb-1">
          <CardContent className="p-2">
            {!modelLoaded && !cameraReady ? <p>{locData.objectdetectioninstructionscamera}</p> : <></>}
            <p>{messages}</p>
          </CardContent>
          <CardActions className="p-2">
            {modelLoaded && cameraReady ? (
              <Button color="primary" onClick={() => handleImageObjectDetection()}>
                Perform Object Detection
              </Button>
            ) : (
              <></>
            )}
          </CardActions>
        </Card>

        <video style={styles} width={videoWidth} height={videoHeight} autoPlay muted playsInline ref={videoRef} />
        <canvas style={styles} ref={canvasRef} width={videoWidth} height={videoHeight + 50} />
      </Grid>
    </Grid>
  );
}

export default withWidth()(ObjectDetectionCamera);
