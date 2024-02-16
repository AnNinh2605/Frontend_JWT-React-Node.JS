import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import _ from 'lodash'

import Nav from './component/navigation/nav';
import AppRoute from './component/route/appRoute'

function App() {
  const [account, setAccount] = useState('');
    useEffect(() => {
      let session = sessionStorage.getItem("account");
      if (session) {
        setAccount(JSON.parse(session))
      }
    }, [])
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;


