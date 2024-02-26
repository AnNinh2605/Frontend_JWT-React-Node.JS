import { useEffect, useState, useRef } from 'react';
import './role.scss'
import 'font-awesome/css/font-awesome.min.css';
import _ from 'lodash'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { createRoleService } from '../../service/roleService'
import { TableRole } from './tableRole';

const Role = (props) => {
    const childRef = useRef();
    const defautValidInput = { url: '', description: '', isValidInput: true };

    const [listChild, setListChild] = useState({
        child: defautValidInput
    })
    const handleOnchangeInput = (name, value, key) => {
        //name is fill to update
        //value is value to update
        //key is where input to update
        let _listChild = _.cloneDeep(listChild);
        _listChild[key][name] = value;
        if (value && name === 'url') {
            _listChild[key]['isValidInput'] = true;
        }
        setListChild(_listChild);
    }
    const handleAddnewInput = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child-${uuidv4()}`] = defautValidInput
        setListChild(_listChild);
    }
    const handleDeleteInput = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key];
        setListChild(_listChild);
    }
    // transform data to array and sent to database
    const dataRolePersist = () => {
        let data = [];
        Object.entries(listChild).forEach(([key, value]) => {
            data.push({
                url: value.url,
                description: value.description
            });
        });
        return data;
    }
    const handleSaveInput = async () => {
        let isEmpty = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url
        })
        if (!isEmpty) {
            // call api
            let data = dataRolePersist();
            let results = await createRoleService(data);
            if (results && results.EC === 0) {
                toast.success(results.EM);
                childRef.current.getAllRole()
            }
            else {
                toast.error(results.EM)
            }
        }
        else {
            let _listChild = _.cloneDeep(listChild);
            let key = isEmpty[0];
            _listChild[key]['isValidInput'] = false;
            setListChild(_listChild);
            toast.error("Missing input URL");
        }
    }
    useEffect(() => {
        Object.entries(listChild).map(([key, value]) => {
        });
    }, [])
    return (
        <div className='role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <div className='title-role'><h4>Add new role</h4></div>
                    {
                        Object.entries(listChild).map(([key, child], index) => (
                            <div className='row role-parent' key={`child-${key}`}>
                                <div className='col-5 form-group'>
                                    <label>URL:</label>
                                    <input type='text' className={child.isValidInput ? 'form-control' : 'form-control is-invalid'} value={child.url}
                                        onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                    ></input>
                                </div>
                                <div className='col-5 form-group'>
                                    <label>Description</label>
                                    <input type='text' className='form-control' value={child.description}
                                        onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                    ></input>
                                </div>
                                <div className='col-2 mt-4 actions'>
                                    <i className="fa fa-plus-circle text-success"
                                        onClick={() => handleAddnewInput()}></i>
                                    {index >= 1 && <i className="fa fa-trash text-danger"
                                        onClick={() => handleDeleteInput(key)}
                                    ></i>}
                                </div>
                            </div>
                        ))
                    }
                    <button className='btn btn-primary mt-2' onClick={() => handleSaveInput()}>Save</button>
                </div>
                <hr />
                <div className='table-role'>
                    <h4>List roles</h4>
                    <TableRole ref={childRef}/>
                </div>
            </div>
        </div>
    )
}
export default Role