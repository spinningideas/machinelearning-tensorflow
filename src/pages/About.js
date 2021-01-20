import React, { useEffect, useState } from 'react';
// material-ui
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
// Services
import LocalizationService from 'services/LocalizationService';

export default function About() {
	const [locData, setLocData] = useState({});

	const localizationService = LocalizationService();

	useEffect(() => {
		async function loadLocalization() {
			const locCode = localizationService.getUserLocale();

			const locDataLoaded = await localizationService.getLocalizedTextSet(
				[
					'about',
					'aboutdescription',
					'technology',
					'technologydescription',
					'reactjs',
					'reactjsdescription',
					'materialui',
					'materialuidescription',
					'tensorflow',
					'tensorflowdescription',
					'moreinfo',
				],
				locCode
			);
			setLocData(locDataLoaded);
		}
		loadLocalization();
	}, []);

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} className="contentpanel-site">
				<h3>{locData.about}</h3>

				<p>{locData.aboutdescription}</p>

				<h4>{locData.technology}</h4>

				<p>{locData.technologydescription}</p>

				<Grid container spacing={0}>
					<Grid item xs={12} md={3} lg={3} xl={3}>
						<Card className="card white-bg-color bl-1 bb-1">
							<CardContent>
								<h4 className="card-title">{locData.reactjs}</h4>
								<p className="card-text">{locData.reactjsdescription}</p>
							</CardContent>
							<CardActions>
								<Button
									className="ml-2"
									color="secondary"
									href="https://facebook.github.io/react/index.html"
									target="_blank"
									rel="noopener"
								>
									{locData.moreinfo}
								</Button>
							</CardActions>
						</Card>
					</Grid>

					<Grid item xs={12} md={3} lg={3} xl={3}>
						<Card className="card white-bg-color bl-1 bb-1">
							<CardContent>
								<h4 className="card-title">{locData.materialui}</h4>
								<p className="card-text">{locData.materialuidescription}</p>
							</CardContent>
							<CardActions>
								<Button
									className="ml-2"
									color="secondary"
									href="https://material-ui.com/"
									target="_blank"
									rel="noopener"
								>
									{locData.moreinfo}
								</Button>
							</CardActions>
						</Card>
					</Grid>

					<Grid item xs={12} md={3} lg={3} xl={3}>
						<Card className="card white-bg-color bl-1 bb-1">
							<CardContent>
								<h4 className="card-title">{locData.tensorflow}</h4>
								<p className="card-text">{locData.tensorflowdescription}</p>
							</CardContent>
							<CardActions>
								<Button
									className="ml-2"
									color="secondary"
									href="https://www.tensorflow.org/overview"
									target="_blank"
									rel="noopener"
								>
									{locData.moreinfo}
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
