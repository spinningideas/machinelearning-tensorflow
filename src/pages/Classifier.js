import React, { useEffect, useState } from 'react';
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
// Services
import LocalizationService from 'services/LocalizationService';
import MachineLearningService from 'services/MachineLearningService';

export default function Classifier() {
	const [locData, setLocData] = useState({});
	const [selectedFile, setSelectedFile] = useState(null);
	const [model, setModel] = useState();
	const [classificationText, setClassificationText] = useState('');
	const [classificationProbabilityText, setClassificationProbabilityText] = useState('');
	const [isClassificationOccuring, setIsClassificationOccuring] = useState(false);

	const selectedImageRef = React.useRef(null);

	const machineLearningService = MachineLearningService();
	const localizationService = LocalizationService();

	const modelUrl = 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_140_224/classification/3/default/1';

	useEffect(() => {
		async function loadLocalization() {
			const locCode = localizationService.getUserLocale();

			const locDataLoaded = await localizationService.getLocalizedTextSet(
				['classifier', 'classifierdescription', 'classifierinstructions', 'moreinfo'],
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

	async function loadModel(modelUrlToLoad) {
		try {
			const model = await tf.loadGraphModel(modelUrlToLoad, { fromTFHub: true });
			setModel(model);
		} catch (err) {
			console.log(err);
		}
	}

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

	const handleClassifyImage = async () => {
		setIsClassificationOccuring(true);
		await performImageClassification();
	};

	const getTensorFromRawImage = (rawImage) => {
		const image = tf.browser.fromPixels(rawImage);
		const normalized = image
			.toFloat()
			.mul(2 / 255)
			.add(-1);
		let resized = tf.image.resizeBilinear(normalized, [224, 224], true);
		return resized.reshape([-1, 224, 224, 3]);
	};

	const classify = (tensor, returnAmount, classes) => {
		const values = tf.tidy(() => {
			const softmax = tensor.slice([0, 1], [-1, 1000]).softmax();
			return softmax.dataSync();
		});

		const valuesWithIndices = [];
		values.forEach((val, i) => {
			valuesWithIndices.push({ value: val, index: i });
		});

		return valuesWithIndices
			.sort((a, b) => b.value - a.value)
			.filter((_, i) => i < returnAmount)
			.map(({ value, index }) => ({
				className: classes[index],
				probability: value,
			}));
	};

	const performImageClassification = async () => {
		const tensor = getTensorFromRawImage(selectedImageRef.current);
		const result = await model.predict(tensor);
		const imageNetClasses = machineLearningService.getImageNetClasses();
		const prediction = classify(result, 1, imageNetClasses);

		tensor.dispose();
		result.dispose();

		setClassificationText(prediction[0].className);
		setClassificationProbabilityText(prediction[0].probability);
		setIsClassificationOccuring(false);
	};

	const ClassificationResult = () => {
		if (!isClassificationOccuring && classificationText.length > 0) {
			return (
				<Card className="card white-bg-color bl-1 bb-1">
					<CardContent>
						<p>
							<span className="text-bold">Classification:</span> {classificationText}
						</p>
						<p>
							<span className="text-bold">Probability:</span> {classificationProbabilityText}
						</p>
					</CardContent>
				</Card>
			);
		} else {
			return <></>;
		}
	};

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} className="contentpanel-site">
				<h3>{locData.classifier}</h3>
				<p>
					{locData.classifierinstructions}{' '}
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
									text="Download Bee Image"
									filePath="images/bee.jpg"
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
									<Button color="primary" onClick={() => handleClassifyImage()}>
										Perform Classification
									</Button>
								) : (
									<></>
								)}
								<LoadingIndicator display={isClassificationOccuring} size={40} />
							</CardActions>
						</Card>
						<ClassificationResult />
					</Grid>
					<Grid item xs={12} md={6} lg={6} xl={6}>
						<Box display="flex" justifyContent="center">
							<img
								className="mt-2"
								ref={selectedImageRef}
								src={selectedFile}
								style={{
									width: '50%',
									visibility: selectedFile != null ? 'visible' : 'hidden',
								}}
								alt="Selected file to analyze"
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
