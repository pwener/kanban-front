import {
  LIST_SHOW,
  LIST_ADD,
  LIST_REMOVE,
  LIST_UPDATE
} from '../actions/actionTypes';

const initialState = {
  lists: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_SHOW:
      return {
        ...state,
        lists: action.lists,
      }
    case LIST_ADD:
      const newList = { ...action.newList, id: action.newList._id };
      return {
        ...state,
        lists: [...state.lists, newList]
      };
    case LIST_REMOVE:
      return {
        ...state,
        lists: state.lists.filter(l => l._id !== action.list)
      };
    case LIST_UPDATE:
      return {
        ...state,
        lists: state.lists.map(
          list => list._id === action.list.id ? list = action.list : list
        )
      }
    default:
      return state;
  }
};