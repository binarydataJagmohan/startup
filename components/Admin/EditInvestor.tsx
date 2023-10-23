import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getSingleInvestor } from '../../lib/investorapi';
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import "react-phone-input-2/lib/style.css";
import { getCountries, sendNotification, investorTypeInfoSave, getSingleUserData, getInvestorType, getAngelInvestorTerms, getDocumentsUpload } from "../../lib/frontendapi";
import { getToken, getCurrentUserData } from "../../lib/session";
import Image from "next/image";
import Link from 'next/link';
type Country = {
  name: string;
  country_code: string;
}
interface UserData {
  id?: string;
}
const EditInvestor = () => {
  const [investor, setInvestor] = useState({ email: '', linkedin_url: '', country: '', phone: '', city: '', gender: '' });
  const [countries, setcountries] = useState<Country[]>([]);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [investorType, setInvestorType] = useState('');
  const [termscondition, setTermsCondition]: any = useState(false);
  const [accreditedcondition, setAccreditedcondition]: any = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [principal_residence, setPrincipalResidence]: any = useState(false);
  const [experience, setExperience]: any = useState(false);
  const [net_worth, setNetWorth]: any = useState(false);
  const [prev_investment_exp, setPrevInvestmentExp]: any = useState(false);
  const [no_requirements, setNoRequirements]: any = useState(false);
  const [cofounder, setCofounder]: any = useState(false);
  const [annual_income, setAnnualIncome]: any = useState(false);
  const [financial_net_worth, setFinancialNetWorth]: any = useState(false);
  const [financial_annual_net_worth, setFinancialAnnualNetWorth]: any = useState(false);
  const [foreign_annual_income, setForeignAnnualIncome]: any = useState(false);
  const [foreign_net_worth, setForeignNetWorth]: any = useState(false);
  const [foreign_annual_net_worth, setForeignAnnualNetWorth]: any = useState(false);
  const [corporate_net_worth, setCorporateNetWorth]: any = useState(false);
  const [current_user_id, setCurrentUserId] = useState("");
  const [errors, setErrors]: any = useState({});
  const [users, setUsers] = useState<any>({});
  const [terms, setTerms] = useState({
    category: "",
    principal_residence: "0",
    cofounder: "0",
    prev_investment_exp: "0",
    experience: "0",
    net_worth: "0",
    no_requirements: "0"
  });
  const [basicDetails, setBasicDetails] = useState({
    proof_of_network: "",
    proof_of_income: "",
    certificate_of_incorporation: "",
    ca_signed_net_angeable_2_crore: "",
    net_worth_atleast_10_crore: "",
    bank_statement_3_years:"",
    incorporation_certificate:"",
    documnet_id: '',
});
  const [proof_of_network, setProofOfNetwork] = useState(null);
  const [proof_of_income, setProofOfIncome] = useState(null);
  const [certificate_of_incorporation, setCertificateOfIncorporation] = useState(null);
  const [ca_signed_net_angeable_2_crore, setCASignedNetAngeable2Crore] = useState(null);
  const [net_worth_atleast_10_crore, setNetWorthAtleast10Crore] = useState(null);
  const [bank_statement_3_years, setBankStatement3Years] = useState(null);
  const [incorporation_certificate, setIncorporationCertificate] = useState(null);
  const [documentUpload, setDocumentUpload] = useState([]);
  const trueTermsCondition = () => {
    setSelectedOption('');
    setPrincipalResidence(false);
    setExperience(false);
    setNetWorth(false);
    setPrevInvestmentExp(false);
    setNoRequirements(false);
    setCofounder(false);
    setTermsCondition(true);
  }
  const trueaccreditedcondition = () => {
    setAccreditedcondition(true);
  }
  const [investorDetails, seInvestorDetails] = useState({
    investorType: ""
  });

  const router = useRouter();
  const { id } = router.query;


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

    setInvestor((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
        id: id,
        country_code: countryCode ? `${countryCode}` : " ",
      };
    });
  }

  const updateInvestorInformation = async (e: any) => {
    e.preventDefault();
    setMissingFields([]);
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

    if (!investor.email) {
      setMissingFields(prevField => [...prevField, "Email"])
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(investor.email)) {
      setInvalidFields(prevFields => [...prevFields, "Email"]);
    }
    if (!investor.linkedin_url) {
      setMissingFields(prevFields => [...prevFields, "linkedin_url"]);
    } else if (!/^(https:\/\/)?(www\.)?linkedin\.com\/(in\/[a-zA-Z0-9_-]+|company\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+\/?)\/?$/.test(investor.linkedin_url)) {
      setInvalidFields(prevFields => [...prevFields, "linkedin_url"]);
    }
    if (!investor.city) setMissingFields(prevField => [...prevField, "City"]);
    if (!investor.country) setMissingFields(prevField => [...prevField, "country"]);
    if (!investor.gender) setMissingFields(prevField => [...prevField, "gender"]);
    if (!investor.phone) setMissingFields(prevField => [...prevField, "Phone"]);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/update-investor-personal-info/${id}`,
        {

          ['email']: investor.email,
          ['country']: investor.country,
          ['phone']: investor.phone,
          ['city']: investor.city,
          ['linkedin_url']: investor.linkedin_url,
          ['gender']: investor.gender

        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
          }
        }
      );


      toast.success('Information updated successfully');

      setTimeout(() => {
        router.push('/admin/all-investors');
      }, 2000);
    }
    catch (error) {

    }

  }

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
  const handleInvestorChange = (e: any) => {
    setMissingFields([]);
    setInvalidFields([]);
    setInvestor((prevInvestor) => ({
      ...prevInvestor,
      [e.target.name]: e.target.value
    }))
  }
  useEffect(() => {
    const current_user_data: any = getCurrentUserData();
    setCurrentUserId(current_user_data.id);
    const fetchData = async (id: any) => {
      const data = await getSingleInvestor(id);
      if (data) {
        setInvestor(data.data);

      }
    };
    if (router.query.id) {
      fetchData(router.query.id);
    }
    getSingleUserData(router.query.id)
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
    getInvestorType(router.query.id)
    .then((res) => {
      if (res.status === true) {
        seInvestorDetails(res.data);
        if (res.data.investorType == 'Accredited Investors') {
          setAccreditedcondition(true);
        }
        if (res.data.investorType == 'Angel Investor') {
          setTermsCondition(true);
        }
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
    getAngelInvestorTerms(router.query.id)
    .then((res) => {
      if (res.status === true) {
          setForeignAnnualIncome(res.data.foreign_annual_income)
          setSelectedOption(res.data.category);
          setFinancialNetWorth(res.data.financial_net_worth);
          setAnnualIncome(res.data.annual_income);
          setFinancialAnnualNetWorth(res.data.financial_annual_net_worth);
          setForeignNetWorth(res.data.foreign_net_worth);
          setForeignAnnualNetWorth(res.data.foreign_annual_net_worth);
          setCorporateNetWorth(res.data.corporate_net_worth);
          setNoRequirements(res.data.no_requirements);
          setNetWorth(res.data.net_worth);
          setExperience(res.data.experience);
          setCofounder(res.data.cofounder);
          setPrincipalResidence(res.data.principal_residence);
          setPrevInvestmentExp(res.data.prev_investment_exp);
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
    const data = {
      user_id: router.query.id
    }
    getDocumentsUpload(data)
    .then((res) => {
      if (res.status === true) {
        setDocumentUpload(res.data);
      } else {
        setDocumentUpload([]);
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
  }, [router.query.id]);
  const handleRadioChange = (event: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const { name, value, type, checked } = event.target;
    const selectedValue = event.target.value;
    setInvestorType(selectedValue);
    if (selectedValue === 'Angel Investor') {
        trueTermsCondition();
        setAccreditedcondition(false);
    } else if (selectedValue === 'Accredited Investors') {
        setTermsCondition(false);
        trueaccreditedcondition();
    } else {
        setTermsCondition(false);
        setAccreditedcondition(false);
    }
    if (type === 'radio' && name === 'investorType') {
        const typeValue = checked ? 'Accredited Investors' : 'Angel Investor';
        seInvestorDetails((prevState) => {
            return {
                ...prevState,
                investorDetails: typeValue,
                user_id: id,
            };
        });
    }
    seInvestorDetails((prevState) => {
        return {
            ...prevState,
            [name]: value,
            user_id: id,
        };
    });
};
const handleProofOfNetworkChange = (event: any) => {
  const file = event.target.files[0];
  setProofOfNetwork(file);
};


const handleProofOfIncomeChange = (event: any) => {
  const file = event.target.files[0];
  setProofOfIncome(file);
};

const handleCertificateOfIncorporationChange = (event: any) => {
  const file = event.target.files[0];
  setCertificateOfIncorporation(file);
};

const handleCASignedNetAngeable2CroreChange = (event: any) => {
  const file = event.target.files[0];
  setCASignedNetAngeable2Crore(file);
};

const handleNetWorthAtleast10CroreChange = (event: any) => {
  const file = event.target.files[0];
  setNetWorthAtleast10Crore(file);
};

const handleBankStatement3YearsChange = (event: any) => {
  const file = event.target.files[0];
  setBankStatement3Years(file);
};

const handleIncorporationCertificateChange = (event: any) => {
  const file = event.target.files[0];
  setIncorporationCertificate(file);
}

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
                Personal Information:
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
                  {/* <h3>Personal Information</h3> */}
                  <form onSubmit={updateInvestorInformation}>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email{" "}
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Email" name="email"
                            //  onChange={handleInvestorChange} 
                            value={investor.email} readOnly />
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
                            placeholder="www.linkedin.com" name="linkedin_url" onChange={handleInvestorChange} value={investor.linkedin_url} readOnly

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
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Country of Citizenship " onChange={handleInvestorChange} name="country" value={investor.country} readOnly/>
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
                              value={investor.phone}
                              onChange={(value) => {
                                setMissingFields([]);
                                setInvestor((prevState) => ({ ...prevState, phone: value }));
                              }}
                              disabled
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
                          <input type="text" placeholder="City" name="city" onChange={handleInvestorChange} value={investor.city} readOnly/>
                          <div className="help-block with-errors" />
                          {missingFields.includes("City") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the city field.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Gender{" "}
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </label>
                        <div className="form-part">
                          <select name="gender" value={investor.gender ? investor.gender : ""} onChange={handleInvestorChange} disabled>
                            <option value={investor.gender ? investor.gender : ""}>{investor.gender ? investor.gender.charAt(0).toUpperCase() + investor.gender.slice(1) : "--SELECT GENDER--"}</option>
                            {investor.gender !== 'male' && <option value="male">Male</option>}
                            {investor.gender !== 'female' && <option value="female">Female</option>}
                            {investor.gender !== 'other' && <option value="other">Other</option>}
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
                          <button type="submit" className="btnclasssmae" disabled>
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
                Investor Information:
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="row step_one">
                  <div className="col-md-12">
                    <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                      {" "}
                      Investor Information{" "}
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
                              <div className="form-group col-md-12">
                                  <div className="col-md-12 text-center twobox">
                                      <div className="images-investor text-center">
                                          <ul className="investor-classs">
                                              <li>
                                                  <h6 className="mt-3">Accredited Investors</h6>
                                                  <input
                                                      className="form-check-input gender-radio" id="myCheckbox1"
                                                      type="radio"
                                                      name="investorType"
                                                      value="Accredited Investors"
                                                      onClick={handleRadioChange}
                                                      checked={investorDetails.investorType === 'Accredited Investors'}
                                                      disabled
                                                  />
                                                  <label htmlFor="myCheckbox1">
                                                      <Image
                                                          src="/assets/img/investor/accredited.png"
                                                          alt=""
                                                          width={187}
                                                          height={150}
                                                      />
                                                  </label>
                                              </li>
                                              <li>
                                                  <h6 className="mt-3">Angel Investor</h6>
                                                  <input
                                                      className="form-check-input gender-radio" id="myCheckbox2"
                                                      type="radio"
                                                      name="investorType"
                                                      value="Angel Investor"
                                                      onClick={handleRadioChange}
                                                      checked={investorDetails.investorType === 'Angel Investor'}
                                                      disabled
                                                  />
                                                  <label htmlFor="myCheckbox2">
                                                      <Image
                                                          src="/assets/img/investor/angel.png"
                                                          alt=""
                                                          width={187}
                                                          height={150}
                                                      />
                                                  </label>
                                              </li>
                                              <li>
                                                  <h6 className="mt-3">Regular Investor</h6>
                                                  <input
                                                      className="form-check-input gender-radio" id="myCheckbox3"
                                                      type="radio"
                                                      name="investorType"
                                                      value="Regular Investor"
                                                      onClick={handleRadioChange}
                                                      checked={investorDetails.investorType === 'Regular Investor'}
                                                      disabled
                                                  />
                                                  <label htmlFor="myCheckbox3">
                                                      <img src="/assets/img/investor/regular.png" />
                                                  </label>
                                              </li>
                                          </ul>
                                      </div>
                                      <div className="help-block with-errors" />
                                      <div className="error text-center">
                                          {errors.investorType && (
                                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                                  {errors.investorType}
                                              </span>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          </div>
                          {termscondition &&
                              <div className="container" id="option_select">
                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="custom-select-bar position-relative">
                                              <select className="options" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} disabled>
                                                  <option value="">--SELECT CATEGORY--</option>
                                                  <option value="1">Individual</option>
                                                  <option value="2">Body Corporate/VC/PE/Family Office/Corporate Institution</option>
                                                  <option value="3">Accelerators and Incubators</option>
                                              </select>
                                              <i className="fa-solid fa-chevron-down"></i>
                                          </div>
                                          <div id="checkbox-group-1" className={selectedOption === '1' ? 'visible mt-3' : 'hidden mt-3'}>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox4"
                                                              name="principal_residence" value={principal_residence == 0 ? 1 : 0}
                                                              checked={principal_residence == 0 ? false : true}
                                                              onChange={() => setPrincipalResidence(!principal_residence)}
                                                              readOnly
                                                          />
                                                      </div>

                                                      <div className="col">
                                                          <label htmlFor="checkbox4">
                                                              Net tangible assets of at least INR 2 Crore excluding value of his principal residence.<span className="requiredclass">*</span>
                                                          </label>
                                                          {errors.principal_residence && (
                                                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                  {errors.principal_residence}
                                                              </span>
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox5"
                                                              name="prev_investment_exp"
                                                              value={prev_investment_exp == 0 ? 1 : 0} onChange={() => setPrevInvestmentExp(!prev_investment_exp)} checked={prev_investment_exp == 0 ? false : true} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox5">Has invested in startups before</label>

                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox6" value={cofounder == 0 ? 1 : 0}
                                                              name="cofounder" onChange={() => setCofounder(!cofounder)} checked={cofounder == 0 ? false : true} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox6">come from an entrepreneurial family or have been a
                                                              founder/co-founder of a business
                                                              venture</label>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox7" value={experience == 0 ? 1 : 0}
                                                              name="experience" onChange={() => setExperience(!experience)} checked={experience == 0 ? false : true} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox7">Senior management professional with at least 10 years of
                                                              experience.<span className="requiredclass">*</span>
                                                          </label>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <p><span className="small mb-2 d-inline-block" style={{"fontStyle":"italic"}}>Note:</span> Please select atleast one option!</p>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      {errors.experience && (
                                                          <span className="small error text-danger mb-2 d-inline-block error_login">
                                                              {errors.experience}
                                                          </span>
                                                      )}
                                                  </div>
                                              </div>
                                          </div>
                                          <div id="checkbox-group-2" className={selectedOption === '2' ? 'visible mt-3' : 'hidden mt-3'}>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox8" value={net_worth == 0 ? 1 : 0}
                                                              name="net_worth" onChange={() => setNetWorth(!net_worth)} checked={net_worth == 0 ? false : true} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox8">Net worth of at least INR 10 Crore.<span className="requiredclass">*</span></label><br></br>
                                                          {errors.net_worth && (
                                                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                  {errors.net_worth}
                                                              </span>
                                                          )}
                                                      </div>

                                                  </div>
                                              </div>
                                          </div>
                                          <div id="checkbox-group-3" className={selectedOption === '3' ? 'visible mt-3' : 'hidden mt-3'}>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox9" value={1}
                                                              name="no_requirements" onChange={() => setNoRequirements(!no_requirements)} checked={true} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          {/* <label htmlFor="checkbox9">No Requirement.<span className="requiredclass">*</span></label><br></br> */}
                                                          <label htmlFor="checkbox9">No Requirement.</label><br></br>
                                                          {/* {errors.no_requirements && (
                                                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                  {errors.no_requirements}
                                                              </span>
                                                          )} */}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          }

                          {accreditedcondition &&
                              <div className="container" id="option_select">
                                  <div className="row">
                                      <div className="col-md-12">
                                          <select className="options"
                                              name="category" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} disabled>
                                              <option value="">--SELECT CATEGORY--</option>
                                              <option value="4">Indian Individuals/HUFs/Family Trusts/Sole Proprietorships</option>
                                              <option value="5">Foreign Individuals/Family Trusts/Sole Proprietorships</option>
                                              <option value="6">Body Corporates</option>
                                          </select>
                                          <div id="checkbox-group-4" className={selectedOption === '4' ? 'visible mt-3' : 'hidden mt-3'}>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox10" value={annual_income == 0 ? 1 : 0}
                                                              name="annual_income"
                                                              checked={annual_income == 0 ? false : true}
                                                              onChange={(e: any) => setAnnualIncome(!annual_income)} readOnly/>
                                                              
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox10">
                                                              Have an annual income of at least ₹2 crore in the preceding financial year.
                                                          </label><br></br>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input
                                                              type="checkbox"
                                                              id="checkbox11"
                                                              value={financial_net_worth == 0 ? 1 : 0}
                                                              name="financial_net_worth"
                                                              checked={financial_net_worth == 0 ? false : true} // Use a boolean expression
                                                              onChange={(e: any) => setFinancialNetWorth(!financial_net_worth)}
                                                              readOnly
                                                          />
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox11">Have a net worth of at least ₹7.5 crore with more than ₹3.75 crore of financial assets.</label>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox12" value={financial_annual_net_worth == 0 ? 1 : 0}
                                                              name="financial_annual_net_worth" checked={financial_annual_net_worth == 0 ? false : true}
                                                              onChange={(e: any) => setFinancialAnnualNetWorth(!financial_annual_net_worth)} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox12">Have an annual income of at least ₹1 crore and a net worth of at least ₹ 5 crore with more
                                                              than ₹ 2.5 crore of financial assets.</label>

                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <p><span className="small mb-2 d-inline-block" style={{"fontStyle":"italic"}}>Note:</span> Please select atleast one option!</p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div id="checkbox-group-5" className={selectedOption === '5' ? 'visible mt-3' : 'hidden mt-3'}>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox13" value={foreign_annual_income == 0 ? 1 : 0}
                                                              name="foreign_annual_income" checked={foreign_annual_income == 0 ? false : true}
                                                              onChange={(e: any) => setForeignAnnualIncome(!foreign_annual_income)} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox13">Have an annual income of at least $300,000.</label><br></br>
                                                          {errors.foreign_annual_income && (
                                                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                  {errors.foreign_annual_income}
                                                              </span>
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox14" value={foreign_net_worth == 0 ? 1 : 0} name="foreign_net_worth" checked={foreign_net_worth == 0 ? false : true}
                                                              onChange={(e: any) => setForeignNetWorth(!foreign_net_worth)} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox14">Have a net worth of at least $1 million with more than $500,000 of financial assets.</label>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox15" value={foreign_annual_net_worth == 0 ? 1 : 0}
                                                              name="foreign_annual_net_worth" checked={foreign_annual_net_worth == 0 ? false : true}
                                                              onChange={(e: any) => setForeignAnnualNetWorth(!foreign_annual_net_worth)} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox15">Have an annual income of at least $150,000 and a net worth of at least $750,000 with more
                                                              than $350,000 of financial assets.</label>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <p><span className="small mb-2 d-inline-block" style={{"fontStyle":"italic"}}>Note:</span> Please select atleast one option!</p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div id="checkbox-group-6" className={selectedOption === '6' ? 'visible mt-3' : 'hidden mt-3'}>
                                              <div className="same-card checkbox-options">
                                                  <div className="row">
                                                      <div className="col-auto pt-1">
                                                          <input type="checkbox" id="checkbox16" value={corporate_net_worth == 0 ? 1 : 0} checked={corporate_net_worth == 0 ? false : true}
                                                              onChange={(e: any) => setCorporateNetWorth(!corporate_net_worth)} readOnly/>
                                                      </div>
                                                      <div className="col">
                                                          <label htmlFor="checkbox16">Net worth greater than or equal to INR 50 crore or, $7.5 million.</label><br></br>
                                                          {errors.corporate_net_worth && (
                                                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                  {errors.corporate_net_worth}
                                                              </span>
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="same-card checkbox-options">
                                              <div className="row">
                                                  {errors.annual_income && (
                                                      <span className="small error text-danger mb-2 d-inline-block error_login">
                                                          {errors.annual_income}
                                                      </span>
                                                  )}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          }

                          <div className="row mt-3">
                              {/* <div
                                  className="col-md-6 col-6"
                                  style={{ textAlign: "left" }}
                              >
                                  <Link
                                      href={`/investor-steps/findbusiness`}
                                      className="btnclasssmae"
                                      id="back"
                                  >
                                      Go back
                                  </Link>
                              </div> */}

                              <div
                                  className="col-md-6 col-6"
                                  style={{ textAlign: "right" }}
                              >
                                  <button className="btnclasssmae" disabled>
                                      Submit
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
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Documents Information:
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="form-part form-part-padding">
                <h3>Documents Information</h3>
                <div className="row justify-content-center">
                  <div className="col-md-8" id="register">
                      <div className="row">
                        {documentUpload.length > 0 
                          ?
                            documentUpload.map((document:any, index:any) => {
                              let extension = document.filename.substring(document.filename.lastIndexOf('.') + 1);
                              return(
                                <div className="col-md-6 mt-5" key={index}>
                                  {document.type == 'proof_network'
                                    ?
                                      <>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Proof Of Net Worth</label>    
                                        {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} alt={document.filename} width={100} height={80}/></a></div>
                                        }
                                      </>
                                    :
                                      ''
                                  }
                                  {document.type == 'proof_income'
                                    ?
                                      <>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Proof Of Income</label>    
                                        {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} alt={document.filename} width={100} height={80}/></a></div>
                                        }
                                      </>
                                    :
                                      ''
                                  }
                                  {document.type == 'certificate_incorporation'
                                    ?
                                      <>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Certificate of Incorporation</label>    
                                        {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} alt={document.filename} width={100} height={80}/></a></div>
                                        }
                                      </>
                                    :
                                      ''
                                  }
                                  {document.type == 'ca_signed_angeable_2_crore'
                                    ?
                                      <>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">CA Signed of Net Tangible of 2 Crore</label>    
                                        {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} alt={document.filename} width={100} height={80}/></a></div>
                                        }
                                      </>
                                    :
                                      ''
                                  }
                                  {document.type == 'net_worth_10_crore'
                                    ?
                                      <>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Net Worth of at least INR 10 Crore</label>    
                                        {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} alt={document.filename} width={100} height={80}/></a></div>
                                        }
                                      </>
                                    :
                                      ''
                                  }
                                  {document.type == 'bank_statement_3_years'
                                    ?
                                      <>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">3 Years Bank Statement</label>    
                                        {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} alt={document.filename} width={100} height={80}/></a></div>
                                        }
                                      </>
                                    :
                                      ''
                                  }
                                  {document.type == 'incorporation_certificate'
                                    ?
                                      <>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Incorporation Certificate</label>    
                                        {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                          ?
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><i className="fa-solid fa-file" style={{"fontSize":"60px"}}></i></a></div>
                                          :
                                            <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL+'docs/'+document.filename} alt={document.filename} width={100} height={80}/></a></div>
                                        }
                                      </>
                                    :
                                      ''
                                  }
                                </div>
                              )
                            })
                          :
                            ''
                        }
                      </div>
                      <div className="row mt-3">
                          {/* <div className="col-md-6" style={{ textAlign: "left", fontSize: "12px" }}>
                              <a
                                  href='#'
                                  className="btnclasssmae" id="back"
                                  onClick={handleClickGoBackButton}
                              >
                                  Go back
                              </a>
                          </div> */}

                          <div
                              className="col-md-12"
                              style={{ textAlign: "center" }}
                          >
                              <button type="submit" className="btnclasssmae" disabled>
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
      <ToastContainer autoClose={1000} />
    </div>
  );

}

export default EditInvestor