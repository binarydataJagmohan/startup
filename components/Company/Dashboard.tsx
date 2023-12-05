import React, { useEffect, useState } from "react";
import { getCurrentUserData } from "../../lib/session";
import {
  CheckUserApprovalStatus,
  getBusinessInformation,
} from "../../lib/frontendapi";
import { useRouter } from "next/router";
import {
  getTotalCountOfFunds,
  getTotalCountOfUnits,
} from "../../lib/companyapi";

interface UserData {
  id?: string;
  role?: any;
}
const Dashboard = () => {
  const [totalFundCount, setFundCount] = useState("");
  const [totalUnits, setTotalUnits] = useState('');
  const router = useRouter();

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data.role !== 'startup') {
      router.back();
    }
    getBusinessInformation(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          // Set the businessUnits state
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
                setTotalUnits(unitsRes.data);
              }
            })
            .catch((err) => { });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    const checkUserStatus = async () => {
      try {
        const res = await CheckUserApprovalStatus(current_user_data.id);
        if (res.status === true && res.data.role === "startup") {
          if (
            res.data.approval_status === "pending" ||
            res.data.approval_status === "reject"
          ) {
            window.location.href = "/company/thank-you";
          } else if (res.data.approval_status === "approved") {
            if (window.location.pathname !== "/company/dashboard") {
              window.location.href = "/company/dashboard";
            }
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
      <div className="main-content">
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
              <div className="col-xl-4 col-md-6">
                <div
                  className="card mini-stat  dashcard"
                  style={{ background: "#088395", color: "white" }}
                >
                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="font-size-16 text-uppercase text-white">
                        Total Funds
                      </h5>
                      <h4 className="fw-medium font-size-24">
                        {totalFundCount}
                        <i className="fa fa-chart-line text-success ms-2 text-white" />
                      </h4>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <a
                          href={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            "company/all-fund-raise-list"
                          }
                          className=""
                        >
                          <i className="mdi mdi-arrow-right h5 text-white" />
                        </a>
                      </div>
                      <p className=" mb-0 mt-1 text-white">Since last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div
                  className="card mini-stat  dashcard"
                  style={{ background: "#088395", color: "white" }}
                >
                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="font-size-16 text-uppercase text-white">
                        Total Units
                      </h5>
                      <h4 className="fw-medium font-size-24">
                        {Array.isArray(totalUnits) && totalUnits.length > 0 ? (
                          totalUnits.reduce((sum, item) => sum + parseInt(item.total_units, 10), 0)
                        ) : (
                          '0'
                        )}
                        <i className="fa fa-chart-line text-success ms-2 text-white" />
                      </h4>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <a
                          href={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            "company/all-fund-raise-list"
                          }
                          className=""
                        >
                          <i className="mdi mdi-arrow-right h5 text-white" />
                        </a>
                      </div>
                      <p className=" mb-0 mt-1 text-white">Since last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div
                  className="card mini-stat  dashcard"
                  style={{ background: "#088395", color: "white" }}
                >
                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="font-size-16 text-uppercase text-white">
                        Units Sold
                      </h5>
                      <h4 className="fw-medium font-size-24">
                        {Array.isArray(totalUnits) && totalUnits.length > 0 ? (
                          (totalUnits.reduce((sum, item) => sum + parseInt(item.total_units, 10), 0)) - (totalUnits.reduce((sub, item) => sub + parseInt(item.no_of_units, 10), 0))
                        ) : (
                          '0'
                        )}
                        <i className="fa fa-chart-line text-success ms-2 text-white" />
                      </h4>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <a
                          href={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            "company/all-fund-raise-list"
                          }
                          className=""
                        >
                          <i className="mdi mdi-arrow-right h5 text-white" />
                        </a>
                      </div>
                      <p className=" mb-0 mt-1 text-white">Since last month</p>
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
  );
};

export default Dashboard;
