import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSingleBusinessDetails, InvestorBooking } from "@/lib/investorapi";
import { getToken, getCurrentUserData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import Image from 'next/image';
import { sendNotification } from '../../lib/frontendapi'
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

export default function CampaignsDetails() {
  const [currentUserData, setCurrentUserData] = useState<UserData>({});
  const [value, setValue] = useState(1);
  const [inputs, setInputs] = useState<InputData>({});
  const [subscriptionValue, setSubscriptionValue] = useState(0);
  const [repayValue, setRepayValue] = useState(0);
  const [subscription_value, setSubscription_value] = useState(0);
  const [repay_date, setRepay_date] = useState("");
  const [repayment_value, setRepayment_value] = useState(0);
  const [terms, setTerms] = useState(0);
  const [no_of_units, setNo_of_units] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const [checkboxError, setCheckboxError] = useState('');
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
      const res = await getSingleBusinessDetails(id);
      setInputs(res.data);
      const userData: UserData = getCurrentUserData();
      //  console.log(userData);
      setCurrentUserData(userData);
    };
    fetchData();
  }, [id]);

  const handleChangeTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox" && name === "terms") {
      // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
      const cofounderValue = checked ? "1" : "0";
      setTerms((prevState: any) => {
        return {
          ...prevState,
          cofounder: cofounderValue,
          user_id: current_user_id,
        };
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!repayment_value) {
      setCheckboxError('* Please accept the terms and conditions');
    } else {
      const data = {
        user_id: currentUserData.id,
        business_id: inputs.business_id,
        subscription_value: subscriptionValue,
        repay_date: inputs.repay_date,
        repayment_value: repayValue,
        no_of_units: value,
      };

      const notification = {
        notify_from_user: currentUserData.id,
        notify_to_user: "1",
        notify_msg: "Payment Successfully Done.",
        notification_type: "Investment Notification",
        each_read: "unread",
        status: "active",
      };
      try {
        InvestorBooking(data).then((res) => {
          if (res.status == true) {
            setButtonDisabled(true);
            router.push(`/investor/checkout`);

            // send notification
            sendNotification(notification)
              .then((notificationRes) => {
                console.log("success");
              })
              .catch((error) => {
                console.log("error occured");
              });

            // toast.success(res.message, {
            //   position: toast.POSITION.TOP_RIGHT,
            //   toastId: "success",
            // });
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "error",
            });
          }
        });
      } catch (error) {
        console.error(error);
        // handle the error, such as showing an error message
      }
    }
  };
  const toggleAccordion = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  useEffect(() => {    
    if (inputs.minimum_subscription !== undefined) {
      setSubscriptionValue(inputs.minimum_subscription);
      setRepayValue(inputs.minimum_subscription);
    } 
  }, [inputs.minimum_subscription]);
  
  const handlePlusClick = () => {
    if (inputs.no_of_units !== undefined && Number(inputs.no_of_units) - 1 >= value) {
      setValue(value + 1);
      const newSubscriptionValue =
        (value + 1) * (inputs.minimum_subscription || 0);
      setSubscriptionValue(newSubscriptionValue);
      const data1 =
        inputs && inputs.xirr ? (newSubscriptionValue * inputs.xirr) / 100 : 0;
      const data3 = data1 / 366;
      const data4 = inputs.tenure ? data3 * inputs.tenure : 0;
      const newRepayValue = newSubscriptionValue + data4;
      const roundedNumber = Math.floor(newRepayValue);
      const onlyTwoDecimals = roundedNumber.toFixed(2)
      setRepayValue(parseFloat(onlyTwoDecimals));
    }
    else {
      toast.error(`Unit limit exceeded `, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };

  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
      const newSubscriptionValue =
        (value - 1) * (inputs.minimum_subscription || 0);
      setSubscriptionValue(newSubscriptionValue);
      const data1 =
        inputs && inputs.xirr ? (newSubscriptionValue * inputs.xirr) / 100 : 0;
      const data3 = data1 / 366;
      const data4 = inputs && inputs.tenure ? data3 * inputs.tenure : 0;
      const newRepayValue = newSubscriptionValue + data4;
      const roundedNumber = Math.floor(newRepayValue);
      setRepayValue(roundedNumber);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setValue(newValue);
      const newSubscriptionValue =
        newValue * (inputs.minimum_subscription || 0);
      setSubscriptionValue(newSubscriptionValue);
      const data1 =
        inputs && inputs.xirr ? newSubscriptionValue * inputs.xirr : 0;
      const data2 = data1 / 100;
      const data3 = data2 / 366;
      const data4 = inputs && inputs.tenure ? data3 * inputs.tenure : 0;
      const newRepayValue = newSubscriptionValue + data4;
      // console.log(newRepayValue)
      setRepayValue(newRepayValue);
    }
  };

  const progressPercentage = ((inputs.no_of_units !== undefined ? Number(inputs.no_of_units) : 0) / (inputs.total_units !== undefined ? Number(inputs.total_units) : 0)) * 100;

 
  return (
    <>
      <section className="invertor-campaign_detail">
        <div className="container py-5">
          <div className="detail_text">
            <div className="row mb-3 pdcover align-items-center g-3">
              <div className="col-md-6">
                <div className="row g-3">
                  <div className="col-md-7 text-center">
                    <div className="css-1d6tso ffff position-relative">
                      <div className="logo-company">
                        <div className="img">
                          {inputs.logo ? (
                            <Image
                              src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + inputs.logo} alt="proof-img" className="proof-img"
                              width={120}
                              height={120}
                            />
                          ) : (
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/default.png'} alt="business-logo" className='profile-pic' width={100} height={100} />
                          )
                          }
                        </div>
                      </div>

                      <h5>
                        <a
                          href={inputs.website_url}
                          target="_blank"
                          style={{ color: "black" }}
                        >
                          {inputs.business_name}
                        </a>
                      </h5>
                      <p>STARTUP</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="d-flex justify-content-between">
                  <div>
                    <span style={{ color: '#fff' }}>Total Amount</span>
                    <h3 className="progressbar-title" style={{ color: '#fff' }}>₹{inputs.amount}</h3>
                  </div>
                  <div>
                    {" "}
                    <span style={{ color: '#fff' }}>Units Left</span>
                    <br />
                    <span className="progressbar-value">
                      <span className="color-rumaric" style={{ color: '#fff' }}>
                        {inputs.no_of_units}
                      </span>
                      <strong style={{ color: '#fff' }}>/{inputs.total_units}</strong>
                    </span>
                  </div>
                </div>
                <div className="progress mt-2">
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={
                      inputs.total_units !== undefined
                        ? parseInt(inputs.total_units)
                        : undefined
                    }
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 pl-0">
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
                          <a
                            href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.agreement}`}
                            download
                            target="_blank"
                          >
                            <span>
                              Agreement <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <a
                            href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.pdc}`}
                            download
                            target="_blank"
                          >
                            <span>
                              PDC <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <a
                            href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.invoice}`}
                            download
                            target="_blank"
                          >
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
                        <p>{inputs.desc}</p>
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
                            <div
                              className={`accordion-content ${activeIndex === 0 ? "show" : ""
                                }`}
                            >
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
                            <div
                              className={`accordion-content ${activeIndex === 1 ? "show" : ""
                                }`}
                            >
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
                            <div
                              className={`accordion-content ${activeIndex === 2 ? "show" : ""
                                }`}
                            >
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
                            <div
                              className={`accordion-content ${activeIndex === 3 ? "show" : ""
                                }`}
                            >
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
                            <div
                              className={`accordion-content ${activeIndex === 4 ? "show" : ""
                                }`}
                            >
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
              <div className="col-md-4 px-0">
                <div className="positionfxd">
                  <h5 className="missed" style={{ color: '#fff' }}>Your Subscription</h5>
                  <div className="fourcolm">
                    <div className="text-center">
                      <p>No. of Units</p>
                    </div>

                    <div className="number">
                      <span className="minus" onClick={handleMinusClick}>
                        -
                      </span>
                      <input
                        type="text"
                        min={1}
                        value={value}
                        name="no_of_units"
                        onChange={handleInputChange}
                      />
                      <span className="plus" onClick={handlePlusClick}>+</span>
                    </div>

                    <div className="css-wsc10v">
                      <span>Unit Value</span>
                      <p
                        className="css-37nqt7"
                        onChange={(e: any) =>
                          setSubscription_value(e.target.value)
                        }
                      >
                        ₹{inputs.minimum_subscription}
                      </p>
                    </div>

                    <div className="css-wsc10v">
                      <span>Subscription Value</span>
                      <p
                        className="css-37nqt7 subscription_value"                        
                      >
                        ₹{subscriptionValue}
                      </p>
                    </div>

                    <div className="css-wsc10v">
                      <div className="d-block">
                        <span>Transaction Fees </span>
                        <span className="css-1q6czfn">Waived Off</span>
                      </div>
                      <p className="css-37nqt7">₹10000</p>
                    </div>
                    <div className="border-div">
                      <div className="css-wsc10v">
                        <span>Repayment Date</span>
                        <p
                          className="css-37nqt7"
                          onChange={(e: any) => setRepay_date(e.target.value)}
                        >
                          {inputs.repay_date}
                        </p>
                      </div>

                      <div className="css-wsc10v">
                        <span>
                          <strong>Repayment Value</strong>
                        </span>
                        <p
                          className="css-37nqt7"
                          onChange={(e: any) =>
                            setRepayment_value(e.target.value)
                          }
                        >
                          ₹{repayValue}
                        </p>
                      </div>
                    </div>
                    <div className="form-check form-check-inline py-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        defaultValue="option1"
                        name="terms"
                        onChange={(e: any) =>
                          setRepayment_value(e.target.checked)
                        }
                        value="1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        I agree to the{" "}
                        <a href="#">Terms And Conditions,Terms Of Use</a> and
                        have read and understood the{" "}
                        <a href="#">Privacy Policy.</a>
                      </label>
                      {checkboxError && <p className="text-danger">{checkboxError}</p>}
                    </div>
                    <div className="text-center viwe_all">
                      <a href="#" onClick={handleSubmit}>
                        Continue to Pay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section >
    </>
  );
}
