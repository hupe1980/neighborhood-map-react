export const SET_CURRENT_ID = 'SET_CURRENT_ID';

// ActionCreators
export const setCurrentId = id => ({
  type: SET_CURRENT_ID,
  payload: id,
});

// Selectors
export const getCurrentId = ({ current }) => current;

// Reducer
export default (state = -1, action) => {
  if (action.type === SET_CURRENT_ID) {
    return state === action.payload ? -1 : action.payload;
  }
  return state;
};
