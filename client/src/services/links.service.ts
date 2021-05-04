import api from './api';

const getLinks = async () => {
  return api.get('links');
};

export const linksService = {
  getLinks,
};
