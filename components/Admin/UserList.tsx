import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../lib/adminapi';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [usersId, setUsersId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllUsers({});
            if (data) {
                setUsers(data.data);
            }
        };
        fetchData();
    }, []);

    function editUsers(id) {
        setUsersId(id);

    }
    function deleteUser(id) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/user-delete/${id}`)
            .then(response => {
                const updatedData = users.filter(user => user.id !== id);
                setUsers(updatedData);
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch(error => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }
    return (
        <>
            <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">User</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Users
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-white" id="title">
                                        <h3 className="card-title" >USERS</h3>
                                    </div>
                                    <div className="card-body">
                                        <table
                                            id="datatable"
                                            className="table table-bordered dt-responsive nowrap"
                                            style={{
                                                borderCollapse: "collapse",
                                                borderSpacing: 0,
                                                width: "100%"
                                            }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email Address</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th>City</th>
                                                    <th>Country</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td>{user.status}</td>
                                                        <td>{user.city}</td>
                                                        <td>{user.country}</td>
                                                        <td>
                                                            {user.role}
                                                            {/* <span style={{cursor: "pointer"}} className={user.status === 'active' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(investor.id, investor.status === 'active' ? 'deactive' : 'active')}> {investor.status.toUpperCase()}</span>
                                                        </td>
                                                        <td>
                                                        <span style={{cursor: "pointer"}}  className={investor.approval_status === 'approved' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateApprovalStatus(investor.id, investor.approval_status === 'approved' ? 'reject' : 'approved')}> {investor.approval_status.toUpperCase()}</span> */}
                                                        </td>
                                                        <td>
                                                            
                                                                <a href={process.env.NEXT_PUBLIC_BASE_URL + `/admin/edit-users/?id=${user.id}`} className='m-1' ><span className='fa fa-edit'></span></a>
                                                           
                                                            <a href="#" onClick={() => { deleteUser(user.id); }} className='m-1' ><span className='fa fa-trash text-danger'></span></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>{" "}
                            {/* end col */}
                        </div>{" "}
                        {/* end row */}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                <ToastContainer autoClose={1000} />
            </div>
        </>
    )
}

export default UserList