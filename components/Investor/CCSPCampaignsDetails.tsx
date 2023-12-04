import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSingleBusinessDetails, InvestorBooking, CreateGroupChatByInvestor, getSingleGroupData, getSingleFundDetails } from "@/lib/investorapi";
import { getToken, getCurrentUserData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import Image from 'next/image';
import { sendNotification, getInvestorPagedata, getAllActiveFunds, getAllTeamAndCompanyData, getSingleUserData, getAllCCSPCampaign } from '../../lib/frontendapi'

interface UserData {
  id?: string;
  investorType?: string;
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
  type?: string;
  user_id?: string;
}


interface FundData {
  dilution_percentage: number;
  min_commitment: number;
  max_commitment: number;
  valuation_cap?: number;
  amount_raised: number;
  round_name: string;
  company_overview: string;
  past_financing_desc: string;
}

export default function CampaignsDetails() {
  const [currentUserData, setCurrentUserData] = useState<UserData>({});
  const [singleUserData, setSingleUserData] = useState<UserData>({});
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
  const { id } = router.query;
  const [checkboxError, setCheckboxError] = useState('');
  const [current_user_id, setCurrentUserId] = useState("");
  const [ButtonDisabled, setButtonDisabled] = useState(true);
  const [activeLink, setActiveLink] = useState("active");
  const [isSticky, setIsSticky] = useState(false);
  const [pagedata, setPagedata]: any = useState([]);
  const [teamdata, setTeamdata]: any = useState([]);
  const [companydata, setCompanydata]: any = useState([]);
  const [productdata, setProductdata]: any = useState([]);
  const [fundData, setFundData]: any = useState<FundData | null>(null); // State to hold fund data
  const [user, setPUser] = useState({
    business_name: "",
    business_id: "",
  });
  const [fundid, setFundId]: any = useState<string | null>(null);
  const [fundids, setFundIds]: any = useState<string | null>(null);
  const [isBusinessGroup, setIsBusinessGroup] = useState(false);
  const [fundimage, setFundImage]: any = useState("");


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
      // const res = await getSingleBusinessDetails(id);
      const res = await getSingleFundDetails(id);
      setInputs(res.data);
      console.log(res.data);
      const userData: UserData = getCurrentUserData();
      setCurrentUserData(userData);
    };
    fetchData();

    const data = {
      group_business_id: id,
    }
    getSingleGroupData(data)
      .then((res) => {
        if (res.status == true) {
          setIsBusinessGroup(true);
        } else {
          setIsBusinessGroup(false);
        }
      })
      .catch((error) => {
        console.log("error occured");
      });
    getSingleUserData(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          setSingleUserData(res.data);
        } else {
          setSingleUserData({});
        }
      })
      .catch((error) => {
        console.log("error occured");
      });
  }, [id]);


  useEffect(() => {
    const fetchActiveFundsAndData = async () => {
      try {
        if (typeof id === 'string') {
          const activeFund = await getSingleFundDetails(id); // Pass the 'id' here

          if (activeFund.status === true) {
            const matchingFund = activeFund.data; // Assuming activeFund.data holds the single fund details

            if (matchingFund) {
              // console.log("Matching Fund:", matchingFund);
              const fundId = matchingFund.ccsp_fund_id;
              await fetchAllTeamAndCompany(fundId);
              setFundData(matchingFund);
            } else {
              console.error("No matching fund found for the provided id.");
            }
          } else {
            console.error("No data returned for the provided id.");
          }
        } else {
          console.error("ID is undefined or not a string.");
        }
      } catch (error) {
        console.error("Error fetching active fund: ", error);
      }
    };

    if (id) {
      fetchActiveFundsAndData();
    }
  }, [id]);


  const fetchAllTeamAndCompany = async (fundIds: string) => {
    try {
      const res = await getAllTeamAndCompanyData(fundIds);
      if (res.status) {
        setTeamdata(res.teams);
        setCompanydata(res.competitors);
        setProductdata(res.products);

      }
    } catch (error) {
      console.error("Error fetching page data: ", error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeFundsResponse = await getAllActiveFunds();
        if (activeFundsResponse.status === true && activeFundsResponse.data.length > 0) {
          await fetchAllPagedata(id);
        }
      } catch (error) {
        console.error("Error fetching active funds: ", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchAllPagedata = async (buisnesssid: any) => {
    try {
      const pageDataResponse = await getInvestorPagedata(buisnesssid);
      if (pageDataResponse.status) {
        setPagedata(pageDataResponse.data);
      }
    } catch (error) {
      console.error("Error fetching page data: ", error);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 1000;
      setIsSticky(scrollTop > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (link: any) => {
    setActiveLink(link);
  };

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
    if (inputs?.minimum_subscription !== undefined) {
      setSubscriptionValue(inputs.minimum_subscription);
      setRepayValue(inputs.minimum_subscription);
    }
  }, [inputs?.minimum_subscription]);

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

  const progressPercentage = ((inputs?.no_of_units !== undefined ? Number(inputs?.no_of_units) : 0) / (inputs?.total_units !== undefined ? Number(inputs?.total_units) : 0)) * 100;

  const handleClickChat = (startup_id: any, business_name: any, business_id: any) => {
    if (isBusinessGroup == true) {
      window.location.href = '/investor/chats';
    } else {
      const data = {
        group_name: business_name + ' group',
        group_admin_id: currentUserData.id,
        group_business_id: router.query.id,
        member_id: startup_id + ',' + currentUserData.id + ',' + '1',
        chat_type: 'group',
        message: 'Hello'
      };
      alert('group_business_id value: ' + data.group_business_id);

      CreateGroupChatByInvestor(data)
        .then(res => {
          if (res.status == true) {
            window.location.href = '/investor/chats';
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  return (
    <>
      {/* <section className="mainPageSection" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/images/fundbannerimage/${fundData?.fund_banner_image})` }}> */}
      <section className="mainPageSection" style={{
        backgroundImage: `url(${fundData?.fund_banner_image ?
          `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/fundbannerimage/${fundData.fund_banner_image}` :
          `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/investors_banner.jpg`
          })`
      }}>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">

              <div className="ContentSection">
                <h1>{fundData?.fund_name}</h1>
                <p>
                  {fundData?.fund_desc}
                </p>
                <div className="ContentSection d-lg-flex align-items-lg-center">
                  <Link
                    href="#"
                    className="default-btn"
                  >
                    Invest
                  </Link>
                  <p className="mx-lg-2 m-0">
                    Minimum Investment:
                    <strong>${fundData?.ifinworth_amount}</strong>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="acceptingInvestments single-footer-widget m-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="investmentss">
                <span>Security Offered</span>
                <h2>Convertible Note</h2>
                <ul className="footer-social">
                  <li>
                    <Link href="https://www.facebook.com/">
                      <i className="flaticon-facebook"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://twitter.com/">
                      <i className="flaticon-twitter"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://in.pinterest.com/">
                      <i className="flaticon-pinterest"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://www.instagram.com/">
                      <i className="flaticon-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-5">
              {singleUserData.investorType == 'Accredited Investors' || singleUserData.investorType == 'Angel Investor'
                ?
                <p style={{ "textAlign": "right", "position": "relative", "bottom": "60px", "right": "10px" }}><a href="#" style={{ "color": "#ffffff" }} onClick={(e) => handleClickChat(fundData.startup_id, fundData.fund_name, fundData.ccsp_fund_id)}><i className="fa fa-message color-set"></i></a></p>
                :
                ''
              }
              <div className="investments text-center">
                <h2>Accepting Investments</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="investmentss text-center">
                <h2>${fundData?.amount_raised}</h2>
                <span>Raised from 180 investors</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 developmentInvest">
          <div className="development-content">
            <div className="icon mb-3">
              <i
                className="flaticon-tick"
                style={{
                  width: "30px",
                  height: "30px",
                  lineHeight: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#088395",
                }}
              />
            </div>
            <p>
              Raise funds from investors in the form of preferred shares or
              debentures
            </p>
          </div>
          <div className="development-content">
            <div className="icon bg-05dbcf">
              <i
                className="flaticon-tick"
                style={{
                  width: "30px",
                  height: "30px",
                  lineHeight: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#088395",
                }}
              />
            </div>
            <p>Working capital funding through invoice discounting</p>
          </div>
          <div className="development-content">
            <div className="icon bg-fec66f">
              <i
                className="flaticon-tick"
                style={{
                  width: "30px",
                  height: "30px",
                  lineHeight: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#088395",
                }}
              />
            </div>
            <p>
              CFO services including financial planning and analysis,
              financials, and tax compliance
            </p>
          </div>
          <div className="development-content">
            <div className="icon bg-fec66f">
              <i
                className="flaticon-tick"
                style={{
                  width: "30px",
                  height: "30px",
                  lineHeight: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#088395",
                }}
              />
            </div>
            <p>
              Legal assistance with a variety of matters, such as drafting and
              negotiating contracts, shareholder agreement, reviewing term
              sheets, and complying with regulatory requirements
            </p>
          </div>
          <div className="development-content">
            <div className="icon bg-fec66f">
              <i
                className="flaticon-tick"
                style={{
                  width: "30px",
                  height: "30px",
                  lineHeight: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#088395",
                }}
              />
            </div>
            <p>Registered valuer and merchant banker valuation reports</p>
          </div>
        </div>
      </section>

      <section
        className={`investMentAll p-3 ${isSticky ? "sticky" : ""}`}
        style={{ zIndex: 100 }}
      >
        <div className="container">
          <div className="menuItems">
            <ul className="menuUrl">
              <li
                className={`items ${activeLink === "documents" ? "active" : ""
                  }`}
              >
                <a
                  href="#documents"
                  className="link"
                  onClick={() => handleClick("documents")}
                >
                  Products
                </a>
              </li>
              <li className={`items ${activeLink === "terms" ? "active" : ""}`}>
                <a
                  href="#terms"
                  className="link"
                  onClick={() => handleClick("terms")}
                >
                  Round Details
                </a>
              </li>
              <li
                className={`items ${activeLink === "overview" ? "active" : ""}`}
              >
                <a
                  href="#overview"
                  className="link"
                  onClick={() => handleClick("overview")}
                >
                  Overview
                </a>
              </li>
              <li
                className={`items ${activeLink === "industry" ? "active" : ""}`}
              >
                <a
                  href="#industry"
                  className="link"
                  onClick={() => handleClick("industry")}
                >
                  Past Financing
                </a>
              </li>
              <li className={`items ${activeLink === "competitors" ? "active" : ""}`}>
                <a
                  href="#competitors"
                  className="link"
                  onClick={() => handleClick("competitors")}
                >
                  Competitors
                </a>
              </li>
              <li
                className={`items ${activeLink === "team" ? "active" : ""
                  }`}
              >
                <a
                  href="#team"
                  className="link"
                  onClick={() => handleClick("team")}
                >
                  Teams
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {fundData?.product_description && (
        <section className="tabsSection" id="documents">
          <div className="container">
            <h2 className="text-black">Product</h2>
            <p>
              <div dangerouslySetInnerHTML={{ __html: fundData.product_description }}></div>
            </p>
          </div>
        </section>
      )}


      {productdata.length > 0 && (
        <section className="productSection">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-11">
                <div className="row">
                  {productdata.map((data: any, index: number) => (
                    <div className="col-lg-4 col-md-4" key={index}>
                      <div className="shadowTitle">
                        <div className="text-center">
                          {data.product_image ? (
                            <Image
                              src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/products/" + data.product_image}
                              alt=""
                              className="hover-img"
                              height={94}
                              width={430}
                            />
                          ) : (
                            <Image
                              src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/company.webp"}
                              alt=""
                              className="hover-img"
                              height={94}
                              width={430}
                            />
                          )}
                        </div>
                        <div className="titleText">
                          <p>{data.product_description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* {
        fundData ||
          fundData?.dilution_percentage ||
          fundData?.min_commitment ||
          fundData?.max_commitment ||
          fundData?.amount_raised ||
          fundData?.round_name ? (
          <section id="terms">
            <div className="container">
              <h1 className="text-center pb-4 text-white bold">Round Details and Deal Progress</h1>
              <div className="termsContent">
                <div className="row">
                  <h1>Round Details</h1>
                  <>
                    {fundData?.dilution_percentage && fundData?.dilution_percentage ? (
                      <p>
                        <strong>Dilution Percentage:</strong> {fundData?.dilution_percentage}
                      </p>
                    ) : null}
                    {fundData?.min_commitment && fundData?.max_commitment ? (
                      <p>
                        <strong>Minimum commitment:</strong> Min: ${fundData?.min_commitment} Max: ${fundData?.max_commitment}
                      </p>
                    ) : null}
                    {fundData?.valuation_cap && (
                      <p>
                        <strong>Valuation Cap:</strong> ${fundData?.valuation_cap}
                      </p>
                    )}
                    {fundData?.amount_raised ? (
                      <p>
                        <strong>Amount Raised:</strong> ${fundData?.amount_raised}
                      </p>
                    ) : null}
                    {fundData?.round_name ? (
                      <p>
                        <strong>Round name:</strong> {fundData?.round_name}
                      </p>
                    ) : null}
                  </>
                </div>
              </div>
            </div>
          </section>
        ) : null
      } */}

      {
        (fundData?.dilution_percentage ||
          (fundData?.min_commitment && fundData?.max_commitment) ||
          fundData?.valuation_cap ||
          fundData?.amount_raised ||
          fundData?.round_name) ? (
          <section id="terms">
            <div className="container">
              <h1 className="text-center pb-4 text-white bold">Round Details and Deal Progress</h1>
              <div className="termsContent">
                <div className="row">
                  <h1>Round Details</h1>
                  <>
                    {fundData?.dilution_percentage ? (
                      <p>
                        <strong>Dilution Percentage:</strong> {fundData?.dilution_percentage}
                      </p>
                    ) : null}
                    {(fundData?.min_commitment && fundData?.max_commitment) ? (
                      <p>
                        <strong>Minimum commitment:</strong> Min: ${fundData?.min_commitment} Max: ${fundData?.max_commitment}
                      </p>
                    ) : null}
                    {fundData?.valuation_cap && (
                      <p>
                        <strong>Valuation Cap:</strong> ${fundData?.valuation_cap}
                      </p>
                    )}
                    {fundData?.amount_raised ? (
                      <p>
                        <strong>Amount Raised:</strong> ${fundData?.amount_raised}
                      </p>
                    ) : null}
                    {fundData?.round_name ? (
                      <p>
                        <strong>Round name:</strong> {fundData?.round_name}
                      </p>
                    ) : null}
                  </>
                </div>
              </div>
            </div>
          </section>
        ) : null
      }



      {fundData?.company_overview && (
        <section id="overview" className="tabsSection">
          <div className="container">
            <h1 className="text-center bold">Overview </h1>
            <div className="overviewContent">
              <div className="row">
                <p>
                  <div dangerouslySetInnerHTML={{ __html: fundData.company_overview }}></div>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {fundData?.past_financing_desc && (
        <section id="industry" className="tabsSection">
          <div className="container">
            <h1 className="text-left py-3 bold">Past Financing</h1>
            <div className="row">
              <div className="col-lg-6">
                <div className="industryContent">
                  <div className="row">
                    <h3 className="text-white">Facilitating Connections</h3>
                    <p className="text-white">
                      <div dangerouslySetInnerHTML={{ __html: fundData.past_financing_desc }}></div>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 order-lg-0 order-first">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/Investment-Tips-4.jpg"}
                  alt=""
                  className="hover-img"
                  height={394}
                  width={633}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {companydata.length > 0 && (
        <section id="competitors" className="competitor-compy">
          <div className="container">
            <h1 className="text-center mb-5 bold mt-4">Competitors</h1>
            <div className="competitorsContent">
              {companydata.map((data: any, index: number) => (
                <div className="row align-items-center g-3" key={index}>
                  <div className="col-lg-6">
                    <div className="competitorsContentTitle">
                      <h4><strong>{data.company_name}</strong></h4>
                      <p>
                        <div dangerouslySetInnerHTML={{ __html: data.company_desc }}></div>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 order-lg-0 order-first">
                    <div className="competitorsContentTitle">
                      {data.competitor_logo ? (
                        <Image
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/competitorlogo/" + data.competitor_logo}
                          alt=""
                          className="hover-img"
                          height={94}
                          width={430}
                        />
                      ) : (
                        <Image
                          src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/company.webp"}
                          alt=""
                          className="hover-img"
                          height={94}
                          width={430}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {teamdata.length > 0 && (
        <section id="team" className="pt-100 pb-100">
          <div className="container">
            <div className="section-title">
              <h2>Team</h2>
              <div className="bar" />
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row">
                  {teamdata.map((team: any, index: number) => (
                    <div className="col-lg-6 col-md-6 col-sm-6" key={index}>
                      <div className="team-item">
                        <div className="image">
                          {team.member_pic ? (
                            <Image
                              src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/memberPic/" + team.member_pic}
                              alt="image"
                              width={562}
                              height={400}
                            />
                          ) : (
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "assets/images/anjul-gupta.png?auto=format&fit=crop&w=500&q=60"
                              }
                              alt="image"
                              width={562}
                              height={400}
                            />
                          )}
                          <ul className="social">
                            <li>
                              <Link href="#" target="_blank">
                                <i className="bx bxl-facebook" />
                              </Link>
                            </li>
                            <li>
                              <Link href="#" target="_blank">
                                <i className="bx bxl-twitter" />
                              </Link>
                            </li>
                            <li>
                              <Link href="#" target="_blank">
                                <i className="bx bxl-linkedin" />
                              </Link>
                            </li>
                            <li>
                              <Link href="#" target="_blank">
                                <i className="bx bxl-instagram" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="content d-flex justify-content-between">
                          <h3>{team.member_name}</h3>
                          <span>{team.member_designation}</span>
                        </div>
                        <div className="content pt-0" style={{ textAlign: "left" }}>
                          <p>{team.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


    </>
  );
}