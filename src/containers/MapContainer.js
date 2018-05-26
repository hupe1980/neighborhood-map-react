import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map';
import {
  fetchChargePoints,
  getFilterdChargelocations,
  getCluster,
} from '../redux/chargelocations';
import { setCurrentId, getCurrentId } from '../redux/current';
import { setError } from '../redux/error';

class MapContainer extends Component {
  handleMapChange = ({ center, zoom, bounds }) => {
    this.props.fetchChargePoints(bounds, zoom);
  };

  handleMarkerClick = marker => {
    this.props.setCurrentId(marker.id);
  };

  handleInfoWindowClose = () => {
    this.props.setCurrentId(-1);
  };

  handleMapClick = () => {
    this.props.setCurrentId(-1);
  };

  handleError = () => {
    this.props.setError('Error loading google.maps');
  };

  render() {
    return (
      <Map
        {...this.props}
        onMarkerClick={this.handleMarkerClick}
        onMapClick={this.handleMapClick}
        onMapChange={this.handleMapChange}
        onInfoWindowClose={this.handleInfoWindowClose}
        onError={this.handleError}
      />
    );
  }
}

const mapStateToProps = state => ({
  chargelocations: getFilterdChargelocations(state),
  cluster: getCluster(state),
  currentId: getCurrentId(state),
});

export default connect(mapStateToProps, {
  setCurrentId,
  fetchChargePoints,
  setError,
})(MapContainer);
