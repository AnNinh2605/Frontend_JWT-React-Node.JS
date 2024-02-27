import axios from "../axios/axios"
const createRoleService = (roles) => {
    return axios.post("/role/create", [...roles])
}
const readRoleService = () => {
    return axios.get("/role/read")
}
const deleteRoleService = (role) => {
    return axios.delete("/role/delete", {data: {id: role.id}})
}
const roleByGroupService = (groupId) => {
    return axios.get(`/role/by-group/${groupId}`);
}
const assignNewRoleService = (data) => {
    return axios.post('/role/assign-by-group', { data });
}
export { createRoleService, readRoleService, deleteRoleService, roleByGroupService, assignNewRoleService }