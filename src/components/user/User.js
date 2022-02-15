import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Repos from '../repo/Repos';

const User = ({ fetchUserAndRepos, user, repos, loading }) => {
  const params = useParams();
  const routeLocation = useLocation();

  useEffect(() => {
    const doIt = async () => {
      await fetchUserAndRepos(params?.userId);
    };
    doIt();
  }, [routeLocation]);

  //prettier-ignore
  const {
    name, avatar_url, location, bio, blog, login, html_url,
    followers, following, public_repos, public_gists, hireable,
    company
  } = user;

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <>
          <Link to="/" className="btn btn-light">
            Back to Search
          </Link>
          Hireable:{' '}
          {hireable ? (
            <i className="fas fa-check text-success"></i>
          ) : (
            <i className="fas fa-times-circle text-danger"></i>
          )}
          <div className="card grid-2">
            <div className="all-center">
              <img src={avatar_url} alt={name} className="round-img" style={{ width: '150px' }} />
              <h1>{name}</h1>
              <p>Location: {location}</p>
            </div>
            <div>
              {bio && (
                <>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </>
              )}

              <a href={html_url} className="btn btn-dark my-1">
                Visit Github Profile
              </a>
              <ul>
                <li>
                  {login && (
                    <>
                      <strong>Username: </strong> {login}
                    </>
                  )}
                </li>
                <li>
                  {company && (
                    <>
                      <strong>Company: </strong> {company}
                    </>
                  )}
                </li>
                <li>
                  {blog && (
                    <>
                      <strong>Website: </strong> {blog}
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-light">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
          </div>
          <Repos repos={repos}></Repos>
        </>
      )}
    </>
  );
};

export default User;

User.propTypes = {
  fetchUserAndRepos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const dummyRequest = {
  login: 'bradtraversy',
  id: 5550850,
  node_id: 'MDQ6VXNlcjU1NTA4NTA=',
  avatar_url: 'https://avatars.githubusercontent.com/u/5550850?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/bradtraversy',
  html_url: 'https://github.com/bradtraversy',
  followers_url: 'https://api.github.com/users/bradtraversy/followers',
  following_url: 'https://api.github.com/users/bradtraversy/following{/other_user}',
  gists_url: 'https://api.github.com/users/bradtraversy/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/bradtraversy/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/bradtraversy/subscriptions',
  organizations_url: 'https://api.github.com/users/bradtraversy/orgs',
  repos_url: 'https://api.github.com/users/bradtraversy/repos',
  events_url: 'https://api.github.com/users/bradtraversy/events{/privacy}',
  received_events_url: 'https://api.github.com/users/bradtraversy/received_events',
  type: 'User',
  site_admin: false,
  name: 'Brad Traversy',
  company: 'Traversy Media',
  blog: 'traversymedia.com',
  location: 'Massachusetts',
  email: null,
  hireable: true,
  bio: 'Full stack web developer and online instructor, specializiing in mostly JS, but also write Python, PHP and some other stuff.',
  twitter_username: 'traversymedia',
  public_repos: 239,
  public_gists: 40,
  followers: 49235,
  following: 6,
  created_at: '2013-09-26T15:36:02Z',
  updated_at: '2022-02-10T19:15:35Z',
};