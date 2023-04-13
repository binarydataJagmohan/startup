import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { useForm } from "react-hook-form";
import { basicInformationSave } from "../../lib/frontendapi";
import {
  removeToken,
  removeStorageData,
  getCurrentUserData,
} from "../../lib/session";

const alertStyle = {
  color: "red",
};
const textStyle = {
  textTransform: "capitalize",
};

interface UserData {
  id: number;
}
export default function customereview() {
  const [blId, setBlId] = useState("");
  const [forwarduId, setForwarduId] = useState("");
  const [find_business_location, setFindBusinessLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [signup_success, setSignupSuccess] = useState(false);
  const [current_user_id, setCurrentUserId] = useState(false);
  const [basicDetails, setBasicDetails] = useState({
    id: current_user_id,
    pan_number: "",
    uid: "",
    proof_img: "",
    dob: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBasicDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
        id: current_user_id,
        // business_id :current_business_id
      };
    });
  };
  useEffect(() => {
    const current_user_data = getCurrentUserData();
    if (current_user_data.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");
    } else {
      window.location.href = "/login";
    }
  }, []);

  const SubmitForm = async (event: any) => {
    // event.preventDefault();

    try {
      const res = await basicInformationSave(basicDetails);
      if (res.status == true) {
        toast.success("Basic Details saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success",
        });
        setTimeout(() => {
          router.push("/steps/adharinformation");
        }, 2000);
      } else {
        toast.error("Basic Details has not been saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
      toast.error("Basic Details has not been saved successfully", {
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

  if (signup_success) return router.push("/steps/businessinfo");

  return (
    <>
      <div className="page-title-area item-bg-5">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="page-title-content">
                <h2>Complete Account Details</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                </ul>
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
                  <div className="step">
                    <i className="fa fa-circle"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>PERSONAL INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>2</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <i className="fa fa-circle"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BUSINESS INFORMATION</span>
                </div>
              </li>
              <li className="active">
                <div className="step_name">
                  Step <span>3</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <i className="fa fa-circle"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BASIC INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>4</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <i className="fa fa-circle"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BANK INFORMATION</span>
                </div>
              </li>
            </ol>
            <div className="container">
              <div className="register-form">
                {/*<h4 className="text-center mt-5">Find your business</h4>*/}
                <div className="row step_one">
                  <div className="col-md-12">
                    <form
                      className="needs-validation mb-4"
                      onSubmit={handleSubmit(SubmitForm)}
                      encType="multipart/form-data"
                    >
                      <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                        Basic Details
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Please type in your full business name into the field below. This would be your registered company name."
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
                                Pan Card Number{" "}
                                <span className="text-mandatory">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="pan_number"
                                {...register("pan_number", {
                                  required: true,
                                })}
                                name="pan_number"
                                onChange={handleChange}
                                maxLength={10}
                              />
                              <div className="help-block with-errors" />
                              {errors.pan_number &&
                                errors.pan_number.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left" }}
                                  >
                                    *Please Enter Your Valid Pan Card Number.
                                  </p>
                                )}
                            </div>

                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Adhaar Card Number{" "}
                                <span className="text-mandatory">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="uid"
                                {...register("uid", {
                                  required: true,
                                })}
                                name="uid"
                                onChange={handleChange}
                                maxLength={12}
                              />
                              <div className="help-block with-errors" />
                              {errors.uid && errors.uid.type === "required" && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left" }}
                                >
                                  *Please Enter Your Valid Adhaar Card Number.
                                </p>
                              )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                DOB <span className="text-mandatory">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="dob"
                                {...register("dob", {
                                  required: true,
                                })}
                                name="dob"
                                onChange={handleChange}
                                placeholder="DD/MM/YY"
                              />
                              <div className="help-block with-errors" />
                              {errors.dob && errors.dob.type === "required" && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left" }}
                                >
                                  *Please Enter Your Valid Date Of Birth.
                                </p>
                              )}
                            </div>
                            <div className="col-md-6 mt-5">
                              <div
                                id="divHabilitSelectors"
                                className="input-file-container"
                              >
                                <input
                                  className="input-file"
                                  id="proof_img"
                                  type="file"
                                  {...register("proof_img", {
                                    required: true,
                                  })}
                                  name="proof_img"
                                  onChange={handleChange}
                                />

                                <label
                                  htmlFor="fileupload"
                                  className="input-file-trigger"
                                  id="labelFU"
                                  tabIndex={0}
                                >
                                  Drop your pitch deck here to{" "}
                                  <a href="#">Upload</a> <br />
                                  <p>
                                    You can upload any identity card's image
                                    jpg,png,jpeg file only (max size 20 MB)
                                  </p>
                                </label>
                                <div className="help-block with-errors" />
                                {errors.proof_img &&
                                  errors.proof_img.type === "required" && (
                                    <p
                                      className="text-danger"
                                      style={{ textAlign: "left" }}
                                    >
                                      *Please Enter Your Valid Date Of Birth.
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="banner-btn justify-content-between d-md-flex mt-5 mb-5">
                            <a
                              href={`/steps/businessinfo`}
                              className="default-btn"
                            >
                              Go back
                            </a>
                            <button type="submit" className="default-btn">
                              NEXT
                            </button>
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
        <ToastContainer autoClose={5000} />
      </div>
    </>
  );
}
