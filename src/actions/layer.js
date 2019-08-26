const addLayer = (layer) => ({
  type: 'LAYER_ADD',
  newLayer: layer,
});

const removeLayer = (id) => ({
  type: 'LAYER_REMOVE',
  layer: id,
});

export {
  addLayer,
  removeLayer,
};