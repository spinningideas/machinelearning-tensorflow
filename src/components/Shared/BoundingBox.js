import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const BoundingBox = ({ box, label, probability, parentImgRef }) => {
  const color = '#00e5ff';
  let [left, top, width, height] = box;
  let parentImgTop = parentImgRef.current.offsetTop;
  let parentImgLeft = parentImgRef.current.offsetLeft;
  const lableValue = label ? label : 'no class provided';
  const probabilityValue = probability ? Math.round(probability * 100) + '%' : 0;

  top = Math.round(top + parentImgTop);
  left = Math.round(left + parentImgLeft);
  width = Math.round(width);
  height = Math.round(height);

  const useStyles = makeStyles(() => ({
    boundingBoxContainer: {
      position: 'absolute',
      border: '0.2rem solid ' + color,
      top: top,
      margin: 0,
      padding: 0,
    },
    labelContainer: {
      display: 'block',
      position: 'absolute',
      bottom: 0,
      color: '#212121',
      background: color,
      padding: '0.3rem 0.6rem',
      margin: 0,
      fontSize: '1.2rem',
      fontFamily: 'monospace',
      left: -1,
    },
    probabilityContainer: {
      display: 'block',
      position: 'absolute',
      bottom: 0,
      color: '#212121',
      background: color,
      padding: '0.3rem 0.6rem',
      margin: 0,
      fontSize: '1.2rem',
      fontFamily: 'monospace',
      right: 0,
      borderRadius: '0',
    },
  }));

  const classes = useStyles();

  return (
    <div
      className={classes.boundingBoxContainer}
      style={{ width, top, height, left }}
      label={label}
      probability={probability}
    >
      <div className={classes.labelContainer}>{lableValue}</div>
      <div className={classes.probabilityContainer}>{probabilityValue}</div>
    </div>
  );
};

export default BoundingBox;
