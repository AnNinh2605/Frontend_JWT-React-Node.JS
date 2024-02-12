import "./register.scss"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const Register = (props) => {
    let history = useHistory();
    const handleHaveAccountButton = () => {
        history.push("/login");
    }
    useEffect(() => {
        axios.get("http://localhost:8001/getApi").then(data => {
            console.log("Check data", data)
        })
    }, [])
    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-sm-7 d-sm-block d-none">
                        <div className="brand">
                            user management
                        </div>
                        <div className="detail">
                            Register: Management and user authorization
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-block d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            user management
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className="form-control" placeholder="Email address"></input>
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Username"></input>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Password"></input>
                        </div>
                        <div className="form-group">
                            <label>Re-enter password:</label>
                            <input type="password" className="form-control" placeholder="Re-enter password"></input>
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input type="text" className="form-control" placeholder="Your phone number"></input>
                        </div>
                        <button className="btn btn-primary">Register:</button>
                        <hr className="my-1" />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleHaveAccountButton()}>Already've an account. Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register