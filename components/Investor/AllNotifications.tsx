import React, { useEffect, useState, useRef } from 'react';
import { getTotalNotifications, updateNotification } from "../../lib/adminapi";
import { getToken, getCurrentUserData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
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

    return (
        <>

            <div className='table-responsive border-top p-lg'>
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

        </>
    )
}

export default AllNotifications