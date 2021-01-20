import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(6),
    color: '#1976d2'
  }
}));

function LoadingIndicator(props) {
  const classes = useStyles();
  let size = 100;
  if (props.display === undefined || props.display === false) {
    return <></>;
  }

  if (props.size) {
    size = props.size;
  }

  return <CircularProgress className={classes.progress} thickness={5} size={size} />;
}

export default LoadingIndicator;
