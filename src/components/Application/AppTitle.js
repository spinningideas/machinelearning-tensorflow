import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appTitle: {
    flexGrow: 1
  },
}));

const AppTitle = (props) => {
  const classes = useStyles();	
  return (
    <Typography variant="h6" className={classes.appTitle}>
      {props.locData.apptitle}
    </Typography>
  );
};

export default AppTitle;
