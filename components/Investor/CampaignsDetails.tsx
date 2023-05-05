import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {getSingleBusinessDetails } from '@/lib/investorapi';

export default function CampaignsDetails() {
 
  const [value, setValue] = useState(1);
  const [inputs,setInputs] = useState([]);
  const [subscriptionValue, setSubscriptionValue] = useState(0);
  const [repayValue,setRepayValue] = useState(0);

  const router = useRouter()
  const {id } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      const data = await  getSingleBusinessDetails(id)
      .then((res)=>{
        setInputs(res.data)
      })
  };

  fetchData();
  }, []);

  const dtaa = inputs.minimum_subscription;

  const handlePlusClick = () => {
    setValue(value + 1);
    setSubscriptionValue((value + 1) * dtaa);
  };

  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
      setSubscriptionValue((value - 1) * dtaa);
    }
  };

  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setValue(newValue);
      setSubscriptionValue(newValue * dtaa);
      let data1 = subscriptionValue * inputs.xirr;
      let data2 = data1 / 100;
      let data3 = data2/366;
      let data4 = data3 * inputs.tenure;
      let data5 = subscriptionValue + data4;
      setRepayValue(data1);
      

    }
  };

  return (
    <>
      <section className="invertor-campaign_detail">
        <div className="container py-5">
          <div className="detail_text">
            <div className="row mb-3 pdcover align-items-center g-3">
              <div className="col-md-6">
                <div className="row g-3">
                  <div className="col-md-6 text-center">
                    <div className="css-1d6tso">
                      <div className="logo-company">
                        <div className="img">
                          <img src={singleCompagin.logo} alt="" />
                        </div>
                      </div>
                      <h5>Zoff Foods</h5>
                      <p>Seller</p>
                    </div>
                  </div>
                  <div className="col-md-6 text-center">
                    <div className="css-1d6tso">
                      <div className="logo-company">
                        <div className="img">
                          <img src={process.env.NEXT_PUBLIC_IMAGE_URL +"/img/img/t_500x300.png"} alt="" />
                        </div>
                      </div>
                      <h5>Zoff Foods</h5>
                      <p>Seller</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Amount</span>
                    <h3 className="progressbar-title">₹25.0 Lakh</h3>
                  </div>
                  <div> <span>Units Left</span><br />
                    <span className="progressbar-value"><span className="color-rumaric">164</span><strong>/200</strong></span>
                  </div>
                </div>
                <div className="progress">
                  <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}} />
                </div>
                <div className="mt-4 text-end" id="Post_Dated">
                  <a href="#">Post Dated Cheque received for entire amount</a>
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
                          <h6 className="css-19wesjx">₹{inputs.minimum_subscription}</h6>
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
                          <h6 className="css-19wesjx">Seller</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="countersection pt-4">
                    <h4 className="">About</h4>
                    <div className="d-flex justify-content-between all-btn py-3">
                      <div className="">
                        <div className="text-center button-pdf">
                          <span>Agreement <i className="fa-solid fa-download" /></span>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <span>PDC <i className="fa-solid fa-download" /></span>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <span>Invoice <i className="fa-solid fa-download" /></span>
                        </div>
                      </div>
                    </div>
                    <div className="oppotsummery pt-4">
                      <h4>Opportunity Summary</h4>
                      <div className="seller">
                        <h6>About the Buyer</h6>
                        <p>
                          The One-stop Shopping Destination. E-commerce is
                          revolutionizing the way people shop in India. Zepto is
                          your next-door quick commerce app, delivering online
                          groceries,fruits,vegetables, personal care, electronics
                          &amp; much more to you in just minutes.
                        </p>
                      </div>
                      <div className="seller">
                        <h6>About the Buyer</h6>
                        <p>
                          The One-stop Shopping Destination. E-commerce is
                          revolutionizing the way people shop in India. Zepto is
                          your next-door quick commerce app, delivering online
                          groceries,fruits,vegetables, personal care, electronics
                          &amp; much more to you in just minutes.
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
                            <a className="accordion-title active" href="#">
                              <i className="bx bx-chevron-down" />
                              What is Discounting?
                            </a>
                            <div className="accordion-content show">
                              <p>Discounting enables businesses to gain instant access to cash
                                tied up in unpaid invoices or purchase orders. The subscriber
                                provides the cash against the unpaid invoice or purchase order
                                for a higher repayment in return.</p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a className="accordion-title" href="#">
                              <i className="bx bx-chevron-down" />
                              What access do I have on a free trial?
                            </a>
                            <div className="accordion-content">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt.</p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a className="accordion-title" href="#">
                              <i className="bx bx-chevron-down" />
                              Does the price go up as my team gets larger?
                            </a>
                            <div className="accordion-content">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt.</p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a className="accordion-title" href="#">
                              <i className="bx bx-chevron-down" />
                              How can I cancel my subscription?
                            </a>
                            <div className="accordion-content">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt.</p>
                            </div>
                          </li>
                          <li className="accordion-item">
                            <a className="accordion-title" href="#">
                              <i className="bx bx-chevron-down" />
                              Can I pay via an Invoice?
                            </a>
                            <div className="accordion-content">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt.</p>
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
                  <h5 className="missed">Your Subscription</h5>
                  <div className="fourcolm">
                    <div className="text-center">
                      <p>No. of Units</p>
                    </div>
                    <div className="number">
                      <span className="minus" onClick={() => handleInputChange({target: {value: value - 1}})}>-</span>
                      <input type="text" min={1} value={value} onChange={handleInputChange} />
                      <span className="plus" onClick={() => handleInputChange({target: {value: value + 1}})}>+</span>
                    </div>
                    <div className="css-wsc10v">
                      <span>Unit Value</span>
                      <p className="css-37nqt7">₹{inputs.minimum_subscription}s</p>
                    </div>
                    <div className="css-wsc10v">
                      <span>Subscription Value</span>
                      <p className="css-37nqt7">₹{subscriptionValue}</p>
                    </div>
                    <div className="css-wsc10v">
                      <div className="d-flex">
                        <span>Transaction Fees </span><span className="css-1q6czfn">Waived Off</span>
                      </div>
                      <p className="css-37nqt7">₹10000</p>
                    </div>
                    <div className="border-div">
                      <div className="css-wsc10v">
                        <span>Repayment Date</span>
                        <p className="css-37nqt7">26 May 2023</p>
                      </div>
                      <div className="css-wsc10v">
                        <span><strong>Repayment Value</strong></span>
                        <p className="css-37nqt7">₹{repayValue}</p>
                      </div>
                    </div>
                    <div className="form-check form-check-inline py-3">
                      <input className="form-check-input" type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                      <label className="form-check-label" htmlFor="inlineCheckbox1">I agree to the <a href="#">Terms And Conditions,Terms Of Use</a> and have read and understood
                        the <a href="#">Privacy Policy.</a></label>
                    </div>
                    <div className="text-center viwe_all">
                      <a href="#">Continue to Pay</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
