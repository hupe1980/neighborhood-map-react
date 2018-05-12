import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () =>
  createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
