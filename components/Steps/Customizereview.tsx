import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { basicInformationSave, getBasicInformation, getSingleUserData } from "../../lib/frontendapi";
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
  id?: string;
}
export default function Customereview(): any {
  const [blId, setBlId] = useState("");
  const [forwarduId, setForwarduId] = useState("");
  const [find_business_location, setFindBusinessLocation] = useState("");
  const [lat, setLat] = useState("");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [imageUploadStatus, setImageUploadStatus] = useState<null | 'success'>(null);
  const [lng, setLng] = useState("");
  const [signup_success, setSignupSuccess] = useState(false);
  const [current_user_id, setCurrentUserId] = useState("");
  const [proof_img, setProofImg] = useState(null);
  const [users, setUsers] = useState<any>({});
  const [basicDetails, setBasicDetails] = useState({
    user_id: current_user_id,
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (event:any) => {
    event.preventDefault();
    setMissingFields([])
    if (fileInputRef.current !== null) {
      (fileInputRef.current as HTMLInputElement).click(); 
    }
  };

  const handleFileChange = (event: any) => {
    setMissingFields([])
    const selectedFile = event.target.files[0];
    setProofImg(selectedFile);
    
    if (selectedFile) {
      setTimeout(() => {
        setImageUploadStatus('success');
      }, 2000);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    if (name === 'uid') {
      // Remove all non-digit characters from value
      value = value.replace(/\D/g, '');
      // Limit the length of value to 12 characters
      value = value.substring(0, 12);
    }

    setBasicDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
        user_id: current_user_id,
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


      getBasicInformation(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setBasicDetails(res.data);
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

      const formData = new FormData();
      if (proof_img !== null) {
        formData.append('proof_img', proof_img);
      }else if(!basicDetails.proof_img){
        setMissingFields(prevFields => [...prevFields, "image"]);
      }
      formData.append("user_id", basicDetails.user_id);
      formData.append("pan_number", basicDetails.pan_number);
      formData.append("uid", basicDetails.uid);
      formData.append("dob", basicDetails.dob);
      console.log(formData);
      const res = await basicInformationSave(formData);
      if (res.status == true) {
        // toast.success(res.message, {
        //   position: toast.POSITION.TOP_RIGHT,
        //   toastId: "success",
        // });
        setTimeout(() => {
          router.push("/steps/adharinformation");
        }, 1000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err: any) {
      toast.error(err, {
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
      {/* <div className="page-title-area item-bg-5">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="page-title-content">
                <h2>Complete Account Details</h2>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
                    <i className="flaticon-checked" style={{ color: "#82b440" }} aria-hidden="true"></i>
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
                    <i className="flaticon-checked" style={{ color: "#82b440" }} aria-hidden="true"></i>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                  <span>BUSINESS INFORMATION</span>
                </div>
              </li>
              <li className="active">
                <div className="step_name">
                  Step <span>3</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img className="sidebar-img w-75" src="/assets/img/sidebar/docs.png" />
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BASIC INFORMATION</span>
                </div>
              </li>
              {/* <li className="">
                <div className="step_name">
                  Step <span>4</span>
                </div>
                <div className="step_border">
                <div className="step">
                  <img className="sidebar-img w-75" src="/assets/img/sidebar/bank.png"/>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>DOCUMENTS UPLOAD</span>
                </div>
              </li> */}
              <li className="">
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
              <div className="register-form regis">
                <div className="row step_one">
                  <div className="col-md-12">
                    <form
                      className="needs-validation mb-4"
                      onSubmit={handleSubmit(SubmitForm)}
                      encType="multipart/form-data"
                    >
                      <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                        Basic Details{" "}
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Please type in your full basics required details into the field below. This would be your registered company name."
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
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="pan_number"
                                {...register("pan_number", {
                                  value: true, required: true,
                                })}
                                value={basicDetails.pan_number}
                                name="pan_number"
                                onChange={handleChange}
                                maxLength={10}
                              />
                              <div className="help-block with-errors" />
                              {errors.pan_number &&
                                errors.pan_number.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Pan Card Number.
                                  </p>
                                )}
                            </div>

                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Adhaar Card Number{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="uid"
                                {...register("uid", {
                                  value: true, required: true
                                })}
                                value={basicDetails.uid}
                                name="uid"
                                onChange={handleChange}
                                maxLength={12}
                              />
                              <div className="help-block with-errors" />
                              {errors.uid && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Enter Adhaar Card Number.
                                </p>
                              )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                DOB  <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control same-input"
                                id="dob"
                                {...register("dob", {
                                  value: true, required: true,
                                })}
                                value={basicDetails.dob}
                                name="dob"
                                onChange={handleChange}
                                placeholder="basicDetails.dob ? '' : 'DD/MM/YY'" min={`${new Date().getMonth() - 18}-01-01`}
                                max={`${new Date().getFullYear() - 18}-12-31`}
                              />
                              <div className="help-block with-errors" />
                              {errors.dob && errors.dob.type === "required" && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Enter Your Date Of Birth.
                                </p>
                              )}
                            </div>
                            <div className="col-md-6 mt-5">
                              <div
                                id="divHabilitSelectors"
                                className="input-file-container"
                              >
                                <input
                                  ref={fileInputRef}
                                  className="input-file class-unset"
                                  id="proof_img"
                                  type="file"
                                  // {...register("proof_img", {
                                  //   value: true, required: ! basicDetails.proof_img,
                                  // })}
                                  accept="image/jpeg, image/png"
                                  name="proof_img"
                                  onChange={handleFileChange}
                                />

                                <label
                                  htmlFor="fileupload"
                                  className="input-file-trigger"
                                  id="labelFU"
                                  tabIndex={0}
                                >
                                  Drop your pitch deck here to{" "}
                                  <a href="#" onClick={handleUploadClick}>Upload</a> <br />
                                  <p>
                                    You can upload any identity card's image
                                    jpg,png,jpeg file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                  </p>
                                </label>
                                <div className="help-block with-errors" />
                                { missingFields.includes('image') && (
                                   <p
                                   className="text-danger"
                                   style={{ textAlign: "left", fontSize: "12px" }}
                                 >
                                   *Please upload Your Proof.
                                 </p>
                                ) }
                                {/* {errors.proof_img && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please upload Your Proof.
                                  </p>
                                )} */}
                                {(imageUploadStatus === 'success' || !errors.proof_img && basicDetails.proof_img) && (
                                  <p className="text-success" style={{ textAlign: "left", fontSize: "12px" }}>
                                    Image Uploaded Successfully.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6" style={{ textAlign: "left", fontSize: "12px" }}>
                              <Link
                                href={`/steps/businessinfo`}
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
                                NEXT
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
        <ToastContainer autoClose={5000} />
      </div>
    </>
  );
}
