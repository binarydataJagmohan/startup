import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import {
  getCurrentUserData,
  removeToken,
  removeStorageData,
} from "../../lib/session";
import { CheckUserApprovalStatus } from "../../lib/frontendapi";
import FeaturedArea from "./FeaturedArea";
import WhyChooseUs from "./WhyChooseUs";
interface UserData {
  id?: string;
  username?: string;
  role?: string;
  approval_status?: string;
}
const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
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
        slidesToShow: 1,
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
}
function handleLogout(e: any) {
  e.preventDefault();
  removeToken();
  removeStorageData();
  redirectToLogin();
}
export default function Home() {
  const [current_user_id, setCurrentUserId] = useState("");
  const [current_user_role, setCurrentUserRole] = useState("");
  const [users, setUsers] = useState<any>({});

  useEffect(() => {
    const current_user: UserData = getCurrentUserData();
    current_user.role
      ? setCurrentUserRole(current_user.role)
      : setCurrentUserRole("");
    current_user.id ? setCurrentUserId(current_user.id) : setCurrentUserId("");
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
      <div className="">
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
                                  className="default-btn mx-3"
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
                                  className="default-btn mx-3"
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
                              className="default-btn mx-3"
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
                                  className="default-btn mx-3"
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
                                  className="default-btn mx-3"
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
                          <Link href="/login" className="default-btn ml-2">
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
                                    className="default-btn ml-2"
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
                                className="default-btn ml-2"
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
                                    className="default-btn ml-2"
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
                          <Link href="/login" className="default-btn ml-2">
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
                                    className="default-btn ml-2"
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
                                className="default-btn ml-2"
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
                                    className="default-btn ml-2"
                                  >
                                    My Profile
                                  </Link>
                                  <Link
                                    href={
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      "company/dashboard"
                                    }
                                    className="default-btn ml-2"
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
                          <Link href="/login" className="default-btn ml-2">
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
      <FeaturedArea />
    
    <WhyChooseUs/>
    </>
  );
}
