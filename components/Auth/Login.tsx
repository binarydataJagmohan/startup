import React, { useState, useEffect } from "react";
import { login } from "../../lib/frontendapi";

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
      <div className="page-title-area item-bg-1">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="page-title-content">
                <h2>Log In</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Log In</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-section ptb-100">
        <div className="container">
          <div className="login-form">
            <div className="login-title">
              <h3>Welcome Back!</h3>
              <p>Please login to your account.</p>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="email"
                      {...register("email", { required: true, onChange: (e) => setEmail(e.target.value) })}
                      name="email"
                      id="email"

                      className="form-control"
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
                <div className="col-lg-12 position-relative">
                  <div className="form-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      {...register("password", {
                        required: true,
                        onChange: (e) => setPassword(e.target.value),
                      })} name="password"
                      className="form-control"
                      placeholder="Password"

                    />
                    <span className="passwordView" onClick={handleTogglePassword}>
                      {showPassword ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                    </span>
                    <div className="help-block with-errors" />
                    {errors.password && errors.password.type === "required" && (
                      <p
                        className="text-danger"
                        style={{ textAlign: "left", fontSize: "12px" }}
                      >
                        *Password field is required.
                      </p>
                    )}
                  </div>
                </div>
                <div className=" mt-2 d-flex align-items-left">
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
                </div>

                <div className="col-lg-12 mt-2">
                  <p className="forgot-password">
                    <a href="/reset-password">Forgot Password?</a>
                  </p>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btnclasssmae">
                      Log In Now
                    </button>
                  </div>
                  <br />
                  <span className="mt-3">
                    Don't have account? <a href="/signup">Signup!</a>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="default-shape">
          <div className="shape-1">
            <img src="assets/img/shape/4.png" alt="image" />
          </div>
          <div className="shape-2 rotateme">
            <img src="assets/img/shape/5.svg" alt="image" />
          </div>
          <div className="shape-3">
            <img src="assets/img/shape/6.svg" alt="image" />
          </div>
          <div className="shape-4">
            <img src="assets/img/shape/7.png" alt="image" />
          </div>
          <div className="shape-5">
            <img src="assets/img/shape/8.png" alt="image" />
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}
