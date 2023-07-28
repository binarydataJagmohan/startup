import React, { useState, useEffect,useRef} from "react";
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
interface UserData{
  id?: string;
}
export default function Businessinfo():any {
  const router = useRouter();
  const [blId, setBlId] = useState("");
  const [forwarduId, setForwarduId] = useState("");
  const [missingFields, setMissingFields] = useState<string[]>([]);
 
  const [current_user_id, setCurrentUserId] = useState("");
  const [business_name, setBusinessName] = useState("");

  const [signup_success, setSignupSuccess] = useState(false);

  const {register,handleSubmit,formState: { errors },} = useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (event:any) => {
    event.preventDefault();
    setMissingFields([])
    if (fileInputRef.current !== null) {
      (fileInputRef.current as HTMLInputElement).click(); 
    }
  };
  const [logo, setLogo] = useState(null);
  const handleFileChange = (event: any) => {
    setMissingFields([])
    setLogo(event.target.files[0]);
    
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
      type:"",
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
  const current_user_data:UserData = getCurrentUserData();
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

    if(!businessDetails.sector){
      setMissingFields(prevFields=>[...prevFields,"sector"]);
    }
    if(!businessDetails.stage){
      setMissingFields(prevFields=>[...prevFields,"stage"])
    }
    if(!businessDetails.type){
     setMissingFields(prevFields=>[...prevFields,"type"])
    }
    if(!logo && !businessDetails.logo){
      setMissingFields(prevFields=>[...prevFields,"logo"])
     }
    const formData = new FormData();
    if (logo !== null) {
      formData.append('logo', logo);
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
    formData.append("type", businessDetails.type);
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
    // toast.error("Please fill correct information", {
    //   position: toast.POSITION.TOP_RIGHT,
    //   toastId: "error",
    // });
  }
};

register('website_url', {
  required: 'Company website url is required',
  pattern: {
    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
    message: 'Enter a valid website',
  },
});
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
                  <img className="sidebar-img w-75" src="/assets/img/sidebar/bank.png"/>
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>DOCUMENTS UPLOAD</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>5</span>
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
              <div className="register-form ">
                <div className="row step_one">
                  <div className="col-md-12">
                    <form className="needs-validation mb-4" encType="multipart/form-data"  onSubmit={handleSubmit(SubmitForm)}>
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
                                {...register("reg_businessname", {onChange:handleChange,value:true,
                                  required: true,})} 
                                name="reg_businessname"   value={businessDetails.reg_businessname}
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
                                id="website_url"  {...register("website_url",{onChange:handleChange,value:true,
                                required: true})} 
                                name="website_url"value={businessDetails.website_url}
                              />
                              {errors.website_url && (
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
                                {...register("sector", {
                                  // validate: (value) => value != "", required: true,
                                  onChange:handleChange})} 
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
                              {/* {errors.sector &&
                                errors.sector.type === "required" &&  ! businessDetails.sector &&  (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select Sector of Your Business.
                                  </p>
                                )} */}
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
                                   onChange:handleChange})}
                                name="stage"   value={businessDetails ? businessDetails.stage : ""}
                              >
                                <option value="">--SELECT STAGE--</option>
                                <option value="Idea Stage">Idea Stage</option>
                                <option value="Validation Stage">Validation Stage</option>
                                <option value="Development Stage">Development Stage</option>
                                <option value="Launch Stage">Launch Stage</option>
                                <option value="Growth Stage">Growth Stage</option>
                                <option value="Expansion Stage">Expansion Stage</option>
                                <option value="Maturity Stage">Maturity Stage</option>
                                {/* <option value="Final Stage">Final Stage</option> */}
                                {/* <option value="Intermediate Stage">Intermediate Stage</option>
                                <option value="Final Stage">Final Stage</option> */}
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
                              {/* {errors.stage &&
                                errors.stage.type === "required" &&  ! businessDetails.stage && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select Stage of Your Business.
                                  </p>
                                )} */}
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
                              <label
                                htmlFor="stage"
                                className="form-label mb-4"
                              >
                                Fund Type
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                className="form-select form-select-lg mb-3 css-1492t68"
                                aria-label="Default select example"
                                {...register("type", {
                                  //  validate: (value) => value != "", required: true,
                                   onChange:handleChange})}
                                name="type"    value={businessDetails ? businessDetails.type : ""}
                              >
                                <option value="">--SELECT FUND TYPE--</option>
                                <option value="Dicounting Invoice">Dicounting Invoice</option>
                                <option value="CSOP">CSOP</option>
                                <option value="CCSP">CCSP</option>
                              </select>
                              {
                                missingFields.includes("type") && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select type of Your Business.
                                  </p>
                                )
                              }
                              {/* {errors.type &&
                                errors.type.type === "required" &&  ! businessDetails.type && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select type of Your Business.
                                  </p>
                                )} */}
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
                                {...register("description", { value:true, required: true,onChange:handleChange})}
                                name="description"   value={businessDetails.description}
                              />
                            </div>

                            <div className="col-md-6">
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
                                  ref={fileInputRef}
                                  className="input-file"
                                  id="logo"
                                  type="file"
                                  name="logo"
                                  accept="image/jpeg, image/png" // Restrict to JPEG and PNG files
                                  onChange={handleFileChange}
                                  style={{ display: 'none' }} // Hide the input element
                                />
                               
                                <label
                                  htmlFor="fileupload"
                                  className="input-file-trigger"
                                  id="labelFU"
                                  tabIndex={0}
                                >
                                  Drop your pitch deck here to{" "}
                                  <a href="#" onClick={handleUploadClick}>Upload</a> <br />
                                  <p>You can upload any logo's image jpg,png,jpeg file only (max size 20 MB)<span style={{ color: "red" }}>*</span></p>
                                </label>
                                {
                                  missingFields.includes("logo") && (
                                    <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Choose Your Business Logo.
                                  </p>
                                  )
                                }
                                {/* {errors.logo && errors.logo.type === "required" && !businessDetails.logo && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Choose Your Business Logo.
                                  </p>
                                )} */}
                                {!errors.logo && (businessDetails.logo || logo) && (
                                  <p
                                    className="text-success"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    Logo Uploaded Successfully.
                                  </p>
                                )}

                              </div>
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
                                className="btnclasssmae"
                                id="back"
                              >
                                Go back
                              </a>
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
