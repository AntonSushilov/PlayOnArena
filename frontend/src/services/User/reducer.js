import {
  SET_USER,
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


export const initialState = {
  token: null,
  user: null,
  isAuthChecked: false,

  userProfile: null,
  userProfileRequest: false,
  userProfileSuccess: false,
  userProfileFailed: false,

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
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.isAuthChecked,
      };
    }
    case USER_PROFILE_REQUEST: {
      return {
        ...state,
        userProfileRequest: true,
        userProfileSuccess: false,
      };
    }
    case USER_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfileRequest: false,
        userProfileSuccess: true,
        userProfileFailed: false,
        userProfile: action.userProfile
      };
    }
    case USER_PROFILE_FAILED: {
      return {
        ...state,
        userProfileFailed: true,
        userProfileRequest: false,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userRegisterSuccess: false,
        userFailed:false,
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
      return {
        ...state,
        userFailed: true,
        userRequest: false,
        message: action.message
      };
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
        userLoginSuccess: true,
        // isAuthChecked: true,
        token: action.token,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
        message: action.message
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        userLoginSuccess: false,
        userRegisterSuccess:false,
        isAuthChecked: true,
        token: null,
        user: null
      };
    }
    case LOGOUT_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    default: {
      return state
    }
  }
}