import { useEffect, useState } from 'react';
import './groupRole.scss'
import { readRoleService, roleByGroupService, assignNewRoleService } from '../../service/roleService';
import { toast } from 'react-toastify';
import { getAllGroupService } from '../../service/userService';
import _ from 'lodash'

const GroupRole = (props) => {
    const [roleList, setRoleList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [selectGroup, setSelectGroup] = useState(''); // store select group number for appear/hide
    const [tickRoleList, setTickRoleList] = useState([]); //store all role with a variable to tick checkbox

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
    const handleOnchangeSelectRole = async (id) => {
        setSelectGroup(id);
        let roleByGroup = await roleByGroupService(id);
        if (roleByGroup && roleByGroup.EC === 0) {
            let data = tickCheckboxforGroup(roleByGroup.DT.Roles, roleList);
            setTickRoleList(data);
        }
        else {
            toast.error(roleByGroup.EM);
        }
    }
    const tickCheckboxforGroup = (roleByGroup, roleList) => {
        let results = [];
        if (roleList && roleList.length > 0) {
            roleList.map(role => {
                let object = {};
                object.id = role.id;
                object.url = role.url;
                object.description = role.description;
                object.tick = false;
                if (roleByGroup && roleByGroup.length > 0) {
                    object.tick = roleByGroup.some(role => role.url === object.url);
                }
                results.push(object);
            })
        }
        return results;
    }
    // change tickbox role
    const handleChangeCheckbox = (value) => {
        let _tickRoleList = _.cloneDeep(tickRoleList);
        let foundIndex = _tickRoleList.findIndex(item => +item.id === +value)
        if (foundIndex != -1) {
            _tickRoleList[foundIndex].tick = !_tickRoleList[foundIndex].tick
            setTickRoleList(_tickRoleList);
        }
    }
    const assignRoleData = () => {
        // example data: {groupId: 4, roleId: 2}
        let result = {};
                result.groupId = +selectGroup;
        let filter = tickRoleList.filter(item => item.tick === true)
        let data = filter.map(item => {
            let assignData = {
                groupId : +selectGroup,
                roleId : item.id
            }
            return assignData;
        })
        result.groupRoles = data;
        return result;
    }
    const handleAssignNewRoleButton = async() => {
        let data = assignRoleData();
        let results = await assignNewRoleService(data);
        if (results && results.EC === 0) {
            toast.success(results.EM)
        }
        else {
            toast.error(results.EM)
        }
    }
    useEffect(() => {
        fetchGroup();
        getAllRole();
    }, [])
    return (
        <>
            <div className='group-role-container'>
                <div className='container mt-3'>
                    <h4>Group role</h4>
                    <div className="form-group col-sm-6 col-12">
                        <label>Select group (<span className='text-danger'>*</span>) :</label>
                        <select className="form-select"
                            onChange={(event) => handleOnchangeSelectRole(event.target.value)}
                        >
                            <option value="">Please select your group</option>
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
                            tickRoleList && tickRoleList.length > 0 &&
                            tickRoleList.map((item, index) => {
                                return (<>
                                    {selectGroup.length > 0 &&
                                        <div className="form-check" key={`keydiv-${index}`}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={item.id}
                                                id={`key-${index}`}
                                                key={`keyinput-${index}`}
                                                checked={item.tick}
                                                onChange={(event) => handleChangeCheckbox(event.target.value)} />
                                            <label className="form-check-label" htmlFor={`key-${index}`}>
                                                {item.url}
                                            </label>
                                        </div>}
                                </>)
                            })
                        }
                        {selectGroup.length > 0 && <button className='btn btn-primary mt-3' onClick={() => handleAssignNewRoleButton()}>Save</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export { GroupRole }