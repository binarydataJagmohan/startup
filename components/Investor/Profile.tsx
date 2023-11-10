import React, { useState, useEffect, use } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentUserData } from "@/lib/session";
import {
  getSingleUserData,
  getCountries,
  getInvestorType,
  investorTypeInfoSave,
} from "@/lib/frontendapi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { InvestorPersonalInfoUpdate } from "../../lib/investorapi";
type Country = {
  name: string;
  country_code: string;
};
interface UserData {
  id?: string;
}
const Profile = () => {
  const router = useRouter();
  const [countries, setcountries] = useState<Country[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [current_user_id, setCurrentUserId] = useState("");
  const [profile_pic, setProfilePic] = useState(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const [user, setUser] = useState({
    id: current_user_id,
    name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    city: "",
    country: "",
    gender: "",
    role: "",
    status: "",
    profile_pic: "",
  });

  const [investorDetails, seInvestorDetails] = useState({
    user_id: current_user_id,
    investorType: "",
  });

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "radio" && name === "investorType") {
      // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
      const typeValue = checked ? "Accredited Investors" : "Angel Investor";
      seInvestorDetails((prevState) => {
        return {
          ...prevState,
          investorDetails: typeValue,
          user_id: current_user_id,
        };
      });
    }
    seInvestorDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
        user_id: current_user_id,
      };
    });
  };

  const handleFileChange = (event: any) => {
    setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data?.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");
    } else {
      window.location.href = "/login";
    }

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

    getInvestorType(current_user_data.id)
      .then((res) => {
        if (res.status === true) {
          seInvestorDetails(res.data);
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

    const fetchData = async () => {
      const data = await getCountries({});
      if (data) {
        setcountries(data.data);
      }
    };

    fetchData();
  }, []);

  const phonClick = (event: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    let { name, value } = event.target;
    var selectedCountry = countries.find((country) => country.name === value);
    var countryCode = "";
    if (selectedCountry) {
      countryCode = selectedCountry.country_code;
    }

    setUser((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
        id: id,
        country_code: countryCode ? `${countryCode}` : " ",
      };
    });
  };

  const handleChange = (event: any) => {
    setMissingFields([]);
    setInvalidFields([]);
    let { name, value } = event.target;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
        id: current_user_id,
      };
    });
  };
  const submitPersonalInfoForm = async () => {
    try {
      if (!user.name) {
        setMissingFields((prevFields) => [...prevFields, "Name"]);
      }

      if (!user.city) {
        setMissingFields((prevFields) => [...prevFields, "city"]);
      }
      if (!user.country) {
        setMissingFields((prevFields) => [...prevFields, "country"]);
      }

      if (!user.gender) {
        setMissingFields((prevFields) => [...prevFields, "gender"]);
      }

      if (!user.phone) {
        setMissingFields((prevFields) => [...prevFields, "phone"]);
      }
      if (!user.linkedin_url) {
        setMissingFields((prevFields) => [...prevFields, "linkedin_url"]);
      } else if (
        !/^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/[\w-]+$/i.test(
          user.linkedin_url
        )
      ) {
        setInvalidFields((prevFields) => [...prevFields, "linkedin_url"]);
      }

      const formData = new FormData();
      if (profile_pic !== null) {
        formData.append("profile_pic", profile_pic);
      }
      formData.append("id", user.id);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("linkedin_url", user.linkedin_url);
      formData.append("city", user.city);
      formData.append("country", user.country);
      formData.append("gender", user.gender);
      const res = await InvestorPersonalInfoUpdate(formData);

      if (res.status === true) {
        // setTimeout(() => {
        //   router.push("/steps/customizereview");
        // }, 1000);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success",
        });
      } else {
        toast.error(res.msg, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
      toast.error("Please fill correct information", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };

  // Update Investor Type
  const submitInvestorTypeForm = async () => {
    try {
      // console.log(investorDetails)
      const res = await investorTypeInfoSave(investorDetails);
      if (res.status == true) {
        // console.log(res.data.data.investorType);
        if (res.data.data.investorType == "Angel Investor") {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "success",
          });
          // setTimeout(() => {
          //     router.push("/investor-steps/customizereview");
          // }, 1000);
        } else {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "success",
          });
          // setTimeout(() => {
          //     router.push("/investor-steps/accredited-investors");
          // }, 1000);
        }
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
      toast.error("Details has not been saved successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };
  return (
    <>
      <section className="form-faq pt-5 pb-5">
        <div className="container m-0">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button text-white"
                  type="button"
                  // data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Personal Information:
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="form-part">
                    <h3>Personal Information</h3>
                    <form onSubmit={handleSubmit(submitPersonalInfoForm)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-part">
                            <input
                              type="text"
                              className="form-control form-css"
                              placeholder="Name"
                              onChange={handleChange}
                              name="name"
                              value={user.name}
                            />
                            {missingFields.includes("Name") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                *Please Enter Your Name.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-part">
                            <input
                              type="email"
                              className="form-control form-css"
                              placeholder="Email"
                              {...register("email", {
                                onChange: handleChange,
                                required: true,
                                value: true,
                              })}
                              onChange={handleChange}
                              readOnly
                              name="email"
                              value={user.email}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-part">
                            <input
                              type="text"
                              className="form-control form-css"
                              placeholder="www.linkedin.com"
                              onChange={handleChange}
                              name="linkedin_url"
                              value={user.linkedin_url}
                            />
                            {missingFields.includes("linkedin_url") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                * Please enter a linkedin_url address
                              </p>
                            )}
                            {invalidFields.includes("linkedin_url") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                * Please enter a valid linkedin_url address.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-part mt-3">
                            {/* <input type="Number" placeholder="Phone number" name="" /> */}
                            <PhoneInput
                              onClick={phonClick}
                              country={"us"}
                              value={user.phone}
                              inputClass={"form-css"}
                              onChange={(value) =>
                                setUser((prevState) => ({
                                  ...prevState,
                                  phone: value,
                                }))
                              }
                            />
                            {missingFields.includes("phone") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                *Please Enter Your Phone Number.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-part">
                            <select
                              name="country"
                              className="form-select form-css"
                              aria-label="Default select example"
                              onChange={handleChange}
                            >
                              <option value="">--SELECT COUNTRY--</option>
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
                            {missingFields.includes("country") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                *Please Select Country .
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-part">
                            <input
                              type="text"
                              className="form-control form-css"
                              placeholder="City"
                              onChange={handleChange}
                              name="city"
                              value={user.city}
                            />
                            {missingFields.includes("city") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                *Please Enter Your city.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row mb-5">
                        <div className="col-sm-6">
                          <div className="form-part">
                            <select
                              className="form-select form-css"
                              onChange={handleChange}
                              name="gender"
                              value={user.gender}
                              aria-label="Default select example"
                            >
                              <option value="">--SELECT GENDER--</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            {missingFields.includes("gender") && (
                              <p
                                className="text-danger"
                                style={{ textAlign: "left", fontSize: "12px" }}
                              >
                                *Please Select Gender.
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className="profile-pic">
                            {user && user.profile_pic ? (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  "images/profile/" +
                                  user.profile_pic
                                }
                                className="profile-pic"
                                alt=""
                                width={120}
                                height={120}
                                onError={(
                                  e: React.SyntheticEvent<
                                    HTMLImageElement,
                                    Event
                                  >
                                ) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src =
                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                    "images/profile/profile.webp";
                                }}
                              />
                            ) : (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  "images/profile/profile.webp"
                                }
                                alt="default profile"
                                className="profile-pic"
                                width={120}
                                height={120}
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <input
                            type="file"
                            className="mt-4 pt-4"
                            name="profile_pic"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-12 text-center">
                          <button type="submit" className="btnclasssmae">
                            UPDATE
                          </button>
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
      </section>
    </>
  );
};

export default Profile;
