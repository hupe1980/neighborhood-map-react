import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '../components/List';
import {
  getCluster,
  getFilterdChargelocations,
} from '../redux/chargelocations';
import { setCurrentId, getCurrentId } from '../redux/current';

class ListContainer extends Component {
  onClick = id => {
    this.props.setCurrentId(id);
  };

  render() {
    return <List {...this.props} onClick={this.onClick} />;
  }
}

const mapStateToProps = state => ({
  chargelocations: getFilterdChargelocations(state),
  currentId: getCurrentId(state),
  hasCluster: getCluster(state).length > 0,
});

export default connect(mapStateToProps, { setCurrentId })(ListContainer);
