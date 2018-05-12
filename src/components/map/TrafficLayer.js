import { Component } from 'react';

class TrafficLayer extends Component {
  componentDidMount() {
    this.renderTrafficLayer();
  }

  componentWillUnmount() {
    if (this.trafficLayer) {
      this.trafficLayer.setMap(null);
      this.trafficLayer = null;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderTrafficLayer();
    }
  }

  renderTrafficLayer() {
    const { autoRefresh, map } = this.props;

    if (!window.google || !window.google.maps) {
      return;
    }

    this.trafficLayer = new window.google.maps.TrafficLayer({
      map,
      autoRefresh,
    });
  }

  render() {
    return null;
  }
}

export default TrafficLayer;
