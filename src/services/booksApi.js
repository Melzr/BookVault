import axios from 'axios';

const API_URL = process.env.REACT_APP_BOOKS_API_URL;

export const searchBooks = async (query, page = 1, limit = 10) => {
  const url = `${API_URL}/search.json?q=${query}&page=${page}&limit=${limit}`;
  const { data } = await axios.get(url);

  return data;
};
