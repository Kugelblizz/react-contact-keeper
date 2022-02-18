import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/user/Search';
import Users from './components/user/Users';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/pages/About';
import User from './components/user/User';
import GithubState from './components/context/github/GithubState';
import AlertState from './components/context/alert/AlertState';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Routes>
                <Route
                  path="/"
                  exact
                  element={
                    <>
                      <Search />
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
      </AlertState>
    </GithubState>
  );
};

export default App;
