import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { removeToken, removeStorageData } from "../../lib/session";
import { CheckUserEmailVerification, CheckUserResetPasswordVerification, UpdateResetPassword } from '../../lib/frontendapi';
const ForgetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const {
    register,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (router.query.id && router.query.hash) {
      CheckEmailVerification();
    }

    if (router.query.userid && router.query.resettoken) {
      CheckResetPasswordVerification();
    }

  }, [router]);

  const CheckResetPasswordVerification = async () => {
    const data = {
      id: router.query.userid,
      token: router.query.resettoken
    }

    CheckUserResetPasswordVerification(data)
      .then((res) => {
        //   console.log(res);
        if (res.status == true) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "success",
          });
          // setTimeout(() => {
          //   router.push("/login"); // Redirect to login page
          // }, 2000);
        } else {
          toast.error(res.error, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }
      })
      .catch((err) => {
        toast.error("test", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      });
  }

  const CheckEmailVerification = async () => {
    const data = {
      id: router.query.id,
      token: router.query.hash
    }

    CheckUserEmailVerification(data)
      .then((res) => {
        //   console.log(res);
        if (res.status == true) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "success",
          });
          // setTimeout(() => {
          //   router.push("/login"); // Redirect to login page
          // }, 2000);
        } else {
          toast.error(res.error, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }
      })
      .catch((err) => {
        toast.error('Password Reset Email not been Sent.', {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      });
  }
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return regex.test(password);
  }
  const handleResetSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!validatePassword(password)) {
      errors.password = ("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 non-alphanumeric character, and be at least 8 characters long.");
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {

      //   setButtonState(true);

      // Call an API or perform some other action to register the user
      const data = {
        user_id: router.query.userid,
        password: password,
      };

      UpdateResetPassword(data)
        .then(res => {
          if (res.status == true) {
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT
            });
            setTimeout(() => {
              router.push("/login"); // Redirect to login page
            }, 2000);
          } else {
            if (res.errors) {
              Object.keys(res.errors).forEach(function (key) {
                res.errors[key].forEach(function (errorMessage) {
                  toast.error(errorMessage);
                });
              });
            }

          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  };

  const handlePasswordChange = (event) => {
    const errors = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!validatePassword(password)) {
      errors.password = ("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 non-alphanumeric character, and be at least 8 characters long.");
    }
    setErrors(errors);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    const errors = {};
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);
    setConfirmPassword(event.target.value);
  };

  return (
    <>
      <section className="contact-section pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="contact-text text-center pt-4">
                <h3>Change New Password</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="contact-form col-md-6">
              <form id="contactForm" onSubmit={handleResetSubmit}>
                <div className="row justify-content-center">
                  <div className="form-group">
                    <label className="col-form-label">
                      New Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="password" style={{ height: "35px" }}
                        id="password"
                        className="form-control"
                        name='password' value={password} onChange={handlePasswordChange}
                      />
                      <p style={{ fontSize: "9px" }}>Your password must be 8 character.</p>
                      {errors.password && <span className="small error text-danger mb-2 d-inline-block error_register" style={{ fontSize: "10px" }}>{errors.password}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">
                      Confirm Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="password" style={{ height: "35px" }}
                        id="confirmPassword"
                        className="form-control"
                        name='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange}
                      />
                      {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_register" style={{ fontSize: "10px" }}>{errors.confirmPassword}</span>}

                    </div>
                  </div>
                  <div className="form-group col-md-12 mt-3">
                    <div className="help-block with-errors" />

                    <div className="row">
                      <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </section>
    </>
  )
}

export default ForgetPassword