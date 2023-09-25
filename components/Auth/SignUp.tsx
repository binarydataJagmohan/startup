import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { userRegister,sendNotification } from "../../lib/frontendapi";
import { useRouter } from "next/router";
import Link from 'next/link';
interface FormData {
  firstname:string;
  lastname:string;
  email: string;
  password:string;
  role:string;
}
const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications,setNotifications]=useState("");
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
    // maxLength: {
    //   value: 16,
    //   message: 'Password cannot be more 16 characters.',
    // },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  });

 

  const SubmitForm = () => {
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      role: role,
    };
    const setLocalStorageItems = (user:any) => {
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
        //   console.log(res.data[0]);
        //   console.log(res.data['user']);
        //  return false;
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
              notify_msg:`${user.firstname} has been registered successfully as a ${user.role}.`,
              notification_type: "New User Registered",
              each_read: "unread",
              status: "active"
            };
            
            // Send Notifications to admin When new user is register
            sendNotification(data)
            .then((notificationRes) => {
              console.log('success')
            })
            .catch((error) => {
              console.log('error occured')
            });
  
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

          // if(user.role == 'investor')
          // {
          //   setTimeout(() => {
          //     router.push("/investor-steps/findbusiness"); // Redirect to login page
          //   }, 1000);
          // }
          // if(user.role == 'startup')
          // setTimeout(() => {
          //   router.push("/login"); // Redirect to login page
          // }, 1000);
        }
        else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }

      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      });
  };

  return (
    <>
      <div>
        <div className="page-title-area item-bg-5">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="page-title-content">
                  <h2>Signup</h2>
                  <ul>
                    <li>
                      <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/"}>Home</Link>
                    </li>
                    <li>Signup</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-section pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="contact-text text-center pt-4"> 
                </div>
                <div className="contact-form">
                  <form id="contactForm" onSubmit={handleSubmit(SubmitForm)}>
                   <h3>Lets Get Started</h3>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label>
                          First Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="firstname"
                          className="form-control"
                          {...register("firstname", {
                            onChange: (e) => setFirstName(e.target.value),
                            required: true,
                          })} />
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
                      <div className="form-group col-md-6">
                        <label>
                          Last Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          className="form-control"
                          {...register("lastname", {
                            onChange: (e) => setLastName(e.target.value),
                            required: true,
                          })} />
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

                      <div className="form-group col-md-6">
                        <label>
                          Email<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          {...register("email", {
                            onChange: (e) => setEmail(e.target.value),
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address"
                            }
                          })}
                        />

                        {errors.email && (
                          <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                            <span>{errors.email.message}</span>
                          </p>
                        )}

                      </div>



                      <div className="form-group col-md-6 position-relative">
                        <label>
                          Password<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           type={showPassword ? 'text' : 'password'}
                          id="password"
                          className="form-control" maxLength={16}
                          {...register("password", {
                            onChange: (e) => setPassword(e.target.value),
                          })}
                        />
                       <span className="passwordView1" onClick={handleTogglePassword}>
                      {showPassword ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
                    </span>
                        <div className="help-block with-errors" />
                        {errors.password && (
                          <p
                            className="text-danger"
                            style={{ textAlign: "left", fontSize: "12px" }}
                          >
                            *{errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <label>
                          Registered As:
                          <span style={{ color: "red" }}>*</span>
                        </label>

                        <div className="col-md-12 text-center twobox">
                          <div className="images-investor text-center">
                            <ul className="role-classs">
                              <li>
                                {/* <h6>Investors</h6> */}
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
                                  <img src="assets/img/invest.png" />
                                </label>
                              </li>
                              <li>
                                {/* <h6>Startup</h6> */}
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
                                  <img src="assets/img/startup.png" />
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

                      <div className="form-group col-md-12 mt-3">
                        <div className="help-block with-errors" />

                        <div className="row mt-3">
                          <div
                            className="col-md-12 text-center" >
                            <button type="submit" className="btnclasssmae">
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer autoClose={1000} />
        {/* End Contact Area */}
      </div>
    </>
  );
};

export default Signup;
