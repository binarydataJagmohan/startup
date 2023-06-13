import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUserData } from '@/lib/session';
import { getAllActiveFunds } from '@/lib/adminapi';
import axios from 'axios';
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
}
const TotalActiveFunds = () => {
    const tableRef = useRef(null);
    const [current_user_id, setCurrentUserId] = useState("");
    const [funds, setFundsData] = useState<Fund[]>([]);
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data.id != null) {
            current_user_data.id ? setCurrentUserId(current_user_data.id.toString()) : setCurrentUserId("");
            getAllActiveFunds()
                .then((res) => {
              
                    if (res.status == true) {
                        // Set the businessUnits state
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
                $('#datatable').DataTable({
                    lengthMenu: [5, 25, 50, 75, 100],
                    columnDefs: [
                        //  columns  sortable
                        { targets: [0, 1, 2], orderable: true },
                        // Disable sorting 
                        { targets: '_all', orderable: false },
                    ],
                });
            });
        }
    }, [funds, dataTableInitialized]);

    // Delete Funding from DB..
    function deleteFund(id: number) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/fund-delete/${id}`)
            .then(response => {
                const updatedData = funds.filter(fund => fund.id !== id);
                setFundsData(updatedData);
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
                                    <h6 className="page-title">Dashboard</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</a>
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
                                        <h3 className="card-title" >ALL FUNDS</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className='table-responsive'>
                                            {funds.length > 0 ? (
                                                <table
                                                    id="datatable"
                                                    ref={tableRef}
                                                    className="table dt-responsive nowrap"
                                                    style={{
                                                        borderCollapse: 'collapse',
                                                        borderSpacing: 0,
                                                        width: '100%',
                                                        // overflow: 'hidden',
                                                    }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Fund Id</th>
                                                            <th>Tenure</th>
                                                            <th>Min. Subscription</th>
                                                            <th>Avg. Amount</th>
                                                            <th>Repay Date</th>
                                                            <th>Closing Date</th>
                                                            {/* <th>Status</th> */}
                                                            {/* <th>Action</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {funds && funds.length > 0 ? (
                                                            funds.map((fund, index: any) => (
                                                                <tr key={fund.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{fund.fund_id}</td>
                                                                    <td>{fund.tenure}&nbsp;Days</td>
                                                                    <td>{fund.minimum_subscription}</td>
                                                                    <td>{fund.avg_amt_per_person}</td>
                                                                    <td>{new Date(fund.repay_date).toLocaleDateString('en-GB')}</td>
                                                                    <td>{new Date(fund.closed_in).toLocaleDateString('en-GB')}</td>
                                                                    {/* <td>
                                                                        <span style={{ cursor: "pointer" }} className={fund.status === 'open' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(fund.id, fund.status === 'open' ? 'closed' : 'open')}>
                                                                            {fund.status.toUpperCase()}
                                                                        </span>
                                                                    </td> */}
                                                                     {/*<td>
                                                                        <a href={process.env.NEXT_PUBLIC_BASE_URL + `/company/fund-raise/?id=${fund.id}`} className='m-1' ><span className='fa fa-edit'></span></a>
                                                                        <a href="javascript:void(0);" onClick={() => { deleteFund(fund.id); }} className='m-1' ><span className='fa fa-trash text-danger'></span></a>
                                                                    </td> */}
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="text-center" colSpan={8}>No funds found.</td>
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
                            {/* end col */}
                            {/* <Pagination items={startups.length} currentPage={currentPage} pageSize={pageSize}
                                onPageChange={onPageChange} /> */}

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

export default TotalActiveFunds