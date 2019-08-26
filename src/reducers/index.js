import { combineReducers } from 'redux';
import layerReducer from './layer';
import cardReducer from './card';


export const Reducers = combineReducers({
  layerReducer,
  cardReducer,
});