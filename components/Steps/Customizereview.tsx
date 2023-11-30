import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import Image from 'next/image';
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
  const [startUpLogoError, setStartupLogoError] = useState('');
  const [startUpLogoName, setStartupLogoName] = useState('');
  const [startUpLogoSizeError, setStartupLogoSizeError] = useState('');
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

  const handleUploadClick = (event: any) => {
    event.preventDefault();
    setMissingFields([])
    if (fileInputRef.current !== null) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  const handleFileChange = (event: any) => {
    setMissingFields([]);
    const selectedFile = event.target.files[0];
    setProofImg(selectedFile);

    if (selectedFile) {
      const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const maxSize = 20 * 1024 * 1024;

      if (allowedTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= maxSize) {
          setImageUploadStatus('success');
          setProofImg(selectedFile);
          setStartupLogoName(selectedFile.name);
          setStartupLogoSizeError('');
          setStartupLogoError('');
        } else {
          setStartupLogoSizeError('* Please upload a file that is no larger than 20 MB.');
        }
      } else {
        setStartupLogoError('* Please upload a PDF, PPT, or DOC file');
        event.target.value = null;
      }
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
      } else if (!basicDetails.proof_img) {
        setMissingFields(prevFields => [...prevFields, "pitch_deck"]);
      }
      formData.append("user_id", basicDetails.user_id);
      formData.append("pan_number", basicDetails.pan_number);
      formData.append("uid", basicDetails.uid);
      formData.append("dob", basicDetails.dob);
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
      <div className="left-bar">
        <div className="container">
          <div id="app">
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
                                Aadhaar Card Number{" "}
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
                                  *Please Enter Aadhaar Card Number.
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
                              //max={`${new Date().getFullYear() - 18}-12-31`}
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
                            <div className="col-md-6 mt-3">
                              <div
                                id="divHabilitSelectors"
                                className="input-file-container "
                              >
                                <label>
                                  Identity card
                                  {/* <span style={{ color: "red" }}>*</span> */}
                                </label>
                                <div className="file-upload">
                                  <div className="file-select">
                                    <div
                                      className="file-select-button"
                                      id="fileName"
                                    >
                                      Choose File
                                    </div>
                                    <div className="file-select-name" id="noFile">
                                      {startUpLogoName ? startUpLogoName : (basicDetails.proof_img ? basicDetails.proof_img.substring(0, 20) + '.....' : "No File Chosen ...")}
                                    </div>
                                    <input
                                      ref={fileInputRef}
                                      id="proof_img"
                                      type="file"
                                      accept=".pdf, .ppt, .pptx, .doc, .docx"
                                      name="proof_img"
                                      onChange={handleFileChange}
                                    />
                                  </div>
                                </div>
                                <label
                                  htmlFor="fileupload"
                                  className="input-file-trigger mt-1"
                                  id="labelFU"
                                  style={{ fontSize: "12px", marginLeft: "12px" }}
                                  tabIndex={0}
                                >
                                  <p style={{ fontSize: "13px" }}>
                                    You can upload any ppt,pdf,docs format only (max size 20 MB)
                                    {/* <span style={{ color: "red" }}>*</span> */}
                                  </p>
                                </label>
                                {startUpLogoSizeError ? (
                                  <p className='text-danger'>{startUpLogoSizeError}</p>
                                ) : (
                                  startUpLogoError && <p className='text-danger'>{startUpLogoError}</p>
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
