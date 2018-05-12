import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@material-ui/icons/Place';

const propTypes = {
  isCurrent: PropTypes.bool,
};

const defaultProps = {
  isCurrent: false,
};

const CurrentIcon = styled(Icon)`
  color: red;
`;

const PlaceIcon = ({ isCurrent }) => (isCurrent ? <CurrentIcon /> : <Icon />);

PlaceIcon.propTypes = propTypes;
PlaceIcon.defaultProps = defaultProps;

export default PlaceIcon;
