import React, { useState, useEffect } from "react";
import {
  getCurrentUserData,
} from "../../lib/session";
import { CheckUserApprovalStatus, reSubmitOTP } from "../../lib/frontendapi";
import Link from "next/link";
interface UserData {
  id?: number;
  approval_status?: string;
  role?: string;
}
const Thankyou = () => {
  const [investorStatus, setInvestorStatus] = useState("");
  const [role, setRole] = useState("");
  
  const current_user_data: UserData = getCurrentUserData();
  const checkUserStatus = async () => {
    try {
      const res = await CheckUserApprovalStatus(current_user_data.id);
      if (res.status === true) {
        console.log(res)
        if (res.data.is_email_verification_complete == 0) {
          reSubmitOTP(current_user_data.id)
          window.location.href = "/verify-email";
        }
        setInvestorStatus(res.data.approval_status);
        setRole(res.data.role);
        if (res.data.role === "investor") {
          if (res.data.investorType === "Regular Investor") {
            if (window.location.pathname !== "/investor/campaign") {
              window.location.href = "/investor/campaign";
            }
          } else if (
            res.data.approval_status === "approved" &&
            res.data.approval_status !== "pending" &&
            res.data.approval_status !== "reject"
          ) {
            if (window.location.pathname !== "/investor/campaign") {
              window.location.href = "/investor/campaign";
            }
          } else if (res.data.approval_status === "pending") {
            if (window.location.pathname !== "/investor/thank-you") {
              setTimeout(() => {
                window.location.reload();
              }, 10000);
            }
          } else {
            window.location.href = "/investor/thank-you";
          }
        }

        if (res.data.role === "startup") {
          if (
            res.data.approval_status === "approved" &&
            res.data.approval_status !== "pending" &&
            res.data.approval_status !== "reject"
          ) {
            if (window.location.pathname !== "/company/dashboard") {
              window.location.href = "/company/dashboard";
            }
          } else if (res.data.approval_status === "pending") {
            setTimeout(() => {
              window.location.reload();
            }, 10000);
          } else {
            setTimeout(() => {
              window.location.href = "/company/thank-you";
            }, 10000);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setInvestorStatus(current_user_data.approval_status || "");
    checkUserStatus();
    window.localStorage.removeItem("go_back_selected_options_document_upload");
    window.localStorage.removeItem("session_category");
    window.localStorage.removeItem("session_principal_residence");
    window.localStorage.removeItem("session_experience ");
    window.localStorage.removeItem("session_net_worth");
    window.localStorage.removeItem("session_prev_investment_exp");
    window.localStorage.removeItem("session_no_requirements");
    window.localStorage.removeItem("session_cofounder");
    window.localStorage.removeItem("session_annual_income");
    window.localStorage.removeItem("session_financial_net_worth");
    window.localStorage.removeItem("session_financial_annual_net_worth");
    window.localStorage.removeItem("session_foreign_annual_income");
    window.localStorage.removeItem("session_foreign_net_worth");
    window.localStorage.removeItem("session_foreign_annual_net_worth");
    window.localStorage.removeItem("session_corporate_net_worth");
    if (
      investorStatus === "approved" &&
      window.location.pathname !== "/investor/campaign" &&
      role !== "startup"
    ) {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/investor/campaign`;
    } else if (investorStatus === "pending" || investorStatus === "reject") {
      if (
        window.location.pathname !== "/investor/thank-you" &&
        role !== "startup"
      ) {
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/investor/thank-you`;
      }
    }
  }, [investorStatus]);

  return (
    <>
      {/* Start Error Area */}
      <section className="error-area mt-5">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="error-content">
                <h1>
                  thank <span className="color-span">you</span>
                </h1>
                <div className="bar" />
                <h3>Please Wait for verification!</h3>
                <p>
                  Your Profile has been completed successfully. Please wait for
                  the administrators level verification.Your request has been
                  received and is currently pending approval from our
                  administrators. We appreciate your patience and will respond
                  your request as soon as possible.
                </p>
                <Link
                  href={process.env.NEXT_PUBLIC_BASE_URL + "/"}
                  className="default-btn"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Error Area */}
    </>
  );
};

export default Thankyou;
