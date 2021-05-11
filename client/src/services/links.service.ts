import api from './api';

const getLinks = async (): Promise<any> => {
  return api.get('links');
};

const getLinkInfo = async (id: string): Promise<any> => {
  return api.get(`links/${id}`);
};

const createLink = async (payload): Promise<any> => {
  return api.post('links/generate', payload);
};

export const linksService = {
  getLinks,
  getLinkInfo,
  createLink,
};
