import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map';
import {
  fetchChargePoints,
  getFilterdChargelocations,
  getCluster,
} from '../redux/chargelocations';
import { setCurrentId, getCurrentId } from '../redux/current';

class MapContainer extends Component {
  onMapChange = ({ center, zoom, bounds }) => {
    this.props.fetchChargePoints(bounds, zoom);
  };

  onMarkerClick = marker => {
    this.props.setCurrentId(marker.id);
  };

  onInfoWindowClose = () => {
    this.props.setCurrentId('');
  };

  onMapClick = () => {
    this.props.setCurrentId('');
  };

  render() {
    return (
      <Map
        {...this.props}
        onMarkerClick={this.onMarkerClick}
        onMapClick={this.onMapClick}
        onMapChange={this.onMapChange}
        onInfoWindowClose={this.onInfoWindowClose}
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
})(MapContainer);
