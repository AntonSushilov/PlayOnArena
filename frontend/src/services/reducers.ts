import { combineReducers } from 'redux';
import { userReducer } from './User/reducer';
import { teamReducer } from './Team/reducer';
import { tournamentReducer } from './Tournament/reducer';
export const rootReducer = combineReducers({
  userReducer,
  teamReducer,
  tournamentReducer
});