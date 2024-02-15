import axios from "axios"
const createNewUserService = (email, username, password, phone) => {
    return axios.post("http://localhost:8001/api/v1/register", { email, username, password, phone })
}

const loginService = (value, password) => {
    return axios.post("http://localhost:8001/api/v1/login", { value, password })
}
export { createNewUserService, loginService }