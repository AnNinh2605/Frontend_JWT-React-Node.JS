import { useEffect, useState } from 'react';
import './groupRole.scss'
import { readRoleService, roleByGroupService } from '../../service/roleService';
import { toast } from 'react-toastify';
import { getAllGroupService } from '../../service/userService';

const GroupRole = (props) => {
    const [roleList, setRoleList] = useState([]);
    const [groupList, setGroupList] = useState([]);

    const getAllRole = async () => {
        let results = await readRoleService();
        if (results && results.EC === 0) {
            setRoleList(results.DT);
        }
        else {
            toast.error(results.EM);
        }
    }
    const fetchGroup = async () => {
        let groupData = await getAllGroupService();
        if (groupData && groupData.EC === 0) {
            setGroupList(groupData.DT)
        }
        else {
            setGroupList([])
        }
    }
    const fetchRoleByGroup = async () => {
        let roleByGroup = await roleByGroupService(4);
        if (roleByGroup && roleByGroup.EC === 0) {
            console.log("Check role by group", roleByGroup);
        }
        else {

        }
    }
    useEffect(() => {
        fetchGroup();
        getAllRole();
        fetchRoleByGroup();
    }, [])
    return (
        <>
            <div className='group-role-container'>
                <div className='container mt-3'>
                    <h4>Group role</h4>
                    <div className="form-group col-sm-6 col-12">
                        <label>Select group (<span className='text-danger'>*</span>) :</label>
                        <select className="form-select">
                            <option >Please select your group</option>
                            {groupList.length > 0 &&
                                groupList.map((item, index) => {
                                    return (
                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                    )
                                })}
                        </select>
                    </div>
                    <hr />
                    <div className='Assign-role'>
                        <h4>Assign role</h4>
                        {
                            roleList && roleList.length > 0 &&
                            roleList.map((item, index) => {
                                return (<>
                                    <div class="form-check" key={`key-${index}`}>
                                        <input className="form-check-input" type="checkbox" value="" id={`key-${index}`} />
                                        <label className="form-check-label" htmlFor={`key-${index}`}>
                                            {item.url}
                                        </label>
                                    </div>
                                </>)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export { GroupRole }