import { LoggedUser, LoginCredentials, SignUpCredentials } from '../types';
import api from './api';

const login = async (payload: LoginCredentials): Promise<LoggedUser> => {
  return api.post('auth/login', payload);
};

const signUp = async (payload: SignUpCredentials): Promise<unknown> => {
  return api.post('auth/sign-up', payload);
};

export const userService = {
  login,
  signUp,
};
