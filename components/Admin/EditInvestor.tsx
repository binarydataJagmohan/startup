import React, { useState, useEffect } from 'react'
import { getSingleInvestor } from '../../lib/investorapi';
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import "react-phone-input-2/lib/style.css";
import { getInvestorType, getAngelInvestorTerms, getDocumentsUpload } from "../../lib/frontendapi";
import Image from "next/image";

const EditInvestor = () => {
  const [investor, setInvestor] = useState({ email: '', linkedin_url: '', country: '', phone: '', city: '', gender: '' });
  const [termscondition, setTermsCondition]: any = useState(false);
  const [accreditedcondition, setAccreditedcondition]: any = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [principal_residence, setPrincipalResidence]: any = useState(false);
  const [experience, setExperience]: any = useState(false);
  const [net_worth, setNetWorth]: any = useState(false);
  const [prev_investment_exp, setPrevInvestmentExp]: any = useState(false);
  const [cofounder, setCofounder]: any = useState(false);
  const [annual_income, setAnnualIncome]: any = useState(false);
  const [financial_net_worth, setFinancialNetWorth]: any = useState(false);
  const [financial_annual_net_worth, setFinancialAnnualNetWorth]: any = useState(false);
  const [foreign_annual_income, setForeignAnnualIncome]: any = useState(false);
  const [foreign_net_worth, setForeignNetWorth]: any = useState(false);
  const [foreign_annual_net_worth, setForeignAnnualNetWorth]: any = useState(false);
  const [corporate_net_worth, setCorporateNetWorth]: any = useState(false);

  const [documentUpload, setDocumentUpload] = useState([]);

  const [investorDetails, seInvestorDetails] = useState({
    investorType: ""
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (id: any) => {
      const data = await getSingleInvestor(id);
      if (data) {
        setInvestor(data.data);
      }
    };
    if (router.query.id) {
      fetchData(router.query.id);
    }

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
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email{" "}
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Email" name="email"
                            value={investor.email} readOnly />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Linkedin Url{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input
                            type="text"
                            placeholder="www.linkedin.com" name="linkedin_url" value={investor.linkedin_url} readOnly

                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                    </div>

                    {/* Rest of the form code */}
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Country{" "}
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Country of Citizenship " name="country" value={investor.country} readOnly />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <div className="mt-3">
                            <PhoneInput
                              country={"us"}
                              value={investor.phone}
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
                          <input type="text" placeholder="City" name="city" value={investor.city} readOnly />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Gender{" "}
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Gender" name="gender" value={investor.gender} readOnly />
                          <div className="help-block with-errors" />
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
                                      checked={investorDetails.investorType === 'Regular Investor'}
                                      disabled
                                    />
                                    <label htmlFor="myCheckbox3">
                                      <Image src="/assets/img/investor/regular.png" height={112} width={112} alt={'regular.png'} />
                                    </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="help-block with-errors" />                             
                            </div>
                          </div>
                        </div>
                        {termscondition &&
                          <div className="container" id="option_select">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="custom-select-bar position-relative">
                                  <select className="options" value={selectedOption} disabled>
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
                                          readOnly
                                        />
                                      </div>

                                      <div className="col">
                                        <label htmlFor="checkbox4">
                                          Net tangible assets of at least INR 2 Crore excluding value of his principal residence.<span className="requiredclass">*</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <div className="col-auto pt-1">
                                        <input type="checkbox" id="checkbox5"
                                          name="prev_investment_exp"
                                          value={prev_investment_exp == 0 ? 1 : 0} checked={prev_investment_exp == 0 ? false : true} readOnly />
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
                                          name="cofounder" checked={cofounder == 0 ? false : true} readOnly />
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
                                          name="experience" checked={experience == 0 ? false : true} readOnly />
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
                                      <p><span className="small mb-2 d-inline-block" style={{ "fontStyle": "italic" }}>Note:</span> Please select atleast one option!</p>
                                    </div>
                                  </div>
                                </div>
                                <div id="checkbox-group-2" className={selectedOption === '2' ? 'visible mt-3' : 'hidden mt-3'}>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <div className="col-auto pt-1">
                                        <input type="checkbox" id="checkbox8" value={net_worth == 0 ? 1 : 0}
                                          name="net_worth" checked={net_worth == 0 ? false : true} readOnly />
                                      </div>
                                      <div className="col">
                                        <label htmlFor="checkbox8">Net worth of at least INR 10 Crore.<span className="requiredclass">*</span></label><br></br>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div id="checkbox-group-3" className={selectedOption === '3' ? 'visible mt-3' : 'hidden mt-3'}>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <div className="col-auto pt-1">
                                        <input type="checkbox" id="checkbox9" value={1}
                                          name="no_requirements" checked={true} readOnly />
                                      </div>
                                      <div className="col">
                                        <label htmlFor="checkbox9">No Requirement.</label><br></br>
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
                                  name="category" value={selectedOption} disabled>
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
                                          readOnly />
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
                                          checked={financial_net_worth == 0 ? false : true}
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
                                          readOnly />
                                      </div>
                                      <div className="col">
                                        <label htmlFor="checkbox12">Have an annual income of at least ₹1 crore and a net worth of at least ₹ 5 crore with more
                                          than ₹ 2.5 crore of financial assets.</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <p><span className="small mb-2 d-inline-block" style={{ "fontStyle": "italic" }}>Note:</span> Please select atleast one option!</p>
                                    </div>
                                  </div>
                                </div>
                                <div id="checkbox-group-5" className={selectedOption === '5' ? 'visible mt-3' : 'hidden mt-3'}>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <div className="col-auto pt-1">
                                        <input type="checkbox" id="checkbox13" value={foreign_annual_income == 0 ? 1 : 0}
                                          name="foreign_annual_income" checked={foreign_annual_income == 0 ? false : true}
                                          readOnly />
                                      </div>
                                      <div className="col">
                                        <label htmlFor="checkbox13">Have an annual income of at least $300,000.</label><br></br>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <div className="col-auto pt-1">
                                        <input type="checkbox" id="checkbox14" value={foreign_net_worth == 0 ? 1 : 0} name="foreign_net_worth" checked={foreign_net_worth == 0 ? false : true}
                                          readOnly />
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
                                          readOnly />
                                      </div>
                                      <div className="col">
                                        <label htmlFor="checkbox15">Have an annual income of at least $150,000 and a net worth of at least $750,000 with more
                                          than $350,000 of financial assets.</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <p><span className="small mb-2 d-inline-block" style={{ "fontStyle": "italic" }}>Note:</span> Please select atleast one option!</p>
                                    </div>
                                  </div>
                                </div>
                                <div id="checkbox-group-6" className={selectedOption === '6' ? 'visible mt-3' : 'hidden mt-3'}>
                                  <div className="same-card checkbox-options">
                                    <div className="row">
                                      <div className="col-auto pt-1">
                                        <input type="checkbox" id="checkbox16" value={corporate_net_worth == 0 ? 1 : 0} checked={corporate_net_worth == 0 ? false : true}
                                          readOnly />
                                      </div>
                                      <div className="col">
                                        <label htmlFor="checkbox16">Net worth greater than or equal to INR 50 crore or, $7.5 million.</label><br></br>
                                      </div>
                                    </div>
                                  </div>
                                </div>                               
                              </div>
                            </div>
                          </div>
                        }
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
                        documentUpload.map((document: any, index: any) => {
                          let extension = document.filename.substring(document.filename.lastIndexOf('.') + 1);
                          return (
                            <div className="col-md-6 mt-5" key={index}>
                              {document.type == 'proof_network'
                                ?
                                <>
                                  <label htmlFor="exampleFormControlInput1" className="form-label">Proof Of Net Worth</label>
                                  {extension == 'pdf' || extension == 'docs' || extension == 'xls'
                                    ?
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} alt={document.filename} width={100} height={80} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} alt={document.filename} width={100} height={80} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} alt={document.filename} width={100} height={80} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} alt={document.filename} width={100} height={80} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} alt={document.filename} width={100} height={80} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} alt={document.filename} width={100} height={80} /></a></div>
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
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><i className="fa-solid fa-file" style={{ "fontSize": "60px" }}></i></a></div>
                                    :
                                    <div className='col-sm-12'><a href={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} target='_blank'><Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + document.filename} alt={document.filename} width={100} height={80} /></a></div>
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