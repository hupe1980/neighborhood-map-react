import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MapMarker from './map/Marker';
import InfoWindow from './map/InfoWindow';

import DetailsContainer from '../containers/DetailsContainer';

const propTypes = {
  isCurrent: PropTypes.bool,
  id: PropTypes.number.isRequired,
  position: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onInfoWindowClose: PropTypes.func.isRequired,
  map: PropTypes.object,
};

const defaultProps = {
  isCurrent: false,
  map: null,
};

class Marker extends Component {
  state = {
    marker: null,
  };

  render() {
    const {
      isCurrent,
      id,
      position,
      onClick,
      onInfoWindowClose,
      map,
    } = this.props;
    return (
      <Fragment>
        <MapMarker
          id={id}
          map={map}
          position={position}
          animation={isCurrent ? window.google.maps.Animation.BOUNCE : null}
          onClick={onClick}
          markerRef={marker => this.setState({ marker })}
        />
        {isCurrent &&
          this.state.marker && (
            <InfoWindow
              map={map}
              marker={this.state.marker}
              onClose={onInfoWindowClose}
              open
              disableAutoPan
            >
              <DetailsContainer id={id} />
            </InfoWindow>
          )}
      </Fragment>
    );
  }
}

Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

export default Marker;
