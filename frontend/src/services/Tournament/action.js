import { requestApi } from '../../utils/requestApi';
import {
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
  GET_TOURNAMENTS_FAILED,
  GET_TOURNAMENT_REQUEST,
  GET_TOURNAMENT_SUCCESS,
  GET_TOURNAMENT_FAILED,
  CLEAR_TOURNAMENT,
  CREATE_TOURNAMENT_GRID,
  SAVE_TOURNAMENT_GRID_REQUEST,
  SAVE_TOURNAMENT_GRID_SUCCESS,
  SAVE_TOURNAMENT_GRID_FAILED
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

export const createTournamentGrid = (ids, tournament_id) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      team_ids: ids,
      tournament_id: tournament_id
  }),
  };
  return function (dispatch) {
    // dispatch({
    //   type: GET_TOURNAMENT_REQUEST
    // });
    requestApi("/round_robin/", requestOptions).then(res => {
      console.log(res)
      dispatch({
        type: CREATE_TOURNAMENT_GRID,
        tournamentGrid: res
      });
    }).catch((err)=>{
      // dispatch({
      //   type: GET_TOURNAMENT_FAILED
      // });
    });
  };
}


export const saveTournamentGrid = (tournament_grid) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tournament_grid),
  };
  return function (dispatch) {
    dispatch({
      type: SAVE_TOURNAMENT_GRID_REQUEST
    });
    requestApi("/create_tournament/", requestOptions).then(res => {
      console.log(res)
      dispatch({
        type: SAVE_TOURNAMENT_GRID_SUCCESS,
        // tournamentGrid: res
      });
    }).catch((err)=>{
      dispatch({
        type: SAVE_TOURNAMENT_GRID_FAILED
      });
    });
  };
}