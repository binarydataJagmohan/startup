import React, { useState, useEffect } from "react";
import { login } from "../../lib/frontendapi";
import Link from 'next/link';
import { removeToken, removeStorageData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  is_profile_completed: string;
  approval_status: string;
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm();


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    checkCookieExpiration();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      checkCookieExpiration();
    }, 1000); // Check expiration every second

    return () => {
      clearInterval(interval);
    };
  }, []);
  const setLocalStorageItems = (user: User) => {
    window.localStorage.setItem("id", user.id);
    window.localStorage.setItem("email", user.email);
    window.localStorage.setItem("username", user.name);
    window.localStorage.setItem("user_role", user.role);
    window.localStorage.setItem("is_profile_completed", user.is_profile_completed);
    window.localStorage.setItem("approval_status", user.approval_status.toString());
  };

  const checkCookieExpiration = () => {
    const rememberMeCookie = Cookies.get("rememberMe");
    const token = window.localStorage.getItem("token");


    if (!rememberMeCookie || !token) {

      return;
    }


    const expirationDate = new Date(rememberMeCookie);
    const isExpired = expirationDate.getTime() <= Date.now();
    if (isExpired) {
      Cookies.remove("rememberMe");
    }
  };


  const submitForm = () => {
    const logindata = {
      email,
      password,
      rememberMe,
    };
    const setRememberMeCookie = () => {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1); // Set the expiration time to 1 month from now
      Cookies.set("rememberMe", "true", { expires: expiryDate, secure: process.env.NODE_ENV === "production" });
    };

    login(logindata)
      .then((res) => {
        if (res.status === true) {
          if (res.authorisation.token) {
            setLocalStorageItems(res.user);
            if (rememberMe) {
              setRememberMeCookie();
              window.localStorage.setItem("token", res.authorisation.token);
            } else {
              Cookies.remove("rememberMe");
              window.sessionStorage.setItem("token", res.authorisation.token);
            }
            console.log(res)
            switch (window.localStorage.getItem("user_role")) {
              case "admin":
                setTimeout(() => {
                  window.location.href = "/admin/dashboard/";
                }, 1000);
                break;
              case "startup":
                setTimeout(() => {
                  window.location.href = "/steps/findbusiness";
                }, 1000);
                if (window.localStorage.getItem("is_profile_completed") === "1") {
                  setTimeout(() => {
                    window.location.href = "/company/thank-you";
                  }, 1000);
                }
                if (window.localStorage.getItem("approval_status") === "approved") {
                  setTimeout(() => {
                    window.location.href = "/company/dashboard";
                  }, 1000);
                }
                break;
              case "investor":
                setTimeout(() => {
                  window.location.href = "/investor-steps/findbusiness";
                }, 1000);
                if (window.localStorage.getItem("is_profile_completed") === "1") {
                  setTimeout(() => {
                    window.location.href = "/investor/thank-you";
                  }, 1000);
                }
                if (window.localStorage.getItem("approval_status") === "approved") {
                  setTimeout(() => {
                    window.location.href = "/investor/campaign";
                  }, 1000);
                }
                break;
            }
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "success",
            });
          } else {
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "success",
            });
          }
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };


  return (
    <>
      {/* <div className="page-title-area item-bg-1">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="page-title-content">
                <h2>Log In</h2>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>Log In</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section className="contact-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="contact_content" data-aos="fade-right">
                <h1 className="pb-4 text-lg-start text-center" style={{ fontWeight: '700' }}>Welcome Back!</h1>
                <div className="contact-box">
                  <div className="box-image">
                    <figure className="contact-location">
                      <i className="fa-solid fa-location-dot"></i>
                    </figure>
                  </div>
                  <div className="box-content">
                    <h4>Location:</h4>
                    <p className="text-size-18">
                      32 st Kilda Road, Melbourne VIC, 3004 Australia
                    </p>
                  </div>
                </div>
                <div className="contact-box box-mb">
                  <div className="box-image">
                    <figure className="contact-phone">
                      <i className="fa-solid fa-phone"></i>
                    </figure>
                  </div>
                  <div className="box-content">
                    <h4 className="heading">Phone:</h4>
                    <p>
                      <Link
                        href="tel:+123(456)123"
                        className="text-decoration-none  text-size-18"
                      >
                        +123(456)123
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="contact-box">
                  <div className="box-image">
                    <figure className="contact-email">
                      <i className="fa-solid fa-envelope"></i>
                    </figure>
                  </div>
                  <div className="box-content">
                    <h4 className="heading">Email:</h4>
                    <p className="  ">
                      <a
                        href="mailto:support@risingcapitalist.com"
                        className="text-decoration-none text-size-18"
                      >
                       support@risingcapitalist.com
                      </a>
                    </p>
                    {/* <p>
                      <a
                        href="mailto:info@risingcapitalist.com"
                        className="text-decoration-none text-size-18"
                      >
                        info@risingcapitalist.com
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:anjul@risingcapitalist.com"
                        className="text-decoration-none text-size-18"
                      >
                        anjul@risingcapitalist.com
                      </a>
                    </p>
                    <p className="p-0">
                      <a
                        href="mailto:megha@risingcapitalist.com"
                        className="text-decoration-none text-size-18"
                      >
                        megha@risingcapitalist.com
                      </a>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="need-section">
                <div className="need_content">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png" } className="pb-4" />
                  <form onSubmit={handleSubmit(submitForm)}>
                    <div className="row align-items-center">
                      <div className="col-12">
                        <div className="form-group mb-0">
                          <input
                            type="email"
                            {...register("email", { required: true, onChange: (e) => setEmail(e.target.value) })}
                            name="email"
                            className="form_style form-div"
                            placeholder="Email"
                          />
                          <div className="help-block with-errors" />
                          {errors.email && errors.email.type === "required" && (
                            <p
                              className="text-danger"
                              style={{ textAlign: "left", fontSize: "12px" }}
                            >
                              *Enter your valid email address.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mb-0 position-relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                              required: true,
                              onChange: (e) => setPassword(e.target.value),
                            })}
                            name="password"
                            className="form_style m-0 form-div"
                            placeholder="Password"

                          />
                          <div className="help-block with-errors" />
                          {errors.password && errors.password.type === "required" && (
                            <p
                              className="text-danger"
                              style={{ textAlign: "left", fontSize: "12px" }}
                            >
                              *Password field is required.
                            </p>
                          )}
                             <span className="passwordView" onClick={handleTogglePassword}>
                            {showPassword ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                          </span>
                        </div>
                        <div className="col-lg-12 mt-3 mb-3 text-end">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value="1"
                                name="remember"
                                checked={rememberMe}
                                onChange={(e) =>
                                  setRememberMe(e.target.checked)
                                }
                              />
                              <p className="p-0">Keep me Log In</p>
                            </div>
                            <div className="forgetpassword">
                              <p className="forgot-password p-0">
                                <a
                                  href="/reset-password"
                                  style={{ color: "#666666" }}
                                >
                                  Forgot Password?
                                </a>
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                      {/* <div className=" mt-2 d-flex align-items-left">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkboxNoLabel"
                            value="1"
                            name="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <p className="">Keep me Log In
                          </p>
                        </div>
                      </div> */}

                      <div className="manage-button text-center">
                        <button
                          type="submit"
                          className="submit_now text-decoration-none"
                        >
                          Login Now
                          <i className="circle fa-regular fa-angle-right" />
                        </button>
                      </div>
                      <p className="mt-3">Don't have account? <strong><a href="/signup" style={{ color: '#088395' }}> Sign up!</a></strong> </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </section>
    </>
  );
}
