import { setError } from './error';

const API_KEY = process.env.REACT_APP_GOINGELECTRIC_API_KEY;
const URL = `https://api.goingelectric.de/chargepoints/?key=${API_KEY}`;

export const FETCH_DETAILS = 'FETCH_DETAILS';

// ActionCreators
export const fetchDetails = id => {
  return dispatch => {
    const apiCall = `${URL}&ge_id=${id}`;

    fetch(apiCall)
      .then(response => response.json())
      .then(response => {
        const details = response.chargelocations[0];
        dispatch({
          type: FETCH_DETAILS,
          payload: details,
        });
      })
      .catch(error => {
        dispatch(setError('Error loading details'));
      });
  };
};

// Selectors
export const getDetails = (state, id) => state.details[id];

// Reducer
export default (state = {}, action) => {
  if (action.type === FETCH_DETAILS) {
    return {
      ...state,
      [action.payload.ge_id]: action.payload,
    };
  }
  return state;
};
