import {
  SET_USER
} from './type'


//получения данных о пользователе
export function getUser() {
  return function (dispatch) {
    // dispatch({
    //   type: SET_AUTH_CHECKED,
    //   authChecked: false,
    // });
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: String(localStorage.getItem("accessToken")),
      },
    };
    return dispatch({
      type: SET_USER,
      user: {
        login: "login"
      }
    })
    // return fetchWithRefresh(`/auth/user`, requestOptions)
    //   .then((res) => {
    //     if (res && res.success) {
    //       dispatch({
    //         type: SET_USER,
    //         user: res.user,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: SET_USER_FAILED,
    //       // err: err
    //     });
    //   });
  };
}