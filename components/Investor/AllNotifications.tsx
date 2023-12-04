import React, { useEffect, useState, useRef } from 'react';
import { getTotalNotifications, updateNotification, deleteNotification } from "../../lib/adminapi";
import { getCurrentUserData } from "../../lib/session";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
interface UserData {
    username?: string;
    role?: string;
    id?: string;
}
const AllNotifications = () => {
    const tableRef = useRef<HTMLTableElement | null>(null);   
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();       
        const fetchData = async () => {
            const data = await getTotalNotifications(current_user_data.id);
            if (data) {
                setNotifications(data.data);
                updateNotification(current_user_data.id)
                    .then((res) => {
                        
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
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <button className="btn  float-end" style={{ backgroundColor: '#088395', color: '#fff' }} onClick={SubmitForm}>Clear All</button>
                    </div>
                    <div className="col-12">
                        {notifications.length > 0 ? (
                            <div className="card-body">
                                <div className="table-responsive overflow-x-hidden">
                                    <div className="body-part">
                                        {notifications.map((notification: any, index: any) => (
                                            <div className="box-card recent-reviews mb-4" key={index}>
                                                <div className="card-inquiries mt-2">
                                                    <div className="row">
                                                        <div className="col-lg-10 col-md-9 col-8">
                                                            <p className="name-client text-capitalize">{notification.name}</p>
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
                        {/* </div> */}
                    </div>
                </div>
                {/* end col */}
            </div>{" "}
        </>
    )
}

export default AllNotifications