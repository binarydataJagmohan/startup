
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { getBankInformation, bankInformationSave } from "../../lib/frontendapi";
import {  getCurrentUserData, } from "../../lib/session";
import { getSingleUserData } from '@/lib/frontendapi';
import Link from 'next/link';

interface UserData {
  id?: string;
  name?: string;
  role?: any;
}
export default function AdharInformation(): any {  
  const [signup_success, setSignupSuccess] = useState(false);
  const [current_user_id, setCurrentUserId] = useState("");
  const [users, setUsers] = useState<any>({});
  const [bankDetails, setBankDetails] = useState({
    user_id: current_user_id,
    bank_name: "",
    account_holder: "",
    account_no: "",
    ifsc_code: ""
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    if (name === 'account_no') {
      value = value.replace(/\D/g, '');
      value = value.substring(0, 12);
    }
    setBankDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
        id: current_user_id,
        user_id: current_user_id
        // business_id :current_business_id
      };
    });
  };
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();       
    if (current_user_data.role !== 'startup') {
        router.back();
    }   
    if (current_user_data.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");

      getSingleUserData(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setUsers(res.data);
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });

      getBankInformation(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setBankDetails(res.data);
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

  const SubmitForm = async (event:any) => {
    event.preventDefault();
    try {

      const res = await bankInformationSave(bankDetails);
      toast.success("Basic details stored successfully.", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "success",
      });
      const current_user_data: UserData = getCurrentUserData();
      getSingleUserData(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            if (users.approval_status === 'approved') {
              setTimeout(() => {
                router.push("/company/dashboard");
              }, 1000);
            } else {
              setTimeout(() => {
                router.push("/steps/documentsupload");
              }, 1000);

            }
          }
        })
    } catch (err: any) {
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };

  if (signup_success) return router.push("/");

  return (
    <>
      <div className="left-bar">
        <div className="container">
          <div id="app">
            <div className="container">
              <div className="register-form">
                <div className="row step_one">
                  <div className="col-md-12">
                    {/* <form className="needs-validation mb-4" onSubmit={handleSubmit(SubmitForm)}> */}
                    <form className="needs-validation mb-4" onSubmit={SubmitForm}>
                      <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                        Bank Details{" "}
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Please type in your full bank details into the field below. This would be your registered company name."
                        ></i>
                      </h4>
                      <div className="row justify-content-center">
                        <div className="col-md-8" id="register">
                          <div className="row">
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Bank Name{" "}
                                {/* <span style={{ color: "red" }}>*</span> */}
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="bank_name" name="bank_name" onChange={handleChange} value={bankDetails.bank_name}
                              />
      
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Account Holder's Name{" "}
                                {/* <span style={{ color: "red" }}>*</span> */}
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="account_holder" value={bankDetails.account_holder} name="account_holder" onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Account Number{" "}
                                {/* <span style={{ color: "red" }}>*</span> */}
                              </label>
                              <input
                                type="text"
                                className="form-control same-input" maxLength={16}
                                id="account_no" value={bankDetails.account_no} name="account_no" onChange={handleChange}
                              />
    
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                IFSC Code{" "}
                                {/* <span style={{ color: "red" }}>*</span> */}
                              </label>
                              <input
                                type="text" maxLength={11}
                                className="form-control same-input"
                                id="ifsc_code" value={bankDetails.ifsc_code} name="ifsc_code" onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6" style={{ textAlign: "left", fontSize: "12px" }}>
                              <Link
                                href={`/steps/customizereview `}
                                className="btnclasssmae" id="back"
                              >
                                Go back
                              </Link>
                            </div>

                            <div
                              className="col-md-6"
                              style={{ textAlign: "right" }}
                            >
                              <button type="submit" className="btnclasssmae">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}
