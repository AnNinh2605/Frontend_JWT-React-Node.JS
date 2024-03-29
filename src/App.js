import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import Navbars from './component/navigation/nav';
import AppRoute from './component/route/appRoute'
// react loader spider
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Circles } from 'react-loader-spinner'
// userContext
import { UserContext } from "./UserContext/userContext";

import { Scrollbars } from 'react-custom-scrollbars';

function App() {
  const { user } = useContext(UserContext);
  const [scrollHeight, setscrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setscrollHeight(windowHeight);
  }, [user])
  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
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
              <Navbars />
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
    </Scrollbars>
  );
}

export default App;


