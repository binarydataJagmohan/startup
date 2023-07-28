import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { useForm } from "react-hook-form";
import { getSingleUserData, getCountries, personalInformationSave } from "../../lib/frontendapi";
import { removeToken, removeStorageData, getCurrentUserData } from "../../lib/session";
import { log } from "console";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const alertStyle = {
  color: "red",
};
const textStyle = {
  textTransform: "capitalize",
};

interface UserData {
  id?: string;
}
type Country = {
  name: string;
  country_code: string;
}
export default function Findbusiness(): any {
  const [blId, setBlId] = useState("");
  const [forwarduId, setForwarduId] = useState("");
  const [find_business_location, setFindBusinessLocation] = useState("");
  const [lat, setLat] = useState("");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [lng, setLng] = useState("");
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
    let { name, value } = event.target;
    if (name === 'phone') {
      // Remove all non-digit characters from value
      value = value.replace(/\D/g, '');
      // Limit the length of value to 12 characters
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
    if (current_user_data?.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");

      getSingleUserData(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setUser(res.data);
            // console.log(setUser);
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
      if (!user.country) {
        setMissingFields(prevFields => [...prevFields, "country"]);

      }
      if (!user.gender) {
        setMissingFields(prevFields => [...prevFields, "gender"]);

      }
      const res = await personalInformationSave(user);
      if (res.status == true) {
        setTimeout(() => {
          router.push("/steps/businessinfo");
        }, 1000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
      toast.error(err as string, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };

  if (signup_success) return router.push("/steps/businessinfo");

  return (
    <>
      <div className="page-title-area item-bg-5">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="page-title-content">
                <h2>Complete Account Details</h2>
                {/* <ul>
                  <li>
                    <a href="/"></a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-bar">
        <div className="container">
          <div id="app">
            <ol className="step-indicator">
              <li className="active">
                <div className="step_name">
                  Step <span>1</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img
                      className="sidebar-img w-75"
                      src="/assets/img/sidebar/user.png"
                    />
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>PERSONAL INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>2</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img
                      className="sidebar-img w-75"
                      src="/assets/img/sidebar/business.png"
                    />
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BUSINESS INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>3</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img
                      className="sidebar-img w-75"
                      src="/assets/img/sidebar/docs.png"
                    />
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BASIC INFORMATION</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>4</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img className="sidebar-img w-75" src="/assets/img/sidebar/bank.png" />
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>DOCUMENTS UPLOAD</span>
                </div>
              </li>
              <li className="">
                <div className="step_name">
                  Step <span>5</span>
                </div>
                <div className="step_border">
                  <div className="step">
                    <img className="sidebar-img w-75" src="/assets/img/sidebar/bank.png" />
                  </div>
                </div>
                <div className="caption hidden-xs hidden-sm">
                  <span>BANK INFORMATION</span>
                </div>
              </li>
            </ol>
            <div className="container">
              <div className="register-form">
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
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="email"
                                className="form-control same-input pl-5"
                                {...register("email", {
                                  value: true,
                                  required: true,
                                })}
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
                                className="form-control same-input pl-5"
                                {...register("linkedin_url", {
                                  required: !user.linkedin_url, onChange: handleChange,
                                  pattern: {
                                    value: /^(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9_-]+\/?$/,
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
                                <p className="text-danger">*Please enter a valid LinkedIn URL.</p>
                              )}
                            </div>


                            <div className="col-sm-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label mb-4"
                              >
                                Country of Citizenship{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                className="form-select form-select-lg mb-3 css-1492t68"
                                {...register("country", {
                                  // validate: (value) => value != "",
                                  onChange: handleChange,
                                  // required: true,
                                })}
                                name="country"

                                aria-label="Default select example"
                              >
                                <option value="">
                                  --SELECT COUNTRY--
                                </option>
                                {countries.map((country, index) => (
                                  <option
                                    key={index}
                                    value={country.name}
                                    selected={user.country === country.name}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                              <div className="help-block with-errors" />
                              {
                                missingFields.includes("country") && (
                                  <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                    *Please Select Country.
                                  </p>
                                )
                              }
                              {/* {errors.country &&
                                errors.country.type === "required" &&
                                !user.country && (
                                  <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                    *Please Select Country.
                                  </p>
                                )} */}

                            </div>

                            <div className="col-md-6 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Phone number{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <div className="input-group spac">
                                <PhoneInput
                                  onClick={phonClick}
                                  country={"us"}
                                  {...register("phone", { required: !user.phone })}
                                  value={user.phone}
                                  onChange={(value) => setUser((prevState) => ({ ...prevState, phone: value }))}
                                />
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
                              {/* {errors.phone && errors.phone.type === "minLength" && (
                                <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                  *{errors.phone.message}
                                </p>
                              )} */}


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
                                className="form-control same-input "
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
                                Gender  <span style={{ color: "red" }}>*</span>
                              </label>

                              <select
                                className="form-select form-select-lg mb-3 css-1492t68"
                                {...register("gender", {
                                  // validate: (value) => value != "",
                                  onChange: handleChange,
                                  // required: true,
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

                              {missingFields.includes("gender") && (
                                <p
                                  className="text-danger"
                                  style={{ textAlign: "left", fontSize: "12px" }}
                                >
                                  *Please Select Gender.
                                </p>
                              )}
                              {/* {errors.gender && errors.gender.type === "required" &&
                                !user.gender && (
                                  <p
                                    className="text-danger"
                                    style={{ textAlign: "left", fontSize: "12px" }}
                                  >
                                    *Please Select Gender.
                                  </p>
                                )} */}
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
