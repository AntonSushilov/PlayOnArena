import { requestApi, requestApiTemplate } from '../../utils/requestApi';
import {
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED
} from './type'


export const getTeams = () => {
  return function (dispatch) {
    dispatch({
      type: GET_TEAMS_REQUEST
    });
    requestApiTemplate("/teams").then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_TEAMS_SUCCESS,
          teams: res.data
        });
      } else {
        dispatch({
          type: GET_TEAMS_FAILED
        });
      }
    });
  };
}