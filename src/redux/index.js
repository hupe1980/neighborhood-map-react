import { combineReducers } from 'redux';

import chargelocations from './chargelocations';
import current from './current';
import details from './details';
import error from './error';
import filter from './filter';
import map from './map';

export default combineReducers({
  chargelocations,
  current,
  details,
  error,
  filter,
  map,
});
