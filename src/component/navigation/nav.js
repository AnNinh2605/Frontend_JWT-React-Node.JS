import React, { useContext } from "react";
import './nav.scss'
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext/userContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Nav = (props) => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    if (user && user.isAuthenticated === true || location.pathname !== '/login') {
        return (
            <>
                <div className="topnav">
                    <NavLink to="/" exact >Home</NavLink>
                    <NavLink to="/user">Users</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </>
        );
    }
    else {
        return <></>
    }
}

export default Nav;