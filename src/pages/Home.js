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
          'objectdetectionimage',
          'objectdetectiondescriptionimage',
          'objectdetectioncamera',
          'objectdetectiondescriptioncamera',
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
        <GetStartedMessage locData={locData} displayGetStarted={true} />
        <Grid container spacing={0}>
          <Grid item xs={12} md={4} lg={4} xl={4} className="pt-1 pb-1">
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

          <Grid item xs={12} md={4} lg={4} xl={4} className="pt-1">
            <Card className="card white-bg-color bl-1 bb-1">
              <CardContent>
                <h4 className="card-title">{locData.objectdetectionimage}</h4>
                <p>{locData.objectdetectiondescriptionimage}</p>
              </CardContent>
              <CardActions>
                <Button className="mt-3" color="secondary" component={Link} to="/objectdetectionimage">
                  {locData.seeexample}
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4} xl={4} className="pt-1">
            <Card className="card white-bg-color bl-1 bb-1">
              <CardContent>
                <h4 className="card-title">{locData.objectdetectioncamera}</h4>
                <p>{locData.objectdetectiondescriptioncamera}</p>
              </CardContent>
              <CardActions>
                <Button className="mt-3" color="secondary" component={Link} to="/objectdetectioncamera">
                  {locData.seeexample}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withRouter(Home);
