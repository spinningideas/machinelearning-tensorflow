import React, { useEffect, useState, useRef } from 'react';
// Tensorflow
import * as tf from '@tensorflow/tfjs';
// material-ui
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
// Components
import LoadingIndicator from 'components/Shared/LoadingIndicator';
import DownloadFileButton from 'components/Shared/DownloadFileButton';
import BoundingBox from 'components/Shared/BoundingBox';
// Services
import LocalizationService from 'services/LocalizationService';
import MachineLearningService from 'services/MachineLearningService';

export default function ObjectDetection() {
  const [locData, setLocData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [model, setModel] = useState();
  const [detectedObjects, setDetectedObjects] = useState(null);
  const [objectDetectionIsOccuring, setObjectDetectionIsOccuring] = useState(false);

  const selectedImageRef = useRef(null);

  const localizationService = LocalizationService();
  const machineLearningService = MachineLearningService();

  const modelUrl = 'https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1';

  useEffect(() => {
    async function loadLocalization() {
      const locCode = localizationService.getUserLocale();

      const locDataLoaded = await localizationService.getLocalizedTextSet(
        ['objectdetection', 'objectdetectiondescription', 'objectdetectioninstructions', 'moreinfo'],
        locCode
      );
      setLocData(locDataLoaded);
    }
    loadLocalization();
  }, []);

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(modelUrl);
    });
  }, [modelUrl]);

  const loadModel = async (modelUrlToLoad) => {
    try {
      const model = await tf.loadGraphModel(modelUrlToLoad, { fromTFHub: true });
      // warm up model with empty image
      const zeroTensor = tf.zeros([1, 300, 300, 3], 'int32');
      const result = await model.executeAsync(zeroTensor);
      await Promise.all(result.map((t) => t.data()));
      result.map((t) => t.dispose());
      zeroTensor.dispose();

      setModel(model);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectImage = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = selectedImageRef;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleImageObjectDetection = async () => {
    setObjectDetectionIsOccuring(true);
    await performImageObjectDetection();
  };

  const getTensorFromRawImage = (img) => {
    const tensor = tf.tidy(() => {
      const tens = tf.browser.fromPixels(img);
      return tens.expandDims(0).cast('int32');
    });
    return tensor;
  };

  const performImageObjectDetection = async () => {
    const tensorData = getTensorFromRawImage(selectedImageRef.current);
    const width = selectedImageRef.current?.width ?? 0;
    const height = selectedImageRef.current?.height ?? 0;
    const classes = machineLearningService.getCocoSSDClasses();
    const returns = 5;
    const minConfidence = 0;

    const detectedObjects = await machineLearningService.detectObjects(
      model,
      tensorData,
      width,
      height,
      classes,
      returns,
      minConfidence
    );

    setDetectedObjects(detectedObjects);

    setObjectDetectionIsOccuring(false);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className="contentpanel-site">
        <h3>{locData.objectdetection}</h3>
        <p>
          {locData.objectdetectioninstructions}{' '}
          <Button
            className="ml-2"
            href={modelUrl}
            color="primary"
            variant="outlined"
            target="_blank"
            rel="noopener"
          >
						View Model
          </Button>
        </p>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Card className="card white-bg-color bl-1 bb-1">
              <CardContent>
                <input
                  style={{ display: 'none' }}
                  accept="image/jpeg"
                  multiple={false}
                  id="faceImage"
                  type="file"
                  onChange={handleSelectImage}
                />
                <Tooltip title="Select Image">
                  <label htmlFor="faceImage">
                    <IconButton color="primary" aria-label="upload image" component="span">
                      <PublishSharpIcon fontSize="large" />
                    </IconButton>
                  </label>
                </Tooltip>
                <label>{selectedFile ? selectedFile.name : 'Select Image'}</label>. . .
                <DownloadFileButton
                  display={true}
                  text="Download Apple/Carrot Image"
                  filePath="images/apple-carrot.jpg"
                />
                <DownloadFileButton
                  display={true}
                  text="Download Hot Dog Image"
                  filePath="images/hotdog.jpg"
                />
                <DownloadFileButton
                  display={true}
                  text="Download strawberry Image"
                  filePath="images/strawberry.jpg"
                />
              </CardContent>
              <CardActions>
                {selectedFile ? (
                  <Button color="primary" onClick={() => handleImageObjectDetection()}>
										Perform Object Detection
                  </Button>
                ) : (
                  <></>
                )}
                <LoadingIndicator display={objectDetectionIsOccuring} size={40} />
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Box display="flex" justifyContent="center">
              <img
                id="img-selectedfile"
                className="mt-2"
                ref={selectedImageRef}
                src={selectedFile}
                style={{
                  width: '50%',
                  visibility: selectedFile != null ? 'visible' : 'hidden',
                }}
                alt="Selected file to analyze"
              />
              {detectedObjects
                ? detectedObjects.map((object) => (
                  <BoundingBox
                    key={object.class + object.probability}
                    parentImgRef={selectedImageRef}
                    box={object.boundingBox}
                    label={object.class}
                    probability={object.probability}
                  />
                ))
                : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}