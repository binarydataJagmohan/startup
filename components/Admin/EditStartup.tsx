import React, { useState, useEffect, useRef } from 'react'
import { getSinglestartup } from '../../lib/companyapi';
import { getBusinessInformation, getBankInformation, getCountries, getProofInformation, fetchSingleUserDocuments } from '../../lib/frontendapi';
import PhoneInput from "react-phone-input-2";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import "react-phone-input-2/lib/style.css";

import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import { getToken, getCurrentUserData } from "../../lib/session";
import { sendNotification } from '../../lib/frontendapi';
type Country = {
  name: string;
  country_code: string;
}
interface UserData {
  id?: string;
}
const EditList = () => {
  const [startup, setStartupData] = useState({ email: '', linkedin_url: '', country: '', phone: '', city: '', gender: '' });
  const [bussiness, setBussinessData] = useState({

    business_name: "",
    reg_businessname: "",
    website_url: "",
    sector: "",
    stage: "",
    startup_date: "",
    tagline: "",
    logo: "",
    type: "",
    description: "",
    cofounder: "0",
    kyc_purposes: "0",
    user_id: "",
    pitch_deck: "",
  });

  const [bank, setBankData] = useState({
    bank_name: "",
    account_holder: "",
    account_no: "",
    ifsc_code: ""
  });


  const [proof, setProofData] = useState({
    uid: "",
    proof_img: "",
    dob: "",
    pan_number: "",


  });

  const [basicDetails, setBasicDetails] = useState({
    pan_card_front: "",
    pan_card_back: "",
    adhar_card_front: "",
    adhar_card_back: "",
    certificate_incorporation:"",
    bank_statement_three_years:"",
    moa:"",
    aoa:"",
    documnet_id: '',
  });
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}docs/${proof.proof_img}`;
  const [logoName, setLogoName] = useState('');
  const [previewImageProof, setPreviewImageProof] = useState<string | ArrayBuffer | null>(null);
  const router = useRouter();
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [businessmissingFields, setBusinessMissingFields] = useState<string[]>([]);
  const [countries, setcountries] = useState<Country[]>([]);
  const [startUpLogoError, setStartupLogoError] = useState('');
  const [startUpLogoSizeError, setStartupLogoSizeError] = useState('');
  const { id } = router.query;

  const [pan_card_front, setPanCardFront] = useState(null);
  const [pan_card_back, setPanCardBack] = useState(null);
  const [adhar_card_front, setAdharCardFront] = useState(null);
  const [adhar_card_back, setAdharCardBack] = useState(null);
  const [certificateIncorporation, setcertificateIncorporation] = useState(null);
  const [bankStatementThreeYears, setBankStatementThreeYears] = useState(null);
  const [MOA, setMOA] = useState(null);
  const [AOA, setAOA] = useState(null);

  useEffect(() => {
    const fetchData = async (id: any) => {
      const data = await getBusinessInformation(id);

      if (data) {
        setBussinessData(data.data);

      }
    };

    if (router.query.id) {
      fetchData(router.query.id);
    }
    if (router.query.id) {
      fetchSingleUserDocuments(router.query.id)
      .then((res) => {
          if (res.status == true) {
              setBasicDetails(res.data);
              setPanCardFront(res.data.pan_card_front);
              setPanCardBack(res.data.pan_card_back);
              setAdharCardFront(res.data.adhar_card_front);
              setAdharCardBack(res.data.adhar_card_back);
              setcertificateIncorporation(res.data.certificate_incorporation);
              setBankStatementThreeYears(res.data.bank_statement_3_years);
              setMOA(res.data.moa);
              setAOA(res.data.aoa);
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
    }
  }, [router.query.id]);

  const handlePoofFileChange = (e: any) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImageProof(reader.result);
      };
      reader.readAsDataURL(file);
    }

  }
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  const handleProofChange = (e: any) => {
    // Ignore input changes

    e.preventDefault();
  };
  const handleDownload = (event: any) => {
    event.preventDefault();

    const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}docs/${proof.proof_img}`;

    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'image.jpg';
    downloadLink.target = '_blank';
    downloadLink.rel = 'noopener noreferrer';
    // Simulate a click event on the download link
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false,
    });

    downloadLink.dispatchEvent(clickEvent);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');


    const fetchData = async () => {
      const data = await getCountries({});
      if (data) {
        setcountries(data.data);
      }
    };

    fetchData();

  }, []);
  const handleBusinessChange = (e: any) => {
    setBusinessMissingFields([]);

    if (e.target.type === "checkbox" && e.target.name === "cofounder") {
      const cofounderValue = e.target.checked ? "1" : "0";
      setBussinessData((prevBusiness: any) => ({
        ...prevBusiness,
        cofounder: cofounderValue,
        user_id: id,
      }));
    } else if (e.target.type === "checkbox" && e.target.name === "kyc_purposes") {
      const kycValue = e.target.checked ? "1" : "0";
      setBussinessData((prevBusiness: any) => ({
        ...prevBusiness,
        kyc_purposes: kycValue,
        user_id: id,
      }));
    } else if (e.target.name === "logo") {
      // Handle logo file input change
      const file = e.target.files && e.target.files[0];

      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"];
        const maxSize = 2 * 1024 * 1024;

        if (allowedTypes.includes(file.type)) {
          if (file.size <= maxSize) {
            const reader = new FileReader();
            reader.onload = () => {
              setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);

            setBussinessData((prevBusiness) => ({
              ...prevBusiness,
              logo: file || prevBusiness.logo, // Preserve previous logo if no new file selected
            }));
            setLogoName(file.name);
          } else {
            setStartupLogoSizeError('* Please upload a file that is no larger than 2MB.');
          }
        } else {
          setStartupLogoError('* Please upload a JPG or PNG file');
          e.target.value = null;
        }
      }
    } else {
      // Handle other field changes
      setBussinessData((prevBusiness) => ({
        ...prevBusiness,
        [e.target.name]: e.target.value,
      }));
    }
  };


  const handleStartupChange = (e: any) => {
    setMissingFields([]);
    setStartupData((prevStartup) => ({
      ...prevStartup,
      [e.target.name]: e.target.value,

    }));
  }

  const updatePersonalInfo = async (e: any) => {
    e.preventDefault();
    setInvalidFields([]);
    const current_user_data: UserData = getCurrentUserData();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const data = {
      notify_from_user: current_user_data.id,
      notify_to_user: id,
      notify_msg: `Your profile has been successfully updated.`,
      notification_type: "Upadte Notification",
      each_read: "unread",
      status: "active"
    };
    // Send Notifications to investor when admin update his profile is register
    sendNotification(data)
      .then((notificationRes) => {
        console.log('success')
      })

    if (!startup.email) {
      setMissingFields(prevFields => [...prevFields, "Email"]);
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(startup.email)) {
      setInvalidFields(prevFields => [...prevFields, "Email"]);
    }
    if (!startup.linkedin_url) {
      setMissingFields(prevFields => [...prevFields, "linkedin_url"]);
    } else if (!/^(https:\/\/)?(www\.)?linkedin\.com\/(in\/[a-zA-Z0-9_-]+|company\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+\/?)\/?$/.test(startup.linkedin_url)) {
      setInvalidFields(prevFields => [...prevFields, "linkedin_url"]);
    }
    if (!startup.country) setMissingFields(prevFields => [...prevFields, "country"]);
    if (!startup.phone) setMissingFields(prevFields => [...prevFields, "phone"]);
    if (!startup.city) setMissingFields(prevFields => [...prevFields, "city"]);
    if (!startup.gender) setMissingFields(prevFields => [...prevFields, "gender"]);
    try {


      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/update-startup-personal-info/${id}`,
        {

          ['email']: startup.email,
          ['country']: startup.country,
          ['phone']: startup.phone,
          ['city']: startup.city,
          ['linkedin_url']: startup.linkedin_url,
          ['gender']: startup.gender,

        }
      );

      toast.success('Information updated successfully');
      setTimeout(() => {
        router.push('/admin/all-startup-companies'); // Replace '/admin/all-investors' with the desired route
      }, 2000);
    } catch (error) {


    }
  };

  const updateBusinessInfo = async (e: any) => {
    e.preventDefault();

    const current_user_data: UserData = getCurrentUserData();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const data = {
      notify_from_user: current_user_data.id,
      notify_to_user: id,
      notify_msg: `User has been Updated his Business Information Successfully by Admin.`,
      notification_type: "Business Upadte Notification",
      each_read: "unread",
      status: "active"
    };
    // Send Notifications to investor when admin update his profile is register
    sendNotification(data)
      .then((notificationRes) => {
        console.log('success')
      })

    if (!bussiness.business_name) setBusinessMissingFields(prevFields => [...prevFields, "business_name"]);
    if (!bussiness.cofounder) setBusinessMissingFields(prevFields => [...prevFields, "cofounder"]);
    if (!bussiness.description) setBusinessMissingFields(prevFields => [...prevFields, "description"]);
    if (bussiness.kyc_purposes === '0') setBusinessMissingFields(prevFields => [...prevFields, "kyc_purposes"]);
    if (!bussiness.logo) setBusinessMissingFields(prevFields => [...prevFields, "logo"]);
    if (!bussiness.reg_businessname) setBusinessMissingFields(prevFields => [...prevFields, "reg_businessname"]);
    if (!bussiness.sector) setBusinessMissingFields(prevFields => [...prevFields, "sector"]);
    if (!bussiness.stage) setBusinessMissingFields(prevFields => [...prevFields, "stage"]);
    if (!bussiness.startup_date) setBusinessMissingFields(prevFields => [...prevFields, "startup_date"]);
    if (!pitch_deck && !bussiness.pitch_deck) {
      setBusinessMissingFields(prevFields => [...prevFields, "pitch_deck"])
    }
    if (!bussiness.website_url) setBusinessMissingFields(prevFields => [...prevFields, "website_url"]);
    // 
    try {


      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/business-information-update/${bussiness.user_id}`,

        {

          ['business_name']: bussiness.business_name,
          ['reg_businessname']: bussiness.reg_businessname,
          ['cofounder']: bussiness.cofounder,
          ['description']: bussiness.description,
          ['kyc_purposes']: bussiness.kyc_purposes,
          ['logo']: bussiness.logo,
          ['sector']: bussiness.sector,
          ['stage']: bussiness.stage,
          ['startup_date']: bussiness.startup_date,
          ['tagline']: bussiness.tagline,
          ['website_url']: bussiness.website_url,
          ['pitch_deck']: bussiness.pitch_deck,
        }
        ,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
          },
        }
      );

      toast.success('Business Information updated successfully');
      setTimeout(() => {
        router.push('/admin/all-startup-companies');
      }, 2000);
    } catch (error) {


    }
  }
  useEffect(() => {

    const fetchData = async (id: any) => {

      const data = await getBankInformation(id);
      if (data) {
        setBankData(data.data);

      }
    };
    fetchData(id);


  }, [router.query.id]);
  useEffect(() => {

    const fetchData = async (id: any) => {

      const data = await getProofInformation(id);
      if (data) {
        setProofData(data.data);

      }
    };
    fetchData(id);


  }, [router.query.id]);
  const [pichDeckError, setPichDeckError] = useState('');
  const [pichDeckSizeError, setPichDeckSizeError] = useState('');
  const [pitchDeckName, setPitchDeckName] = useState('');
  const [pitch_deck, setPichDeck] = useState(null);

  const handlePitchDeckChange = (event: any) => {
    setBusinessMissingFields([]);
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
  const phonClick = (event: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let { name, value } = event.target;
    var selectedCountry = countries.find(
      (country) => country.name === value
    );
    var countryCode = "";
    if (selectedCountry) {
      countryCode = selectedCountry.country_code;
    }

    setStartupData((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
        id: id,
        country_code: countryCode ? `${countryCode}` : " ",
      };
    });
  }
  useEffect(() => {

    const fetchData = async (id: any) => {

      const data = await getSinglestartup(id);
      if (data) {
        setStartupData(data.data);

      }
    };
    fetchData(id);


  }, [router.query.id]);

  return (
    <div className="form-faq pt-5 pb-5">
      <div className="container">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Startups Personnal Information:
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="form-part">
                  <h3>Personal Information</h3>
                  <form onSubmit={updatePersonalInfo}>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Email" value={startup.email} name="email" readOnly />
                          <div className="help-block with-errors" />
                          {/* {missingFields.includes("Email") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the Email field.
                            </p>
                          )}
                          {invalidFields.includes("Email") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please enter a valid email address.
                            </p>
                          )} */}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Linkedin Url{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input
                            type="text"
                            placeholder="www.linkedin.com"
                            value={startup.linkedin_url}
                            name="linkedin_url" onChange={handleStartupChange}
                          />
                          <div className="help-block with-errors" />
                          {missingFields.includes("linkedin_url") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the linkedin_url field.
                            </p>
                          )}
                          {invalidFields.includes("linkedin_url") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please enter a valid linkedin_url address.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Rest of the form code */}
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Country{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Country of Citizenship " name="country" value={startup.country} onChange={handleStartupChange} />
                          <div className="help-block with-errors" />
                          {missingFields.includes("country") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the country field.
                            </p>
                          )}

                        </div>
                      </div>
                      <div className="col-sm-6">

                        <div className="form-part">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="mt-3">
                            <PhoneInput
                              onClick={phonClick}
                              country={"us"}
                              value={startup.phone}
                              onChange={(value) => setStartupData((prevState) => ({ ...prevState, phone: value }))}
                            />
                          </div>
                          {missingFields.includes("Phone") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the Phone field.
                            </p>
                          )}


                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">City{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="City" value={startup.city} name="city" onChange={handleStartupChange} />
                          <div className="help-block with-errors" />
                          {missingFields.includes("city") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the city field.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Gender{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <select name="gender" onChange={handleStartupChange} value={startup.gender} >
                            <option value={startup.gender ? startup.gender : ''}>{startup.gender ? startup.gender.charAt(0).toUpperCase() + startup.gender.slice(1) : '--SELECT GENDER--'}</option>
                            {startup.gender !== 'male' && <option value="male">Male</option>}
                            {startup.gender !== 'female' && <option value="female">Female</option>}
                            {startup.gender !== 'other' && <option value="other">Other</option>}
                          </select>
                          <div className="help-block with-errors" />
                          {missingFields.includes("gender") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the gender field.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="row mt-3">
                        <div className="col-md-12 text-center">
                          <button type="submit" className="btnclasssmae">
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Add code for other accordion items */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Business Information:
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="row step_one">
                  <div className="col-md-12">
                    <form className="needs-validation mb-4" onSubmit={updateBusinessInfo} encType="multipart/form-data" >
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
                        <div className="col-md-12" id="register">
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
                                className="form-control same-input h-75"
                                id="business_name" name="business_name" value={bussiness.business_name} onChange={handleBusinessChange}

                              />

                              {businessmissingFields.includes("business_name") && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Enter Company Name.
                                </p>
                              )}
                              {/* )} */}
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
                                className="form-control same-input h-75"
                                id="reg_businessname" value={bussiness.reg_businessname} onChange={handleBusinessChange} name="reg_businessname"
                              />
                              {businessmissingFields.includes("reg_businessname") && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Enter  Registered Company Name.
                                </p>
                              )}
                              {/* )} */}
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
                                className="form-control same-input h-50" value={bussiness.website_url} onChange={handleBusinessChange} name="website_url"
                              />
                              {/* {errors.website_url && ( */}
                              {businessmissingFields.includes("website_url") && (
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
                                aria-label="Default select example" onChange={handleBusinessChange} name="sector"
                              >
                                <option value={bussiness.sector ? bussiness.sector : ''}>{bussiness.sector ? bussiness.sector : '--SELECT SECTOR--'}</option>
                                {bussiness.sector !== 'E-commerce' && <option value="E-commerce">E-commerce</option>}
                                {bussiness.sector !== 'Food & Restaurents Startups' && <option value="Food & Restaurents Startups">Food  & Restaurents Startups</option>}
                                {bussiness.sector !== 'App Development' && <option value="App Development">App Development</option>}
                                {bussiness.sector !== 'IT/Technologies' && <option value="IT/Technologies">IT/Technologies</option>}
                                {bussiness.sector !== 'AI and Machine Learning' && <option value="AI and Machine Learning">AI and Machine Learning</option>}
                                {bussiness.sector !== 'Web Development' && <option value="Web Development">Web Development</option>}
                                {bussiness.sector !== 'FinTech (Financial Technology)' && <option value="FinTech (Financial Technology)">FinTech (Financial Technology)</option>}
                                {bussiness.sector !== 'HealthTech (Healthcare Technology)' && <option value="HealthTech (Healthcare Technology)">HealthTech (Healthcare Technology)</option>}
                                {bussiness.sector !== 'EdTech (Education Technology)' && <option value="EdTech (Education Technology)">EdTech (Education Technology)</option>}
                                {bussiness.sector !== 'Real Estate & PropTech (Property Technology)' && <option value="Real Estate & PropTech (Property Technology)">Real Estate & PropTech (Property Technology)</option>}
                                {bussiness.sector !== 'Agriculture Startups' && <option value="Agriculture Startups">Agriculture Startups</option>}
                                {bussiness.sector !== 'RetailTech (Retail Technology)' && <option value="RetailTech (Retail Technology)">RetailTech (Retail Technology)</option>}
                                {bussiness.sector !== 'CleanTech (Clean Technology)' && <option value="CleanTech (Clean Technology)">CleanTech (Clean Technology)</option>}
                                {bussiness.sector !== 'SaaS (Software as a Service)' && <option value="SaaS (Software as a Service)">SaaS (Software as a Service)</option>}
                                {bussiness.sector !== 'Travel & Transportation and Mobility' && <option value="Travel & Transportation and Mobility">Travel & Transportation and Mobility</option>}
                                {bussiness.sector !== 'Other' && <option value="Other">Other</option>}
                              </select>
                              {businessmissingFields.includes("sector") && (
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
                                aria-label="Default select example" onChange={handleBusinessChange} name="stage"
                              >
                                <option value={bussiness.stage}>{bussiness.stage}</option>
                                {/* {bussiness.stage !== 'Idea Stage' && <option value="Idea Stage">Idea Stage</option>}
                                {bussiness.stage !== 'Intermediate Stage' && <option value="Intermediate Stage">Intermediate Stage</option>}
                                {bussiness.stage !== 'Final Stage' && <option value="Final Stage">Final Stage</option>} */}

                                <option value="">--SELECT STAGE--</option>
                                <option value="Idea Stage">Idea Stage</option>
                                <option value="Validation Stage">Validation Stage</option>
                                <option value="Development Stage">Development Stage</option>
                                <option value="Launch Stage">Launch Stage</option>
                                <option value="Growth Stage">Growth Stage</option>
                                <option value="Expansion Stage">Expansion Stage</option>
                                <option value="Maturity Stage">Maturity Stage</option>

                              </select>
                              {/* {errors.stage &&
                                errors.stage.type === "required" &&  ! businessDetails.stage && ( */}
                              {businessmissingFields.includes("stage") && (
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
                                className="form-control same-input h-50"
                                id="startup_date" value={bussiness.startup_date} onChange={handleBusinessChange} name="startup_date"
                                max={new Date().toISOString().split("T")[0]} readOnly
                              />
                            </div>
                            <div className="col-md-6 mt-3">
                              <label htmlFor="tagline" className="form-label">
                                Tagline
                              </label>
                              <input
                                type="text"
                                className="form-control same-input" onChange={handleBusinessChange}
                                id="tagline" value={bussiness.tagline} name="tagline"

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
                                </label>
                                <div className="file-upload mt-3">
                                  <div className="file-select">
                                    <div
                                      className="file-select-button"
                                      id="fileName"
                                    >
                                      Choose File
                                    </div>
                                    <div className="file-select-name" id="noFile">
                                      {logoName ? logoName : (bussiness.logo ? bussiness.logo : "No File Chosen ...")}
                                    </div>
                                    <input
                                      ref={fileInputRef}
                                      className="input-file"
                                      id="logo"
                                      type="file"
                                      name='logo'
                                      accept="image/jpeg, image/png"
                                      onChange={handleBusinessChange}
                                    />
                                  </div>
                                </div>
                                <label
                                  htmlFor="fileupload"
                                  className="input-file-trigger mt-2"
                                  id="labelFU"
                                  tabIndex={0}
                                >
                                  <p>You can upload any identity card's image jpg,png,jpeg file only (max size 2 MB)<span style={{ color: "red" }}>*</span></p>
                                </label>
                                {startUpLogoSizeError ? (
                                  <p className='text-danger'>{startUpLogoSizeError}</p>
                                ) : (
                                  startUpLogoError && <p className='text-danger'>{startUpLogoError}</p>
                                )}

                                {businessmissingFields.includes("logo") && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Choose Your Business Logo.
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="col-sm-6">
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
                                className="form-control" value={bussiness.description} onChange={handleBusinessChange} name="description"
                              />
                              {businessmissingFields.includes("description") && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Fill Description of Your Business.
                                </p>
                              )}
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
                                  Startup pitch deck
                                </label>
                                <div className="file-upload mt-3">
                                  <div className="file-select">
                                    <div
                                      className="file-select-button"
                                      id="fileName"
                                    >
                                      Choose File
                                    </div>
                                    <div className="file-select-name" id="noFile">
                                      {pitchDeckName ? pitchDeckName : (bussiness.pitch_deck ? bussiness.pitch_deck : "No File Chosen ...")}
                                    </div>
                                    <input
                                      // ref={fileInputPitchDeck}
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

                                {businessmissingFields.includes("logo") && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Choose Your Business Logo.
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-md-1 flex-row">
                                <input
                                  className="form-check-input checkboxForAdmin"
                                  type="checkbox"
                                  // id="checkboxNoLabel"
                                  value="1" checked={bussiness.kyc_purposes === '1'} name="kyc_purposes" onChange={handleBusinessChange}
                                />
                              </div>
                              <div className="col-md-11">
                                <p className="">
                                  I certify that all the information provided by
                                  me is accurate and I am willing to provide
                                  evidence for the same for KYC purposes when
                                  requested.
                                </p>
                              </div>
                            </div>
                            {businessmissingFields.includes("kyc_purposes") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                *Please certify the kyc information.
                              </p>
                            )}
                          </div>

                        </div>

                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12 text-center">
                          <button type="submit" className="btnclasssmae">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Basic Information:
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">

              <div className="form-part form-part-padding">
                <h3>Basic Information</h3>
                <form>
                  <div className="row">
                    <div className="col-sm-6 proof">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Pan Card Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="form-part">
                        <input type="text" id="pan_number" placeholder="Pan Number" value={proof.pan_number} name=""
                          onChange={handleProofChange}
                          onKeyDown={handleProofChange}
                          onPaste={handleProofChange}
                          onCut={handleProofChange}
                          onCopy={handleProofChange}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 proof">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Aadhaar Card Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="form-part">

                        <input type="text" placeholder="Adhaar Number" value={proof.uid} name="uid" onChange={handleProofChange}
                          onKeyDown={handleProofChange}
                          onPaste={handleProofChange}
                          onCut={handleProofChange}
                          onCopy={handleProofChange}
                          readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 proof">

                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        DOB  <span className="text-danger">*</span>
                      </label>
                      <div className="form-part">
                        <input
                          type="date"
                          id="dob" value={proof.dob} onChange={handleProofChange}
                          onKeyDown={handleProofChange}
                          onPaste={handleProofChange}
                          onCut={handleProofChange}
                          onCopy={handleProofChange}
                          readOnly
                          // {...register("dob", {
                          //   value: true, required: true,
                          // })}
                          // value={basicDetails.dob}
                          name="dob"
                          // onChange={handleChange}
                          placeholder="basicDetails.dob ? '' : 'DD/MM/YY'" min={`${new Date().getMonth() - 18}-01-01`}
                          max={`${new Date().getFullYear() - 18}-12-31`}
                        />
                      </div>


                    </div>
                    <div className="col-sm-6 proof">

                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Bank Name{" "}
                        <span className="text-danger" >*</span>
                      </label>
                      <div className="form-part">
                        <input
                          type="text"
                          id="bank_name" value={bank.bank_name} onChange={handleProofChange}
                          onKeyDown={handleProofChange}
                          onPaste={handleProofChange}
                          onCut={handleProofChange}
                          onCopy={handleProofChange}
                          readOnly
                        // {...register("bank_name", {
                        //  value:true, required: true,
                        // })} name="bank_name"  onChange={handleChange}  value={bankDetails.bank_name}
                        />
                      </div>


                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 proof">


                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Account Holder's Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="form-part">
                        <input
                          type="text"
                          id="account_holder" value={bank.account_holder} onChange={handleProofChange}
                          onKeyDown={handleProofChange}
                          onPaste={handleProofChange}
                          onCut={handleProofChange}
                          onCopy={handleProofChange}
                          readOnly
                        //  {...register("account_holder", {
                        //  value:true, required: true,
                        // })}   value={bankDetails.account_holder}  name="account_holder" onChange={handleChange}  
                        />
                      </div>



                    </div>
                    <div className="col-sm-6 proof">

                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Account Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="form-part">
                        <input
                          type="text"
                          maxLength={16} onChange={handleProofChange}
                          onKeyDown={handleProofChange}
                          onPaste={handleProofChange}
                          onCut={handleProofChange}
                          onCopy={handleProofChange}
                          readOnly
                          id="account_no" value={bank.account_no}
                        />
                      </div>


                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 proof">

                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        IFSC Code{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="form-part">
                        <input
                          type="text" maxLength={11}
                          id="ifsc_code" value={bank.ifsc_code} onChange={handleProofChange}
                          onKeyDown={handleProofChange}
                          onPaste={handleProofChange}
                          onCut={handleProofChange}
                          onCopy={handleProofChange}
                          readOnly
                        />
                      </div>

                    </div>

                    <div className="col-sm-6 proof">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Identity card{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div
                        id="divHabilitSelectors"
                        className="input-file-container"
                      ><a href={imageUrl} target="_blank" rel="noopener noreferrer" className='btn btn-colors mt-3 btn-sm' >
                          View
                        </a>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12 text-center">
                        {/* <button >
                         
                        </button> */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Documents Information:
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div className="form-part form-part-padding">
                <div className="register-form">
                  <div className="row step_one">
                    <div className="col-md-12">
                      <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                          Documents Upload{" "}
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
                                  <div className="col-md-6 mt-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          Pan Card front view{" "}

                                      </label>
                                      {basicDetails.pan_card_front ? (
                                          <>
                                            {basicDetails.pan_card_front.substring(basicDetails.pan_card_front.lastIndexOf('.') + 1) == 'pdf'
                                              ?
                                                <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.pan_card_front} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                              :
                                                <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.pan_card_front} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.pan_card_front} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                            }
                                          </>
                                      ) : (
                                          null
                                      )
                                      }

                                  </div>
                                  <div className="col-md-6 mt-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          Pan Card back view{" "}

                                      </label>
                                      {basicDetails.pan_card_back ? (
                                          <>
                                            {basicDetails.pan_card_back.substring(basicDetails.pan_card_back.lastIndexOf('.') + 1) == 'pdf'
                                              ?
                                                <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.pan_card_back} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                              :
                                                <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.pan_card_back} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.pan_card_back} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                            }
                                          </>
                                      ) : (
                                          null
                                      )
                                      }

                                  </div>
                                  <div className="col-md-6 mt-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          Aadhaar Card front view{" "}

                                      </label>
                                      {basicDetails.adhar_card_front ? (
                                        <>
                                          {basicDetails.adhar_card_front.substring(basicDetails.adhar_card_front.lastIndexOf('.') + 1) == 'pdf'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.adhar_card_front} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.adhar_card_front} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.adhar_card_front} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                          }
                                        </>
                                      ) : (
                                          null
                                      )
                                      }

                                  </div>
                                  <div className="col-md-6 mt-5 mb-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          Aadhaar Card back view{" "}
                                      </label>
                                      {basicDetails.adhar_card_back ? (
                                        <>
                                          {basicDetails.adhar_card_back.substring(basicDetails.adhar_card_back.lastIndexOf('.') + 1) == 'pdf'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.adhar_card_back} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.adhar_card_back} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.adhar_card_back} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                          }
                                        </>
                                      ) : (
                                          null
                                      )
                                      }
                                  </div>
                                  <div className="col-md-6 mt-5 mb-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          Certificate Of Incorporation{" "}
                                          {/* <span style={{ color: "red" }}>*</span> */}
                                      </label>
                                      {basicDetails.certificate_incorporation ? (
                                        <>
                                          {basicDetails.certificate_incorporation.substring(basicDetails.certificate_incorporation.lastIndexOf('.') + 1) == 'pdf'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.certificate_incorporation} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.certificate_incorporation} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.certificate_incorporation} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                          }
                                        </>
                                      ) : (
                                          null
                                      )
                                      }
                                  </div>
                                  <div className="col-md-6 mt-5 mb-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          3 Years Bank Statement{" "}
                                          {/* <span style={{ color: "red" }}>*</span> */}
                                      </label>
                                      {basicDetails.bank_statement_three_years ? (
                                        <>
                                          {basicDetails.bank_statement_three_years.substring(basicDetails.bank_statement_three_years.lastIndexOf('.') + 1) == 'pdf'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.bank_statement_three_years} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.bank_statement_three_years} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.bank_statement_three_years} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                          }
                                        </>  
                                      ) : (
                                          null
                                      )
                                      }
                                  </div>
                                  <div className="col-md-6 mt-5 mb-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          MOA{" "}
                                          {/* <span style={{ color: "red" }}>*</span> */}
                                      </label>
                                      {basicDetails.moa ? (
                                        <>
                                          {basicDetails.moa.substring(basicDetails.moa.lastIndexOf('.') + 1) == 'pdf'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.moa} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.moa} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.moa} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                          }
                                        </> 
                                      ) : (
                                          null
                                      )
                                      }
                                  </div>
                                  <div className="col-md-6 mt-5 mb-5">
                                      <label
                                          htmlFor="exampleFormControlInput1"
                                          className="form-label"
                                      >
                                          AOA{" "}
                                          {/* <span style={{ color: "red" }}>*</span> */}
                                      </label>
                                      {basicDetails.aoa ? (
                                        <>
                                          {basicDetails.aoa.substring(basicDetails.aoa.lastIndexOf('.') + 1) == 'pdf'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.aoa} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+basicDetails.aoa} target='_blank'><img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.aoa} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} /></a></div>
                                          }
                                        </> 
                                          
                                      ) : (
                                          null
                                      )
                                      }
                                  </div>
                              </div>
                              <div className="row mt-3">
                                  <div className="col-md-6" style={{ textAlign: "left", fontSize: "12px" }}>
                                      <a
                                          href={`/steps/adharinformation`}
                                          className="btnclasssmae" id="back"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}


export default EditList;