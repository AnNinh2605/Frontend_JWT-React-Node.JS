
import "./user.scss"
import { getAllUserService, deleteUserService } from '../../service/userService'
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import ModalDetele from "./modalDelete";
import ModalUser from "./modalUser";
import { toast } from 'react-toastify';

const User = () => {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPage, setTotalPage] = useState(0);

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    let serverData = async () => {
        let serverData = await getAllUserService(currentPage, currentLimit);
        if (serverData && serverData.data && +serverData.data.EC === 0) {
            setUserList(serverData.data.DT.users);
            setTotalPage(serverData.data.DT.totalPages);
        }
        else {
            setUserList([]);
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
    }
    const handleDeleteButton = (user) => {
        setShowModalDelete(true);
        setDataModal(user);
    }
    const handleClose = () => {
        setShowModalDelete(false);
        setDataModal({});
    }
    const confirmDelete = async () => {
        let results = await deleteUserService(dataModal.id);
        if (results && results.data.EC === 0) {
            toast.success(results.data.EM)
            await serverData()
            setShowModalDelete(false);
        }
        else {
            toast.error(results.data.EM)
        }
    }

    useEffect(() => {
        serverData()
    }, [currentPage])

    return (
        <>
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
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList && userList.length > 0 ?
                                    <>
                                        {userList.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td className="d-flex gap-2">
                                                        <button className="btn btn-warning">Edit</button>
                                                        <button className="btn btn-danger"
                                                            onClick={() => handleDeleteButton(item)}>Delete</button>
                                                    </td>
                                                </tr>)
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr><td>Not found user</td></tr>
                                    </>
                                }
                            </tbody>
                        </table>
                        {totalPage > 0 &&
                            <div className="user-footer">
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={(event) => handlePageClick(event)}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPage}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ModalDetele show={showModalDelete} handleClose={handleClose} confirmDelete={confirmDelete} dataModal={dataModal} />
            <ModalUser show={true} title={"Create new user"} />
        </>
    );
};

export default User

