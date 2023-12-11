import {
  SET_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from './type'


export const initialState = {
  token: null,
  user: null,
  isAuthChecked: false,

  message: null,
  userRequest: false,
  userFailed: false,

  userRegisterSuccess: false,
  userLoginSuccess: false,
  resetPasswordSuccess: false,
};
export const userReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      }
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userRegisterSuccess: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        // isAuthChecked: true,
        userRegisterSuccess: true,
        // accessToken: action.accessToken,
        // refreshToken: action.refreshToken,
        user: action.user,
      };
    }
    case REGISTER_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userRegisterSuccess: false,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        // isAuthChecked: true,
        userLoginSuccess: true,
        token: action.token,
        user: action.user,
      };
    }
    case LOGIN_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    default: {
      return state
    }
  }
}