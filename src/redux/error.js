export const SET_ERROR = 'SET_ERROR';

// ActionCreators
export const setError = message => ({
  type: SET_ERROR,
  payload: message,
});

// Selectors
export const getError = ({ error }) => error;

// Reducer
export default (state = '', action) => {
  if (action.type === SET_ERROR) return action.payload;
  return state;
};
