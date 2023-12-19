import {
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
  GET_TOURNAMENTS_FAILED,
  GET_TOURNAMENT_REQUEST,
  GET_TOURNAMENT_SUCCESS,
  GET_TOURNAMENT_FAILED,
  CLEAR_TOURNAMENT,
  CREATE_TOURNAMENT_GRID
} from './type'

export const initialState = {
  tournaments: [],
  getTournamentsRequest: false,
  getTournamentsSuccess: false,
  getTournamentsFailed: false,

  detailTournament: null,
  tournamentGrid: null,
  getTournamentRequest: false,
  getTournamentSuccess: false,
  getTournamentFailed: false

}

export const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOURNAMENTS_REQUEST:
      return {
        ...state,
        getTournamentsRequest: true
      }
    case GET_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        getTournamentsSuccess: true,
        getTournamentsRequest: false,
        tournaments: action.tournaments
      }
    case GET_TOURNAMENTS_FAILED:
      return {
        ...state,
        getTournamentsRequest: false,
        getTournamentsFailed: true
      }
    case GET_TOURNAMENT_REQUEST:
      return {
        ...state,
        getTournamentRequest: true
      }
    case GET_TOURNAMENT_SUCCESS:
      return {
        ...state,
        getTournamentSuccess: true,
        getTournamentRequest: false,
        detailTournament: action.detailTournament
      }
    case GET_TOURNAMENT_FAILED:
      return {
        ...state,
        getTournamentRequest: false,
        getTournamentFailed: true
      }
    case CLEAR_TOURNAMENT:
      return {
        ...state,
        detailTournament: null,
        tournamentGrid: null
      }
    case CREATE_TOURNAMENT_GRID:
      return {
        ...state,
        tournamentGrid: action.tournamentGrid,
      }
    default:
      return state
  }
}