import { Switch, Route } from "react-router-dom";
import Login from '../login/login';
import Register from '../register/register';
import User from '../user/user';
import PrivateRoute from "./privateRoute";
import Role from "../Role/role";

const AppRoute = (props) => {
    return (
        <>
            <Switch>
                <PrivateRoute path="/user" component={User} />
                <PrivateRoute path="/role" component={Role} />
                <Route path="/project">
                    project
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
        </>
    )
}

export default AppRoute