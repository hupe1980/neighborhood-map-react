import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  street: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  margin-top: 5px;
`;

const Address = ({ street, postcode, city, country }) => (
  <Wrapper>
    <Typography>{street}</Typography>
    <Typography>
      {postcode} {city}
    </Typography>
    <Typography>{country}</Typography>
  </Wrapper>
);

Address.propTypes = propTypes;

export default Address;
