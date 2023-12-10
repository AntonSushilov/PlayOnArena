import { requestApi, requestApiTemplate } from '../../utils/requestApi';
import {
  SET_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from './type'


// Регистрация
export function registerUser(login, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  };
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    requestApiTemplate("/auth/register", requestOptions).then((res) => {
      if (res && res.success) {
        // localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          user: res.user,
        });
      } else {
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      }
    });
  };
}

// авторизация
export function loginUser(login, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  };
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    requestApiTemplate("/auth/login", requestOptions).then((res) => {
      if (res && res.success) {
        localStorage.setItem("token", res.token);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          token: res.token,
          user: res.user,
        });
      } else {
        dispatch({
          type: LOGIN_USER_FAILED,
        });
      }
    });
  };
}