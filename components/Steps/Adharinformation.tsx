
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { useForm } from "react-hook-form";
import { getBankInformation,bankInformationSave } from "../../lib/frontendapi";
import {removeToken,removeStorageData,getCurrentUserData,} from "../../lib/session";


const alertStyle = {
  color: "red",
};
const textStyle = {
  textTransform: "capitalize",
};

interface UserData {
  id?: string;
}
export default function AdharInformation():any {
  const [blId, setBlId] = useState("");
  const [forwarduId, setForwarduId] = useState("");
  const [find_business_location, setFindBusinessLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [signup_success, setSignupSuccess] = useState(false);
  const [current_user_id, setCurrentUserId] = useState("");
  // const [current_business_id , setCurrentBusinessId ] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    user_id:current_user_id,
    // business_id :current_business_id ,
    bank_name: "",
    account_holder: "",
    account_no: "",
    ifsc_code: ""
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
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
        // business_id :current_business_id
      };
    });
  };
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");

        getBankInformation(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setBankDetails( res.data);
            console.log(res.data);
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

  
  const SubmitForm = async () => {
     try {
      const res = await bankInformationSave(bankDetails);
      if (res.status == true) {
        toast.success("Profile has been Updated Successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success",
        });
        setTimeout(() => {
          router.push("/company/thank-you");
        }, 1000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
      toast.error("Details has not been saved successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };


  const handleAdrChange = (find_business_location: any) => {
    setFindBusinessLocation(find_business_location);
  };

  const handleSelect = (find_business_location: any) => {
    setFindBusinessLocation(find_business_location);
  };
  
  

  if (signup_success) return router.push("/");

  return (
    <>
      <div className="page-title-area item-bg-5">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="page-title-content">
                <h2>Complete Account Details</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-bar">
        <div className="container">
          <div id="app">
            <ol className="step-indicator">
              <li className="">
                <div className="step_name">
                  Step <span>1</span>
                </div>
                <div className="step_border">
                <div className="step_complete">
                       <i className="flaticon-checked" style={{color:"#82b440"}} aria-hidden="true"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                  <span>PERSONAL INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>2</span>
                </div>
                <div className="step_border">
                <div className="step_complete">
                       <i className="flaticon-checked" style={{color:"#82b440"}} aria-hidden="true"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                  <span>BUSINESS INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>3</span>
                </div>
                <div className="step_border">
                  <div className="step_complete">
                       <i className="flaticon-checked"  aria-hidden="true"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                  <span>BASIC INFORMATION</span>
                </div>
              </li>
              <li className="active">
                <div className="step_name">
                  Step <span>4</span>
                </div>
                <div className="step_border">
                  <div className="step">
                  <img className="sidebar-img w-75" src="/assets/img/sidebar/bank.png"/>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BANK INFORMATION</span>
                </div>
              </li>
            </ol>
            <div className="container">
              <div className="register-form">
                <div className="row step_one">
                  <div className="col-md-12">
                    <form className="needs-validation mb-4" onSubmit={handleSubmit(SubmitForm)}>
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
                                <span className="text-mandatory" style={{color:""}}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input" 
                                id="bank_name" {...register("bank_name", {
                                 value:true, required: true,
                                })} name="bank_name"  onChange={handleChange}  value={bankDetails.bank_name}
                              />
                              {errors.bank_name &&
                                errors.bank_name.type === "required" && (
                                  <p
                                    className="text-danger"
                                     style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Your Bank Name.
                                  </p>
                                )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Account Holder's Name{" "}
                                <span className="text-mandatory">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="account_holder" {...register("account_holder", {
                                 value:true, required: true,
                                })}   value={bankDetails.account_holder}  name="account_holder" onChange={handleChange}  
                              />
                              {errors.account_holder &&
                                errors.account_holder.type === "required" && (
                                  <p
                                    className="text-danger"
                                     style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Your Account Holder Name.
                                  </p>
                                )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                 Account Number{" "}
                                <span className="text-mandatory">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input" maxLength={17}
                                id="account_no" {...register("account_no", {
                                 value:true, required: true,
                                })}   value={bankDetails.account_no}  name="account_no" onChange={handleChange}  
                              />
                               {errors.account_no &&
                                errors.account_no.type === "required" && (
                                  <p
                                    className="text-danger"
                                     style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Your Account Number.
                                  </p>
                                )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                IFSC Code{" "}
                                <span className="text-mandatory">*</span>
                              </label>
                              <input
                                type="text" maxLength={11}
                                className="form-control same-input"
                                id="ifsc_code" {...register("ifsc_code", {
                                 value:true, required: true,max:11
                                })}   value={bankDetails.ifsc_code}  name="ifsc_code" onChange={handleChange}
                              />
                               {errors.ifsc_code  && (
                                  <p
                                    className="text-danger"
                                     style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Your valid IFSC Code.
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6"  style={{ textAlign: "left", fontSize: "12px" }}>
                            <a
                              href={`/steps/customizereview`}
                              className="btn btn-primary" id="back"
                            >
                              Go back
                            </a>
                            </div>

                            <div
                              className="col-md-6"
                              style={{ textAlign: "right" }}
                            >
                              <button type="submit" className="btn btn-primary">
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
