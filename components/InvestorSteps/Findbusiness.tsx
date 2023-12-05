import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { useForm } from "react-hook-form";
import { getSingleUserData, getCountries, personalInformationSave } from "../../lib/frontendapi";
import { getCurrentUserData } from "../../lib/session";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface UserData {
  id?: number;
  role?: any;
}
type Country = {
  name: string;
  country_code: string;
};

export default function Findbusiness(): any { 
  const [signup_success, setSignupSuccess] = useState(false);

  const [current_user_id, setCurrentUserId] = useState("");
  const [countries, setcountries] = useState<Country[]>([]);
  const [user, setUser] = useState({
    id: current_user_id,
    email: "",
    linkedin_url: "",
    gender: "",
    country: "",
    city: "",
    phone: "",
    country_code: ""
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: { name: string, value: string } = event.target;
    if (name === 'phone') {
      // Remove all non-digit characters
      value = value.replace(/\D/g, '');
      // Limit the length of phone_nmber to 12 numbers
      value = value.substring(0, 12);
    }

    var selectedCountry = countries.find(
      (country) => country.name === value
    );
    var countryCode = "";
    if (selectedCountry) {
      countryCode = selectedCountry.country_code;
    }

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
        id: current_user_id,
        country_code: countryCode ? `${countryCode}` : " ",
      };
    });

  };

  const phonClick = (event: any) => {
    let { name, value } = event.target;
    var selectedCountry = countries.find(
      (country) => country.name === value
    );
    var countryCode = "";
    if (selectedCountry) {
      countryCode = selectedCountry.country_code;
    }

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
        id: current_user_id,
        country_code: countryCode ? `${countryCode}` : " ",
      };
    });
  }

  useEffect(() => {    
    const current_user_data: UserData = getCurrentUserData();    
    if (current_user_data.role !== 'investor') {
        router.back();
    }   
    if (current_user_data.id != null) {
      current_user_data.id ? setCurrentUserId(current_user_data.id.toString()) : setCurrentUserId("");

      getSingleUserData(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setUser(res.data);
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    } else {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      const data = await getCountries({});
      if (data) {
        setcountries(data.data);
      }
    };

    fetchData();
  }, []);

  const SubmitForm = async (event: any) => {
    try {
      const res = await personalInformationSave(user);

      if (res.status === true) {
        setTimeout(() => {
          router.push("/investor-steps/investor-type");
        }, 1000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err: any) {
      // Extract the error message from the exception
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      if (errorMessage.includes("Duplicate entry")) {
        toast.error('Phone number already exists.', {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      } else {
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    }
  };

  if (signup_success) return router.push("/steps/businessinfo");

  return (
    <>
      <div className="left-bar">
        <div className="container">
          <div id="app">
            <div className="container">
              <div className="register-form">
                {/*<h4 className="text-center mt-5">Find your business</h4>*/}
                <div className="row step_one">
                  <div className="col-md-12">
                    <form
                      className="needs-validation mb-4"
                      onSubmit={handleSubmit(SubmitForm)}
                    >
                      <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                        Let's Get Started&nbsp;
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Please type in your full personal information into the field below. This would be helpfull to verify your account."
                        ></i>
                      </h4>
                      <div className="row justify-content-center">
                        <div className="col-md-8" id="register">
                          <div className="row">
                            <div className="col-md-6 mt-3 mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Email ID{" "}
                              </label>
                              <input
                                type="email"
                                className="form-control same-input"                           
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={user.email ? user.email : ""}
                                readOnly
                              />
                            </div>
                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Linkedin URL{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                {...register("linkedin_url", {
                                  required: !user.linkedin_url, onChange: handleChange,
                                  pattern: {
                                    value: /^(https:\/\/)?(www\.)?linkedin\.com\/(in\/[a-zA-Z0-9_-]+|company\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+\/?)\/?$/,
                                    message: "Please enter a valid LinkedIn URL"
                                  }
                                })}
                                id="linkedin_url"
                                name="linkedin_url"
                                value={user.linkedin_url}
                              />
                              {errors.linkedin_url && errors.linkedin_url.type === "required" && (
                                <p className="text-danger">*Please enter your LinkedIn URL</p>
                              )}
                              {errors.linkedin_url && errors.linkedin_url.type === "pattern" && (
                                <p className="text-danger">*Please enter a valid LinkedIn URL</p>
                              )}
                            </div>

                            <div className="col-sm-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label mb-4"
                              >
                                Country of Citizenship{" "}{user.country}
                              </label>
                              <select
                                className="form-select form-select-lg mb-3 css-1492t68"
                               
                                aria-label="Default select example"
                                {...register("country", {
                                  onChange: handleChange
                                })}
                                 name="country"
                              >
                                <option value="">
                                  --SELECT COUNTRY--
                                </option>
                                {countries.map((country: any, index: any) => (
                                  <option
                                    key={country.id}
                                    value={country.name}
                                    selected={user.country === country.name}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                              <div className="help-block with-errors" />


                            </div>

                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Phone number{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <div className="input-group">

                                <PhoneInput onClick={phonClick} country={"us"} {...register("phone", { required: !user.phone })}
                                  onChange={(value) => setUser((prevState) => ({ ...prevState, phone: value }))}
                                  value={user.phone ? user.phone : '91'} />
                              </div>
                              <div className="help-block with-errors" />
                              {errors.phone && errors.phone.type === "required" && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Enter Your Phone Number.
                                </p>
                              )}



                            </div>

                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Which city do you live in?{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control same-input"
                                {...register("city", {
                                  value: true,
                                  required: true,
                                })}
                                id="city"
                                name="city"
                                onChange={handleChange}
                                value={user.city}
                              />
                              <div className="help-block with-errors" />
                              {errors.city &&
                                errors.city.type === "required" && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Enter Your City.
                                  </p>
                                )}
                            </div>
                            <div className="col-sm-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label mb-4"
                              >
                                Gender

                              </label>

                              <select
                                className="form-select form-select-lg mb-3 css-1492t68"
                                {...register("gender", {
                                  // validate: (value) => value != "", required: true,
                                  onChange: handleChange
                                })}
                                name="gender"
                                aria-label="Default select example"
                                value={user ? user.gender : ""}
                              >
                                <option value="">--SELECT GENDER--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              <div className="help-block with-errors" />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div
                              className="col-md-12"
                              style={{ textAlign: "right" }}
                            >
                              <button type="submit" className="btnclasssmae">
                                NEXT
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
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}
