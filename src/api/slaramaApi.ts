import axios from 'axios';

const API_BASE_URL = 'https://xec1cw1izl.execute-api.us-east-1.amazonaws.com/dev'; // <- Change this to your actual API URL

export const registerMonk = async (data: any) => {
  return await axios.post(`${API_BASE_URL}/register-monk`, data);
};
