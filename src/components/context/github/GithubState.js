import { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import { SET_USERS, SEARCH_USERS, SET_LOADING, GET_USER_AND_REPOS } from '../types';
import GithubReducer from './githubReducer';

const ID = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID;
const SECRET = process.env.NODE_ENV !== "production" ? process.env.REACT_APP_GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET;

const API_URI = `https://api.github.com`;
const ID_PARAMS = `client_id=${ID}&client_secret=${SECRET}`;
const REPO_SORT_PARAMS = 'per_page=5&sort=created';

const GithubState = (props) => {
  const initalState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showClear: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initalState);

  // Fetch Users
  // Clear Users
  const fetchUsers = async () => {
    setLoading();
    const res = await axios.get(`${API_URI}/users?${ID_PARAMS}`);

    dispatch({ type: SET_USERS, payload: res.data });
  };

  // Search Users
  const searchUsers = async (queryText) => {
    setLoading();

    const res = await axios.get(`${API_URI}/search/users?q=${queryText}&${ID_PARAMS}`);
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // Get User
  // Get Repos

  const fetchUserAndRepos = async (userId) => {
    setLoading();
    const res = await Promise.all([
      axios.get(`${API_URI}/users/${userId}?${ID_PARAMS}`),
      axios.get(`${API_URI}/users/${userId}/repos?${REPO_SORT_PARAMS}${ID_PARAMS}`),
    ]);

    dispatch({ type: GET_USER_AND_REPOS, payload: { user: res?.[0]?.data, repos: res?.[1]?.data } });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        showClear: state.showClear,
        searchUsers,
        fetchUsers,
        fetchUserAndRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
