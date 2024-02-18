import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllGroupService } from '../../service/userService'
import './user.scss'
import { useEffect, useState } from 'react';
import _ from 'lodash'
import { toast } from 'react-toastify';

const ModalUser = (props) => {

    let defaultUserState = {
        email: '',
        username: '',
        phonenumber: '',
        password: '',
        address: '',
        gender: '',
        group: ''
    }
    const defaultValidInput = {
        email: true,
        username: true,
        phonenumber: true,
        password: true,
        address: true,
    }
    const [userState, setUserState] = useState(defaultUserState);
    const [validInput, setValidInput] = useState(defaultValidInput);
    const [groupList, setGroupList] = useState([]);

    const handleOnchangeInput = (value, type) => {
        let _userData = _.cloneDeep(userState);
        _userData[type] = value;
        setUserState(_userData);
    }

    const fetchGroup = async () => {
        let groupData = await getAllGroupService();
        if (groupData && groupData.data.EC === 0) {
            setGroupList(groupData.data.DT)
        }
        else {
            setGroupList([])
        }
    }

    const validateInput = () => {
        setValidInput(defaultValidInput);
        let arrCheck = ["email", "username", "phonenumber", "password", "address"]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!userState[arrCheck[i]]) {
                let _validInput = _.cloneDeep(defaultValidInput);
                _validInput[arrCheck[i]] = false;
                setValidInput(_validInput)
                toast.error(`Missing ${arrCheck[i]}`)
                return false;
            }
        }
        return true;
    }
    const handleCreateUserButton = () => {
        validateInput();
        // if (check) {

        // }
    }
    useEffect(() => {
        fetchGroup()
    }, [])
    return (
        <>
            <Modal size="lg" show={true} onHide={props.handleClose} className='modalUser'>
                <Modal.Header closeButton>
                    <Modal.Title><span>{props.title}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="create-container row ">
                        <div className="form-group col-sm-6 col-12">
                            <label>Email address (<span className='text-danger'>*</span>) :</label>
                            <input type="text"
                                className={validInput.email ? "form-control" : "form-control is-invalid"}
                                placeholder="Email address"
                                value={userState.email}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "email") }}
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Phone number (<span className='text-danger'>*</span>) :</label>
                            <input type="text"
                                className={validInput.phonenumber ? "form-control" : "form-control is-invalid"}
                                placeholder="Your phone number"
                                value={userState.phonenumber}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "phonenumber") }}
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Username (<span className='text-danger'>*</span>) :</label>
                            <input type="text"
                                className={validInput.username ? "form-control" : "form-control is-invalid"}
                                placeholder="Username"
                                value={userState.username}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "username") }}
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Password (<span className='text-danger'>*</span>) :</label>
                            <input type="password"
                                className={validInput.password ? "form-control" : "form-control is-invalid"}
                                placeholder="Password"
                                value={userState.password}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "password") }}
                            ></input>
                        </div>
                        <div className="form-group col-12">
                            <label>Address:</label>
                            <input type="text"
                                className={validInput.address ? "form-control" : "form-control is-invalid"}
                                placeholder="Your address"
                                value={userState.address}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "address") }}
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Gender (<span className='text-danger'>*</span>) :</label>
                            <select className="form-select" id="inputGroupSelect01"
                                onChange={(event) => { handleOnchangeInput(event.target.value, "gender") }}
                            >
                                <option value={'Choose...'}>Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Group (<span className='text-danger'>*</span>) :</label>
                            <select className="form-select" id="inputGroupSelect01"
                                onChange={(event) => { handleOnchangeInput(event.target.value, "group") }}
                            >
                                {groupList.length > 0 &&
                                    groupList.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateUserButton()} >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser