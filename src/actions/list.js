import {
  LIST_ADD,
  LIST_SHOW,
  LIST_REMOVE,
  LIST_UPDATE,
} from './actionTypes';

import axios from 'axios';

// TODO put in axios order
const api = 'http://localhost:8000/lists';

const reqFetchList = () => {
  return (dispatch) => {
    return axios.get(`${api}`)
      .then(res => {
        dispatch({
          type: LIST_SHOW,
          lists: res.data,
        })
      })
      .catch(err => {
        throw err
      });
  }
}

/**
 * Send a new list using http request.
 * This list should be syncronized in clients throught socket.io
 */
const reqCreateList = (list) => {
  return () => {
    return axios.post(`${api}/add`, list)
      .catch((err) => {
        throw err;
      });
  }
};

const reqUpdateList = (list) => {
  return () => {
    return axios.put(`${api}/update`, list)
      .catch((err) => {
        throw err;
      });
  }
}

const reqDeleteList = (id) => {
  return () => {
    return axios.delete(`${api}/${id}`)
      .catch(err => {
        throw err;
      })
  }
}

const addList = (list) => ({
  type: LIST_ADD,
  newList: {...list, stories: list.cards},
});

const removeList = (id) => ({
  type: LIST_REMOVE,
  list: id,
});

const updateList = (list) => ({
  type: LIST_UPDATE,
  list
});

export {
  addList,
  removeList,
  updateList,
  reqCreateList,
  reqDeleteList,
  reqFetchList,
  reqUpdateList,
};