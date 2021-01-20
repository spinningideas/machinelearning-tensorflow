import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
// material-ui
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
// services
import LocalizationService from 'services/LocalizationService';
// components
import GetStartedMessage from 'components/Home/GetStartedMessage';

function Home() {
	const [locData, setLocData] = useState({});

	const localizationService = LocalizationService();

	useEffect(() => {
		async function loadLocalization() {
			const locCode = localizationService.getUserLocale();
			const locDataLoaded = await localizationService.getLocalizedTextSet(
				[
					'welcome',
					'homepagewelcome',
					'getstartedmessage',
					'sentiment',
					'sentimentdescription',
					'seeexample',
					'classifier',
					'classifierdescription',
					'objectdetection',
					'objectdetectiondescription',
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
				<h2>{locData.homepagewelcome}</h2>

				<Grid container spacing={0}>
					<Grid item xs={12}>
						<GetStartedMessage locData={locData} displayGetStarted={true} />
					</Grid>
					<Grid item xs={12} className="pt-1">
						<Grid container>
							<Grid item xs={12} className="pt-1 pb-1">
								<Card>
									<CardContent>
										<h4 className="card-title">{locData.sentiment}</h4>
										<p>{locData.sentimentdescription}</p>
									</CardContent>
									<CardActions>
										<Button className="mt-3" color="secondary" component={Link} to="/sentiment">
											{locData.seeexample}
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>

						<Grid container>
							<Grid item xs={12} className="pt-1">
								<Card className="card white-bg-color bl-1 bb-1">
									<CardContent>
										<h4 className="card-title">{locData.classifier}</h4>
										<p>{locData.classifierdescription}</p>
									</CardContent>
									<CardActions>
										<Button className="mt-3" color="secondary" component={Link} to="/classifier">
											{locData.seeexample}
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>

						<Grid container>
							<Grid item xs={12} className="pt-1">
								<Card className="card white-bg-color bl-1 bb-1">
									<CardContent>
										<h4 className="card-title">{locData.objectdetection}</h4>
										<p>{locData.objectdetectiondescription}</p>
									</CardContent>
									<CardActions>
										<Button
											className="mt-3"
											color="secondary"
											component={Link}
											to="/objectdetection"
										>
											{locData.seeexample}
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default withRouter(Home);
