export const CHANGE_FILTER = 'CHANGE_FILTER';

// ActionCreators
export const changeFilter = filter => ({
  type: CHANGE_FILTER,
  payload: filter,
});

// Selectors
export const getFilter = ({ filter }) => filter;

// Reducer
export default (state = '', action) => {
  if (action.type === CHANGE_FILTER) return action.payload;
  return state;
};
