import { requestApi } from '../../utils/requestApi';
import {
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
  GET_TOURNAMENTS_FAILED,
  GET_TOURNAMENT_REQUEST,
  GET_TOURNAMENT_SUCCESS,
  GET_TOURNAMENT_FAILED,
  CLEAR_TOURNAMENT
} from './type'


export const getTournaments = () => {
  return function (dispatch) {
    dispatch({
      type: GET_TOURNAMENTS_REQUEST
    });
    requestApi("/tournaments/").then(res => {
      console.log('getTOURNAMENTS', res)
      dispatch({
            type: GET_TOURNAMENTS_SUCCESS,
            tournaments: res
          });
    }).catch((err) => {
        dispatch({
          type: GET_TOURNAMENTS_FAILED
        });
    });
  };
}


export const getDetailTournament = (id) => {
  return function (dispatch) {
    dispatch({
      type: GET_TOURNAMENT_REQUEST
    });
    requestApi("/tournaments/" + id).then(res => {
      dispatch({
        type: GET_TOURNAMENT_SUCCESS,
        detailTournament: res
      });
    }).catch((err)=>{
      dispatch({
        type: GET_TOURNAMENT_FAILED
      });
    });
  };
}

export const clearDetailTournament = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_TOURNAMENT
    });
  };
}