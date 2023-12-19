import { requestApi, requestApiTemplate } from '../../utils/requestApi';
import {
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILED,
  CLEAR_TEAM
} from './type'


export const getTeams = () => {
  return function (dispatch) {
    dispatch({
      type: GET_TEAMS_REQUEST
    });
    requestApi("/teams/").then(res => {
      console.log('getTeams', res)
      dispatch({
            type: GET_TEAMS_SUCCESS,
            teams: res
          });
    }).catch((err) => {
        dispatch({
          type: GET_TEAMS_FAILED
        });
    });
  };
}


export const getDetailTeam = (id) => {
  return function (dispatch) {
    dispatch({
      type: GET_TEAM_REQUEST
    });
    requestApi("/teams/" + id).then(res => {
      dispatch({
        type: GET_TEAM_SUCCESS,
        detailTeam: res
      });
    }).catch((err)=>{
      dispatch({
        type: GET_TEAM_FAILED
      });
    });
  };
}

export const clearDetailTeam = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_TEAM
    });
  };
}