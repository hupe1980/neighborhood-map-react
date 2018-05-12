import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from 'material-ui/colors';

const propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

const defaultProps = {
  placeholder: 'Search',
  value: '',
};

const Container = styled.div`
  margin: auto 0 auto 16px;
  width: 100%;
`;

const styles = {
  root: {
    height: 48,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
  },
  icon: {
    color: grey[500],
  },
  searchButton: {
    opacity: 0.54,
    marginRight: -48,
  },
  closeButton: {
    opacity: 0.54,
  },
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      value: this.props.value,
      active: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ ...this.state, value: nextProps.value });
    }
  }

  handleFocus = () => {
    this.setState({ focus: true });
  };

  handleBlur = () => {
    this.setState({ focus: false });
    if (this.state.value.trim().length === 0) {
      this.setState({ value: '' });
    }
  };

  handleInput = e => {
    this.setState({ value: e.target.value });
    this.props.onChange && this.props.onChange(e.target.value);
  };

  handleCancel = () => {
    this.setState({ active: false, value: '' });
    this.props.onChange && this.props.onChange('');
  };

  render() {
    const { classes, placeholder } = this.props;
    const { value } = this.state;
    const nonEmpty = value.length > 0;

    return (
      <Paper className={classes.root}>
        <Container>
          <Input
            placeholder={placeholder}
            onBlur={this.handleBlur}
            value={value}
            onChange={this.handleInput}
            onFocus={this.handleFocus}
            fullWidth
            className={classes.input}
            disableUnderline
          />
        </Container>
        <IconButton className={classes.searchButton}>
          <SearchIcon
            className={classes.icon}
            style={{ opacity: nonEmpty ? 0 : 1 }}
          />
        </IconButton>
        <IconButton onClick={this.handleCancel} className={classes.closeButton}>
          <ClearIcon
            className={classes.icon}
            style={{ opacity: nonEmpty ? 1 : 0 }}
          />
        </IconButton>
      </Paper>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default withStyles(styles)(SearchBar);
