import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUserData } from "@/lib/session";
import { getAllActiveFunds, AdminAddCampaignDetail, AdminAddRoundDetail } from "@/lib/adminapi";
import { getToken } from "@/lib/session";
import Link from "next/link";
import axios from "axios";
import { sendNotification } from "../../lib/frontendapi";
import swal from "sweetalert";
import PopupModal from "../../components/commoncomponents/PopupModal";
import dynamic from 'next/dynamic';
import Image from 'next/image';

interface UserData {
    id?: number;
}

const TextEditor = dynamic(() => import("./TextEditor"), {
    ssr: false,
});

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
    const [companyOverview, setCompanyOverview] = useState("");
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

    const [productDescription, setProductDesc] = useState("");
    const [CompanyName, setCompanyName] = useState("");

    const [dilutionpercentage, setDilutionPercentage] = useState("");
    const [minCommitment, setMinCommitment] = useState("");
    const [maxCommitment, setMaxCommitment] = useState("");
    const [valuationCap, setValuationCap] = useState("");
    const [amountRaised, setAmountRaised] = useState("");
    const [roundName, setRoundName] = useState("");




    const [historicalFinancials_desc, setHistoricalFinancial] = useState("");
    const [pastfinancingDesc, setPastFinancing] = useState("");

    const [selectedFundId, setSelectedFundId] = useState<number | null>(null);


    const handleDropdownToggle = (index: any, fundId: number) => {
        const dropdownMenu = document.getElementById(`dropdownMenu-${index}`);
        if (dropdownMenu) {
            dropdownMenu.classList.toggle("show");
        }
        setSelectedFundId(fundId);
    };


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
                        console.log("success");
                    })
                    .catch((error) => {
                        console.log("error occured");
                    });
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch((error) => {
                // console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }

    // Delete Funding from DB..
    function deleteFund(id: number) {
        // Display a confirmation dialog using SweetAlert
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
                        // If the delete request is successful, update the state to remove the deleted fund
                        const updatedData = funds.filter((fund) => fund.id !== id);
                        setFundsData(updatedData);
                        // Display a success message using the toast library
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                    })
                    .catch((error) => {
                        // Handle errors and display an error message using the toast library
                        toast.error(error.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    });
            }
        });
    }

    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalConfirm1, setModalConfirm1] = useState(false);
    const [modalConfirm2, setModalConfirm2] = useState(false);
    const [modalConfirm3, setModalConfirm3] = useState(false);
    const [modalConfirm4, setModalConfirm4] = useState(false);


    const modalConfirmClose = () => {
        setModalConfirm(false);
    };
    const modalConfirmClose1 = () => {
        setModalConfirm1(false);
    };
    const modalConfirmClose2 = () => {
        setModalConfirm2(false);
    };
    const modalConfirmClose3 = () => {
        setModalConfirm3(false);
    };
    const modalConfirmClose4 = () => {
        setModalConfirm4(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (selectedFundId !== null) {
            const data = {
                id: selectedFundId,
                company_overview: companyOverview,
                product_description: productDescription,
                historical_financials_desc: historicalFinancials_desc,
                past_financing_desc: pastfinancingDesc,
            };
            try {
                const response = await AdminAddCampaignDetail(data);
                setModalConfirm(false);
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } catch (error) {
                toast.error("Error occurred", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } else {
            // Handling the case where no fund is selected
            // You might want to display an error message or handle it as needed
        }
    };



    const handleCompanyOverviewChange = (updatedOverview: string) => {
        setCompanyOverview(updatedOverview);
    };
    const handleProductDescChange = (productDesc: string) => {
        setProductDesc(productDesc);
    };
    const handlehistoricalfFinancialChange = (financialDesc: string) => {
        setHistoricalFinancial(financialDesc);
    };
    const handlePastFinanceChange = (pastfinancialDesc: string) => {
        setPastFinancing(pastfinancialDesc);
    };


    useEffect(() => {
        getAllActiveFunds();

    }, []);


    useEffect(() => {
        const fetchDataForSelectedFund = async () => {
            try {
                const response = await getAllActiveFunds(selectedFundId);
                // Check if response status is true and data exists
                if (response && response.status && response.data && response.data.length > 0) {
                    const selectedFund = response.data.find((fund: { id: number | null; }) => fund.id === selectedFundId);
                    console.log(selectedFund);

                    if (selectedFund) {
                        setRoundName(selectedFund.round_name);
                        setDilutionPercentage(selectedFund.dilution_percentage);
                        setMinCommitment(selectedFund.min_commitment);
                        setMaxCommitment(selectedFund.max_commitment);
                        setValuationCap(selectedFund.valuation_cap);
                        setAmountRaised(selectedFund.amount_raised);
                        setCompanyOverview(selectedFund.company_overview);
                        setProductDesc(selectedFund.product_description);
                        setHistoricalFinancial(selectedFund.historical_financials_desc);
                        setPastFinancing(selectedFund.past_financing_desc);
                    } else {
                        console.error("Selected fund not found in the response data");
                    }
                } else {
                    console.error("No data or invalid response received from the API");
                }
            } catch (error) {
                console.error("Error fetching data for selectedFundId:", error);
            }
        };
        ;
        // if (modalConfirm4 && selectedFundId) {
        //     // Call fetchDataForSelectedFund only when modalConfirm4 is true and selectedFundId exists
        //     fetchDataForSelectedFund();
        // }
        fetchDataForSelectedFund();
    }, [modalConfirm4, selectedFundId]);





    const handleRoundSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            id: selectedFundId,
            dilution_percentage: dilutionpercentage,
            min_commitment: minCommitment,
            max_commitment: maxCommitment,
            valuation_cap: valuationCap,
            amount_raised: amountRaised,
            round_name: roundName,
        };
        try {
            const response = await AdminAddRoundDetail(data);

            setModalConfirm4(false);

            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            toast.error("Error occurred", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
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
                                                                <th>#</th>
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
                                                                        <td data-label="Account">{index + 1}</td>
                                                                        <td data-label="Account">{fund.fund_id}</td>
                                                                        <td data-label="Due Date">
                                                                            {fund.tenure}&nbsp;Days
                                                                        </td>
                                                                        <td data-label="Amount">
                                                                            {fund.minimum_subscription}
                                                                        </td>
                                                                        <td data-label="Period">
                                                                            {fund.avg_amt_per_person}
                                                                        </td>
                                                                        <td data-label="Amount">
                                                                            {new Date(
                                                                                fund.repay_date
                                                                            ).toLocaleDateString("en-GB")}
                                                                        </td>
                                                                        <td data-label="Period">
                                                                            {new Date(
                                                                                fund.closed_in
                                                                            ).toLocaleDateString("en-GB")}
                                                                        </td>

                                                                        <td>
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

                                                                        <td>

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

            <PopupModal
                show={modalConfirm}
                handleClose={modalConfirmClose}
                staticClass="var-login"
            >
                <div className="pop-b-round text-center">
                    <div className="row">
                        <div className="col-12 text-right">
                            <button
                                type="button"
                                className="btn-close m-min-top set-close"
                                onClick={() => {
                                    setModalConfirm(false);
                                }}
                            ></button>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-contact-set">
                        <label className="form-label">
                            <span>Company Overview</span>
                        </label>
                        <TextEditor
                            height={100}
                            value={companyOverview}
                            onChange={handleCompanyOverviewChange}
                            theme="snow"
                        />
                        <button type="submit" className="btnclasssmae set-but-company">
                            Submit
                        </button>
                    </div>
                </form>
            </PopupModal>

            <PopupModal
                show={modalConfirm1}
                handleClose={modalConfirmClose1}
                staticClass="var-login"
            >
                <div className="pop-b-round text-center">
                    <div className="row">
                        <div className="col-12 text-right">
                            <button
                                type="button"
                                className="btn-close m-min-top set-close"
                                onClick={() => {
                                    setModalConfirm1(false);
                                }}
                            ></button>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-contact-set">
                        <label className="form-label">
                            <span>Product Description</span>
                        </label>
                        {/* <textarea
                            rows={4}
                            placeholder="Enter details here"
                            className="form-control"
                            onChange={(e) => setProductDesc(e.target.value)}
                            name="product_description"
                        /> */}
                        <TextEditor
                            height={100}
                            value={productDescription}
                            onChange={handleProductDescChange}
                            theme="snow"
                        />
                        <button type="submit" className="btnclasssmae set-but-company">
                            Submit
                        </button>
                    </div>
                </form>
            </PopupModal>

            <PopupModal
                show={modalConfirm2}
                handleClose={modalConfirmClose2}
                staticClass="var-login"
            >
                <div className="pop-b-round text-center">
                    <div className="row">
                        <div className="col-12 text-right">
                            <button
                                type="button"
                                className="btn-close m-min-top set-close"
                                onClick={() => {
                                    setModalConfirm2(false);
                                }}
                            ></button>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-contact-set">
                        <label className="form-label">
                            <span>Historical Financial</span>
                        </label>
                        {/* <textarea
                            rows={4}
                            placeholder="Enter details here"
                            className="form-control"
                            onChange={(e) => setHistoricalFinancial(e.target.value)}
                            name="historical_financials_desc"
                        /> */}
                        <TextEditor
                            height={100}
                            value={historicalFinancials_desc}
                            onChange={handlehistoricalfFinancialChange}
                            theme="snow"
                        />
                        <button type="submit" className="btnclasssmae set-but-company">
                            Submit
                        </button>
                    </div>
                </form>
            </PopupModal>

            <PopupModal
                show={modalConfirm3}
                handleClose={modalConfirmClose3}
                staticClass="var-login"
            >
                <div className="pop-b-round text-center">
                    <div className="row">
                        <div className="col-12 text-right">
                            <button
                                type="button"
                                className="btn-close m-min-top set-close"
                                onClick={() => {
                                    setModalConfirm3(false);
                                }}
                            ></button>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-contact-set">
                        <label className="form-label">
                            <span>Past Finance</span>
                        </label>
                        {/* <textarea
                            rows={4}
                            placeholder="Enter details here"
                            className="form-control"
                            onChange={(e) => setPastFinancing(e.target.value)}
                            name="past_financing_desc"
                        /> */}
                        <TextEditor
                            height={100}
                            value={pastfinancingDesc}
                            onChange={handlePastFinanceChange}
                            theme="snow"
                        />
                        <button type="submit" className="btnclasssmae set-but-company">
                            Submit
                        </button>
                    </div>
                </form>
            </PopupModal>

            <PopupModal
                show={modalConfirm4}
                handleClose={modalConfirmClose4}
                staticClass="var-login"
            >
                <div className="pop-b-round text-center">
                    <div className="row">
                        <div className="col-12 text-right">
                            <button
                                type="button"
                                className="btn-close m-min-top set-close"
                                onClick={() => {
                                    setModalConfirm4(false);
                                }}
                            ></button>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleRoundSubmit}>
                    <div className="form-contact-set">

                        <label className="form-label">
                            <span>Add Round Details</span>
                        </label>
                        <div>

                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                <span>Round Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Round Name"
                                className="form-control"
                                name="round_name"
                                value={roundName}
                                onChange={(e) => setRoundName(e.target.value)}
                            />

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                <span>Dilutaion Percentage</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Dilutaion Percentage"
                                className="form-control"
                                name="dilution_percentage"
                                value={dilutionpercentage}
                                onChange={(e) => setDilutionPercentage(e.target.value)}

                            />

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="minCommitment" className="form-label mt-3">
                                        <span>Min Commitment</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Min Commitment"
                                        className="form-control"
                                        name="min_commitment"
                                        value={minCommitment}
                                        onChange={(e) => setMinCommitment(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="maxCommitment" className="form-label mt-3">
                                        <span>Max Commitment</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Max Commitment"
                                        className="form-control"
                                        name="max_commitment"
                                        value={maxCommitment}
                                        onChange={(e) => setMaxCommitment(e.target.value)}
                                    />
                                </div>
                            </div>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                <span>Valuation Cap</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Valuation Cap"
                                className="form-control"
                                name="valuation_cap"
                                value={valuationCap}
                                onChange={(e) => setValuationCap(e.target.value)}

                            />

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                <span>Amount Raised</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Amount Raised"
                                className="form-control"
                                name="amount_raised"
                                value={amountRaised}
                                onChange={(e) => setAmountRaised(e.target.value)}

                            />

                            <br />

                            <button type="submit" className="btnclasssmae set-but-company mt-3">
                                Submit
                            </button>


                        </div>
                    </div>
                </form>
            </PopupModal>

        </>
    );
};

export default TotalActiveFunds;

