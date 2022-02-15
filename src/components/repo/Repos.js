import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ repos }) => {
  return (
    <>
      <h2 className='text-center'>Repos</h2>
      <ul>{repos.map((r) => <RepoItem key={r.id} repo={r}/> )}</ul>
    </>
  );
};

export default Repos;

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};
