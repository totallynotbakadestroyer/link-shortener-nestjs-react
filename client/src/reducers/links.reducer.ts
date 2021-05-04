export const linksReducer = (
  state = { loading: false, linksInfo: null, error: false },
  action,
) => {
  switch (action.type) {
    case 'LINKS_LOADING_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'LINKS_LOADING_SUCCESS':
      return {
        ...state,
        linksInfo: action.data,
        loading: false,
      };
    case 'LINKS_LOADING_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};
