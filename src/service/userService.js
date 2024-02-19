import axios from "axios"
const createNewUserService = (email, username, password, phone) => {
    return axios.post("http://localhost:8001/api/v1/register", { email, username, password, phone })
}

const loginService = (value, password) => {
    return axios.post("http://localhost:8001/api/v1/login", { value, password })
}

const getAllUserService = (page, limit) => {
    return axios.get(`http://localhost:8001/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteUserService = (id) => {
    return axios.delete(`http://localhost:8001/api/v1/user/delete/${id}`)
}

const createUserService = (userData) => {
    return axios.post("http://localhost:8001/api/v1/user/create", { ...userData })
}

const getAllGroupService = () => {
    return axios.get(`http://localhost:8001/api/v1/group/read`)
}

export { 
    createNewUserService, 
    loginService, 
    getAllUserService, 
    deleteUserService, 
    getAllGroupService, 
    createUserService 
}