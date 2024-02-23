import { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../UserContext/userContext";

const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    }
    else {
        return <Redirect to='/login'></Redirect>
    }

}
export default PrivateRoute