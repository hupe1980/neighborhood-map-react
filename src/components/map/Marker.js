import { Component } from 'react';

class Marker extends Component {
  componentDidMount() {
    this.renderMarker();
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      this.props.position !== prevProps.position ||
      this.props.animation !== prevProps.animation ||
      this.props.icon !== prevProps.icon
    ) {
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.renderMarker();
    }
  }

  renderMarker() {
    const { position, onClick, markerRef, ...rest } = this.props;

    if (!window.google || !window.google.maps) {
      return;
    }

    let pos = position;
    if (!(pos instanceof window.google.maps.LatLng)) {
      pos = new window.google.maps.LatLng(pos.lat, pos.lng);
    }

    this.marker = new window.google.maps.Marker({
      position: pos,
      ...rest,
    });

    this.marker.addListener('click', () => onClick(this.marker));

    markerRef(this.marker);
  }

  render() {
    return null;
  }
}

export default Marker;
