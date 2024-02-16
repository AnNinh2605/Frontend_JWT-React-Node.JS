import React, { useEffect, useState } from "react";
import './nav.scss'
import { NavLink, useLocation } from "react-router-dom";

const Nav = (props) => {
    const [isShow, setIsShow] = useState(false);
    let location = useLocation();
    useEffect(() => {
        if (location.pathname !== "/login"){
            setIsShow(true);
        }
    }, [])
    return (
        <>
            {isShow === true &&
                <div className="topnav">
                    <NavLink to="/" exact >Home</NavLink>
                    <NavLink to="/user">Users</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>
    );
}

export default Nav;