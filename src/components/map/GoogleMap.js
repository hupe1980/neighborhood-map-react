import React, { Component, Fragment } from 'react';
import scriptLoader from 'react-async-script-loader';

const createScriptUrl = bootstrap => {
  const apiKey = bootstrap.apiKey;
  const libraries = bootstrap.libraries;
  const googleVersion = bootstrap.version || '3.exp';
  const url = bootstrap.url || 'https://maps.googleapis.com/maps/api/js';

  const params = {
    key: apiKey,
    libraries: libraries ? libraries.join(',') : null,
    v: googleVersion,
  };

  const paramStr = Object.keys(params)
    .filter(k => !!params[k])
    .map(k => `${k}=${params[k]}`)
    .join('&');

  return `${url}?${paramStr}`;
};

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    const { bootstrap } = props;
    this.MapComponent = scriptLoader([createScriptUrl(bootstrap)])(Map);
  }

  render() {
    const { MapComponent } = this;
    return <MapComponent {...this.props} />;
  }
}

class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.listeners = {};
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.loadMap();
    }
  }

  componentDidUpdate(prevProps) {
    const { center, zoom, isScriptLoaded } = this.props;

    if (isScriptLoaded && !prevProps.isScriptLoaded) {
      this.loadMap();
    }

    if (!window.google || !window.google.maps) {
      return;
    }

    if (zoom !== prevProps.zoom) {
      this.map.setZoom(zoom);
    }

    if (
      center.lat !== prevProps.center.lat ||
      center.lng !== prevProps.center.lng
    ) {
      this.map.panTo(center);
      window.google.maps.event.trigger(this.map, 'recenter');
    }
  }

  loadMap() {
    if (this.map) return;

    const { center, styles, zoom } = this.props;

    this.map = new window.google.maps.Map(this.refs.map, {
      zoom,
      center,
      styles,
    });

    this.map.addListener('idle', () => {
      const bounds = this.map.getBounds();

      this.props.onChange({
        center: this.map.getCenter().toJSON(),
        zoom: this.map.getZoom(),
        bounds: {
          sw: bounds.getSouthWest().toJSON(),
          ne: bounds.getNorthEast().toJSON(),
        },
      });
    });

    this.map.addListener('click', this.props.onClick);

    window.google.maps.event.trigger(this.map, 'ready');
    this.forceUpdate();
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, child => {
      if (!child) return;
      return React.cloneElement(child, {
        map: this.map,
      });
    });
  }

  render() {
    return (
      <Fragment>
        <div style={{ height: '100%' }} ref="map" role="application">
          Loading map...
        </div>
        {this.renderChildren()}
      </Fragment>
    );
  }
}

export default GoogleMap;
