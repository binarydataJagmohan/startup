import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Agency from "../Frontend/ItAgency";
import ClientSection from "../Frontend/Common/ClientSection";
import NextNProgress from "nextjs-progressbar";
import { getCurrentUserData, removeToken, removeStorageData } from '../../lib/session'
import {CheckUserApprovalStatus} from '../../lib/frontendapi'
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
    current_user.username ? setCurrentUserName(current_user.username) : setCurrentUserName("");
    current_user.role ? setCurrentUserRole(current_user.role) : setCurrentUserRole("");
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
          <Slider {...settings}>
            <div className="home-item item-bg2">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="main-banner-content">
                      <h1>Opportunities Await</h1>
                      <p>
                        At our investment firm, opportunities await for those
                        who are ready to take the next step towards financial
                        success. Discover a diverse range of investment options
                        and seize the chance to achieve your financial goals.
                      </p>
                      {current_user_id ? (
                        current_user_role === "investor" ? (
                          <div className="banner-btn">
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/investor-steps/findbusiness"} className="default-btn">
                              My Profile
                            </a>
                            {users.approval_status === "approved" ? (
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/investor/campaign"} className="default-btn">
                              Campaigns
                            </a>
                            ) : (
                              <a href="#" onClick={handleLogout} className="default-btn">
                                Logout
                              </a>
                            )}
                          </div>
                        ) : current_user_role === "admin" ? (
                          <div className="banner-btn">
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/admin-update"} className="default-btn">
                              My Profile
                            </a>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"} className="default-btn">
                              Dashboard
                            </a>
                          </div>
                        ) : current_user_role === "startup" ? (
                          <div className="banner-btn">
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/steps/findbusiness"} className="default-btn">
                              My Profile
                            </a>
                            {users.approval_status === "approved" ? (
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "/company/dashboard"} className="default-btn">
                                Dashboard
                              </a>
                            ) : (
                              <a href="#" onClick={handleLogout} className="default-btn">
                                Logout
                              </a>
                            )}

                          </div>
                        ) : null
                      ) : (
                        <div className="banner-btn">
                          <a href="/signup" className="default-btn">
                            Register
                          </a>
                          <a href="/login" className="default-btn">
                            Log in
                          </a>
                        </div>
                      )}

                      {/* {current_user_id ? (
                        current_user_role === "investor" ? 
                        <div className="banner-btn">
                        <a href={process.env.NEXT_PUBLIC_BASE_URL +"/investor-steps/findbusiness"} className="default-btn">
                          My Profile
                        </a>
                        <a href={process.env.NEXT_PUBLIC_BASE_URL +"/investor/campaign"} className="default-btn">
                        Campaigns
                        </a>
                      </div> : <div className="banner-btn">
                        <a href={process.env.NEXT_PUBLIC_BASE_URL +"/steps/findbusiness"}className="default-btn">
                          My Profile
                        </a>
                        <a href="#" onClick={handleLogout} className="default-btn">
                         Dashboard
                        </a>
                      </div>
                       
                      ) : (
                      <div className="banner-btn">
                        <a href="/signup" className="default-btn">
                          Register
                        </a>
                        <a href="/login" className="default-btn">
                          Log in
                        </a>
                      </div>
                      )} */}
                    </div>
                    <div className="banner-image">
                      {/* <img src="assets/img/home-one/shape.png" alt="image"> */}
                      {/* <img src="assets/img/home-one/image-3.png" class="banner-img" alt="image"> */}
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
                        current_user_role === "investor" ?
                          <div className="banner-btn">
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/investor-steps/findbusiness"} className="default-btn">
                              My Profile
                            </a>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/investor/campaign"} className="default-btn">
                              Campaigns
                            </a>
                          </div> : <div className="banner-btn">
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/steps/findbusiness"} className="default-btn">
                              My Profile
                            </a>
                            <a href="#" onClick={handleLogout} className="default-btn">
                              Logout
                            </a>
                          </div>

                      ) : (
                        <div className="banner-btn">
                          <a href="/signup" className="default-btn">
                            Register
                          </a>
                          <a href="/login" className="default-btn">
                            Log in
                          </a>
                        </div>
                      )}
                      {/* <div className="banner-btn">
                        <a href="/signup" className="default-btn">
                          Register
                        </a>
                        <a href="/login" className="default-btn">
                          Log in
                        </a>
                      </div> */}
                    </div>
                    <div className="banner-image">
                      {/* <img src="assets/img/home-one/shape.png" alt="image"> */}
                      {/* <img src="assets/img/home-one/image-2.png" class="banner-img" alt="image"> */}
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
                        current_user_role === "investor" ?
                          <div className="banner-btn">
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/investor-steps/findbusiness"} className="default-btn">
                              My Profile
                            </a>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/investor/campaign"} className="default-btn">
                              Campaigns
                            </a>
                          </div> : <div className="banner-btn">
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/steps/findbusiness"} className="default-btn">
                              My Profile
                            </a>
                            <a href="#" onClick={handleLogout} className="default-btn">
                              Logout
                            </a>
                          </div>

                      ) : (
                        <div className="banner-btn">
                          <a href="/signup" className="default-btn">
                            Register
                          </a>
                          <a href="/login" className="default-btn">
                            Log in
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="banner-image">
                      {/* <img src="assets/img/home-one/shape.png" alt="image"> */}
                      {/* <img src="assets/img/home-one/image-1.png" class="banner-img" alt="image"> */}
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
      <section className="features-section pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Creative Features</h2>
            <p>
              Our investment site offers a range of creative features to help
              you make informed investment decisions. Explore our intuitive
              investment platform, personalized investment recommendations, and
              expert financial advice.
            </p>
            <div className="bar" />
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="features-content">
                <div className="icon">
                  <img src="assets/img/icon1.jpeg" alt="risk management" />
                </div>
                <h3>Risk Management</h3>
                <p>
                  Offer tools and services to help users manage their investment
                  risks and protect their assets.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="features-content">
                <div className="icon">
                  <img src="assets/img/icon2.png" alt="social investing" />
                </div>
                <h3>Social Investing</h3>
                <p>
                  Enable users to connect and collaborate with other investors
                  to share insights and ideas.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="features-content">
                <div className="icon left-icon">
                  <img src="assets/img/icon3.png" alt="low fees" />
                </div>
                <h3>Low Fees</h3>
                <p>
                  Offer competitive fees and charges to enable users to maximize
                  their investment returns.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="features-content">
                <div className="icon">
                  <img src="assets/img/icon4.webp" alt="" />
                </div>
                <h3>Customized Portfolio</h3>
                <p>
                  Create personalized investment portfolio based on user's
                  preferences and risk tolerance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Features Area */}

      {/* Start Creative Area */}
      {/*  */}
      {/* End Creative Area */}

      {/* IT-Agency Section */}
      <Agency />

      {/* Start Development Area */}
      <section className="development-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="development-image">
                <img src="assets/img/development.png" alt="image" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="development-text">
                <h3>Other Services</h3>
                <div className="bar" />
                <p>
                  Our platform offers socially responsible investment options,
                  allowing you to invest in companies that align with your
                  values.
                </p>
              </div>
              <div className="development-content">
                <div className="icon">
                  <i className="flaticon-blog" />
                </div>
                <h3>Investment Research</h3>
                <p>
                  We provide investment research and analysis on various
                  investment options.
                </p>
              </div>
              <div className="development-content">
                <div className="icon bg-05dbcf">
                  <i className="flaticon-setting" />
                </div>
                <h3>Investment Management</h3>
                <p>
                  It offers tailored investment strategies that align with their
                  clients' financial goals and risk profiles,provide customized
                  investment solutions.
                </p>
              </div>
              <div className="development-content">
                <div className="icon bg-fec66f">
                  <i className="flaticon-cellphone" />
                </div>
                <h3>Online Investment</h3>
                <p>
                  It allows investors to easily buy and sell securities, track
                  their investments, and monitor it.
                </p>
              </div>
              {/* <div className="development-content">
                <div className="icon bg-66a6ff">
                  <i className="flaticon-devices" />
                </div>
                <h3>Responsive Design</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* End Development Area */}

      {/* Start Video Section */}
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
      {/* End Video Section */}

      {/* Start Choose Area */}
      <section className="choose-section ptb-100">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p>
              Choose us because we are dedicated to helping investors find the
              best startup opportunities. Our platform offers unparalleled
              access to high-potential startups and expert guidance to help make
              informed investment decisions. With a commitment to transparency
              and community, we provide a unique and rewarding investment
              experience.
            </p>
            <div className="bar" />
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="choose-content">
                <div className="icon">
                  <i className="flaticon-shared-folder" />
                </div>
                <h3>Community</h3>
                <p>
                  We foster a sense of community among our investors and
                  portfolio companies, providing opportunities for networking,
                  collaboration, and knowledge sharing.
                </p>
              </div>
              <div className="choose-content">
                <div className="icon">
                  <i className="flaticon-blog" />
                </div>
                <h3>Support</h3>
                <p>
                  We provide our investors with a high level of support and
                  guidance, from expert advice on investment decisions to tools
                  to help track and manage investments.
                </p>
              </div>
              <div className="choose-content">
                <div className="icon">
                  <i className="flaticon-quality" />
                </div>
                <h3>Risk management</h3>
                <p>
                  We take a rigorous approach to risk management, conducting all
                  potential investments our portfolio to mitigate risk.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="choose-image">
                <img src="assets/img/choose.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Choose Area */}

      {/* Start Projects Area */}
      <section className="projects-section pb-70">
        <div className="container-fluid">
          <div className="section-title">
            <h2>Projects</h2>
            <p>
              At Startup or Invesment, we're committed to investing in
              innovative startups and bringing cutting-edge solutions to the
              market. Here are some of the exciting projects we're currently
              working on.
            </p>
            <div className="bar" />
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/1.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <a href="javascript:void(0);">
                    <h3>App Update &amp; Rebrand</h3>
                  </a>
                  <a href="javascript:void(0);">
                    <span>Research and startup</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/2.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <a href="javascript:void(0);">
                    <h3>IT Consultancy</h3>
                  </a>
                  <a href="javascript:void(0);">
                    <span>Research and startup</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/3.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <a href="javascript:void(0);">
                    <h3>Funding Trends</h3>
                  </a>
                  <a href="javascript:void(0);">
                    <span>Research and startup</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/4.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <a href="javascript:void(0);">
                    <h3>App Development</h3>
                  </a>
                  <a href="javascript:void(0);">
                    <span>Research and startup</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/5.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <a href="javascript:void(0);">
                    <h3>IT Solutions</h3>
                  </a>
                  <a href="javascript:void(0);">
                    <span>Research and startup</span>
                  </a>
                </div>
              </div>
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/6.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <a href="javascript:void(0);">
                    <h3>Data Management</h3>
                  </a>
                  <a href="javascript:void(0);">
                    <span>Research and startup</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-projects">
                <div className="projects-image">
                  <img src="assets/img/projects/7.jpg" alt="image" />
                </div>
                <div className="projects-content">
                  <a href="javascript:void(0);">
                    <h3>E-commerce Development</h3>
                  </a>
                  <a href="javascript:void(0);">
                    <span>Research and startup</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Projects Area */}

      {/* Client-Section */}
      <ClientSection />

      {/* Start Blog Area */}
      <section className="blog-section pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>
              Our <span>Latest</span> Blogs
            </h2>
            <p>
              Discover the newest and most exciting startup companies on our
              platform. Our team of experts scours the market for the latest
              innovations and high-potential startups, providing you with access
              to the most promising investment opportunities.
            </p>
            <div className="bar" />
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-blog">
                <div className="image">
                  <a href="/single-blog">
                    <img src="assets/img/blog/1.jpg" alt="image" />
                  </a>
                </div>
                <div className="content">
                  <span>20 March 2022</span>
                  <h3>
                    <a href="/single-blog">
                      Great Tips To Earn More Money From Digital Industry
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed
                    do eiusmod tempor
                  </p>
                  <a href="/single-blog" className="read-more">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog">
                <div className="image">
                  <a href="/single-blog">
                    <img src="assets/img/blog/2.jpg" alt="image" />
                  </a>
                </div>
                <div className="content">
                  <span>25 April 2022</span>
                  <h3>
                    <a href="/single-blog">
                      The Billionaire Guide On Design That will Get You Rich
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed
                    do eiusmod tempor
                  </p>
                  <a href="/single-blog" className="read-more">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
              <div className="single-blog">
                <div className="image">
                  <a href="/single-blog">
                    <img src="assets/img/blog/3.jpg" alt="image" />
                  </a>
                </div>
                <div className="content">
                  <span>30 July 2022</span>
                  <h3>
                    <a href="/single-blog">
                      Making Peace With The Feast Or Famine Of Freelancing
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed
                    do eiusmod tempor
                  </p>
                  <a href="/single-blog" className="read-more">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Blog Area */}
    </>
  );
}
