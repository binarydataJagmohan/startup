import React, { useState, useEffect, useRef } from 'react'
import { getAllInvestors } from '../../lib/frontendapi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { getToken, getCurrentUserData } from "../../lib/session";
import { sendNotification } from '../../lib/frontendapi';
import swal from "sweetalert";
import Link from 'next/link';

type Investor = {
    id: number;
    name: string;
    email: string;
    investorType: string;
    status: string;
    approval_status: string;
}

interface UserData {
    id?: string;
}
const InvestorList = () => {
    const tableRef = useRef(null);
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [current_user_id, setCurrentUserId] = useState("");
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
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
            const data = await getAllInvestors({});
            if (data) {
                setInvestors(data.data);
            }
        };

        fetchData();
    }, []);
    function updateApprovalStatus(id: number, status: string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-investor-approvalstatus/${id}`, { approval_status: status },
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                }
            })
            .then(response => {
                const updatedData = investors.map(investor => {
                    if (investor.id === id) {
                        const data = {
                            notify_from_user: current_user_id,
                            notify_to_user: investor.id,
                            notify_msg: `Congratulations! Your profile has been approved successfully`,
                            notification_type: "Approval Notification",
                            each_read: "unread",
                            status: "active"
                        };
                        // Send Notifications to admin When new user is register
                        sendNotification(data)
                        return {
                            ...investor,
                            approval_status: status,
                        };
                    }
                    return investor;
                });
                setInvestors(updatedData);
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

    const fetchData = async () => {
        const data = await getAllInvestors({});
        if (data) {
            setInvestors(data.data);
        }
    };
    function deleteInvestor(id: number) {
        swal({
            title: "Are you sure?",
            text: "You want to delete the industry",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes, I am sure!"],

        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(process.env.NEXT_PUBLIC_API_URL + `/investor-delete/${id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + getToken(),
                    }
                })
                    .then(response => {
                        fetchData();
                        const updatedData = investors.filter(investor => investor.id !== id);
                        setInvestors(updatedData);
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
    }

    // for user account status Active and Deactive
    function updateStatus(id: number, status: string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-investor-status/${id}`, { status: status }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
            .then(response => {
                const updatedData = investors.map(investor => {
                    if (investor.id === id) {

                        return {
                            ...investor,
                            status: status,
                        };
                    }
                    return investor;
                });
                setInvestors(updatedData);
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

    useEffect(() => {
        if (investors.length > 0 && !dataTableInitialized) {
            $(document).ready(() => {
                $('#datatable').DataTable({
                    lengthMenu: [10, 25, 50, 75, 100],
                    retrieve: true,
                    paging: false,
                    columnDefs: [
                        { targets: [0, 1, 2], orderable: true },
                        { targets: '_all', orderable: false },
                    ],
                });
                setDataTableInitialized(true);
            });
        }
    }, [investors, dataTableInitialized]);

    return (
        <>
            <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">Investors</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Investors
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
                                        <h3 className="card-title">INVESTORS</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive1">
                                            <div className="box-card recent-reviews mb-4">
                                                <table className="table-dash" id="datatable" ref={tableRef}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Serial no.</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email Address</th>
                                                            <th scope="col">Type</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Approval</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {investors && investors.length > 0 ? (
                                                            investors.map((investor, index) => (
                                                                <tr key={investor.id}>
                                                                    <td data-label="Serial no.">{index + 1}</td>
                                                                    <td data-label="Name">{investor.name}</td>
                                                                    <td data-label="Email Address">{investor.email}</td>
                                                                    <td data-label="Type">{investor.investorType}</td>
                                                                    <td data-label="Status">
                                                                        <span style={{ cursor: "pointer" }} className={investor.status === 'active' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(investor.id, investor.status === 'active' ? 'deactive' : 'active')}> {investor.status.toUpperCase()}</span>
                                                                    </td>
                                                                    <td data-label="Approval">
                                                                        <span style={{ cursor: "pointer" }} className={investor.approval_status === 'approved' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateApprovalStatus(investor.id, investor.approval_status === 'approved' ? 'reject' : 'approved')}> {investor.approval_status.toUpperCase()}</span>
                                                                    </td>
                                                                    <td data-label="Action">
                                                                        <ul className="table-icons-right d-md-flex">
                                                                            <li className="edit">
                                                                                <Link href={process.env.NEXT_PUBLIC_BASE_URL + `admin/edit-investor/?id=${investor.id}`}>
                                                                                    <span className="fa fa-eye"></span>
                                                                                </Link>
                                                                            </li>
                                                                            <li className="trash">
                                                                                <a href="#" onClick={() => { deleteInvestor(investor.id); }} >
                                                                                    <i className="fa-solid fa-trash" />
                                                                                </a>
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

export default InvestorList