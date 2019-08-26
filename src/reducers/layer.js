import { LAYER_ADD, LAYER_REMOVE } from '../actions/actionTypes';

const initialState = {
  layers: [
    {id: 1, projectName: "lorem_ipsum", name: 'To Do', stories: [] },
    {id: 2, projectName: "lorem_ipsum", name: 'Doing', stories: [] },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LAYER_ADD:
      return {
        ...state,
        layers: [...state.layers, action.newLayer]
      };
    case LAYER_REMOVE:
      return {
        ...state,
        layers: state.layers.filter(l => l.id !== action.layer)
      }
    default:
      return state;
  }
};