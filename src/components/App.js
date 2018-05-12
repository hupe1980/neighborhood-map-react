import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from '@material-ui/icons/Menu';

import MapContainer from '../containers/MapContainer';
import ListContainer from '../containers/ListContainer';
import SearchBar from './SearchBar';

const propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const Wrapper = styled.div`
  flex-grow: 1;
  z-index: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
`;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: theme.drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: theme.drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
});

class App extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { changeFilter, classes, filter, theme } = this.props;

    return (
      <Wrapper>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <SearchBar
              placeholder="Filter"
              value={filter}
              onChange={changeFilter}
            />
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <ListContainer />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <ListContainer />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MapContainer />
        </main>
      </Wrapper>
    );
  }
}

App.propTypes = propTypes;

export default withStyles(styles, { withTheme: true })(App);
