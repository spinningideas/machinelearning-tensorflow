import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles(() => ({
	appTitle: {
    flexGrow: 1
	},
}));

const AppTitle = (props) => {
	const classes = useStyles();

	if (isWidthUp('sm', props.width)) {
		return (
			<Typography variant="h6" className={classes.appTitle}>
				{props.locData.apptitle}
			</Typography>
		);
	}
	return (
		<Avatar alt="App Logo" src="./app-logo.png" />
	);
};

export default withWidth()(AppTitle);
