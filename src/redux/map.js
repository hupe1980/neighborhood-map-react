export const CHANGE_MAP = 'CHANGE_MAP';

export const INITIAL_STATE = {
  center: {
    lat: 52.520008,
    lng: 13.404954,
  },
  zoom: 15,
};

export const getMapCenter = ({ map }) => map.center;

export const getMapZoom = ({ map }) => map.zoom;

export const changeMap = (center, zoom) => ({
  type: CHANGE_MAP,
  payload: {
    center,
    zoom,
  },
});

export default (state = INITIAL_STATE, action) => {
  if (action.type === CHANGE_MAP) return action.payload;
  return state;
};
