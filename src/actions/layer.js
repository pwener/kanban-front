import { LAYER_ADD, LAYER_REMOVE, LAYER_UPDATE } from '../actions/actionTypes';

const addLayer = (layer) => ({
  type: LAYER_ADD,
  newLayer: layer,
});

const removeLayer = (id) => ({
  type: LAYER_REMOVE,
  layer: id,
});

const updateLayer = (layer) => ({
  type: LAYER_UPDATE,
  layer
});

export {
  addLayer,
  removeLayer,
  updateLayer,
};