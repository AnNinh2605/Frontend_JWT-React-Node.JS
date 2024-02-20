import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllGroupService, createUserService, modifyUserService } from '../../service/userService'
import './user.scss'
import { useEffect, useState } from 'react';
import _ from 'lodash'
import { toast } from 'react-toastify';

const ModalUser = (props) => {
    const { action, dataModal } = props
    let defaultUserState = {
        email: '',
        username: '',
        phone: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const defaultValidInput = {
        email: true,
        username: true,
        phone: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    }
    const [userState, setUserState] = useState(defaultUserState);  // user information
    const [validInput, setValidInput] = useState(defaultValidInput);
    const [groupList, setGroupList] = useState([]);

    const handleOnchangeInput = (value, type) => {
        let _userData = _.cloneDeep(userState);
        _userData[type] = value;
        setUserState(_userData);
    }

    const fetchGroup = async () => {
        let groupData = await getAllGroupService();
        if (groupData && groupData.EC === 0) {
            setGroupList(groupData.DT)
            if (groupData.DT && groupData.DT.length > 0) {
                let group = groupData.DT;
                setUserState({ ...defaultUserState, group: group[0].id }) //assign default value for group
            }
        }
        else {
            setGroupList([])
        }
    }

    const validateInput = () => {
        if (action === "MODIFY") return true;
        else {
            setValidInput(defaultValidInput);
            let arrCheck = ["email", "username", "phone", "password", "address"]
            for (let i = 0; i < arrCheck.length; i++) {
                if (!userState[arrCheck[i]]) {
                    let _validInput = _.cloneDeep(defaultValidInput);
                    _validInput[arrCheck[i]] = false;
                    setValidInput(_validInput)
                    toast.error(`Missing ${arrCheck[i]}`)
                    return false;
                }
            }
            let re = /\S+@\S+\.\S+/;
            let email = userState["email"];
            if (!re.test(email)) {
                toast.error("Email is not valid")
                return false;
            }
            let password = userState["password"];
            if (password.length < 8) {
                toast.error("Password must at least 8 letters")
                return false;
            }
            return true;
        }
    }
    const handleCreateUserButton = async () => {
        let check = validateInput();
        if (check) {
            let serverData = action === "CREATE" ?
                await createUserService({ ...userState, groupId: userState['group'] }) :
                await modifyUserService(userState);
            if (serverData && serverData.EC === 0) {
                toast.success(serverData.EM)
                props.handleClose();
                setUserState({ ...defaultUserState, group: groupList[0].id })
            }
            if (serverData && serverData.EC !== 0) {
                toast.error(serverData.EM)
                let _validInput = _.cloneDeep(defaultValidInput);
                _validInput[serverData.DT] = false;
                setValidInput(_validInput)
            }
        }
    }
    const closeModal = () => {
        props.handleClose();
        setValidInput(defaultValidInput);
    }
    useEffect(() => {
        fetchGroup()
    }, [])
    useEffect(() => {
        if (action === 'MODIFY') {
            setUserState({ ...dataModal, group: dataModal.Group ? dataModal.Group.id : '' })
        }
    }, [dataModal])
    return (
        <>
            <Modal size="lg" show={props.show} onHide={closeModal} className='modalUser'>
                <Modal.Header closeButton>
                    <Modal.Title><span>{props.action === 'CREATE' ? 'Create new user' : 'Modify user'}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="create-container row ">
                        <div className="form-group col-sm-6 col-12">
                            <label>Email address (<span className='text-danger'>*</span>) :</label>
                            <input type="text"
                                disabled={props.action === 'MODIFY' ? true : false}
                                className={validInput.email ? "form-control" : "form-control is-invalid"}
                                placeholder="Email address"
                                value={userState.email}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "email") }}
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Phone number (<span className='text-danger'>*</span>) :</label>
                            <input type="text"
                                disabled={props.action === 'MODIFY' ? true : false}
                                className={validInput.phone ? "form-control" : "form-control is-invalid"}
                                placeholder="Your phone number"
                                value={userState.phone}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "phone") }}
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
                            {action === "CREATE" &&
                                <>
                                    <label>Password (<span className='text-danger'>*</span>) :</label>
                                    <input type="password"
                                        className={validInput.password ? "form-control" : "form-control is-invalid"}
                                        placeholder="Password"
                                        value={userState.password}
                                        onChange={(event) => { handleOnchangeInput(event.target.value, "password") }}
                                    ></input>
                                </>
                            }
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
                                onChange={(event) => { handleOnchangeInput(event.target.value, "sex") }}
                                value={userState.sex}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Group (<span className='text-danger'>*</span>) :</label>
                            <select className="form-select" id="inputGroupSelect01"
                                onChange={(event) => { handleOnchangeInput(event.target.value, "group") }}
                                value={userState.group}
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
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateUserButton()} >
                        {props.action === 'CREATE' ? 'Create' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser