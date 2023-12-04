import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { userRegister, sendNotification } from "../../lib/frontendapi";
import Link from 'next/link';
import Image from 'next/image';
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}
const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-=?]).{8,}$/;
  register('password', {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },    
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  });

  const SubmitForm = () => {
    setIsSubmitting(true);
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      role: role,
    };
    const setLocalStorageItems = (user: any) => {
      window.localStorage.setItem("id", user.id);
      window.localStorage.setItem("email", user.email);
      window.localStorage.setItem("username", user.firstname);
      window.localStorage.setItem("user_role", user.role);
      window.localStorage.setItem("is_profile_completed", user.is_profile_completed);
      window.localStorage.setItem("approval_status", user.approval_status);
    };
    userRegister(user)
      .then((res) => {
        if (res.status == true) {        
          if (res.data[0]) {
            setLocalStorageItems(res.data['user']);
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

            const data = {
              notify_from_user: window.localStorage.getItem("id"),
              notify_to_user: "1",
              notify_msg: `${user.firstname} has been registered successfully as a ${user.role}.`,
              notification_type: "New User Registered",
              each_read: "unread",
              status: "active"
            };

            // Send Notifications to admin When new user is register
            sendNotification(data)
              .then((notificationRes) => {
              })
              .catch((error) => {
              });

            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "success",
            });
          } else {
            setIsSubmitting(false);
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "success",
            });
          }

        }
        else {
          setIsSubmitting(false);
          if (res.message == "Validation error") {
            toast.error('The email has already been taken.', {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "error",
            });
          }
        }

      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      })
  };

  return (
    <>
      <div>
        <section className="contact-section">
          <div className="container">
            <div className="row align-items-center signup_form_and_details">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="contact_content" data-aos="fade-right">
                  <h1 className="pb-4 text-lg-start text-center" style={{ fontWeight: '700' }}>Lets Get Started!</h1>
                  <div className="contact-box">
                    <div className="box-image">
                      <figure className="contact-location">
                        <i className="fa-solid fa-location-dot"></i>
                      </figure>
                    </div>
                    <div className="box-content">
                      <h4>Location:</h4>
                      <Link href="https://maps.app.goo.gl/qfUTa7u5qc74X52p9" target="_blank" style={{ color: '#232323' }}><p className="text-size-18">
                        Shop 13 Trishul Terraces, Sector 20, Koparkhairne, Thane, Maharashtra – 400709
                      </p></Link>
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
                      <p className="mt-2">
                        <Link
                          href="mailto:support@risingcapitalist.com"
                          className="text-decoration-none text-size-18"
                        >
                          support@risingcapitalist.com
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="need-section">
                  <div className="need_content">
                    <Image src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"} className="pb-4" alt="logo-img" width={190} height={68} />
                    <form id="contactpage" onSubmit={handleSubmit(SubmitForm)}>
                      <div className="row align-items-center">
                        <div className="col-12">
                          <div className="form-group mb-0">
                            <input
                              type="text"
                              id="firstname"
                              className="form_style sign-style"
                              {...register("firstname", {
                                onChange: (e) => setFirstName(e.target.value),
                                required: true,
                              })} placeholder="First Name" />
                            <div className="help-block with-errors" />
                            {errors.firstname &&
                              errors.firstname.type === "required" && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Enter Your First Name.
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group mb-0">
                            <input
                              type="text"
                              id="lastname"
                              className="form_style sign-style"
                              {...register("lastname", {
                                onChange: (e) => setLastName(e.target.value),
                                required: true,
                              })} placeholder="Last Name" />
                            <div className="help-block with-errors" />
                            {errors.lastname &&
                              errors.lastname.type === "required" && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Enter Your Last Name.
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group mb-0">
                            <input
                              type="email"
                              id="email"
                              className="form_style sign-style"
                              {...register("email", {
                                onChange: (e) => setEmail(e.target.value),
                                required: "Email is required",
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: "Invalid email address"
                                }
                              })}
                              placeholder="Email"
                            />
                            {errors.email && (
                              <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                <span>{errors.email.message}</span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group mb-0 position-relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              className="form_style sign-style" maxLength={16}
                              {...register("password", {
                                onChange: (e) => setPassword(e.target.value),
                              })}
                              placeholder="Password"
                            />
                            <div className="help-block with-errors" />
                            {errors.password && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                *{errors.password.message}
                              </p>
                            )}
                            <span className="passwordView1" onClick={handleTogglePassword}>
                              {showPassword ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                            </span>
                          </div>
                        </div>
                        <label className="text-start">
                          Registered As:
                          <span style={{ color: "red" }}>*</span>
                        </label>
                      </div>
                      <div className="form-group col-md-12 mt-3">
                        <div className="col-md-12 text-center twobox">
                          <div className="images-investor text-center">
                            <ul className="role-classs">
                              <li>
                                <input
                                  className="form-check-input gender-radio" id="myCheckbox1"
                                  {...register("role", {
                                    onChange: (e) =>
                                      setRole(e.target.value),
                                    required: true,
                                  })}
                                  type="radio"
                                  name="role"
                                  value="investor"
                                />
                                <label htmlFor="myCheckbox1">
                                  <Image
                                    src="assets/img/invest.png"
                                    alt="startup-image"
                                    width={187}
                                    height={56}
                                  />
                                </label>
                              </li>
                              <li>
                                <input
                                  className="form-check-input gender-radio" id="myCheckbox2"
                                  {...register("role", {
                                    onChange: (e) =>
                                      setRole(e.target.value),
                                    required: true,
                                  })}
                                  type="radio"
                                  name="role"
                                  value="startup"
                                />
                                <label htmlFor="myCheckbox2">
                                  <Image
                                    src="assets/img/startup.png"
                                    alt="startup-image"
                                    width={187}
                                    height={56}
                                  />
                                </label>
                              </li>
                            </ul>
                          </div>
                          <div className="help-block with-errors" />
                          <div className="error text-center">
                            {errors.role && errors.role.type === "required" && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "center", fontSize: "12px" }}
                              >
                                *Please Select Your Role.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="manage-button text-center mt-4">
                        <button
                          type="submit"
                          className="submit_now text-decoration-none"
                          disabled={isSubmitting ? true : false}
                        >
                          {isSubmitting ? 'Processing' : 'Register'}
                          <i className="circle fa-regular fa-angle-right" />
                        </button>
                      </div>
                      <p className="mt-3">
                        Already have account?{" "}
                        <strong>
                          <Link href="/login" style={{ color: "#088395" }}>
                            {" "}
                            Login!
                          </Link>
                        </strong>{" "}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default Signup;
