import axios from 'axios';

const API_BASE_URL = 'https://your-api-id.execute-api.region.amazonaws.com/dev'; // <- Change this to your actual API URL

export const submitStayRequest = async (payload: any) => {
  return axios.post(`${API_BASE_URL}/stay-request`, payload);
};
