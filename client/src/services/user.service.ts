import { LoggedUser, LoginCredentials, SignUpCredentials } from '../types';
import api from './api';

const login = async (payload: LoginCredentials): Promise<LoggedUser> => {
  return api.post('auth/login', payload);
};

const signUp = async (payload: SignUpCredentials): Promise<unknown> => {
  return api.post('auth/sign-up', payload);
};

const updateUser = async (payload: any): Promise<any> => {
  return api.patch(`/users`, payload);
};

export const userService = {
  login,
  signUp,
  updateUser,
};
