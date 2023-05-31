import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentUserData } from '@/lib/session';
import { getSingleUserData, getCountries, getInvestorType,investorTypeInfoSave } from '@/lib/frontendapi';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { InvestorPersonalInfoUpdate } from '../../lib/investorapi';
type Country = {
    name: string;
    country_code: string;
}
interface UserData {
    id?: string;
}
const Profile = () => {
    const router = useRouter();
    const [countries, setcountries] = useState<Country[]>([]);
    const { register, handleSubmit, formState: { errors}, } = useForm();
    const [current_user_id, setCurrentUserId] = useState("");
    const [profile_pic, setProfilePic] = useState(null);

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
        profile_pic: ""

    });

    const [investorDetails, seInvestorDetails] = useState({
        user_id: current_user_id,
        investorType: ""
    });

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        if (type === 'radio' && name === 'investorType') {
            // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
            const typeValue = checked ? 'Accredited Investors' : 'Angel Investor';
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
        const id = urlParams.get('id');
        let { name, value } = event.target;
        var selectedCountry = countries.find(
            (country) => country.name === value
        );
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
    }


    const handleChange = (event: any) => {
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
            const formData = new FormData();
            if (profile_pic !== null) {
                formData.append('profile_pic', profile_pic);
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
            console.log(investorDetails)
            const res = await investorTypeInfoSave(investorDetails);
            if (res.status == true) {
                  console.log(res.data.data.investorType);
                  if(res.data.data.investorType=="Angel Investor")
                  {
                     toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                  });
                    // setTimeout(() => {
                    //     router.push("/investor-steps/customizereview");
                    // }, 1000);
                
                  }else{
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
                                <button className="accordion-button text-white" type="button" 
                                // data-bs-toggle="collapse" data-bs-target="#collapseOne" 
                                aria-expanded="true" aria-controls="collapseOne">
                                    Personal Information:
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="form-part">
                                        <h3>Personal Information</h3>
                                        <form onSubmit={handleSubmit(submitPersonalInfoForm)}>
                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Name"  {...register("name", { value: true, required: true, })} onChange={handleChange} name="name" value={user.name} />
                                                                    {errors.name &&
                                                                        errors.name.type === "required" && (
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
                                                                    <input type="email" className="form-control form-css" placeholder="Email" {...register("email", {
                                                                       onChange:handleChange,
                                                                      required: true,
                                                                      value:true,
                                                                        // pattern: {
                                                                        //     value: /^\S+@\S+$/i,
                                                                        //     message: "Invalid email address"
                                                                        // }
                                                                    })} onChange={handleChange} name="email" value={user.email} />
                                                                    {errors.email && (
                                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                                            <span>*Email Required</span>
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="www.linkedin.com" onChange={handleChange} name="linkedin_url" value={user.linkedin_url} />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-part mt-3">
                                                                    {/* <input type="Number" placeholder="Phone number" name="" /> */}
                                                                    <PhoneInput
                                                                        onClick={phonClick}
                                                                        country={"us"}
                                                                        value={user.phone} inputClass={'form-css'}
                                                                        onChange={(value) => setUser((prevState) => ({ ...prevState, phone: value }))}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-part">
                                                                    <select
                                                                        name="country" className="form-select form-css"
                                                                        aria-label="Default select example" onChange={handleChange}
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
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="City" onChange={handleChange} name="city" value={user.city} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-5">
                                                            <div className="col-sm-6">
                                                                <div className="form-part">
                                                                    <select
                                                                        className="form-select form-css" onChange={handleChange}
                                                                        name="gender" value={user.gender}
                                                                        aria-label="Default select example"
                                                                    >
                                                                        <option value="">--SELECT GENDER--</option>
                                                                        <option value="male">Male</option>
                                                                        <option value="female">Female</option>
                                                                        <option value="other">Other</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <div className="profile-pic">
                                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/' + user.profile_pic} alt="profile" className="profile-pic" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <input type="file" className="mt-4 pt-4" name="profile_pic" onChange={handleFileChange} />
                                                            </div>
                                                        </div>
                                            {/* <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Name" onChange={handleChange} name="name" value={user.name} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="email" className="form-control form-css" placeholder="Email" onChange={handleChange} name="email" value={user.email} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="www.linkedin.com" onChange={handleChange} name="linkedin_url" value={user.linkedin_url} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part mt-3">
                                                     
                                                        <PhoneInput
                                                            onClick={phonClick}
                                                            country={"us"}
                                                            value={user.phone} inputClass={'form-css'}
                                                            onChange={(value) => setUser((prevState) => ({ ...prevState, phone: value }))}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <select
                                                            name="country" className="form-select form-css"
                                                            aria-label="Default select example" onChange={handleChange}
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
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="City" onChange={handleChange} name="city" value={user.city} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <select
                                                            className="form-select form-css" onChange={handleChange}
                                                            name="gender" value={user.gender}
                                                            aria-label="Default select example"
                                                        >
                                                            <option value="">--SELECT GENDER--</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <div className="profile-pic">
                                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/' + user.profile_pic} alt="profile" className="profile-pic" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="file" className="mt-4 pt-4" name="profile_pic" onChange={handleFileChange} />
                                                </div>
                                            </div> */}
                                            {/* <div className="row">
                                                <div className="col-sm-2">
                                                    <div className="profile-pic">
                                                        <img src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/profile.webp"} alt="profile" className="profile-pic" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-10">
                                                    <input type="file" className="mt-4 pt-4" />
                                                </div>
                                            </div> */}

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
                        {/* <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Investor Information:
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="form-part">
                                        <h3>Investor Type</h3>
                                        <div className="container">
                                            <div className="register-form">
                                                <div className="row step_one">
                                                    <div className="col-md-12">
                                                        <form className="needs-validation mb-4" onSubmit={handleSubmit(submitInvestorTypeForm)}>
                                                            <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                                                                {" "}
                                                                Investor Type Information{" "}
                                                            </h4>
                                                            <div className="row justify-content-center">
                                                                <div className="col-md-8" id="register">
                                                                    <div className="row">
                                                                        <div className="form-group col-md-12">
                                                                            <div className="col-md-12 text-center twobox">
                                                                                <div className="images-investor text-center">
                                                                                    <ul className="investor-classs">
                                                                                        <li>
                                                                                            <h6 className="mt-3">Accredited Investors</h6>
                                                                                            <input
                                                                                                className="form-check-input gender-radio" id="myCheckbox1"
                                                                                                {...register("investorType", {
                                                                                                    required: true, value: true
                                                                                                })}
                                                                                                onChange={handleChangeType}
                                                                                                type="radio"
                                                                                                name="investorType"
                                                                                                value="Accredited Investors" checked={investorDetails.investorType === 'Accredited Investors'}
                                                                                            />
                                                                                            <label htmlFor="myCheckbox1">
                                                                                                <img src="/assets/img/investor/accredited.png" />
                                                                                            </label>
                                                                                        </li>
                                                                                        <li>
                                                                                            <h6 className="mt-3">Angel Investor</h6>
                                                                                            <input
                                                                                                className="form-check-input gender-radio" id="myCheckbox2"
                                                                                                {...register("investorType", {
                                                                                                    required: true,
                                                                                                })} onChange={handleChangeType}
                                                                                                type="radio"
                                                                                                name="investorType"
                                                                                                value="Angel Investor" checked={investorDetails.investorType === 'Angel Investor'}
                                                                                            />
                                                                                            <label htmlFor="myCheckbox2">
                                                                                                <img src="/assets/img/investor/angel.png" />
                                                                                            </label>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-md-12 text-center">
                                                                            <button type="submit" className="btnclasssmae">
                                                                                UPDATE
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
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Term and condition:
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="form-part">
                                    <h3>Personal Information</h3>
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-part">
                                                    <input type="text" placeholder="Email" name="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-part">
                                                    <input type="text" placeholder="www.linkedin.com" name="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-part">
                                                    <input type="text" placeholder="Country of Citizenship " name="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-part">
                                                    <input type="Number" placeholder="Phone number" name="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-part">
                                                    <input type="text" placeholder="City" name="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-part">
                                                    <select>
                                                        <option>Gender</option>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <ToastContainer autoClose={2000} />
            </section>
        </>
    )
}

export default Profile