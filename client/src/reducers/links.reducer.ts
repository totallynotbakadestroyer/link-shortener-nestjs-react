export const linksReducer = (
  state: { loading: boolean; linksInfo: any; error: boolean } = {
    loading: true,
    linksInfo: null,
    error: false,
  },
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
    case 'LINK_ADD':
      console.log(action.data);
      return {
        ...state,
        linksInfo: {
          ...state.linksInfo,
          links: [...state.linksInfo.links, action.data],
        },
      };
    default:
      return { ...state };
  }
};
