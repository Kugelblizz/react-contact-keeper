import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showClear, setAlert, onSearchSubmit, onSearchClear }) => {
  const [text, setText] = useState('');

  const onChange = (evt) => {
    setText(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const ret = text.replaceAll(' ', ''); //simple cleanup
    if (ret) {
      onSearchSubmit(ret);
    } else {
        setAlert('Please Enter a valid search string', 'light');
    }
  };

  const onClear = (evt) => {
    setText('');
    onSearchClear();
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

Search.propTypes = {
  showClear: PropTypes.bool.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
