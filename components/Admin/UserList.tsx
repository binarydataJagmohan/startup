import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../lib/adminapi';
import { getCountries } from '../../lib/frontendapi';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';

type Country = {
    name: string;
    country_code: string;
}
interface User {
    id: number;
    name:string;
    email:string;
    phone:string;
    city:string;
    country:string;
    role:string;
    status:string;
  }
const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [usersId, setUsersId] = useState('');
    const [selectedRole, setSelectedRole] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [countries, setcountries] = useState<Country[]>([]);
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

    function deleteUser(id:number) {
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
    // for user account status Active and Deactive
    function updateStatus(id: number, status: string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-user-status/${id}`, { status: status })
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
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-user-role/${id}`, { role })
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
                // console.log(error);
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
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-user-country/${id}`, { country })
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
                                            className="table dt-responsive nowrap"
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
                                                    <th>City</th>
                                                    <th>Country</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
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
                                                        <td>{user.city}</td>
                                                        <td>
                                                           <select className="form-select form-select-lg css-1492t68 mt-0" value={user.country} onChange={(e) => updateCountry(String(user.id), e.target.value)}>
                                                                    <option value="">
                                                                        --SELECT COUNTRY--
                                                                    </option>
                                                                    {countries.map((country, index) => (
                                                                        <option
                                                                            key={index}
                                                                            value={country.name}
                                                                            selected={user.country === country.name}
                                                                        >
                                                                            {country.name}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="form-select w-lg form-select-lg mb-3 css-1492t68 mt-0" value={user.role} onChange={(e) => updateusersRole(String(user.id), e.target.value)}>
                                                                <option value="admin">Admin</option>
                                                                <option value="startup">Startup</option>
                                                                <option value="investor">Investor</option>
                                                            </select>
                                                        </td>
                                                        <td><span style={{ cursor: "pointer" }} className={user.status === 'active' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(user.id, user.status === 'active' ? 'deactive' : 'active')}> {user.status.toUpperCase()}</span></td>
                                                        <td>

                                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + `/admin/edit-user/?id=${user.id}`} className='m-1' ><span className='fa fa-edit'></span></a>

                                                            <a href="javascript:void(0);" onClick={() => { deleteUser(user.id); }} className='m-1' ><span className='fa fa-trash text-danger'></span></a>
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