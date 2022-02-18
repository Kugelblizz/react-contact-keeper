import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../context/github/githubContext';

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);

  const [text, setText] = useState('');

  const onChange = (evt) => {
    setText(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const ret = text.replaceAll(' ', ''); //simple cleanup
    if (ret) {
      githubContext.searchUsers(ret);
    } else {
      setAlert('Please Enter a valid search string', 'light');
    }
  };

  const onClear = (evt) => {
    setText('');
    githubContext.fetchUsers();
  };

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input type="text" name="text" value={text} placeholder="Search Users" onChange={onChange} />
        <input type="submit" className="btn btn-dark btn-block" value="Search" />
      </form>
      {githubContext.showClear && (
        <button type="button" className="btn btn-light btn-block" onClick={onClear}>
          Clear
        </button>
      )}
    </>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default Search;
