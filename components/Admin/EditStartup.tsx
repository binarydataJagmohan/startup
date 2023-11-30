import React, { useState, useEffect } from 'react'
import { getSinglestartup } from '../../lib/companyapi';
import { getBusinessInformation, getBankInformation, getCountries, getProofInformation, fetchSingleUserDocuments } from '../../lib/frontendapi';
import PhoneInput from "react-phone-input-2";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
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
    certificate_incorporation: "",
    bank_statement_three_years: "",
    moa: "",
    aoa: "",
    documnet_id: '',
  });
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}docs/${proof.proof_img}`;
  const router = useRouter();
  const [countries, setcountries] = useState<Country[]>([]);
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
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Email" value={startup.email} name="email" readOnly />
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
                            name="linkedin_url"
                            readOnly
                          />
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
                          <input type="text" placeholder="Country of Citizenship " name="country" value={startup.country} readOnly />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-part">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="mt-3">
                            <PhoneInput
                              country={"us"}
                              value={startup.phone}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">City{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="City" value={startup.city} name="city" readOnly />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Gender{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" value={startup.gender} readOnly />
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
                    <form className="needs-validation mb-4" encType="multipart/form-data" >
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
                                id="business_name" name="business_name" value={bussiness.business_name} readOnly
                              />
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
                                id="reg_businessname" value={bussiness.reg_businessname} readOnly name="reg_businessname"
                              />
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
                                className="form-control same-input h-50" value={bussiness.website_url} readOnly name="website_url"
                              />
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="sector"
                                className="form-label mb-2"
                              >
                                Sector of Startup
                                <span style={{ color: "red" }}>*</span>

                              </label>
                              <input type="text" value={bussiness.sector} readOnly className='form-control same-input mb-3 h-50' />
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="stage"
                                className="form-label mb-2"
                              >
                                Stage of Startup
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input type="text" value={bussiness.stage} readOnly className='form-control same-input mb-3 h-50' />
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
                                id="startup_date" value={bussiness.startup_date} name="startup_date"
                                max={new Date().toISOString().split("T")[0]} readOnly
                              />
                            </div>
                            <div className="col-md-6 mt-3">
                              <label htmlFor="tagline" className="form-label">
                                Tagline
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                id="tagline" value={bussiness.tagline} name="tagline"
                                readOnly
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
                                {bussiness.logo ? (
                                  <>
                                    {bussiness.logo.substring(bussiness.logo.lastIndexOf('.') + 1) == 'pdf'
                                      ?
                                      <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + bussiness.logo} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                      :
                                      <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + bussiness.logo} target='_blank'>
                                        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + bussiness.logo} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
                                    }
                                  </>
                                ) : (
                                  null
                                )
                                }
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
                                className="form-control" value={bussiness.description} readOnly name="description"
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
                                  Startup pitch deck
                                </label>
                                {bussiness.pitch_deck ? (
                                  <>
                                    {bussiness.pitch_deck.substring(bussiness.pitch_deck.lastIndexOf('.') + 1) == 'pdf'
                                      ?
                                      <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + bussiness.pitch_deck} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                      :
                                      <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + bussiness.pitch_deck} target='_blank'>
                                        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + bussiness.pitch_deck} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
                                    }
                                  </>
                                ) : (
                                  null
                                )
                                }                               
                              </div>
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

                        <input type="text" placeholder="Adhaar Number" value={proof.uid} name="uid"
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
                          id="dob" value={proof.dob}
                          readOnly
                          name="dob"
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
                          id="bank_name" value={bank.bank_name}
                          readOnly
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
                          id="account_holder" value={bank.account_holder}
                          readOnly
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
                          maxLength={16}
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
                          id="ifsc_code" value={bank.ifsc_code}
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.pan_card_front} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.pan_card_front} target='_blank'>
                                      <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.pan_card_front} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.pan_card_back} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.pan_card_back} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.pan_card_back} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.adhar_card_front} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.adhar_card_front} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.adhar_card_front} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.adhar_card_back} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.adhar_card_back} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.adhar_card_back} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.certificate_incorporation} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.certificate_incorporation} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.certificate_incorporation} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.bank_statement_three_years} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.bank_statement_three_years} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.bank_statement_three_years} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.moa} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.moa} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.moa} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.aoa} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.aoa} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.aoa} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} height={100} width={150} /></a></div>
                                  }
                                </>

                              ) : (
                                null
                              )
                              }
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