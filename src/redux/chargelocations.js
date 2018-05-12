import { getFilter } from './filter';

const API_KEY = process.env.REACT_APP_GOINGELECTRIC_API_KEY;
const URL = `https://api.goingelectric.de/chargepoints/?key=${API_KEY}`;

export const FETCH_CHARGELOCATIONS = 'FETCH_CHARGELOCATIONS';

// ActionCreators
export const fetchChargePoints = (bounds, zoom) => {
  return (dispatch, getState) => {
    const {
      sw: { lat: sw_lat, lng: sw_lng },
      ne: { lat: ne_lat, lng: ne_lng },
    } = bounds;
    const apiCall = `${URL}&sw_lat=${sw_lat}&sw_lng=${sw_lng}&ne_lat=${ne_lat}&ne_lng=${ne_lng}&orderby=distance&clustering=true&zoom=${zoom}`;

    fetch(apiCall)
      .then(response => response.json())
      .then(response => {
        const { chargelocations } = response;
        dispatch({
          type: FETCH_CHARGELOCATIONS,
          payload: chargelocations,
        });
      });
  };
};

// Selectors
export const getChargelocations = ({ chargelocations }) =>
  chargelocations.filter(cl => !cl.clustered);

export const getFilterdChargelocations = state => {
  const chargelocations = getChargelocations(state);
  const filter = getFilter(state);

  return chargelocations.filter(cl => cl.name.startsWith(filter));
};

export const getCluster = ({ chargelocations }) =>
  chargelocations.filter(cl => cl.clustered);

// Reducer
export default (state = [], action) => {
  if (action.type === FETCH_CHARGELOCATIONS) return action.payload;
  return state;
};
