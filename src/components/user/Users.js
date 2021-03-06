import UserItem from './UserItem';
import Spinner from './Spinner';
import GithubContext from '../context/github/githubContext';
import { useContext, useEffect } from 'react';
const Users = () => {
  const { loading, users, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

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

export default Users;
