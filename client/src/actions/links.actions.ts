import { linksService } from '../services/links.service';

export const getLinks = () => {
  return async dispatch => {
    dispatch({ type: 'LINKS_LOADING_REQUEST' });
    try {
      const data = await linksService.getLinks();
      dispatch({ type: 'LINKS_LOADING_SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'LINKS_LOADING_ERROR', data: e });
    }
  };
};

export const addCreatedLink = link => {
  console.log(link);
  return { type: 'LINK_ADD', data: { ...link, visitorsCount: 0 } };
};
