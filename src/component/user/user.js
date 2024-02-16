
import "./user.scss"
import { getAllUserService } from '../../service/userService'
import { useEffect, useState } from "react";
const User = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        serverData()
    }, [])
    let serverData = async () => {
        let serverData = await getAllUserService();
        if (serverData && serverData.data && +serverData.data.EC === 0) {
            setUserList(serverData.data.DT);
        }
        else {
            setUserList([]);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="user-table mt-2">
                    <div>
                        <h3>User list</h3>
                        <button className="btn btn-primary">Refresh</button>
                        <button className="btn btn-success">Add new user</button>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList && userList.length > 0 ?
                                <>
                                    {userList.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name: ''}</td>
                                            </tr>)
                                    })}
                                </>
                                :
                                <>
                                    <span>Not found user</span>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User

