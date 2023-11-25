import axios from 'axios';

const API_URL = process.env.REACT_APP_BOOKS_API_URL;

export const searchBooks = async (query, page = 1, limit = 10) => {
  const url = `${API_URL}/search.json?q=${query}&page=${page}&limit=${limit}`;
  const { data } = await axios.get(url);

  return data;
};

export const getAuthorData = async (authorKey) => {
  const url = `${API_URL}/authors/${authorKey}.json`;
  const { data } = await axios.get(url);

  return data;
}

export const getBookData = async (bookKey) => {
  const url = `${API_URL}/works/${bookKey}.json`;
  const { data } = await axios.get(url);

  return data;
}

export const parseQuery = (query) => {
  return query.replace(/\s/g, '+');
};

export const parseBookKey = (key) => {
  // key is, for example "/works/OL27448W"
  // returns "OL27448W"

  return key.split('/')[2];
}

