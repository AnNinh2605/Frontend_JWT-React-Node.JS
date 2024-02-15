import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "./user.scss"
const User = () => {
    let history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            history.push("/login")
        }
    }, [])
    return (
        <div>

        </div>
    );
};

export default User

