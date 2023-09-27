import React, { useState, useEffect, useRef } from 'react'
import { getAllUsers } from '../../lib/adminapi';
import { getCountries } from '../../lib/frontendapi';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import { getToken } from '@/lib/session';
type Country = {
    name: string;
    country_code: string;
}
interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    role: string;
    status: string;
}
const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [usersId, setUsersId] = useState('');
    const [selectedRole, setSelectedRole] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [countries, setcountries] = useState<Country[]>([]);
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    const tableRef = useRef(null);
    useEffect(() => {
        const userData = async () => {
            const data = await getAllUsers({});
            if (data) {
                setUsers(data.data);
            }
        };


        const fetchData = async () => {
            const data = await getCountries({});
            if (data) {
                setcountries(data.data);
            }
        };

        userData();
        fetchData();
    }, []);

    useEffect(() => {
        // Initialize the datatable for users
        if (users.length > 0 && !dataTableInitialized) {
            $(document).ready(() => {
                $('#datatable').DataTable({
                    lengthMenu: [10, 25, 50, 75, 100],
                    columnDefs: [
                        //  columns  sortable
                        { targets: [0, 1, 2], orderable: true },
                        // Disable sorting 
                        { targets: '_all', orderable: false },
                    ],
                });
                setDataTableInitialized(true);
            });
        }
    }, [users, dataTableInitialized]);

    function deleteUser(id: number) {

        axios.post(process.env.NEXT_PUBLIC_API_URL + `/user-delete/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
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
    // for user account status Active and Deactive
    function updateStatus(id: number, status: string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-user-status/${id}`, { status: status }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
            .then(response => {
                const updatedData = users.map(user => {
                    if (user.id === id) {
                        return {
                            ...user,
                            status: status,
                        };
                    }
                    return user;
                });
                setUsers(updatedData);
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch(error => {
                // console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }

    // For update business stage
    function updateusersRole(id: string, role: string) {
        const userId = parseInt(id);
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-user-role/${id}`, { role }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
            .then(response => {
                // set value in user role state
                const updatedUserData = users.map(user => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            role: role
                        }
                    }
                    return user;
                });
                setUsers(updatedUserData);
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
    const handleChange = (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
        updateusersRole(id, e.target.value);
    };

    // For update business stage
    function updateCountry(id: string, country: string) {
        const userId = parseInt(id);
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-user-country/${id}`, { country }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
            .then(response => {
                // set value in user country state
                const updatedUserData = users.map(user => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            country: country
                        }
                    }
                    return user;
                });
                setUsers(updatedUserData);
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch(error => {
                // console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }
    const handleChangeCountry = (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
        updateCountry(id, e.target.value);
    };
    return (
        <>
            <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">Users</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</Link>
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
                                    <div className="card-header bg-088395 text-white" id="title">
                                        <h3 className="card-title">USERS</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive1">
                                            <div className="box-card recent-reviews mb-4">
                                                <table className="table-dash" id="datatable" ref={tableRef}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email Address</th>
                                                            <th scope="col">Phone</th>
                                                            <th scope="col">Role</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users && users.length > 0 ? (
                                                            users.map((user, index) => (
                                                                <tr key={index}>
                                                                    <td data-label="Account">{index + 1}</td>
                                                                    <td data-label="Account">{user.name}</td>
                                                                    <td data-label="Due Date">{user.email}</td>
                                                                    <td data-label="Amount">{user.phone}</td>
                                                                    <td data-label="Amount">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                                                                    <td data-label="Period">
                                                                        <span style={{ cursor: "pointer" }} className={user.status === 'active' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(user.id, user.status === 'active' ? 'deactive' : 'active')}> {user.status.toUpperCase()}</span>
                                                                    </td>
                                                                    <td data-label="Period">
                                                                        <ul className="table-icons-right">
                                                                            <li className="edit">
                                                                                <Link href={process.env.NEXT_PUBLIC_BASE_URL + `/admin/edit-user/?id=${user.id}`} >
                                                                                    <i className="fa-regular fa-pen-to-square" />
                                                                                </Link>
                                                                            </li>
                                                                            <li className="trash">
                                                                                <Link href="#" onClick={() => { deleteUser(user.id); }} >
                                                                                    <i className="fa-solid fa-trash" />
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            ))) : (
                                                            <tr>
                                                                <td className="text-center" colSpan={8}>No funds found.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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