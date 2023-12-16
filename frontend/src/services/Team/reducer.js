import {
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILED,
  CLEAR_TEAM
} from './type'

export const initialState = {
  teams: [],
  getTeamsRequest: false,
  getTeamsSuccess: false,
  getTeamsFailed: false,

  detailTeam: null,
  getTeamRequest: false,
  getTeamSuccess: false,
  getTeamFailed: false

}

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS_REQUEST:
      return {
        ...state,
        getTeamsRequest: true
      }
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        getTeamsSuccess: true,
        getTeamsRequest: false,
        teams: action.teams
      }
    case GET_TEAMS_FAILED:
      return {
        ...state,
        getTeamsRequest: false,
        getTeamsFailed: true
      }
    case GET_TEAM_REQUEST:
      return {
        ...state,
        getTeamRequest: true
      }
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        getTeamSuccess: true,
        getTeamRequest: false,
        detailTeam: action.detailTeam
      }
    case GET_TEAM_FAILED:
      return {
        ...state,
        getTeamRequest: false,
        getTeamFailed: true
      }
      case CLEAR_TEAM:
        return {
          ...state,
          detailTeam: null,
        }
    default:
      return state
  }
}