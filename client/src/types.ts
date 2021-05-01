export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoggedUser {
  username: string;
  id: string;
  access_token: string;
}
