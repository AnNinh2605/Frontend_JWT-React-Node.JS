import './App.scss';
import Nav from './component/navigation/nav';
import Login from './component/login/login';
import Register from './component/register/register';
import User from './component/user/user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import _ from 'lodash'

function App() {
  const [account, setAccount] = useState('');
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])
  return (
    <Router>
      <div className='app-container'>
        {
          account && !_.isEmpty(account) && account.isAuthenticated && <Nav />
        }
        <Switch>
          <Route path="/news">
            new
          </Route>
          <Route path="/contact">
            contact
          </Route>
          <Route path="/about">
            about
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/" exact>
            Home
          </Route >
          <Route path="*">
            404 not found
          </Route >
        </Switch>
      </div >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </Router>
  );
}

export default App;


