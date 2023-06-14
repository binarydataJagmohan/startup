import React, { useEffect, useState,useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { getToken, getCurrentUserData } from "../../lib/session";
import { getSingleUserData } from '@/lib/frontendapi';
import { getTotalNotifications,updateNotification } from "../../lib/adminapi";

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
    const [readNotifications,setReadNotifications]=useState("");
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

    // useEffect(() => {
    //     if (notifications.length > 0) {
    //       const notifyFromUser = notifications[0].notify_from_user;
    //       const notifyToUser = notifications[0].notify_to_user;
      
    //       Promise.all([
    //         getSingleUserData(notifyFromUser),
    //         getSingleUserData(notifyToUser)
    //       ])
    //         .then(([fromUserRes, toUserRes]) => {
    //           if (fromUserRes.status && toUserRes.status) {
    //             setUsers({
    //               fromUser: fromUserRes.data,
    //               toUser: toUserRes.data
    //             });
    //           }
    //         })
    //         .catch((err) => {
    //           // Handle error
    //         });
    //     }
    //   }, [notifications]);

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
                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Notifications
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-white bg-dark" id="title">
                                        <h3 className="card-title" >NOTIFICATIONS</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className='table-responsive'>
                                            <table
                                                id="datatable"
                                                className="table dt-responsive nowrap"
                                                style={{
                                                    borderCollapse: 'collapse',
                                                    borderSpacing: 0,
                                                    width: '100%',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Notifications Type</th>
                                                        <th>Notifications</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {notifications.map((notification: any, index) => (
                                                        <tr key={notification.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{notification.notification_type}</td>
                                                            <td>{notification.notify_msg}</td>
                                                            {/* <td>{notification.notify_to_user}</td> */}
                                                            {/* <td onChange={() => getSingleUserData(notification.notify_from_user)}>
                                                            {users.fromUser?.name}
                                                            </td>
                                                            <td onChange={() => getSingleUserData(notification.notify_to_user)}>
                                                            {users.toUser?.name}</td> */}
                                                         
                                                            {/* <td className='text-center'> 
                                                                <span style={{ cursor: "pointer" }} className={notification.each_read === 'read' ? 'badge bg-success' : 'badge bg-danger'}
                                                                >  {typeof notification.each_read === 'string' ? notification.each_read.toUpperCase() : notification.each_read}</span></td>
                                                            <td>
                                                                <span style={{ cursor: "pointer" }} className={notification.status === 'active' ? 'badge bg-success' : 'badge bg-danger'}
                                                                >  {typeof notification.status === 'string' ? notification.status.toUpperCase() : notification.status}</span>
                                                            </td>
                                                            <td className='text-center'>
                                                                <a href="javascript:void(0);"><span className='fa fa-close text-danger'></span></a>
                                                            </td> */}
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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