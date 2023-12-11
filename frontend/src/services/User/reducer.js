import {
  SET_USER
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

    default: {
      return state
    }
  }
}