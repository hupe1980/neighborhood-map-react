import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import MUIList from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import PlaceIcon from './PlaceIcon';

const propTypes = {
  chargelocations: PropTypes.array,
  currentId: PropTypes.number,
  hasCluster: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  chargelocations: [],
  currentId: -1,
  hasCluster: false,
};

const List = ({ chargelocations, currentId, hasCluster, onClick }) => (
  <Fragment>
    <Toolbar>
      <Typography variant="title" color="inherit" noWrap>
        plugMap
      </Typography>
    </Toolbar>
    <Divider />
    <MUIList dense>
      {chargelocations.map(location => {
        const { ge_id, name } = location;
        return (
          <ListItem key={ge_id} button onClick={() => onClick(ge_id)}>
            <ListItemIcon>
              <PlaceIcon isCurrent={currentId === ge_id} />
            </ListItemIcon>
            <ListItemText primary={name} secondary={`(${ge_id})`} />
          </ListItem>
        );
      })}
      {hasCluster && (
        <Fragment>
          <Divider />
          <ListItem>
            <ListItemText secondary="Please zoom in to resolve the clusters..." />
          </ListItem>
        </Fragment>
      )}
    </MUIList>
  </Fragment>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
