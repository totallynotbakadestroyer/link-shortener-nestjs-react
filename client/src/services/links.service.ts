import api from './api';

const getLinks = async (): Promise<any> => {
  return api.get('links');
};

const getLinkInfo = async (id: string): Promise<any> => {
  return api.get(`links/${id}`);
};

export const linksService = {
  getLinks,
  getLinkInfo,
};
