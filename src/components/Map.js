import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GoogleMap from './map/GoogleMap';
import TrafficLayer from './map/TrafficLayer';
import OverlayView from './map/OverlayView';

import Cluster from './Cluster';
import Marker from './Marker';

const propTypes = {
  chargelocations: PropTypes.array,
  currentId: PropTypes.number,
  cluster: PropTypes.array,
  onMapClick: PropTypes.func.isRequired,
  onMapChange: PropTypes.func.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onInfoWindowClose: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

const defaultProps = {
  chargelocations: [],
  currentId: -1,
  cluster: [],
};

const Wrapper = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
`;

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map = ({
  chargelocations,
  currentId,
  cluster,
  onMapClick,
  onMapChange,
  onMarkerClick,
  onInfoWindowClose,
  onError,
}) => (
  <Wrapper>
    <GoogleMap
      bootstrap={{
        apiKey: API_KEY,
      }}
      center={{
        lat: 52.520008,
        lng: 13.404954,
      }}
      zoom={15}
      styles={mapStyles}
      onChange={onMapChange}
      onClick={onMapClick}
      onError={onError}
    >
      {cluster.map(cl => {
        const { coordinates, clusterCount } = cl;
        const key = `key_${JSON.stringify(coordinates)}_${clusterCount}`;
        return (
          <OverlayView key={key} position={coordinates}>
            <Cluster clusterCount={clusterCount} />
          </OverlayView>
        );
      })}
      {chargelocations.map(location => {
        const { ge_id, coordinates } = location;
        return (
          <Marker
            key={ge_id}
            id={ge_id}
            isCurrent={ge_id === currentId}
            position={coordinates}
            onClick={onMarkerClick}
            onInfoWindowClose={onInfoWindowClose}
          />
        );
      })}
      <TrafficLayer autoRefresh />
    </GoogleMap>
  </Wrapper>
);

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
