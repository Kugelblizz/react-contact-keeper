import { useState } from 'react';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/user/Search';
import Users from './components/user/Users';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/pages/About';
import User from './components/user/User';
import GithubState from './components/context/github/GithubState';

const App = () => {
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
    <GithubState>
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
                    <Search setAlert={doSetAlert} />
                    <Users />
                  </>
                }
              />
              <Route path="/about" exact element={<About />} />
              <Route path="/user/:userId" exact element={<User />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
