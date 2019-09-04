import { LAYER_ADD, LAYER_REMOVE, LAYER_UPDATE } from '../actions/actionTypes';
import axios from 'axios';

// TODO put in axios order
const api = 'http://localhost:8000/lists';

const createList = (list) => {
  return (dispatch) => {
    return axios.post(`${api}/add`, list)
      .then((res) => {
        dispatch(addLayer(res.data));
      })
      .catch((err) => {
        throw err;
      });
  }
}

const addLayer = (layer) => ({
  type: LAYER_ADD,
  newLayer: {...layer, stories: layer.cards},
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
  createList,
};