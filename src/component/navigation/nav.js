import React, { useContext } from "react";
import './nav.scss'
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// Navbars
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import reactLogo from '../../reactLogo.svg'
import { logoutService } from '../../service/userService'

import { UserContext } from "../../UserContext/userContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const Navbars = (props) => {
    let history = useHistory();
    const location = useLocation();
    const { user, logoutContext } = useContext(UserContext);

    const handleLogout = async () => {
        let logout = await logoutService(); // delete cookie to logout 
        localStorage.removeItem('jwt')  // delete jwt in localStorage
        logoutContext();    // clear user in context
        if (logout && +logout.EC === 0) {
            toast.success(logout.EM)
            history.push('/login');
        }
        else {
            toast.error(logout.EM);
        }
    }
    if (user && user.isAuthenticated === true || location.pathname !== '/login') {
        return (
            <>
                <Navbar expand="lg" className="navbar">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={reactLogo}
                                width="30"
                                height="30"
                                className="d-inline-block align-center"
                            />
                            <span className="brand-name">React</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/" exact className="nav-link">Home</NavLink>
                                <NavLink to="/user" className="nav-link">Users</NavLink>
                                <NavLink to="/role" className="nav-link">Role</NavLink>
                                <NavLink to="/group-role" className="nav-link">Group-Role</NavLink>
                                <NavLink to="/project" className="nav-link">Project</NavLink>
                            </Nav>
                            <Nav className="dropdown_menu">
                                {user && user.isAuthenticated === true ?
                                    <>
                                        <Nav.Item className="nav-link">{user.account.username}</Nav.Item>
                                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                                            <NavDropdown.Item>Change password</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                <span onClick={() => handleLogout()}>Log out</span>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </> :
                                    <Link className="nav-link" to="/login">Login</Link>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
    else {
        return <></>
    }
}

export default Navbars;