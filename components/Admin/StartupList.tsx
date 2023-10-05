import React, { useState, useEffect, useRef } from 'react'
import { getAllStartupBusiness, sendNotification } from '../../lib/frontendapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import swal from "sweetalert";
import Link from 'next/link';
import { getToken, getCurrentUserData } from "../../lib/session";
import Pagination from "../../components/Frontend/Common/Pagination";
import { paginate } from "../../helpers/paginate";
type Startup = {
    id: number;
    name: string;
    email: string;
    business_name: string;
    stage: string;
    status: string;
    approval_status: number | string;

}
interface UserData {
    id?: string;
}

const StartupList = () => {
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    // const [prevPage, setPrevPage] = useState(0);
    // const [nextPage, setNextPage] = useState(0);
    const [totalJobs, setTotalJobs] = useState([]);
    const pageSize = 1;
    const [loading, setLoading] = useState(true);
    const [startups, setStartupData] = useState<Startup[]>([]);
    const [selectedStage, setSelectedStage] = useState([]);
    const [current_user_id, setCurrentUserId] = useState("");
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    // const tableRef = useRef(null);
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data?.id != null) {
            current_user_data.id
                ? setCurrentUserId(current_user_data.id)
                : setCurrentUserId("");

        } else {
            window.location.href = "/login";
        }

        const fetchData = async () => {
            const data = await getAllStartupBusiness({});
            if (data) {
                setStartupData(data.data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (startups.length > 0 && !dataTableInitialized) {
            const table = $('#datatable').DataTable({
                lengthMenu: [20, 50, 100, 150],
                columnDefs: [
                    // columns sortable
                    { targets: [0, 1, 2], orderable: true },
                    // Disable sorting
                    { targets: '_all', orderable: false },
                ],
            });

            tableRef.current = table as any;
            setDataTableInitialized(true);
        }
    }, [startups, dataTableInitialized]);

    // for approval status update
    function updateApprovalStatus(id: number, status: number | string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-startup-status/${id}`, { approval_status: status },
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
            })
            .then(response => {
                const updatedData = startups.map(startup => {
                    if (startup.id === id) {
                        const data = {
                            notify_from_user: current_user_id,
                            notify_to_user: startup.id,
                            notify_msg: `Congratulations! Your profile has been approved successfully`,
                            notification_type: "Approval Notification",
                            each_read: "unread",
                            status: "active"
                        };
                        // Send Notifications to admin When new user is register
                        sendNotification(data)
                            .then((notificationRes) => {
                                console.log('success')
                            })
                            .catch((error) => {
                                console.log('error occured')
                            });
                        return {
                            ...startup,
                            approval_status: status,
                        };
                    }
                    return startup;
                });
                setStartupData(updatedData);
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
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-status/${id}`, { status: status },
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
            }
        )
            .then(response => {
                const updatedData = startups.map(startup => {
                    if (startup.id === id) {
                        return {
                            ...startup,
                            status: status,
                        };
                    }
                    return startup;
                });
                setStartupData(updatedData);
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

    // For update business stage
    function updateStartupStage(id: string, stage: string) {
        const startupId = parseInt(id);
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-startup-stage/${id}`, { stage },
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
            })
            .then(response => {
                // set value in startups state
                const updatedStartupData = startups.map(startup => {
                    if (startup.id === startupId) {
                        return {
                            ...startup,
                            stage: stage
                        }
                    }
                    return startup;
                });
                setStartupData(updatedStartupData);
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
        updateStartupStage(id, e.target.value);
    };
    const fetchData = async () => {
        const data = await getAllStartupBusiness({});
        if (data) {
            setStartupData(data.data);
        }
        setLoading(false);
    };

    // delete the startup 
    function deleteStartup(id: number) {
        swal({
            title: "Are you sure?",
            text: "You want to delete the industry",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes, I am sure!"],
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(process.env.NEXT_PUBLIC_API_URL + `/startups/${id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + getToken(),
                    },
                })
                    .then(response => {
                        fetchData();
                        const updatedData = startups.filter(startup => startup.id !== id);
                        setStartupData(updatedData);
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
        });
    };
    const onPageChange = (page: any, currentPage: any) => {
        const current_user_data: any = getCurrentUserData();
        // setPrevPage(currentPage);
        setCurrentPage(page);
        getAllStartupBusiness()
            .then(res => {
                if (res.status == true) {
                    setStartupData(res.data);
                    const paginatedPosts = paginate(res.data, page, pageSize);
                    setStartupData(paginatedPosts);
                } else {
                    setStartupData([]);
                }
            })
            .catch(err => {

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
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Startup Companies  
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
                                        <h3 className="card-title">COMPANIES</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive1">
                                            <div className="box-card recent-reviews mb-4">
                                                {startups.length > 0 ? (
                                                    <table className="table-dash" id="datatable" ref={tableRef}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Email Address</th>
                                                                <th scope="col">Company</th>
                                                                <th scope="col">Stage</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Approvel</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {startups.map((startup, index) => (
                                                                <tr key={startup.id}>
                                                                    <td data-label="Account">{index + 1}</td>
                                                                    <td data-label="Account">{startup.name}</td>
                                                                    <td data-label="Due Date">{startup.email}</td>
                                                                    <td data-label="Amount">{startup.business_name}</td>
                                                                    <td data-label="Amount">{startup.stage}</td>
                                                                    <td data-label="Period">
                                                                        <span style={{ cursor: "pointer" }} className={startup.status === 'active' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(startup.id, startup.status === 'active' ? 'deactive' : 'active')}> {startup.status.toUpperCase()}</span>
                                                                    </td>
                                                                    <td data-label="Period">
                                                                        <span style={{ cursor: "pointer" }} className={startup.approval_status === 'approved' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateApprovalStatus(startup.id, startup.approval_status === 'approved' ? 'reject' : 'approved')}> {typeof startup.approval_status === 'string' ? startup.approval_status.toUpperCase() : startup.approval_status}</span>
                                                                    </td>
                                                                    <td data-label="Period">
                                                                        <ul className="table-icons-right">
                                                                            <li className="edit">
                                                                                <Link href={process.env.NEXT_PUBLIC_BASE_URL + `/admin/edit-startup/?id=${startup.id}`}>
                                                                                    <i className="fa-regular fa-pen-to-square" />
                                                                                </Link>
                                                                            </li>
                                                                            <li className="trash">
                                                                                <a href="#" onClick={() => { deleteStartup(startup.id); }} >
                                                                                    <i className="fa-solid fa-trash" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="edit">
                                                                                <Link href={process.env.NEXT_PUBLIC_BASE_URL + `/admin/fund-raise/?id=${startup.id}`}>
                                                                                    <i className="fa-solid fa-hand-holding-dollar"></i>
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p>No data available in table</p>
                                                )}
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

export default StartupList