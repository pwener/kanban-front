import { LAYER_ADD, LAYER_LIST, LAYER_REMOVE, LAYER_UPDATE } from '../actions/actionTypes';
import axios from 'axios';

// TODO put in axios order
const api = 'http://localhost:8000/lists';

const fetchList = () => {
  return (dispatch) => {
    return axios.get(`${api}`)
      .then(res => {
        dispatch({
          type: LAYER_LIST,
          lists: res.data,
        })
      })
      .catch(err => {
        throw err
      });
  }
}

const createList = (list) => {
  return () => {
    // layer just will be added by channel
    return axios.post(`${api}/add`, list)
      .catch((err) => {
        throw err;
      });
  }
};

const deleteList = (id) => {
  return () => {
    return axios.delete(`${api}/${id}`)
      .catch(err => {
        throw err;
      })
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
  deleteList,
  fetchList,
};