import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import _ from 'lodash'
import React, { useContext } from "react";
import Nav from './component/navigation/nav';
import AppRoute from './component/route/appRoute'
// react loader spider
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Circles } from 'react-loader-spinner'
// userContext
import { UserContext } from "./UserContext/userContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading'>
            <Circles
              height="60"
              width="60"
              color="#1877f2"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true} />
            <div>Loading...</div>
          </div> : <>
            <div className='app-header'>
              <Nav />
            </div>
            <div className='app-container'>
              <AppRoute />
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
          </>
        }
      </Router>
    </>
  );
}

export default App;


