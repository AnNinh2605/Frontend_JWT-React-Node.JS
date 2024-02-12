import "./login.scss"
import { useHistory } from "react-router-dom";
const Login = (props) => {
    let history = useHistory();
    const handleLoginButton = () => {
        history.push("/register");
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
                        <input type="text" className="form-control" placeholder="Email address or your phone number"></input>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <button className="btn btn-primary">Login</button>
                        <span className="text-center"><a href="#" className="forgot-password">Forgot your password?</a></span>
                        <hr  className="my-1" />
                        <div className="text-center">
                            <button className="btn btn-success"  onClick={() => handleLoginButton()}>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login