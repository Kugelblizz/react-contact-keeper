import UserItem from './UserItem';
import Spinner from './Spinner';
import GithubContext from '../context/github/githubContext';
import { useContext, useEffect } from 'react';
const Users = () => {
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    githubContext.fetchUsers();
  }, []);

  return (
    <>
      {githubContext.loading && <Spinner />}
      <div style={userStyle}>
        {githubContext.users.map((user) => (
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
