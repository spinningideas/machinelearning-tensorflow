import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	avatar: {
		margin: theme.spacing(1),
	},
}));

function DownloadFileButton({ text, filePath, display }) {
	const classes = useStyles();
	return (
		<IconButton
			className="ml-2"
			color="primary"
			target="_blank"
			style={{
				visibility: display ? 'visible' : 'hidden',
			}}
			title={text}
			href={filePath}
			download
		>
			<Avatar className={classes.avatar} alt={text} src={filePath} />
		</IconButton>
	);
}

export default DownloadFileButton;
