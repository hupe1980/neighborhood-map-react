import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.containerElement = document.createElement(`div`);
  }

  componentDidMount() {
    this.renderInfoWindow();
  }

  componentDidUpdate(prevProps) {
    const { map, position, open, marker } = this.props;

    if (map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (position !== prevProps.position) {
      this.updatePosition();
    }

    if (
      open !== prevProps.open ||
      marker !== prevProps.marker ||
      position !== prevProps.position
    ) {
      open ? this.openWindow() : this.closeWindow();
    }
  }

  componentWillUnmount() {
    if (this.infoWindow) {
      this.infoWindow.setMap(null);
      this.infoWindow = null;
    }
  }

  updatePosition() {
    const { position } = this.props;
    this.infoWindow.setPosition(position);
  }

  openWindow() {
    const { map, marker } = this.props;
    this.infoWindow.open(map, marker);
  }

  closeWindow() {
    this.infoWindow.close();
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  renderInfoWindow() {
    const { disableAutoPan } = this.props;

    if (!window.google || !window.google.maps) {
      return;
    }

    this.infoWindow = new window.google.maps.InfoWindow({
      content: this.containerElement,
      disableAutoPan,
    });

    this.infoWindow.addListener('closeclick', this.onClose.bind(this));
    this.infoWindow.addListener('domready', this.onOpen.bind(this));
  }

  render() {
    return ReactDOM.createPortal(
      React.Children.only(this.props.children),
      this.containerElement,
    );
  }
}

export default InfoWindow;
