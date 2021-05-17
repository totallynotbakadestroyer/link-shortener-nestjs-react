export const userReducer = (
  state = {
    loading: false,
    loginError: '',
    signUpSuccess: false,
    signUpError: false,
  },
  action,
) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      window.localStorage.setItem('token', action.data.access_token);
      return { ...state, loading: false };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: action.data.response.data.message,
      };
    case 'SIGN_UP_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        loading: false,
        signUpSuccess: true,
      };
    case 'SIGN_UP_ERROR':
      return {
        ...state,
        loading: false,
        signUpError: action.data.response.data.message,
      };
    case 'LOG_OUT':
      window.localStorage.removeItem('token');
      return { ...state };
    default:
      return { ...state };
  }
};
