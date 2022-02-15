import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/user/Search';
import Users from './components/user/Users';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/pages/About';
import User from './components/user/User';

const API_URI = `https://api.github.com`;
const ID_PARAMS = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
const REPO_SORT_PARAMS = 'per_page=5&sort=created';


const App = () => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setShowClear(false);
    setUsers([]);
    const res = await axios.get(`${API_URI}/users?${ID_PARAMS}`);
    setUsers(res.data);
    setLoading(false);
  };

  const searchUsers = async (queryText) => {
    setLoading(true);
    setShowClear(true);
    setUsers([]);
    const res = await axios.get(`${API_URI}/search/users?q=${queryText}&${ID_PARAMS}`);
    setUsers(res?.data?.items || []);
    setLoading(false);
  };


  const fetchUserAndRepos = async (userId) => {
    setLoading(true);
    const res = await Promise.all([
      axios.get(`${API_URI}/users/${userId}?${ID_PARAMS}`),
      axios.get(`${API_URI}/users/${userId}/repos?${REPO_SORT_PARAMS}${ID_PARAMS}`),
    ]);

    setUser(res?.[0]?.data);
    setRepos(res?.[1]?.data);

    setLoading(false);
  };

  const [loading, setLoading] = useState(true);
  const [showClear, setShowClear] = useState(false);
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState(null);

  const doSetAlert = (text, type) => {
    setAlert({ text, type });
    setTimeout(() => {
      setAlert(null);
    }, 8000);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} onClose={closeAlert} />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Search
                    setAlert={doSetAlert}
                    showClear={showClear}
                    onSearchSubmit={searchUsers}
                    onSearchClear={fetchUsers}
                  />
                  <Users users={users} loading={loading} />
                </>
              }
            />
            <Route path="/about" exact element={<About />} />
            <Route
              path="/user/:userId"
              exact
              element={<User fetchUserAndRepos={fetchUserAndRepos} user={user} repos={repos} loading={loading} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
