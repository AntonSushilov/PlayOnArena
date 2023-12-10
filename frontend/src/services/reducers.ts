import { combineReducers } from 'redux';
import { userReducer } from './User/reducer';
import { teamReducer } from './Team/reducer';
export const rootReducer = combineReducers({
  userReducer,
  teamReducer
});