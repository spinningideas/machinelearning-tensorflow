import React, { useEffect, useState } from 'react';
// material-ui
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
// Services
import LocalizationService from 'services/LocalizationService';
import MachineLearningService from 'services/MachineLearningService';

// Tensorflow
import * as tf from '@tensorflow/tfjs';
import { padSequences } from 'utils';

export default function Sentiment() {
	const [locData, setLocData] = useState({});
	const [metadata, setMetadata] = useState();
	const [model, setModel] = useState();
	const [sentimentInputText, setSentimentInputText] = useState('');
	const [sentimentParsedText, setSentimentParsedText] = useState('');
	const [sentimentScore, setSentimentScore] = useState('');
	const [sequenceText, setSequenceText] = useState('');
	const [paddedSequenceText, setPaddedSequenceText] = useState('');

	const machineLearningService = MachineLearningService();
	const localizationService = LocalizationService();

	const OOV_INDEX = 2;
	const url = {
		model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
		metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json',
	};

	useEffect(() => {
		async function loadLocalization() {
			const locCode = localizationService.getUserLocale();

			const locDataLoaded = await localizationService.getLocalizedTextSet(
				['sentiment', 'sentimentdescription', 'sentimentinstructions', 'moreinfo'],
				locCode
			);
			setLocData(locDataLoaded);
		}
		loadLocalization();
	}, []);

	useEffect(() => {
		tf.ready().then(() => {
			loadModel(url);
			loadMetadata(url);
		});
	}, []);

	async function loadModel(url) {
		try {
			const model = await tf.loadLayersModel(url.model);
			setModel(model);
		} catch (err) {
			console.log(err);
		}
	}

	async function loadMetadata(url) {
		try {
			const metadataJson = await fetch(url.metadata);
			const metadata = await metadataJson.json();
			setMetadata(metadata);
		} catch (err) {
			console.log(err);
		}
	}

	const getSentimentScore = (text) => {
		const sentimentParsedText = text
			.trim()
			.toLowerCase()
			.replace(/(\.|\,|\!)/g, '')
			.split(' ');
		const sequence = sentimentParsedText.map((word) => {
			let wordIndex = metadata.word_index[word] + metadata.index_from;
			if (wordIndex > metadata.vocabulary_size) {
				wordIndex = OOV_INDEX;
			}
			return wordIndex;
		});

		const paddedSequence = machineLearningService.padSequences([sequence], metadata.max_len);
		const tensor2DMatrix = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
		const predictionOutput = model.predict(tensor2DMatrix);
		const score = predictionOutput.dataSync()[0];

		predictionOutput.dispose();

		setSequenceText(sequence);
		setPaddedSequenceText(paddedSequence);
		setSentimentParsedText(tensor2DMatrix.toString());
		setSentimentScore(score);

		return score;
	};

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} className="contentpanel-site">
				<h3>{locData.sentiment}</h3>
				<p>{locData.sentimentinstructions}</p>
				<p>
					{' '}
					<Button
						className="ml-2"
						href={url.model}
						color="primary"
						variant="outlined"
						target="_blank"
						rel="noopener"
					>
						Model Link
					</Button>
					<Button
						className="ml-2"
						color="primary"
						variant="outlined"
						href={url.metadata}
						target="_blank"
						rel="noopener"
					>
						Model Metadata
					</Button>
				</p>
				<Grid container spacing={0}>
					<Grid item xs={12} md={6} lg={6} xl={6}>
						<Card className="card white-bg-color bl-1 bb-1">
							<CardContent>
								<TextField
									label="Type your text here"
									onChange={(e) => setSentimentInputText(e.target.value)}
									value={sentimentInputText}
									multiline
									rows={3}
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</CardContent>
							<CardActions>
								{sentimentInputText !== '' ? (
									<Button color="secondary" onClick={() => getSentimentScore(sentimentInputText)}>
										View Sentiment
									</Button>
								) : (
									<></>
								)}
							</CardActions>
						</Card>
					</Grid>

					<Grid item xs={12} md={6} lg={6} xl={6}>
						{sentimentScore !== '' ? (
							<Card className="card white-bg-color bl-1 bb-1">
								<CardContent>
									<p>
										<span className="text-bold">Score</span> (1 = Positive, 0 = Negative)
									</p>
									<p>{sentimentScore}</p>
									{sentimentScore > 0.6 ? (
										<MoodIcon className="success-color" style={{ fontSize: 40 }} />
									) : (
										<MoodBadIcon className="fail-color" style={{ fontSize: 40 }} />
									)}

									{1 == 1 ? (
										<></>
									) : (
										<>
											<p className="text-bold">Padded Sequence Text: </p>
											<p>{sequenceText}</p>
											<p className="text-bold">Sequence Text:</p>
											<p>{paddedSequenceText}</p>
											<p className="text-bold">Tensflow Input:</p>
											<p>{sentimentParsedText}</p>
										</>
									)}
								</CardContent>
							</Card>
						) : (
							<></>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
