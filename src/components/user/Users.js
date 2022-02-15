import UserItem from './UserItem';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
const Users = ({ users, loading }) => {
  return (
    <>
      {loading && <Spinner />}
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user}></UserItem>
        ))}
      </div>
    </>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr',
  gripGap: '1rem',
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users;
