import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { userRegister } from "../../lib/frontendapi";
import { useRouter } from "next/router";
const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-=?]).{8,}$/;

  // Add a validation rule for the password field
  register('password', {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    maxLength: {
      value: 16,
      message: 'Password cannot be more 16 characters.',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  });
  register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email',
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
  
    userRegister(user)
      .then((res) => {
          console.log(res);
        if (res.status == true) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "success",
          });
          // if(user.role == 'investor')
          // {
          //   setTimeout(() => {
          //     router.push("/investor-steps/findbusiness"); // Redirect to login page
          //   }, 1000);
          // }
          // if(user.role == 'startup')
          setTimeout(() => {
            router.push("/login"); // Redirect to login page
          }, 1000);
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
        {/* Start Page Title Area */}
        <div className="page-title-area item-bg-5">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="page-title-content">
                  <h2>Signup</h2>
                  <ul>
                    <li>
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "/"}>Home</a>
                    </li>
                    <li>Signup</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Page Title Area */}

        {/* Start Contact Area */}
        <section className="contact-section pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="contact-text text-center pt-4">
                  <h3>Lets Get Started</h3>
                </div>
                <div className="contact-form">
                  <form id="contactForm" onSubmit={handleSubmit(SubmitForm)}>
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
                          })}
                        />
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
                          })}
                        />
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
                          {...register("email")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="help-block with-errors" />
                        {errors.email && (
                          <p
                            className="text-danger"
                            style={{ textAlign: "left", fontSize: "12px" }}
                          >
                            *{errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group col-md-6">
                        <label>
                          Password<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control" maxLength={16}
                          {...register("password", {
                            onChange: (e) => setPassword(e.target.value),
                          })}
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
                            <button type="submit" className="btn btn-primary">
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
