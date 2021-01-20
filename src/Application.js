import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// Routes
import routes from 'routes';
// Components
import Navigation from 'components/Application/Navigation';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
	},
	appbar: {
		height: '65px',
		width: '100%',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function Application(props) {
	const classes = useStyles(props);

	return (
		<Grid container className={classes.root} spacing={0}>
			<Grid item className={classes.appbar} xs={12}>
				<Navigation />
			</Grid>
			<Grid item className={classes.content} xs={12}>
				{routes}
			</Grid>
		</Grid>
	);
}

export default withRouter(Application);
