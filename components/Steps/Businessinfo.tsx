import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { businessInfoSave, getBusinessInformation } from "../../lib/frontendapi";
import Link from 'next/link';
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
export default function Businessinfo(): any {
  const router = useRouter();
  const [blId, setBlId] = useState("");
  const [forwarduId, setForwarduId] = useState("");
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const [current_user_id, setCurrentUserId] = useState("");
  const [business_name, setBusinessName] = useState("");

  const [signup_success, setSignupSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadLogo = (event: any) => {
    event.preventDefault();
    // setMissingFields([])
    if (fileInputRef.current !== null) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };
  const fileInputPitchDeck = useRef<HTMLInputElement>(null);
  const handleUploadPitchDeck = (event: any) => {
    event.preventDefault();
    // setMissingFields([])
    if (fileInputPitchDeck.current !== null) {
      (fileInputPitchDeck.current as HTMLInputElement).click();
    }
  };
  const [pichDeckError, setPichDeckError] = useState('');
  const [pichDeckSizeError, setPichDeckSizeError] = useState('');
  const [startUpLogoError, setStartupLogoError] = useState('');
  const [startUpLogoSizeError, setStartupLogoSizeError] = useState('');
  const [pitch_deck, setPichDeck] = useState(null);
  const [logo, setLogo] = useState('');
  const [logoName, setLogoName] = useState('');
  const [pitchDeckName, setPitchDeckName] = useState('');
  const handleLogoChange = (event: any) => {
    setMissingFields([])
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setLogo(event.target.files[0]);
          setLogoName(file.name);
          setStartupLogoSizeError('');
          setStartupLogoError('');
        } else {
          setStartupLogoSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setStartupLogoError('* Please upload a JPG or PNG file');
        event.target.value = null;
      }
    }

  };
  const handlePitchDeckChange = (event: any) => {
    setMissingFields([]);
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const maxSize = 20 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setPichDeck(event.target.files[0]);
          setPitchDeckName(file.name);
          setPichDeckError('');
          setPichDeckSizeError('');
        } else {
          setPichDeckSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setPichDeckError('* Please upload a PDF, PPT, or DOC file');
        event.target.value = null;
      }
    }

  };
  const [businessDetails, setBusinessDetails] = useState({
    user_id: current_user_id,
    business_name: "",
    reg_businessname: "",
    website_url: "",
    sector: "",
    stage: "",
    startup_date: "",
    tagline: "",
    logo: "",
    pitch_deck: "",
    type: "",
    description: "",
    cofounder: "0",
    kyc_purposes: "0",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setMissingFields([]);
    if (type === 'checkbox' && name === 'cofounder') {
      // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
      const cofounderValue = checked ? '1' : '0';
      setBusinessDetails((prevState) => {
        return {
          ...prevState,
          cofounder: cofounderValue,
          user_id: current_user_id,
        };
      });
    } else if (type === 'checkbox' && name === 'kyc_purposes') {
      // Set the value of kyc_purposes to '1' if the checkbox is checked, '0' otherwise
      const kycValue = checked ? '1' : '0';
      setBusinessDetails((prevState) => {
        return {
          ...prevState,
          kyc_purposes: kycValue,
          user_id: current_user_id,
        };
      });
    } else {
      setBusinessDetails((prevState) => {
        return {
          ...prevState,
          [name]: value,
          user_id: current_user_id,
        };
      });
    }
  };

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data.id) {
      setCurrentUserId(current_user_data.id);
      getBusinessInformation(current_user_data.id)
        .then((res) => {
          if (res.status === true) {
            setBusinessDetails(res.data);

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

      if (!businessDetails.sector) {
        setMissingFields(prevFields => [...prevFields, "sector"]);
      }
      if (!businessDetails.stage) {
        setMissingFields(prevFields => [...prevFields, "stage"])
      }
      if (!businessDetails.type) {
        setMissingFields(prevFields => [...prevFields, "type"])
      }
      // if (!pitch_deck && !businessDetails.pitch_deck) {
      //   setMissingFields(prevFields => [...prevFields, "pitch_deck"])
      // }
      const formData = new FormData();
      if (logo !== null) {
        formData.append('logo', logo);
      }
      if (pitch_deck !== null) {
        formData.append('pitch_deck', pitch_deck);
      }
      formData.append("user_id", businessDetails.user_id);
      formData.append("business_name", businessDetails.business_name);
      formData.append("reg_businessname", businessDetails.reg_businessname);
      formData.append("website_url", businessDetails.website_url);
      formData.append("sector", businessDetails.sector);
      formData.append("stage", businessDetails.stage);
      formData.append("startup_date", businessDetails.startup_date);
      formData.append("tagline", businessDetails.tagline);
      formData.append("description", businessDetails.description);
      formData.append("cofounder", businessDetails.cofounder);
      formData.append("kyc_purposes", businessDetails.kyc_purposes);
      const res = await businessInfoSave(formData);

      if (res.status === true) {
        setTimeout(() => {
          router.push("/steps/customizereview");
        }, 1000);
      } else {
        toast.error(res.msg, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
    }
  };

  if (signup_success) return router.push("/steps/customizereview");
  return (
    <>
      <div className="left-bar">
        <div className="container">
          <div id="app">
            <div className="container">
              <div className="register-form ">
                <div className="row step_one">
                  <div className="col-md-12">
                    <form className="needs-validation mb-4" encType="multipart/form-data" onSubmit={handleSubmit(SubmitForm)}>
                      <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                        {" "}
                        Business Information{" "}
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Please type in your full business details into the field below. This would be your registered company name."
                        ></i>
                      </h4>
                      <div className="row justify-content-center">
                        <div className="col-md-8" id="register">
                          <div className="row">
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="business_name"
                                className="form-label"
                              >
                                Name of Startup{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="business_name"
                                {...register("business_name", {
                                  value: true,
                                  required: true,
                                })} name="business_name" onChange={handleChange} value={businessDetails.business_name}
                              />
                              {errors.business_name &&
                                errors.business_name.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Company Name.
                                  </p>
                                )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="reg_businessname"
                                className="form-label"
                              >
                                Registered name of Startup
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="reg_businessname"
                                {...register("reg_businessname", {
                                  onChange: handleChange, value: true,
                                  required: true,
                                })}
                                name="reg_businessname" value={businessDetails.reg_businessname}
                              />
                              {errors.reg_businessname &&
                                errors.reg_businessname.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter  Registered Company Name.
                                  </p>
                                )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="website_url"
                                className="form-label"
                              >
                                Website URL
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="website_url"
                                {...register("website_url", {
                                  onChange: handleChange,
                                  required: true,
                                  pattern: {
                                    value: /^(https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                                    message: "Please enter a valid website URL"
                                  }
                                })}
                                name="website_url"
                                value={businessDetails.website_url}
                              />
                              {errors.website_url && (
                                <p className="text-danger">
                                  {errors.website_url.type === "required"
                                    ? "*Please enter the company's website URL."
                                    : "*Please enter a valid company's website URL."}
                                </p>
                              )}


                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="sector"
                                className="form-label mb-4"
                              >
                                Sector of Startup
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                className="form-select form-select-lg mb-3 css-1492t68"
                                aria-label="Default select example"
                                {...register("sector", {
                                  // validate: (value) => value != "", required: true,
                                  onChange: handleChange
                                })}
                                name="sector" value={businessDetails ? businessDetails.sector : ""}
                              >
                                <option value="">--SELECT SECTOR--</option>

                                <option value="E-commerce">E-commerce</option>
                                <option value="Food & Restaurents Startups">Food  & Restaurents Startups</option>
                                <option value="App Development">App Development</option>
                                <option value="IT/Technologies">IT/Technologies</option>
                                <option value="AI and Machine Learning">AI and Machine Learning</option>
                                <option value="Web Development">Web Development</option>
                                <option value="FinTech (Financial Technology)">FinTech (Financial Technology)</option>
                                <option value="HealthTech (Healthcare Technology)">HealthTech (Healthcare Technology)</option>
                                <option value="EdTech (Education Technology)">EdTech (Education Technology)</option>
                                <option value="Real Estate & PropTech (Property Technology)">Real Estate & PropTech (Property Technology)</option>
                                <option value="Agriculture Startups">Agriculture Startups</option>
                                <option value="RetailTech (Retail Technology)">RetailTech (Retail Technology)</option>
                                <option value="CleanTech (Clean Technology)">CleanTech (Clean Technology)</option>
                                <option value="SaaS (Software as a Service)">SaaS (Software as a Service)</option>
                                <option value="Travel & Transportation and Mobility">Travel & Transportation and Mobility</option>
                                <option value="Other">Other</option>
                              </select>
                              {
                                missingFields.includes("sector") && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select Sector of Your Business.
                                  </p>
                                )
                              }
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="stage"
                                className="form-label mb-4"
                              >
                                Stage of Startup
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                className="form-select form-select-lg mb-3 css-1492t68"
                                aria-label="Default select example"
                                {...register("stage", {
                                  // validate: (value) => value != "", required: true,
                                  onChange: handleChange
                                })}
                                name="stage" value={businessDetails ? businessDetails.stage : ""}
                              >
                                <option value="">--SELECT STAGE--</option>
                                <option value="Idea Stage">Idea Stage</option>
                                <option value="Validation Stage">Validation Stage</option>
                                <option value="Development Stage">Development Stage</option>
                                <option value="Launch Stage">Launch Stage</option>
                                <option value="Growth Stage">Growth Stage</option>
                                <option value="Expansion Stage">Expansion Stage</option>
                                <option value="Maturity Stage">Maturity Stage</option>
                              </select>
                              {
                                missingFields.includes("stage") && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select Stage of Your Business.
                                  </p>
                                )
                              }
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="startup_date"
                                className="form-label"
                              >
                                Month & year of inception
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control same-input"
                                id="startup_date"
                                {...register("startup_date", {
                                  value: true,
                                  required: true,
                                })}
                                name="startup_date" onChange={handleChange} value={businessDetails.startup_date}
                                max={new Date().toISOString().split("T")[0]}
                              />
                              {errors.startup_date &&
                                errors.startup_date.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Your Business of Inception.
                                  </p>
                                )}
                            </div>
                            <div className="col-md-6 mt-3">
                              <label htmlFor="tagline" className="form-label">
                                Tagline
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="tagline"
                                {...register("tagline", {
                                  value: true,
                                  // required: true,
                                })}
                                name="tagline" onChange={handleChange} value={businessDetails.tagline}
                              />
                            </div>

                            <div className="col-md-6 mt-3">
                              <div
                                id="divHabilitSelectors"
                                className="input-file-container "
                              >
                                <label
                                  htmlFor="logo"
                                  className="form-label"
                                >
                                  Startup Logo
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
                                      {logoName ? logoName : (businessDetails.logo ? businessDetails.logo : "No File Chosen ...")}
                                    </div>
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      name="logo"
                                      accept="image/jpeg, image/png"
                                      id="logo"
                                      onChange={handleLogoChange}
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
                                    You can upload any logo's image jpg,png,jpeg file only (max size 2 MB)
                                  </p>
                                  {startUpLogoSizeError ? (
                                    <p className='text-danger'>{startUpLogoSizeError}</p>
                                  ) : (
                                    startUpLogoError && <p className='text-danger'>{startUpLogoError}</p>
                                  )}

                                </label>
                              </div>
                            </div>

                            <div className="col-sm-6 ">
                              <label
                                htmlFor="description"
                                className="form-label"
                              >
                                1000 characters to tell us about your business
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                rows={4}
                                maxLength={1000}
                                placeholder="Enter details here"
                                className="form-control"
                                {...register("description", { value: true, required: true, onChange: handleChange })}
                                name="description" value={businessDetails.description}
                              />
                            </div>

                            <div className="col-md-6">
                              <div
                                id="divHabilitSelectors"
                                className="input-file-container "
                              >
                                <label>
                                  Startup pitch deck
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
                                      {pitchDeckName ? pitchDeckName : (businessDetails.pitch_deck ? businessDetails.pitch_deck : "No File Chosen ...")}
                                    </div>
                                    <input
                                      ref={fileInputPitchDeck}
                                      type="file"
                                      id="pitch_deck"
                                      name="pitch_deck"
                                      accept=".pdf, .ppt, .pptx, .doc, .docx"
                                      onChange={handlePitchDeckChange}
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
                                    You can upload any pitch deck in ppt,pdf,docs format only (max size 20 MB)
                                    <span style={{ color: "red" }}>*</span>
                                  </p>
                                </label>
                                {pichDeckSizeError ? (
                                  <p className='text-danger'>{pichDeckSizeError}</p>
                                ) : (
                                  pichDeckError && <p className='text-danger'>{pichDeckError}</p>
                                )}

                                {
                                  missingFields.includes("pitch_deck") && (
                                    <p
                                      className="text-danger"
                                      style={{ textAlign: "left", fontSize: "12px" }}
                                    >
                                      *Please choose your business pitch deck.
                                    </p>
                                  )
                                }
                              </div>
                            </div>
                            <div className=" mt-2 d-flex align-items-left">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value="1"
                                {...register("kyc_purposes", { value: true, required: true })}
                                name="kyc_purposes" onChange={handleChange} checked={businessDetails.kyc_purposes === '1'}
                              />
                              <p className="">
                                I certify that all the information provided by
                                me is accurate and I am willing to provide
                                evidence for the same for KYC purposes when
                                requested.
                              </p>
                            </div>
                            {errors.kyc_purposes &&
                              errors.kyc_purposes.type === "required" && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please certify the kyc information.
                                </p>
                              )}
                          </div>
                          <div className="row mt-3">
                            <div
                              className="col-md-6"
                              style={{ textAlign: "left" }}
                            >
                              <Link
                                href={`/steps/findbusiness`}
                                className="btnclasssmae"
                                id="back"
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
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}
