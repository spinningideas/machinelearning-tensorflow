import React from 'react';
import Grid from '@material-ui/core/Grid';

function GetStartedMessage(props) {
  if (props.displayGetStarted === false) {
    return <></>;
  }
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <p className="whitetext">{props.locData.getstartedmessage}</p>
      </Grid>
    </Grid>
  );
}

export default GetStartedMessage;
