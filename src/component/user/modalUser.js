import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllGroupService } from '../../service/userService'
import './user.scss'
import { useEffect, useState } from 'react';

const ModalUser = (props) => {
    const [groupList, setGroupList] = useState([]);

    const fetchGroup = async () => {
        let groupData = await getAllGroupService();
        if (groupData && groupData.data.EC === 0) {
            setGroupList(groupData.data.DT)
        }
        else {
            setGroupList([])
        }
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
                                className="form-control"
                                placeholder="Email address"
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Phone number (<span className='text-danger'>*</span>) :</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Your phone number"
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Username (<span className='text-danger'>*</span>) :</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Username"
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Password (<span className='text-danger'>*</span>) :</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Password"
                            ></input>
                        </div>
                        <div className="form-group col-12">
                            <label>Address:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Your address"
                            ></input>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Gender (<span className='text-danger'>*</span>) :</label>
                            <select className="form-select" id="inputGroupSelect01">
                                <option value={'Choose...'}>Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-6 col-12">
                            <label>Group (<span className='text-danger'>*</span>) :</label>
                            <select className="form-select" id="inputGroupSelect01">
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
                    <Button variant="primary" onClick={props.confirmDelete} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser