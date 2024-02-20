import "./register.scss"
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { createNewUserService } from '../../service/userService'

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const setDefaultInputValue = {
        checkInputEmail: true,
        checkInputUsername: true,
        checkInputPassword: true,
        checkInputConfirmPassword: true,
        checkInputPhone: true
    }
    const [checkInputValid, setInputValid] = useState(setDefaultInputValue);

    let history = useHistory();
    const handleHaveAccountButton = () => {
        history.push("/login");
    }

    const handleRegisterButton = async () => {
        let check = isValidateInfor();
        if (check) {
            let response = await createNewUserService(email, username, password, phone);
            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push("/login");
            }
            else {
                toast.error(serverData.EM);
            }
        }
    }

    const isValidateInfor = () => {
        setInputValid(setDefaultInputValue);
        if (!email) {
            setInputValid({ ...setDefaultInputValue, checkInputEmail: false })
            toast.error("Missing email address");
            return false;
        }
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setInputValid({ ...setDefaultInputValue, checkInputEmail: false })
            toast.error("Email is not valid")
            return false;
        }
        if (!username) {
            toast.error("Missing username");
            setInputValid({ ...setDefaultInputValue, checkInputUsername: false })
            return false;
        }
        if (!password) {
            toast.error("Missing password");
            setInputValid({ ...setDefaultInputValue, checkInputPassword: false })
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password is not match");
            setInputValid({ ...setDefaultInputValue, checkInputConfirmPassword: false })
            return false;
        }
        if (!phone) {
            toast.error("Missing phone number");
            setInputValid({ ...setDefaultInputValue, checkInputPhone: false })
            return false;
        }
        return true;
    }

    const handleEnterRegister = (event) => {
        if (event.code === 'Enter' && event.charCode === 13) {
            handleRegisterButton();
        }
    }
    useEffect(() => {
        // axios.get("http://localhost:8001/api/v1/getApi").then(data => {
        //     console.log("Check data", data)
        // })
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
                            <input type="text"
                                className={checkInputValid.checkInputEmail ? "form-control" : "form-control is-invalid"}
                                placeholder="Email address"
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input type="text"
                                className={checkInputValid.checkInputPhone ? "form-control" : "form-control is-invalid"}
                                placeholder="Your phone number"
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                                onKeyPress={(event) => handleEnterRegister(event)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text"
                                className={checkInputValid.checkInputUsername ? "form-control" : "form-control is-invalid"}
                                placeholder="Username"
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password"
                                className={checkInputValid.checkInputPassword ? "form-control" : "form-control is-invalid"}
                                placeholder="Password"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Re-enter password:</label>
                            <input type="password"
                                className={checkInputValid.checkInputConfirmPassword ? "form-control" : "form-control is-invalid"}
                                placeholder="Re-enter password"
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            ></input>
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={() => handleRegisterButton()}>Register</button>
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