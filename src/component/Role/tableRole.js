import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { readRoleService, deleteRoleService } from "../../service/roleService";
import { toast } from "react-toastify";
import 'font-awesome/css/font-awesome.min.css';

const TableRole = forwardRef((props, ref) => {
    const [roleList, setRoleList] = useState([]);

    // for call child fuction from parent
    useImperativeHandle(ref, () => ({

        getAllRole() {
            getAllRole()
        }

    }));
    const handleEditButton = () => {
    }
    const handleDeleteButton = async (role) => {
        let results = await deleteRoleService(role);
        if (results && results.EC === 0) {
            toast.success(results.EM);
            await getAllRole();
        }
        else {
            toast.error(results.EM);
        }
    }
    const getAllRole = async () => {
        let results = await readRoleService();
        if (results && results.EC === 0) {
            setRoleList(results.DT);
        }
        else {
            toast.error(results.EM);
        }
    }
    useEffect(() => {
        getAllRole();
    }, [])
    return (<>
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">URL</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {roleList && roleList.length > 0 ?
                    <>
                        {roleList.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td className="d-flex gap-2">
                                        <span title="Edit" className="edit"
                                            onClick={() => handleEditButton(item)}
                                        >
                                            <i className="fa fa-pencil text-warning"></i></span>
                                        <span title="Delete" className="delete mx-1"
                                            onClick={() => handleDeleteButton(item)}>
                                            <i className="fa fa-trash text-danger"></i>
                                        </span>
                                    </td>
                                </tr>)
                        })}
                    </>
                    :
                    <>
                        <tr><td colSpan={4}>Not found role</td></tr>
                    </>
                }
            </tbody>
        </table>
    </>)
})

export { TableRole }