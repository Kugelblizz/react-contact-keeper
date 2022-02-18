import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import Repos from '../repo/Repos';
import GithubContext from '../context/github/githubContext';

const User = ({}) => {
  const params = useParams();
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    const doIt = async () => {
      await githubContext.fetchUserAndRepos(params?.userId);
    };
    doIt();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  //prettier-ignore
  const {
    name, avatar_url, location, bio, blog, login, html_url,
    followers, following, public_repos, public_gists, hireable,
    company
  } = githubContext.user;

  return (
    <>
      {githubContext.loading && <Spinner />}
      {!githubContext.loading && (
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
          <Repos repos={githubContext.repos}></Repos>
        </>
      )}
    </>
  );
};

export default User;
