import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUserData } from "@/lib/session";
import { getAllActiveFunds } from "@/lib/adminapi";
import { getToken } from "@/lib/session";
import Link from "next/link";
import axios from "axios";
import { sendNotification } from "../../lib/frontendapi";
import swal from "sweetalert";

interface UserData {
    id?: number;
}

interface Fund {
    id: number;
    fund_id: number;
    tenure: string;
    minimum_subscription: string;
    amount: number;
    status: string;
    avg_amt_per_person: string;
    repay_date: string;
    closed_in: string;
    type: string;
    company_overview: string;
}
const TotalActiveFunds = () => {
    const tableRef = useRef(null);
    const [current_user_id, setCurrentUserId] = useState("");
    const [funds, setFundsData] = useState<Fund[]>([]);

    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data.id != null) {
            current_user_data.id
                ? setCurrentUserId(current_user_data.id.toString())
                : setCurrentUserId("");
            getAllActiveFunds()
                .then((res) => {
                    if (res.status == true) {
                        setFundsData(res.data);
                    } else {
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                })
                .catch((err) => {
                    toast.error(err.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                });
        } else {
            window.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        // Initialize the datatable for users
        if (funds.length > 0 && !dataTableInitialized) {
            $(document).ready(() => {
                $("#datatable").DataTable({
                    lengthMenu: [20, 50, 100, 150],
                    retrieve: true,
                    paging: false,
                    columnDefs: [
                        //  columns  sortable
                        { targets: [0, 1, 2], orderable: true },
                        // Disable sorting
                        { targets: "_all", orderable: false },
                    ],
                });
                setDataTableInitialized(true);
            });
        }
    }, [funds, dataTableInitialized]);

    // updating Funding from DB..
    function updateStatus(id: number, status: string) {
        axios
            .post(
                process.env.NEXT_PUBLIC_API_URL + `/update-fund-status/${id}`,
                { status: status },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + getToken(),
                    },
                }
            )
            .then((response) => {
                // Update the status in the state
                const updatedFunds = funds.map((fund) => {
                    if (fund.id === id) {
                        return { ...fund, status: status };
                    }
                    return fund;
                });
                setFundsData(updatedFunds);
                const data = {
                    notify_from_user: current_user_id,
                    notify_to_user: "1",
                    notify_msg: "Fund Raised Status is Updated.",
                    notification_type: "Fund Raised Status",
                    each_read: "unread",
                    status: "active",
                };
                sendNotification(data)
                    .then((notificationRes) => {
                    })
                    .catch((error) => {
                    });
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch((error) => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }

    // Delete Funding from DB..
    function deleteFund(id: number) {
        swal({
            title: "Are you sure?",
            text: "You want to delete the industry",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes, I am sure!"],
        }).then((willDelete) => {
            if (willDelete) {
                // If the user confirms deletion, make an Axios DELETE request
                axios
                    .delete(process.env.NEXT_PUBLIC_API_URL + `/fund-delete/${id}`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: "Bearer " + getToken(),
                        },
                    })
                    .then((response) => {
                        const updatedData = funds.filter((fund) => fund.id !== id);
                        setFundsData(updatedData);
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                    })
                    .catch((error) => {
                        toast.error(error.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    });
            }
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
                                    <h6 className="page-title">All funds</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link
                                                href={
                                                    process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"
                                                }
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Active Funds
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
                                        <h3 className="card-title">ALL FUNDS</h3>
                                    </div>
                                    <div className="card-body mt-3">
                                        <div className="table-responsive">
                                            <div className="box-card recent-reviews mb-4">
                                                {funds.length > 0 ? (
                                                    <table
                                                        className="table-dash"
                                                        id="datatable"
                                                        ref={tableRef}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>Serial no.</th>
                                                                <th>Fund Id</th>
                                                                <th>Tenure</th>
                                                                <th>Min. Subscription</th>
                                                                <th>Avg. Amount</th>
                                                                <th>Repay Date</th>
                                                                <th>Closing Date</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {funds && funds.length > 0 ? (
                                                                funds.map((fund, index: any) => (
                                                                    <tr key={index}>
                                                                        <td data-label="Serial no.">{index + 1}</td>
                                                                        <td data-label="Fund Id">{fund.fund_id}</td>
                                                                        <td data-label="Tenure">
                                                                            {fund.tenure}&nbsp;Days
                                                                        </td>
                                                                        <td data-label="Min. Subscription">
                                                                            {fund.minimum_subscription}
                                                                        </td>
                                                                        <td data-label="Avg. Amount">
                                                                            {fund.avg_amt_per_person}
                                                                        </td>
                                                                        <td data-label="Repay Date">
                                                                            {new Date(
                                                                                fund.repay_date
                                                                            ).toLocaleDateString("en-GB")}
                                                                        </td>
                                                                        <td data-label="Closing Date">
                                                                            {new Date(
                                                                                fund.closed_in
                                                                            ).toLocaleDateString("en-GB")}
                                                                        </td>

                                                                        <td data-label="Status">
                                                                            <span
                                                                                style={{ cursor: "pointer" }}
                                                                                className={
                                                                                    fund.status === "open"
                                                                                        ? "badge bg-success"
                                                                                        : "badge bg-danger"
                                                                                }
                                                                                onClick={() =>
                                                                                    updateStatus(
                                                                                        fund.id,
                                                                                        fund.status === "open"
                                                                                            ? "closed"
                                                                                            : "open"
                                                                                    )
                                                                                }
                                                                            >
                                                                                {fund.status.toUpperCase()}
                                                                            </span>
                                                                        </td>

                                                                        <td data-label="Action">

                                                                            <Link
                                                                                href={
                                                                                    process.env.NEXT_PUBLIC_BASE_URL +
                                                                                    `admin/fund-raise/?id=${fund.id}`
                                                                                }
                                                                                className="m-1"
                                                                            >
                                                                                <span className="fa fa-edit"></span>
                                                                            </Link>
                                                                            <Link
                                                                                href="javascript:void(0);"
                                                                                onClick={() => {
                                                                                    deleteFund(fund.id);
                                                                                }}
                                                                                className="m-1"
                                                                            >
                                                                                <span className="fa fa-trash text-danger"></span>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td className="text-center" colSpan={8}>
                                                                        No funds found.
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p>No data available in table</p>
                                                )}
                                            </div>
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
    );
};

export default TotalActiveFunds;

