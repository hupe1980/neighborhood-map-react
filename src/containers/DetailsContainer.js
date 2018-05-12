import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import Details from '../components/Details';
import { fetchDetails, getDetails } from '../redux/details';

class DetailsContainer extends Component {
  componentDidMount() {
    const { id } = this.props;
    this.props.fetchDetails(id);
  }

  render() {
    const { details } = this.props;
    if (!details) return <CircularProgress />;
    return <Details details={details} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  details: getDetails(state, ownProps.id),
});

export default connect(mapStateToProps, { fetchDetails })(DetailsContainer);
