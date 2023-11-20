import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSingleBusinessDetails, InvestorBooking } from "@/lib/investorapi";
import { getToken, getCurrentUserData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import Image from 'next/image';
import { sendNotification, getInvestorPagedata, getAllActiveFunds, getAllTeamAndCompanyData } from '../../lib/frontendapi'

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
  type?: string;
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
  const { id } = router.query;

  const [checkboxError, setCheckboxError] = useState('');
  const [current_user_id, setCurrentUserId] = useState("");
  const [ButtonDisabled, setButtonDisabled] = useState(true);
  const [activeLink, setActiveLink] = useState("active");
  const [isSticky, setIsSticky] = useState(false);
  const [pagedata, setPagedata]: any = useState([]);
  const [teamdata, setTeamdata]: any = useState([]);
  const [companydata, setCompanydata]: any = useState([]);
  const [user, setPUser] = useState({
    business_name: "",
    business_id: "",
  });
  const [fundid, setFundId]: any = useState<string | null>(null);
  const [fundids, setFundIds]: any = useState<string | null>(null);


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


  // useEffect(() => {
  //   const fundId = 'STARTUP-977667'; // Replace with the actual fund ID
  //   fetchAllTeamAndCompany(fundId);
  // }, []);


  useEffect(() => {
    const fetchActiveFundsAndData = async () => {
      try {
        const activeFunds = await getAllActiveFunds(); 
        if (activeFunds.status === true && activeFunds.data.length > 0) {
          const fundId = activeFunds.data[0].fund_id; 
          await fetchAllTeamAndCompany(fundId);
        }
      } catch (error) {
        console.error("Error fetching active funds: ", error);
      }
    };
    fetchActiveFundsAndData();
  }, []);


  // useEffect(() => {
  //   const fetchActiveFundsAndData = async () => {
  //     try {  
  //       // Fetching active funds based on business_id
  //       const activeFunds = await getAllActiveFunds();
  
  //       if (activeFunds.status === true && activeFunds.data.length > 0) {
  //         // Finding fund_id matching the id from router query
  //         const matchingFund = activeFunds.data.find((fund: { business_id: number; }) => fund.business_id === parseInt(id));  
  //         if (matchingFund) {
  //           const fundId = matchingFund.fund_id;
  //           await fetchAllTeamAndCompany(fundId); 
  //         } else {
  //           console.error("No matching fund found for the provided business_id.");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching active funds: ", error);
  //     }
  //   };
  
  //   fetchActiveFundsAndData();
  // }, [id]);

  useEffect(() => {
    const fetchActiveFundsAndData = async () => {
      try {
        if (typeof id === 'string') { // Check if id is a string and not undefined
          const activeFunds = await getAllActiveFunds();
  
          if (activeFunds.status === true && activeFunds.data.length > 0) {
            const matchingFund = activeFunds.data.find((fund: { business_id: number; }) => fund.business_id === parseInt(id));
            if (matchingFund) {
              const fundId = matchingFund.fund_id;
              await fetchAllTeamAndCompany(fundId);
            } else {
              console.error("No matching fund found for the provided business_id.");
            }
          }
        } else {
          console.error("ID is undefined or not a string.");
        }
      } catch (error) {
        console.error("Error fetching active funds: ", error);
      }
    };
  
    fetchActiveFundsAndData();
  }, [id]);
  
  
  

  

  const fetchAllTeamAndCompany = async (fundIds: string) => {
    try {  
      const res = await getAllTeamAndCompanyData(fundIds); 
      if (res.status) {
        setTeamdata(res.teams);
        setCompanydata(res.competitors);
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
    if (inputs.minimum_subscription !== undefined) {
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

  const progressPercentage = ((inputs.no_of_units !== undefined ? Number(inputs.no_of_units) : 0) / (inputs.total_units !== undefined ? Number(inputs.total_units) : 0)) * 100;


  return (
    <>
      <section className="mainPageSection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {
                pagedata.length > 0 && (
                  <div className="ContentSection">
                    <h1>{pagedata[0].business_name}</h1>
                    <p>
                      {pagedata[0].description}
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
                        <strong>${pagedata[0].amount}</strong>
                      </p>
                    </div>
                  </div>
                )
              }
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
              <div className="investments text-center">
                <h2>Accepting Investments</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="investmentss text-center">
                <h2>$137,487</h2>
                <span>Raised from 180 investors</span>
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
                  Documents
                </a>
              </li>
              <li className={`items ${activeLink === "terms" ? "active" : ""}`}>
                <a
                  href="#terms"
                  className="link"
                  onClick={() => handleClick("terms")}
                >
                  Terms
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
                  Industry
                </a>
              </li>
              <li className={`items ${activeLink === "team" ? "active" : ""}`}>
                <a
                  href="#team"
                  className="link"
                  onClick={() => handleClick("team")}
                >
                  Team
                </a>
              </li>
              <li
                className={`items ${activeLink === "competitors" ? "active" : ""
                  }`}
              >
                <a
                  href="#competitors"
                  className="link"
                  onClick={() => handleClick("competitors")}
                >
                  Competitors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tabsSection">
        {pagedata.length > 0 && (
          <div className="container">
            <h2 className="text-black">Product</h2>
            <p>
              <div dangerouslySetInnerHTML={{ __html: pagedata[0].product_description }}></div>
            </p>
          </div>
        )}
      </section>


      <section id="documents" className="py-lg-5">
        <div className="container">
          <h1 className="text-center pb-4 bold">Documents</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="row py-3 g-3">
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Company Summary</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Crowd Note</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Offering Statement</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Solubag Form C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="terms">
        <div className="container">
          <h1 className="text-center pb-4 text-white bold">Terms</h1>
          <div className="termsContent">
            <div className="row">
              <h1> Investment Terms</h1>
              <p>
                <strong>Security Type:</strong> Crowd Notes
              </p>

              <p>
                <strong>Round Size:</strong>Min: $25,000 Max: $1,235,000
              </p>

              <p>
                <strong>Valuation Cap:</strong> $50 million
              </p>

              <p>
                <strong>Conversion Provisions:</strong> In connection with
                equity financing of at least $1 million, the Company has the
                option to convert the Crowd Note into non-voting preferred stock
                (Conversion Shares) at a price based on the lower of (A) the
                price per share for Preferred Stock by investors in the
                Qualified Equity Financing or (B) the price per share paid on a
                $50 million valuation cap. Please refer to the Crowd Note for a
                complete description of the terms of the Crowd Note, including
                the conversion provisions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="overview" className="tabsSection">
        <div className="container">
          <h1 className="text-center bold">Overview </h1>
          <div className="overviewContent">
            {pagedata.length > 0 && (
              <div className="row">
                {/* <h2 className="text-black">Opportunity</h2> */}
                <p>
                  <div dangerouslySetInnerHTML={{ __html: pagedata[0].company_overview }}></div>
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      <section id="industry" className="tabsSection">
        <div className="container">
          <h1 className="text-left py-3 bold">Past Financing</h1>
          <div className="row">
            <div className="col-lg-6">
              <div className="industryContent">
                {pagedata.length > 0 && (
                  <div className="row">
                    <h3 className="text-white">Facilitating Connections</h3>
                    <p className="text-white">
                      <div dangerouslySetInnerHTML={{ __html: pagedata[0].past_financing_desc }}></div>
                    </p>
                  </div>
                )}
              </div>

            </div>
            <div className="col-lg-6 order-lg-0 order-first">
              <img
                src="assets/img/removetext.png"
                alt=""
                className="hover-img"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="competitors" className="tabsSection">
        <div className="container">
          <h1 className="text-center mb-5 bold">Competitors</h1>
          <div className="competitorsContent">
            {companydata.map((data: any, index: number) => (
              <div className="row align-items-center g-3" key={index}>
                <div className="col-lg-6">
                  <div className="competitorsContentTitle">
                    {/* <h4><strong>Invisible Company</strong></h4> */}
                    <h4><strong>{data.company_name}</strong></h4>
                    <p>
                      {data.company_desc}
                    </p>

                  </div>
                </div>
                <div className="col-lg-6 order-lg-0 order-first">
                  <div className="competitorsContentTitle">
                    {data.competitor_logo ? (
                      <img
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/competitorlogo/" + data.competitor_logo}
                        alt=""
                        className="hover-img"
                        height={94}
                        width={430}
                      />
                    ) : (
                      <img
                        src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/company.webp"}
                        alt=""
                        className="hover-img"

                      />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="row align-items-center g-3 py-lg-5 pt-5">
              <div className="col-lg-6">
                <div className="competitorsContent">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPp0nZM4ajF83I68Udw5IdeUAA4kxjogHXpqzZGkmCusMmrRQC3L-syvRK2Wes7mW3r2A&usqp=CAU"
                    alt=""
                    className="hover-img"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="competitorsContentTitle">
                  <h4><strong>MonoSol</strong></h4>
                  <p>
                    Simplifying Fundraising: We aim to simplify the fundraising
                    process, making it more accessible and less intimidating.
                    Our platform provides a user-friendly experience that allows
                    startups to focus on their innovation, and investors to
                    discover promising opportunities effortlessly.s
                  </p>
                  <p>
                    Empowering Entrepreneurs: We believe in the potential of
                    startups to drive change. Our CFO services empower startups
                    with financial expertise, while our legal services secure
                    their fundraising endeavours. The addition of "Invoice
                    Discounting" further strengthens our financial support by
                    offering cash flow solutions that help startups maintain
                    stability.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

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
                          <img
                            src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/memberPic/" + team.member_pic}
                            alt="image"
                          />
                        ) : (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL +
                              "assets/images/anjul-gupta.png?auto=format&fit=crop&w=500&q=60"
                            }
                            alt="image"
                          />
                        )
                        }
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
                        <p>
                          {team.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
