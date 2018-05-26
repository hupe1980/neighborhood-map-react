import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Address from './Address';

const propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
};

const styles = {
  card: {
    maxWidth: 200,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const API_KEY = process.env.REACT_APP_GOINGELECTRIC_API_KEY;

const Details = ({ classes, details }) => {
  const { address, name, photos, ge_id } = details;
  return (
    <Card className={classes.card}>
      {photos &&
        photos.length > 0 && (
          <CardMedia
            className={classes.media}
            image={`https://api.goingelectric.de/chargepoints/photo/?key=${API_KEY}&id=${
              photos[0].id
            }&size=200`}
            title={name}
            role="img"
            aria-label={name}
          />
        )}
      <CardContent>
        <Typography variant="subheading">
          {name}({ge_id})
        </Typography>
        {address && <Address {...address} />}
      </CardContent>
    </Card>
  );
};

Details.propTypes = propTypes;

export default withStyles(styles)(Details);
