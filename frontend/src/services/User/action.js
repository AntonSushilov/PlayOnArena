import { requestApi, fetchWithRefresh, requestApiTemplate } from '../../utils/requestApi';
import {
  SET_USER,
  SET_USER_FAILED,
  SET_AUTH_CHECKED,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED
} from './type'

//получения данных о пользователе
export function getUser() {
  return function (dispatch) {
    dispatch({
      type: SET_AUTH_CHECKED,
      isAuthChecked: false,
    });
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${String(localStorage.getItem("token"))}`,
      },
    };
    return requestApi(`/auth/users/me/`, requestOptions)
      .then((res) => {
        console.log("getUser SET_USER", res)
        dispatch({
          type: SET_USER,
          user: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_USER_FAILED,
          err: err
        });
      });
  };
}


//получения данных о пользователе
export function getUserProfile() {
  return function (dispatch) {
    dispatch({
      type: USER_PROFILE_REQUEST,
      // isAuthChecked: false,
    });
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${String(localStorage.getItem("token"))}`,
      },
    };
    return requestApi(`/users/`, requestOptions)
      .then((res) => {
        // console.log("getUser SET_USER", res)
        dispatch({
          type: USER_PROFILE_SUCCESS,
          userProfile: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_PROFILE_FAILED,
          // err: err
        });
      });
  };
}


// Регистрация
export function registerUser(login, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: login,
      password: password,
    }),
  };
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    requestApi("/auth/users/", requestOptions).then((res) => {
      console.log("registerUser", res)
      dispatch({
        type: REGISTER_USER_SUCCESS,
        // user: res,
      });
      // dispatch(loginUser(login, password))
    }).catch((err) => {
      console.log("registerUser", err)

      dispatch({
        type: REGISTER_USER_FAILED,
        message: err
      });
    });
  };
}

// авторизация
export function loginUser(login, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: login,
      password: password,
    }),
  };
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    requestApi("/auth/token/login/", requestOptions).then((res) => {
      localStorage.setItem("token", res.auth_token);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        token: res.auth_token,
      });
      // dispatch(getUser())
    }).catch((err) => {
      dispatch({
        type: LOGIN_USER_FAILED,
        message: err,
      });
    });
    // await dispatch(getUser())
  };
}


// выход пользователя
export function logoutUser() {
  return async function (dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${String(localStorage.getItem("token"))}`,
      },
    };
    return requestApi(`/auth/token/logout/`, requestOptions)
      .then((res) => {
        console.log("logout and delete token", res)
        localStorage.removeItem("token")
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
        // if (res && res.success) {
        //   dispatch({
        //     type: SET_USER,
        //     user: res,
        //   });
        // }
      })
      .catch((err) => {
        console.log("logout and delete token err", err)
        localStorage.removeItem("token")

        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
        // dispatch({
        //   type: LOGOUT_USER_FAILED,
        //   // err: err
        // });
      });
  };
}


export function checkUserAuth() {
  return (dispatch) => {
    if (localStorage.getItem("token")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("token");
          dispatch({
            type: SET_USER,
            user: null,
          });
        })
        .finally(() =>
          dispatch({
            type: SET_AUTH_CHECKED,
            isAuthChecked: true,
          })
        );
    } else {
      dispatch({
        type: SET_AUTH_CHECKED,
        isAuthChecked: true,
      });
    }
  };
}

