import "./login.scss"
import { useHistory } from "react-router-dom";
import { useState } from 'react'
import { toast } from 'react-toastify';
import { loginService } from '../../service/userService'

const Login = (props) => {
    let history = useHistory();
    const handleRegisterButton = () => {
        history.push("/register");
    }

    const [value, setInput] = useState("");
    const [password, setPassword] = useState("");
    const defaultState = {
        isValue: true,
        isPassword: true
    }
    const [checkInputValid, setInputValid] = useState(defaultState);

    const validateInput = () => {
        setInputValid(defaultState);
        if (!value) {
            toast.error("Email or phone is empty");
            setInputValid({ ...defaultState, isValue: false });
            return false;
        }
        if (!password) {
            toast.error("Password is empty");
            setInputValid({ ...defaultState, isPassword: false });
            return false;
        }
        return true;
    }

    const handleLoginButton = async () => {
        let check = validateInput();
        if (check) {
            let responseData = await loginService(value, password);
            let serverData = responseData;
            if (serverData && +serverData.EC === 0) {
                let data = {
                    isAuthenticated: true,
                    token: 'fake token'
                }
                sessionStorage.setItem("account", JSON.stringify(data));
                toast.success(serverData.EM);
                history.push("/user");
                window.location.reload();
            }
            else {
                toast.error(serverData.EM);
            }
        }
    }
    const handleEnterPress = (event) => {
        if (event.code = "Enter" && event.charCode===13){
            handleLoginButton();
        };
    }
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-sm-7 d-sm-block d-none">
                        <div className="brand">
                            user management
                        </div>
                        <div className="detail">
                            Login: Management and user authorization
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-block d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            user management
                        </div>
                        <input type="text"
                            className={checkInputValid.isValue ? "form-control" : "form-control is-invalid"}
                            placeholder="Email address or your phone number"
                            value={value} onChange={(event) => setInput(event.target.value)}
                        ></input>
                        <input type="password"
                            className={checkInputValid.isPassword ? "form-control" : "form-control is-invalid"}
                            placeholder="Password"
                            value={password} onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handleEnterPress(event)}
                        ></input>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={() => handleLoginButton()}
                        >Login</button>
                        <span className="text-center"><a href="#" className="forgot-password">Forgot your password?</a></span>
                        <hr className="my-1" />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleRegisterButton()}>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login