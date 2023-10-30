import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Agency from "../Frontend/ItAgency";
import ClientSection from "../Frontend/Common/ClientSection";
import Image from "next/image";
import NextNProgress from "nextjs-progressbar";
import Link from "next/link";
import {
  getCurrentUserData,
  removeToken,
  removeStorageData,
} from "../../lib/session";
import { CheckUserApprovalStatus } from "../../lib/frontendapi";
interface UserData {
  id?: string;
  username?: string;
  role?: string;
  approval_status?: string;
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
function redirectToLogin() {
  window.location.href = "/login";
  //router.push("/auth/login");
}
function handleLogout(e: any) {
  e.preventDefault();
  removeToken();
  removeStorageData();
  redirectToLogin();
}
export default function Home() {
  const [current_user_id, setCurrentUserId] = useState("");
  const [current_user_name, setCurrentUserName] = useState("");
  const [current_user_role, setCurrentUserRole] = useState("");
  const [users, setUsers] = useState<any>({});

  useEffect(() => {
    const current_user: UserData = getCurrentUserData();
    current_user.username
      ? setCurrentUserName(current_user.username)
      : setCurrentUserName("");
    current_user.role
      ? setCurrentUserRole(current_user.role)
      : setCurrentUserRole("");
    current_user.id ? setCurrentUserId(current_user.id) : setCurrentUserId("");
    // current_user_approved ? setCurrentUserApproaved(current_user.approval_status ? current_user.approval_status : "") : setCurrentUserApproaved("");

    // console.log(current_user);
    const checkUserStatus = async () => {
      try {
        const res = await CheckUserApprovalStatus(current_user.id);
        if (res.status === true) {
          setUsers(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkUserStatus();
  }, []);

  return (
    <>
      {/* Start Banner Area */}
      <div className="main-banner-area">
        <div className="home-sliders">
          <Slider {...settings} dots={true}>
            <div className="home-item item-bg2">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="main-banner-content">
                      <h1>
                        Invest in Startups & <br />
                        Grow Your Wealth
                      </h1>
                      <p>
                        A leading online platform that connects investors and
                        founders to help startups raise funds.
                      </p>

                      {/* previous code...[4July,2023] */}
                      {current_user_id ? (
                        current_user_role === "investor" ? (
                          <div className="banner-btn">
                            {users.approval_status === "approved" ? (
                              <>
                                <Link
                                  href={
                                    process.env.NEXT_PUBLIC_BASE_URL +
                                    "investor-steps/findbusiness"
                                  }
                                  className="default-btn"
                                >
                                  My Profile
                                </Link>
                                <Link
                                  href={
                                    process.env.NEXT_PUBLIC_BASE_URL +
                                    "investor/campaign"
                                  }
                                  className="default-btn"
                                >
                                  Campaigns
                                </Link>
                              </>
                            ) : (
                              <>
                                <Link
                                  href={
                                    process.env.NEXT_PUBLIC_BASE_URL +
                                    "investor/thank-you"
                                  }
                                  className="default-btn"
                                >
                                  My Profile
                                </Link>
                                <a
                                  href="#"
                                  onClick={handleLogout}
                                  className="default-btn"
                                >
                                  Logout
                                </a>
                              </>
                            )}
                          </div>
                        ) : current_user_role === "admin" ? (
                          <div className="banner-btn">
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/admin-update"
                              }
                              className="default-btn"
                            >
                              My Profile
                            </Link>
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/dashboard"
                              }
                              className="default-btn"
                            >
                              Dashboard
                            </Link>
                          </div>
                        ) : current_user_role === "startup" ? (
                          <div className="banner-btn">
                            {users.approval_status === "approved" ? (
                              <>
                                <Link
                                  href={
                                    process.env.NEXT_PUBLIC_BASE_URL +
                                    "steps/findbusiness"
                                  }
                                  className="default-btn"
                                >
                                  My Profile
                                </Link>
                                <Link
                                  href={
                                    process.env.NEXT_PUBLIC_BASE_URL +
                                    "company/dashboard"
                                  }
                                  className="default-btn"
                                >
                                  Dashboard
                                </Link>
                              </>
                            ) : (
                              <>
                                <Link
                                  href={
                                    process.env.NEXT_PUBLIC_BASE_URL +
                                    "company/thank-you"
                                  }
                                  className="default-btn"
                                >
                                  My Profile
                                </Link>
                                <a
                                  href="#"
                                  onClick={handleLogout}
                                  className="default-btn"
                                >
                                  Logout
                                </a>
                              </>
                            )}
                          </div>
                        ) : null
                      ) : (
                        <div className="banner-btn">
                          <Link href="/signup" className="default-btn">
                            Register
                          </Link>
                          <Link href="/login" className="default-btn">
                            Log in
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-item item-bg1">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="main-banner-content">
                      <h1>
                        Start Building <br /> Your Portfolio
                      </h1>
                      <p>
                        Start building your investment portfolio today with our
                        expert guidance and diverse investment options. From
                        stocks and bonds to alternative assets, we offer a range
                        of opportunities to help you achieve your financial
                        goals.
                      </p>
                      {current_user_id ? (
                        <>
                          {current_user_role === "investor" && (
                            <div className="banner-btn">
                              {users.approval_status === "approved" ? (
                                <>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "investor/campaign"
                                    }
                                    className="default-btn"
                                  >
                                    Campaigns
                                  </Link>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "investor-steps/findbusiness"
                                    }
                                    className="default-btn"
                                  >
                                    My Profile
                                  </Link>
                                </>
                              ) : null}
                            </div>
                          )}

                          {current_user_role === "admin" && (
                            <div className="banner-btn">
                              <Link
                                href={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  "admin/admin-update"
                                }
                                className="default-btn"
                              >
                                My Profile
                              </Link>
                              <Link
                                href={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  "admin/dashboard"
                                }
                                className="default-btn"
                              >
                                Dashboard
                              </Link>
                            </div>
                          )}
                          {current_user_role === "startup" && (
                            <div className="banner-btn">
                              {users.approval_status === "approved" ? (
                                <>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "steps/findbusiness"
                                    }
                                    className="default-btn"
                                  >
                                    My Profile
                                  </Link>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "company/dashboard"
                                    }
                                    className="default-btn"
                                  >
                                    Dashboard
                                  </Link>
                                </>
                              ) : null}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="banner-btn">
                          <Link href="/signup" className="default-btn">
                            Register
                          </Link>
                          <Link href="/login" className="default-btn">
                            Log in
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-item item-bg3">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="main-banner-content">
                      <h1>
                        Invest in <br /> the Future
                      </h1>
                      <p>
                        Welcome to our startup investment platform, where your
                        future starts today! We are dedicated to providing you
                        with innovative investment opportunities that can help
                        you grow your wealth and achieve your financial goals.
                      </p>
                      {current_user_id ? (
                        <>
                          {current_user_role === "investor" && (
                            <div className="banner-btn">
                              {users.approval_status === "approved" ? (
                                <>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "investor/campaign"
                                    }
                                    className="default-btn"
                                  >
                                    Campaigns
                                  </Link>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "investor-steps/findbusiness"
                                    }
                                    className="default-btn"
                                  >
                                    My Profile
                                  </Link>
                                </>
                              ) : null}
                            </div>
                          )}
                          {current_user_role === "admin" && (
                            <div className="banner-btn">
                              <Link
                                href={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  "admin/admin-update"
                                }
                                className="default-btn"
                              >
                                My Profile
                              </Link>
                              <Link
                                href={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  "admin/dashboard"
                                }
                                className="default-btn"
                              >
                                Dashboard
                              </Link>
                            </div>
                          )}
                          {current_user_role === "startup" && (
                            <div className="banner-btn">
                              {users.approval_status === "approved" ? (
                                <>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "steps/findbusiness"
                                    }
                                    className="default-btn"
                                  >
                                    My Profile
                                  </Link>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "company/dashboard"
                                    }
                                    className="default-btn"
                                  >
                                    Dashboard
                                  </Link>
                                </>
                              ) : null}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="banner-btn">
                          <Link href="/signup" className="default-btn">
                            Register
                          </Link>
                          <Link href="/login" className="default-btn">
                            Log in
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* End Banner Area */}

      {/* Start Features Area */}
      <section className="development-area pt-100 pb-100 mb-3 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="development-text">
                <h3>For Startups</h3>
                <div className="bar" />
                <p>
                  We provide comprehensive range of services to support you at
                  every stage of your entrepreneurial journey:
                </p>
              </div>
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
                {/* <h3>Investment Research</h3> */}
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
                {/* <h3>Investment Management</h3> */}
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
                {/* <h3>Online Investment</h3> */}
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
                {/* <h3>Online Investment</h3> */}
                <p>
                  Legal assistance with a variety of matters, such as drafting
                  and negotiating contracts, shareholder agreement, reviewing
                  term sheets, and complying with regulatory requirements
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
                {/* <h3>Online Investment</h3> */}
                <p>Registered valuer and merchant banker valuation reports</p>
              </div>
            </div>
            <div className="col-lg-6">
            <div className="about-group-image">
                <img className="image shake-y" src="assets/images/about/about-22.jpg" alt="Image" />
                <img className="shape-one pulse" src="assets/images/about/about-2.png" alt="Image" />
                <img className="shape-two pulse" src="assets/images/about/about-3.png" alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    {/*========== About Section Start ==============*/}
    <section className="tj-about-section pt-100 pb-100 mb-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-group-image">
                <img className="image shake-y" src="assets/images/about/about-1.jpg" alt="Image" />
                <img className="shape-one pulse" src="assets/images/about/about-2.png" alt="Image" />
                <img className="shape-two pulse" src="assets/images/about/about-3.png" alt="Image" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="development-text">
                <h3>For Investors</h3>
                <div className="bar" />
                {/* <p>We provide comprehensive range of services to support you at every stage of your entrepreneurial journey:</p> */}
              </div>
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
                {/* <h3>Investment Research</h3> */}
                <p>
                  Engage with a spectrum of innovative startups seeking
                  investment opportunities
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
                {/* <h3>Investment Management</h3> */}
                <p>Transact through our proprietary digital platform</p>
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
                {/* <h3>Online Investment</h3> */}
                <p>Manage portfolio of startup investments</p>
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
                {/* <h3>Online Investment</h3> */}
                <p>Get regular updates on the performance of the startups</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*========== About Section End ==============*/}



      <a href="https://www.youtube.com/embed/8zHWKaiLo8U" target="_blank">
      <div className="video-section">
          <div className="container">
            <div className="video-content">
              <a
                href="https://www.youtube.com/embed/8zHWKaiLo8U"
                target="_blank"
                className="video-btn popup-youtube"
              >
                <i className="flaticon-play" />
              </a>
            </div>
          </div>
       </div>
      </a>
      <section className="choose-section ptb-100 bg-color-choose">
        <div className="container">
          <div className="section-title">
            <h1>Why Choose Us</h1>
            <div className="bar" />
          </div>
          <div className="row align-items-center g-4">
            <div className="col-lg-4">
              <div className="choose-content">
                <div className="icon mb-3">
                  <i className="flaticon-shared-folder" />
                </div>
                <h3>Startup Focus</h3>
                <p>
                  We specialize in serving startups and understand the
                  challenges you face.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="choose-content">
                <div className="icon mb-3">
                  <i className="flaticon-technical-support" />
                </div>
                <h3> Empowering Entrepreneurs</h3>
                <p>
                We believe in the potential of startups to drive change
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="choose-content">
                <div className="icon mb-3">
                  <i className="flaticon-blog" />
                </div>
                <h3>End-to-End Solutions</h3>
                <p>
                  From drafting agreements to valuation and issuance of share
                  certificates, we cover every aspect of fundraising.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="choose-content">
                <div className="icon mb-3">
                  <i className="flaticon-report" />
                </div>
                <h3>Experienced Team</h3>
                <p>
                  Our team includes legal experts, financial analysts, and
                  registered valuers, providing you with a comprehensive
                  service.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="choose-content">
                <div className="icon mb-3">
                  <i className="flaticon-quality" />
                </div>
                <h3>Compliance Assurance</h3>
                <p>
                  We keep you in compliance with all legal and regulatory
                  requirements, mitigating risks.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="choose-content">
                <div className="icon mb-3">
                  <i className="flaticon-optimize" />
                </div>
                <h3>Tailored Solutions</h3>
                <p>
                  Every startup is unique, and our services are customized to
                  meet your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Blog Area */}
    </>
  );
}
