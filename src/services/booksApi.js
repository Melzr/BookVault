import axios from 'axios';

const API_URL = process.env.REACT_APP_BOOKS_API_URL;

export const searchBooks = async (query) => {
  const url = `${API_URL}/search.json?q=${query}`;
  const { data } = await axios.get(url);

  return data;
};
