import './App.scss';
// import Nav from './component/navigation/nav';
import Login from './component/login/login';
import Register from './component/register/register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='app-container'>
        {/* <Nav /> */}
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
          <Route path="/" exact>
            Home
          </Route >
          <Route path="*">
            404 not found
          </Route >
        </Switch>
      </div >
    </Router>
  );
}

export default App;


