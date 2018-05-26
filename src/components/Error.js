import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  opne: PropTypes.bool,
};

const defaultProps = {
  message: '',
  opne: false,
};

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const Error = ({ classes, message, onClose, open }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default withStyles(styles)(Error);
