import axios from 'axios';

export const ApiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VERCEL_URL
      : 'https://localhost:3000'
});
