import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from '../components/Error';
import { setError, getError } from '../redux/error';

class ErrorContainer extends Component {
  handleClose = () => {
    this.props.setError('');
  };

  render() {
    const { message } = this.props;
    return (
      <Error
        message={message}
        open={message !== ''}
        onClose={this.handleClose}
      />
    );
  }
}

const mapStateToProps = state => ({
  message: getError(state),
});

export default connect(mapStateToProps, { setError })(ErrorContainer);
