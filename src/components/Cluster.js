import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'material-ui/Badge';
import PlaceIcon from '@material-ui/icons/Place';

const propTypes = {
  clusterCount: PropTypes.number.isRequired,
};

const Cluster = ({ clusterCount }) => (
  <Badge badgeContent={clusterCount} color="primary">
    <PlaceIcon />
  </Badge>
);

Cluster.propTypes = propTypes;

export default Cluster;
