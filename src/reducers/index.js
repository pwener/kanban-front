import { combineReducers } from 'redux';
import listReducer from './list';
import cardReducer from './card';


export const Reducers = combineReducers({
  listReducer,
  cardReducer,
});