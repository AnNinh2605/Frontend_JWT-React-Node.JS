// import axios from "axios"
import axios from "../axios/axios"

const createNewUserService = (email, username, password, phone) => {
    return axios.post("/register", { email, username, password, phone })
}

const loginService = (value, password) => {
    return axios.post("/login", { value, password })
}

const getAllUserService = (page, limit) => {
    return axios.get(`/user/read?page=${page}&limit=${limit}`)
}

const deleteUserService = (id) => {
    return axios.delete(`/user/delete/${id}`)
}

const createUserService = (userData) => {
    return axios.post("/user/create", { ...userData })
}
//get user account
const getUserAccountService = () => {
    return axios.get("/account")
}

const modifyUserService = (userData) => {
    return axios.put("/user/edit", { ...userData })
}
const getAllGroupService = () => {
    return axios.get('/group/read')
}


export {
    createNewUserService,
    loginService,
    getAllUserService,
    deleteUserService,
    getAllGroupService,
    createUserService,
    modifyUserService,
    getUserAccountService
}