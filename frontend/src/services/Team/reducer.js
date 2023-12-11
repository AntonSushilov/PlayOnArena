import {
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED
} from './type'

export const initialState = {
  teams: [],
  getTeamsRequest: false,
  getTeamsSuccess: false,
  getTeamsFailed: false

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

    default:
      return state
  }
}