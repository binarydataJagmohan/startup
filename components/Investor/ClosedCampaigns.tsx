import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleBusinessDetails, InvestorBooking,getSingleClosedBusinessDetails} from '@/lib/investorapi';
import { getToken, getCurrentUserData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendNotification,getSingleUserData } from '../../lib/frontendapi'
import { getSingleBusinessInformation } from '../../lib/companyapi';
interface UserData {
    id?: string;
    // role?:string;
  }
  interface InputData {
    business_id?: string;
    minimum_subscription?: number;
    xirr?: number;
    tenure?: number;
    logo?: string;
    no_of_units?: string;
    total_units?: string;
    repay_date?: string;
    resource?: string;
    business_name?: string;
    desc?: string;
    agreement?: string;
    pdc?: string;
    invoice?: string;
    website_url?: string;
    terms?: string;
    amount?: string;
  }
const ClosedCampaigns = () => {
    const [currentUserData, setCurrentUserData] = useState<UserData>({});
    const [user, setUser] = useState<any>({});
    const [value, setValue] = useState(1);
    const [inputs, setInputs] = useState<InputData>({});
    const [subscriptionValue, setSubscriptionValue] = useState(0);
    const [repayValue, setRepayValue] = useState(0);
    const [subscription_value, setSubscription_value] = useState(0);
    const [repay_date, setRepay_date] = useState('');
    const [repayment_value, setRepayment_value] = useState(0);
    const [terms, setTerms] = useState(0);
    const [no_of_units, setNo_of_units] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const { id } = router.query;
    const [current_user_id, setCurrentUserId] = useState("");
    const [ButtonDisabled, setButtonDisabled] = useState(true);
  
  
  
    useEffect(() => {
      const current_user_data: UserData = getCurrentUserData();
  
      if (current_user_data?.id != null) {
        current_user_data.id
          ? setCurrentUserId(current_user_data.id)
          : setCurrentUserId("");
      } else {
        window.location.href = "/login";
      }
  
      const fetchData = async () => {
        const res = await getSingleClosedBusinessDetails(id);
        setInputs(res.data);
      
        const userData: UserData = getCurrentUserData();
        //  console.log(userData);
        setCurrentUserData(userData);
      };
      fetchData();
    }, [id]);
  
  
  
   
    const toggleAccordion = (index: any) => {
      setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };
  
  
  
  return (
    <section className="invertor-campaign_detail">
        <div className="container py-5">
        <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-body text-dark' style={{backgroundColor:"#64CCC5"}}>
                            These Campaign is now Closed.
                        </div>
                    </div>
                </div>
          <div className="detail_text">
            <div className="row mb-3 pdcover align-items-center g-3">
             
              <div className="col-md-6">
                <div className="row g-3">
                  <div className="col-md-6 text-center">
                  <b>STARTUP</b>
                  </div>
                  <div className="col-md-7 text-center">
                    <div className="css-1d6tso">
                      <div className="logo-company">
                        <div className="img">
                          {inputs.logo && (
                            <img src={inputs.logo} alt="" />
                          )}
                        </div>
                      </div>

                      <h5><a href={inputs.website_url} target='_blank' style={{ color: "black" }}>{inputs.business_name}</a></h5>
                      <p>Company</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Total Amount</span>
                    <h3 className="progressbar-title">₹{inputs.amount}</h3>
                  </div>
                  <div>
                    {" "}
                    <span>Units Left</span>
                    <br />
                    <span className="progressbar-value">
                      <span className="unit">
                       <strong>{inputs.no_of_units}</strong>
                      </span>
                      <strong>/{inputs.total_units}</strong>
                    </span>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={inputs.total_units !== undefined ? parseInt(inputs.total_units) : undefined}
                    style={{ width: `${inputs.no_of_units}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 pl-0">
                <div className="main-fixed p-0">
                  <h4>Discounting</h4>
                  <div className="about_section">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="text-center class-smae">
                          <p>XIRR</p>
                          <h6 className="font-60">{inputs.xirr}%</h6>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-center class-smae">
                          <p>Minimum</p>
                          <h6 className="css-19wesjx">
                            ₹{inputs.minimum_subscription}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-center class-smae mb-3">
                          <p>Tenure</p>
                          <h6 className="css-19wesjx">{inputs.tenure} Days</h6>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="text-center class-smae mb-3">
                          <p>Recourse on</p>
                          <h6 className="css-19wesjx">{inputs.resource}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="countersection pt-4">
                    <h4 className="">About</h4>
                    <div className="d-flex justify-content-between all-btn py-3">
                      <div className="">
                        <div className="text-center button-pdf">
                          <a href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.agreement}`} download target='_blank'>
                            <span>
                              Agreement <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <a href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.pdc}`} download target='_blank'>
                            <span>
                              PDC <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <a href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.invoice}`} download target='_blank'>
                            <span>
                              Invoice <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="oppotsummery pt-4">
                      <h4>Opportunity Summary</h4>
                      <div className="seller">
                        <h6>About the Startup</h6>
                        <p>
                          {inputs.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="section-title pt-4">
                    <h4>Frequently Asked Questions</h4>
                    <div className="bar" />
                  </div>

                  <div className="row align-items-center">
                    <div className="col-lg-12">
                      <div className="faq-accordion">
                        <ul className="accordion">
                          <li className="accordion-item">
                            <a
                              className={`accordion-title ${activeIndex === 0 ? "active" : ""
                                }`}
                              href="#"
                              onClick={() => toggleAccordion(0)}
                            >
                              <i className="bx bx-chevron-down" />
                              What is Discounting?
                            </a>
                            <div className={`accordion-content ${activeIndex === 0 ? 'show' : ''}`}>
                              <p>
                                Discounting enables businesses to gain instant
                                access to cash tied up in unpaid invoices or
                                purchase orders. The subscriber provides the
                                cash against the unpaid invoice or purchase
                                order for a higher repayment in return.
                              </p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a
                              className={`accordion-title ${activeIndex === 0 ? "active" : ""
                                }`}
                              href="#"
                              onClick={() => toggleAccordion(1)}
                            >
                              <i className="bx bx-chevron-down" />
                              What access do I have on a free trial?
                            </a>
                            <div className={`accordion-content ${activeIndex === 1 ? 'show' : ''}`}>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt.
                              </p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a
                              className={`accordion-title ${activeIndex === 0 ? "active" : ""
                                }`}
                              href="#"
                              onClick={() => toggleAccordion(2)}
                            >
                              <i className="bx bx-chevron-down" />
                              Does the price go up as my team gets larger?
                            </a>
                            <div className={`accordion-content ${activeIndex === 2 ? 'show' : ''}`}>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt.
                              </p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a
                              className={`accordion-title ${activeIndex === 0 ? "active" : ""
                                }`}
                              href="#"
                              onClick={() => toggleAccordion(3)}
                            >
                              <i className="bx bx-chevron-down" />
                              How can I cancel my subscription?
                            </a>
                            <div className={`accordion-content ${activeIndex === 3 ? 'show' : ''}`}>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt.
                              </p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a
                              className={`accordion-title ${activeIndex === 0 ? "active" : ""
                                }`}
                              href="#"
                              onClick={() => toggleAccordion(4)}
                            >
                              <i className="bx bx-chevron-down" />
                              Can I pay via an Invoice?
                            </a>
                            <div className={`accordion-content ${activeIndex === 4 ? 'show' : ''}`}>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
        <ToastContainer />
      </section>
  )
}

export default ClosedCampaigns