import { userService } from '../services/user.service';
import { LoginCredentials, SignUpCredentials } from '../types';

export const login = (userCredentials: LoginCredentials, history) => {
  return async dispatch => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const data = await userService.login(userCredentials);
      dispatch({ type: 'LOGIN_SUCCESS', data });
      await history.push('/dashboard');
    } catch (e) {
      dispatch({ type: 'LOGIN_ERROR', data: e });
    }
  };
};

export const signUp = (userCredentials: SignUpCredentials, resetForm) => {
  return async dispatch => {
    dispatch({ type: 'SIGN_UP_REQUEST' });
    try {
      await userService.signUp(userCredentials);
      dispatch({ type: 'SIGN_UP_SUCCESS' });
      resetForm();
    } catch (e) {
      dispatch({ type: 'SIGN_UP_ERROR', data: e });
    }
  };
};
