export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      window.localStorage.setItem('token', action.data.access_token);
      return {};
    case 'LOGIN_ERROR':
      return {
        loginError: action.data.response.data.message,
      };
    case 'SIGN_UP_REQUEST':
      return {
        loading: true,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        signUpSuccess: true,
      };
    case 'SIGN_UP_ERROR':
      return {
        signUpError: action.data.response.data.message,
      };
    default:
      return {};
  }
};
