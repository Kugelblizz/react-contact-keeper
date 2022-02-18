import { GET_USER_AND_REPOS, SEARCH_USERS, SET_LOADING, SET_USERS } from '../types';

const GithubReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_AND_REPOS:
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };

    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        showClear: false,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        showClear: true,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default GithubReducer;
