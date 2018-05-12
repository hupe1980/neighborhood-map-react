const API_KEY = '1edc055d06d63d16f2fb0fa59b2d8c0a';
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
