import {
  LAYER_LIST,
  LAYER_ADD,
  LAYER_REMOVE,
  LAYER_UPDATE
} from '../actions/actionTypes';

const initialState = {
  layers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LAYER_LIST:
      return {
        ...state,
        layers: action.lists,
      }
    case LAYER_ADD:
      const newLayer = { ...action.newLayer, id: action.newLayer._id };
      return {
        ...state,
        layers: [...state.layers, newLayer]
      };
    case LAYER_REMOVE:
      return {
        ...state,
        layers: state.layers.filter(l => l._id !== action.layer)
      };
    case LAYER_UPDATE:
      return {
        ...state,
        layers: state.layers.map(
          layer => layer._id === action.layer.id ? layer = action.layer : layer
        )
      }
    default:
      return state;
  }
};