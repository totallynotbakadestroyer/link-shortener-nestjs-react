import { userService } from '../services/user.service';
import { LoginCredentials, SignUpCredentials } from '../types';

export const login = (userCredentials: LoginCredentials) => {
  return async dispatch => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const data = await userService.login(userCredentials);
      dispatch({ type: 'LOGIN_SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'LOGIN_ERROR', data: e });
    }
  };
};

export const signUp = (userCredentials: SignUpCredentials) => {
  return async dispatch => {
    dispatch({ type: 'SIGN_UP_REQUEST' });
    try {
      await userService.signUp(userCredentials);
      dispatch({ type: 'SIGN_UP_SUCCESS' });
    } catch (e) {
      dispatch({ type: 'SIGN_UP_ERROR', data: e });
    }
  };
};