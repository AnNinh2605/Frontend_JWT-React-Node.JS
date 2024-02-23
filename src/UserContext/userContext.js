import React, { useEffect, useState } from "react";
import { getUserAccountService } from '../service/userService'

const UserContext = React.createContext({});
// This also works: const UserContext = createContext();

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const defaultUserData = {
        isAuthenticated: false,
        token: "",
        account: {},
        isLoading: true
    }
    const [user, setUser] = useState(defaultUserData);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };
    // get user account infor
    const fetchUser = async () => {
        let responseData = await getUserAccountService();
        if (responseData && responseData.EC === 0) {
            let email = responseData.DT.email;
            let username = responseData.DT.username;
            let groupRole = responseData.DT.groupRole;
            let token = responseData.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                account: { email, username, groupRole },
                isLoading: false
            }
            setUser(data);
        }
        else {
            setUser({ ...defaultUserData, isLoading: false });
        }
    }
    useEffect(() => {
        if (window.location.href !== '/' || window.location.href !== '/login') {
            fetchUser();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider }