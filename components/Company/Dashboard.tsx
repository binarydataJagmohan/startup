import React, { useEffect, useState } from 'react'
import { getCurrentUserData, } from "../../lib/session";
import { CheckUserApprovalStatus, getBusinessInformation } from "../../lib/frontendapi";
import { getTotalCountOfFunds, getTotalCountOfUnits } from '../../lib/companyapi'

interface UserData {
    id?: string;
}
const Dashboard = () => {
    const [current_user_id, setCurrentUserId] = useState("");
    const [totalFundCount, setFundCount] = useState("");
    const [totalUnitsCount, setUnits] = useState<any>({});
    const [bussiness, setBussinessData] = useState({
        id: "",
        business_name: "",
        reg_businessname: "",
        website_url: "",
        sector: "",
        stage: "",
        startup_date: "",
        tagline: "",
        logo: "",
        type: "",
        description: "",
        cofounder: "0",
        kyc_purposes: "0",
        user_id: "",
    });
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data.id != null) {
            current_user_data.id
                ? setCurrentUserId(current_user_data.id)
                : setCurrentUserId("");
        } else {
            window.location.href = "/login";
        }

        getBusinessInformation(current_user_data.id)
            .then((res) => {
                if (res.status == true) {
                    // Set the businessUnits state
                    setBussinessData(res.data);
                    getTotalCountOfFunds(res.data.id)
                        .then((fundRes) => {
                            if (fundRes.status === true) {
                                setFundCount(fundRes.data);
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                        });

                    getTotalCountOfUnits(res.data.id)
                        .then((unitsRes) => {
                            if (unitsRes.status === true) {
                                setUnits(unitsRes.data);
                            }
                        })
                        .catch((err) => {

                        });
                }
            })
            .catch((err) => {
                console.error(err);
            });

        const checkUserStatus = async () => {
            try {
                const res = await CheckUserApprovalStatus(current_user_data.id);
                if (res.status === true && res.data.role === "startup") {
                    if (res.data.approval_status === "pending" || res.data.approval_status === "reject") {
                        window.location.href = "/company/thank-you";
                    } else if (res.data.approval_status === "approved") {
                        if (window.location.pathname !== '/company/dashboard') {
                            window.location.href = "/company/dashboard";
                        }
                        // setTimeout(() => {
                        //   window.location.reload();
                        // }, 10000); 
                    } else {
                        window.location.href = "/company/thank-you";
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };


        checkUserStatus();
    }, []);

    return (
        <>
            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">Dashboard</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item active">
                                            Welcome to Startup Dashboard
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            {/* <div className="col-xl-3 col-md-6">
                            <div className="card mini-stat bg-primary text-white">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <h5 className="font-size-16 text-uppercase text-white-50">
                                            Total Revenue
                                        </h5>
                                        <h4 className="fw-medium font-size-24">
                                            1,685 <i className="mdi mdi-arrow-up text-success ms-2" />
                                        </h4>
                                        <div className="mini-stat-label bg-success">
                                            <p className="mb-0">+ 12%</p>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="float-end">
                                            <a href="#" className="text-white-50">
                                                <i className="mdi mdi-arrow-right h5 text-white-50" />
                                            </a>
                                        </div>
                                        <p className="text-white-50 mb-0 mt-1">Since last month</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            <div className="col-xl-4 col-md-6">
                                <div className="card mini-stat bg-primary text-white">
                                    <div className="card-body">
                                        <div className="mb-4">
                                            {/* <div className="float-start mini-stat-img me-4">
                                            <img src="assets/images/services-icon/02.png" alt="" />
                                        </div> */}
                                            <h5 className="font-size-16 text-uppercase text-white-50">
                                                Total Funds
                                            </h5>
                                            <h4 className="fw-medium font-size-24">
                                                {totalFundCount}<i className="mdi mdi-arrow-down text-danger ms-2" />
                                            </h4>
                                            {/* <div className="mini-stat-label bg-danger">
                                            <p className="mb-0">- 28%</p>
                                        </div> */}
                                        </div>
                                        <div className="pt-2">
                                            <div className="float-end">
                                                <a href="#" className="text-white-50">
                                                    <i className="mdi mdi-arrow-right h5 text-white-50" />
                                                </a>
                                            </div>
                                            <p className="text-white-50 mb-0 mt-1">Since last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card mini-stat bg-primary text-white">
                                    <div className="card-body">
                                        <div className="mb-4">
                                            {/* <div className="float-start mini-stat-img me-4">
                                            <img src="assets/images/services-icon/03.png" alt="" />
                                        </div> */}
                                            <h5 className="font-size-16 text-uppercase text-white-50">
                                                Total Units
                                            </h5>
                                            <h4 className="fw-medium font-size-24">
                                                {totalUnitsCount && totalUnitsCount.total_units ? (
                                                    <>{totalUnitsCount.total_units}</>
                                                ) : (
                                                    "0"
                                                )}<i className="mdi mdi-arrow-up text-success ms-2" />
                                            </h4>
                                            {/* <div className="mini-stat-label bg-info">
                                            <p className="mb-0"> 00%</p>
                                        </div> */}
                                        </div>
                                        <div className="pt-2">
                                            <div className="float-end">
                                                <a href="#" className="text-white-50">
                                                    <i className="mdi mdi-arrow-right h5 text-white-50" />
                                                </a>
                                            </div>
                                            <p className="text-white-50 mb-0 mt-1">Since last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card mini-stat bg-primary text-white">
                                    <div className="card-body">
                                        <div className="mb-4">
                                            {/* <div className="float-start mini-stat-img me-4">
                                            <img src="assets/images/services-icon/04.png" alt="" />
                                        </div> */}
                                            <h5 className="font-size-16 text-uppercase text-white-50">
                                                Units Sold
                                            </h5>
                                            <h4 className="fw-medium font-size-24">
                                            {totalUnitsCount && totalUnitsCount.no_of_units ? (
                                                    <>{totalUnitsCount.no_of_units}</>
                                                ) : (
                                                    "0"
                                                )}<i className="mdi mdi-arrow-up text-success ms-2" />
                                            </h4>
                                            {/* <div className="mini-stat-label bg-warning">
                                            <p className="mb-0">+ 84%</p>
                                        </div> */}
                                        </div>
                                        <div className="pt-2">
                                            <div className="float-end">
                                                <a href="#" className="text-white-50">
                                                    <i className="mdi mdi-arrow-right h5 text-white-50" />
                                                </a>
                                            </div>
                                            <p className="text-white-50 mb-0 mt-1">Since last month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end row */}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
            </div>
        </>
    )
}

export default Dashboard