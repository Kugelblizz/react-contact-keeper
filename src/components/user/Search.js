import React, { useContext, useState } from 'react';
import GithubContext from '../context/github/githubContext';
import AlertContext from '../context/alert/alertContext';

const Search = () => {
  const { searchUsers, fetchUsers, showClear } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const [text, setText] = useState('');

  const onChange = (evt) => {
    setText(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const ret = text.replaceAll(' ', ''); //simple cleanup
    if (ret) {
      searchUsers(ret);
    } else {
      setAlert('Please Enter a valid search string', 'light');
    }
  };

  const onClear = () => {
    setText('');
    fetchUsers();
  };

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input type="text" name="text" value={text} placeholder="Search Users" onChange={onChange} />
        <input type="submit" className="btn btn-dark btn-block" value="Search" />
      </form>
      {showClear && (
        <button type="button" className="btn btn-light btn-block" onClick={onClear}>
          Clear
        </button>
      )}
    </>
  );
};

export default Search;
