import PropTypes from 'prop-types';

import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <div className="card text-center">
      <img src={avatar_url} alt={login} className="round-img" style={{ width: '60px' }} />
      <h3>{login}</h3>
      <div>
         <Link to={`/user/${login}`} className="a btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
