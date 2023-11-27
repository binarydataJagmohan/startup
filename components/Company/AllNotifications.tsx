import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { getToken, getCurrentUserData } from "../../lib/session";
import { getSingleUserData } from '@/lib/frontendapi';
import { getTotalNotifications, updateNotification, deleteNotification } from "../../lib/adminapi";
import moment from 'moment';
import Link from 'next/link';
interface UserData {
    username?: string;
    role?: string;
    id?: string;
}
const AllNotifications = () => {
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [current_user_id, setCurrentUserId] = useState("");
    const [current_user_name, setCurrentUserName] = useState("");
    const [current_user_role, setCurrentUserRole] = useState("");
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    const [readNotifications, setReadNotifications] = useState("");
    const [users, setUsers] = useState<any>(
        {
            name: '',
            email: '',
            country: '',
            phone: '',
            city: '',
            status: '',
            role: '',
            linkedin_url: '',
            gender: '',
            profile_pic: ''
        });
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        current_user_data.username
            ? setCurrentUserName(current_user_data.username)
            : setCurrentUserName("");
        current_user_data.role
            ? setCurrentUserRole(current_user_data.role)
            : setCurrentUserRole("");
        current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");



        const fetchData = async () => {
            const data = await getTotalNotifications(current_user_data.id);
            if (data) {
                setNotifications(data.data);
                updateNotification(current_user_data.id)
                    .then((res) => {
                        if (res.status == true) {
                            console.log(res)
                            setReadNotifications(res.data);
                        } else {
                        }
                    })
                    .catch((err) => {
                    });
            }
        };
        fetchData();

    }, []);

    useEffect(() => {
        if (notifications.length > 0 && !dataTableInitialized) {
            const table = $('#datatable').DataTable({
                searching: false,
                lengthMenu: [10, 25, 50, 75, 100],
                columnDefs: [
                    // columns sortable
                    { targets: [0, 1, 2], orderable: true },
                    // Disable sorting
                    { targets: '_all', orderable: false },
                ],
                paging: notifications.length > 10 ? true : false,
            });

            tableRef.current = table as any;
            setDataTableInitialized(true);
        }
    }, [notifications, dataTableInitialized]);

    const SubmitForm = () => {
        const current_user_data: UserData = getCurrentUserData();
        deleteNotification(current_user_data.id)
            .then((res) => {
                if (res.status == true) {
                    console.log(res);
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: "success",
                    });
                    window.location.reload();
                } else {
                    toast.error(res.message, {
                        toastId: "error",
                    });
                }
            })
            .catch((err) => {
                toast.error(err, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
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
                                    <h6 className="page-title">Startup</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Notifications
                                        </li>
                                    </ol>
                                </div>
                                <div className="col">
                                    <button className="btn  float-end" style={{ backgroundColor: '#088395', color: '#fff' }} onClick={SubmitForm}>Clear All</button>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-white bg-dark" id="title">
                                        <h3 className="card-title">NOTIFICATIONS</h3>
                                    </div>
                                    {notifications.length > 0 ? (
                                        <div className="card-body">
                                            <div className="table-responsive overflow-x-hidden">
                                                <div className="body-part">
                                                    {notifications.map((notification: any,index:any) => (
                                                        <div className="box-card recent-reviews mb-4" key={index}>
                                                            <div className="card-inquiries mt-2">
                                                                <div className="row">
                                                                    <div className="col-lg-10 col-md-9 col-8">
                                                                        <p className="name-client text-capitalize">{notification.name == 'admin' ? 'Risingcapitalist' : notification.name }</p>
                                                                        <p className="client-info">
                                                                            {notification.notify_msg}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-lg-2  col-md-3  col-4 text-right">
                                                                        <p className="time">
                                                                            {moment(notification.created_at, 'hh:mmA').format('h:mmA')}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No data available in Notifications</p>
                                    )}
                                </div>
                            </div>
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

export default AllNotifications