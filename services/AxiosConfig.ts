import axios from 'axios';

export const axiosConfigJSON = axios.create({
  baseURL: `${process.env.NEXTAUTH_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': `${process.env.NEXTAUTH_URL}`,
  },
});

export const axiosConfigMULTIPART = axios.create({
  baseURL: `${process.env.NEXTAUTH_URL}/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': `${process.env.NEXTAUTH_URL}`,
  },
});
