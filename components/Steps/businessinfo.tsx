import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { businessInfoSave, getBusinessInformation } from "../../lib/frontendapi";
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

export default function businessinfo(props: any) {
  const router = useRouter();
  const [blId, setBlId] = useState("");
  const [forwarduId, setForwarduId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [business_page_id, setBusinessPageId] = useState("");

  const [current_user_id, setCurrentUserId] = useState(false);
  const [business_name, setBusinessName] = useState("");

  const [business_address, setBusinessAddress] = useState("");
  const [numberOfLocations, setNumberOfLocations] = useState("");
  const [signup_success, setSignupSuccess] = useState(false);
  const [disableBaddr, setDisableBaddr] = useState(false);
  const [disableBemail, setDisableBemail] = useState(false);

  const {register,handleSubmit,formState: { errors },} = useForm();
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
      description: "",
      cofounder: "0",
      kyc_purposes: "0",
  });
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
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
  const current_user_data = getCurrentUserData();
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
      // const logo = businessDetails.logo;
      // console.log(logo);
      // const data = { ...businessDetails };
      const res = await businessInfoSave(businessDetails);
     
      if (res.status == true) {
        setTimeout(() => {
          router.push("/steps/customizereview");
        }, 1000);
      } else {
        toast.error("Business Details has not been saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
      toast.error("Business Details has not been saved successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };

  const savedata = () => {
    var blid = blId;
    const data = {
      user_id: forwarduId,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      business_page_id: business_page_id,
      business_name: business_name,
      business_address: business_address,
      number_of_locations: numberOfLocations,
    };
    setSignupSuccess(true);
  };
  if (signup_success) return router.push("/steps/customizereview");
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
                    <i className="flaticon-checked" aria-hidden="true"></i>
                  </div>
                </div>
                <div
                  className="caption hidden-xs hidden-sm"
                  style={{ color: "#82b440" }}
                >
                  <span>PERSONAL INFORMATION</span>
                </div>
              </li>
              <li className="active">
                <div className="step_name">
                  Step <span>2</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img
                      className="sidebar-img w-75"
                      src="/assets/img/sidebar/business.png"
                    />
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BUSINESS INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>3</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img
                      className="sidebar-img w-75"
                      src="/assets/img/sidebar/docs.png"
                    />
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
                    <img
                      className="sidebar-img w-75"
                      src="/assets/img/sidebar/bank.png"
                    />
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
                    <form className="needs-validation mb-4"  onSubmit={handleSubmit(SubmitForm)}>
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
                                  value:true,
                                  required: true,
                                })}  name="business_name"  onChange={handleChange} value={businessDetails.business_name}
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
                                {...register("reg_businessname", { value:true,
                                  required: true,})} 
                                name="reg_businessname"  onChange={handleChange} value={businessDetails.reg_businessname}
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
                                {...register("website_url", { value:true, required: true,})}   
                                name="website_url"  onChange={handleChange} value={businessDetails.website_url}
                              />
                              {errors.website_url &&
                                errors.website_url.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Comapny's Website Url.
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
                                {...register("sector", {validate: (value) => value != "", required: true,})} 
                                name="sector"  onChange={handleChange}   value={businessDetails ? businessDetails.sector : ""}
                              >
                                <option value="">--SELECT SECTOR--</option>
                                <option value="App Development">App Development</option>
                                <option value="IT/Technologies">IT/Technologies</option>
                                <option value="AI">AI</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Agriculture">Agriculture</option>
                              </select>
                              {errors.sector &&
                                errors.sector.type === "required" &&  ! businessDetails.sector &&  (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select Sector of Your Business.
                                  </p>
                                )}
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
                                {...register("stage", { validate: (value) => value != "", required: true,})}
                                name="stage"  onChange={handleChange}  value={businessDetails ? businessDetails.stage : ""}
                              >
                                <option value="">--SELECT STAGE--</option>
                                <option value="Idea Stage">Idea Stage</option>
                                <option value="Intermediate Stage">Intermediate Stage</option>
                                <option value="Final Stage">Final Stage</option>
                              </select>
                              {errors.stage &&
                                errors.stage.type === "required" &&  ! businessDetails.stage && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select Stage of Your Business.
                                  </p>
                                )}
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
                                {...register("startup_date", { value:true,
                                  required: true,})}
                                name="startup_date"  onChange={handleChange} value={businessDetails.startup_date}
                                // max={new Date().toISOString().split("T")[0]}
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
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="tagline"
                                {...register("tagline", { value:true,
                                  required: true,})}
                                name="tagline"  onChange={handleChange} value={businessDetails.tagline}
                              />
                               {errors.tagline &&
                                errors.tagline.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Your Business Tagline.
                                  </p>
                                )}
                            </div>

                            <div className="col-md-6 mt-3">
                              <div
                                id="divHabilitSelectors"
                                className="input-file-container"
                              >
                                <label
                                  htmlFor="logo"
                                  className="form-label"
                                >
                                  Startup Logo
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  className="input-file"
                                  id="logo"
                                  type="file"
                                  {...register("logo", { value:true,})} 
                                  name="logo"  onChange={handleChange} 
                                />
                               
                                <label
                                  htmlFor="fileupload"
                                  className="input-file-trigger"
                                  id="labelFU"
                                  tabIndex={0}
                                >
                                  Drop your pitch deck here to{" "}
                                  <a href="#">Upload</a> <br />
                                  <p>You can upload any identity card's image jpg,png,jpeg file only (max size 20 MB)<span style={{ color: "red" }}>*</span></p>
                                </label>
                                {errors.logo && errors.logo.type === "required" && !businessDetails.logo && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Choose Your Business Logo.
                                  </p>
                                )}
                                {!errors.logo && businessDetails.logo && (
                                  <p
                                    className="text-success"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    Logo Uploaded Successfully.
                                  </p>
                                )}

                              </div>
                            </div>

                            <div className="col-sm-6 ">
                              <label
                                htmlFor="description"
                                className="form-label"
                              >
                                100 characters to tell us about your business
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                rows={4}
                                maxLength={100}
                                placeholder="Enter details here"
                                className="form-control text"
                                {...register("description", { value:true, required: true,})}
                                name="description"  onChange={handleChange} value={businessDetails.description}
                              />
                            </div>

                          
                            <div className=" mt-5 d-flex align-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value="1"
                                {...register("cofounder", { value:true, })}
                                name="cofounder"  onChange={handleChange}   checked={businessDetails.cofounder === '1' ? true : false}
                              />
                              <p className="">
                                You come from an entrepreneurial family or have
                                been a founder/co-founder of a business venture
                                family
                              </p>
                            </div>
                            <div className=" mt-2 d-flex align-items-left">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value="1"
                                {...register("kyc_purposes", { value:true,required:true })}
                                name="kyc_purposes"  onChange={handleChange}  checked={businessDetails.kyc_purposes === '1'}
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
                              <a
                                href={`/steps/findbusiness`}
                                className="btn btn-primary"
                                id="back"
                              >
                                Go back
                              </a>
                            </div>

                            <div
                              className="col-md-6"
                              style={{ textAlign: "right" }}
                            >
                              <button type="submit" className="btn btn-primary">
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
