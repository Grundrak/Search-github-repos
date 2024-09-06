import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${token}`,
  },
});

export const fetchUserData = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const fetchUserRepos = async (username) => {
  const response = await api.get(`/users/${username}/repos?per_page=100`);
  return response.data;
};