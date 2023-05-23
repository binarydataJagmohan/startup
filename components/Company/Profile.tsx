import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentUserData } from '@/lib/session';
import { getSingleUserData, getCountries, getBusinessInformation, businessInfoSave,getBasicInformation,basicInformationSave,getBankInformation,bankInformationSave} from '@/lib/frontendapi';
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
    const { register, handleSubmit, formState: { errors: any }, } = useForm();
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

    const [logo, setLogo] = useState(null);
    const [businessDetails, setBusinessDetails] = useState({
        user_id: current_user_id,
        business_name: "",
        reg_businessname: "",
        website_url: "",
        sector: "",
        stage: "",
        startup_date: "",
        tagline: "",
        logo: "",
        type: "",
        description: "",
        cofounder: "0",
        kyc_purposes: "0",
    });

    // Basic Information ...
    const [proof_img, setProofImg] = useState(null);
    const [basicDetails, setBasicDetails] = useState({
      user_id: current_user_id,
      pan_number: "",
      uid: "",
      proof_img: "",
      dob: "",
    });

    // Bank Information ...
    const [bankDetails, setBankDetails] = useState({
        user_id:current_user_id,
        // business_id :current_business_id ,
        bank_name: "",
        account_holder: "",
        account_no: "",
        ifsc_code: ""
      });


    // handle Change for business information...
    const handleChangeBusinessInfo = (event: any) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox' && name === 'cofounder') {
            // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
            const cofounderValue = checked ? '1' : '0';
            setBusinessDetails((prevState) => {
                return {
                    ...prevState,
                    cofounder: cofounderValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'kyc_purposes') {
            // Set the value of kyc_purposes to '1' if the checkbox is checked, '0' otherwise
            const kycValue = checked ? '1' : '0';
            setBusinessDetails((prevState) => {
                return {
                    ...prevState,
                    kyc_purposes: kycValue,
                    user_id: current_user_id,
                };
            });
        } else {
            setBusinessDetails((prevState) => {
                return {
                    ...prevState,
                    [name]: value,
                    user_id: current_user_id,
                };
            });
        }
    };

    const handleFileChange = (event: any) => {
        setProfilePic(event.target.files[0]);
    };

    const handleFileChangeLogo = (event: any) => {
        setLogo(event.target.files[0]);
      };

      const handleFileChangeProof = (event: any) => {
        setProofImg(event.target.files[0]);
      };

    // HandleChange for Basic Details....
    const handleChangeBasic = (event: any) => {
        let { name, value } = event.target;
        if (name === 'uid') {
          value = value.replace(/\D/g, '');
          value = value.substring(0, 12);
        }
    
        setBasicDetails((prevState) => {
          return {
            ...prevState,
            [name]: value,
            user_id: current_user_id,
          };
        });
      };

      const handleChangeBank = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        if (name === 'account_no') {
          value = value.replace(/\D/g, '');
          value = value.substring(0, 12);
        }
        setBankDetails((prevState) => {
          return {
            ...prevState,
            [name]: value,
            id: current_user_id,
            // business_id :current_business_id
          };
        });
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

        getBusinessInformation(current_user_data.id)
            .then((res) => {
                if (res.status === true) {
                    setBusinessDetails(res.data);

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


            getBasicInformation(current_user_data.id)
            .then((res) => {
              if (res.status == true) {
                setBasicDetails(res.data);
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

            getBankInformation(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setBankDetails( res.data);
            console.log(res.data);
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

    // Update Business Information...
    const submitBusinessInfoForm = async () => {
        try {
            const formData = new FormData();
            if (logo !== null) {
                formData.append('logo', logo);
            }
            formData.append("user_id", businessDetails.user_id);
            formData.append("business_name", businessDetails.business_name);
            formData.append("reg_businessname", businessDetails.reg_businessname);
            formData.append("website_url", businessDetails.website_url);
            formData.append("sector", businessDetails.sector);
            formData.append("stage", businessDetails.stage);
            formData.append("startup_date", businessDetails.startup_date);
            formData.append("tagline", businessDetails.tagline);
            formData.append("description", businessDetails.description);
            formData.append("cofounder", businessDetails.cofounder);
            formData.append("kyc_purposes", businessDetails.kyc_purposes);
            formData.append("type", businessDetails.type);
            const res = await businessInfoSave(formData);

            if (res.status === true) {
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

    const submitBasicInfoForm = async () => {
        try {
          const formData = new FormData();
          if (proof_img !== null) {
            formData.append('proof_img', proof_img);
          }
          formData.append("user_id", basicDetails.user_id);
          formData.append("pan_number", basicDetails.pan_number);
          formData.append("uid", basicDetails.uid);
          formData.append("dob", basicDetails.dob);
          const res = await basicInformationSave(formData);
          if (res.status == true) {
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "success",
            });
            // setTimeout(() => {
            //   router.push("/steps/adharinformation");
            // }, 1000);
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "error",
            });
          }
        } catch (err) {
          toast.error("Basic Information has not been stored.", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }
      };

      //Update for Adhar Information 
      const submitBankInfoForm = async () => {
        try {
         const res = await bankInformationSave(bankDetails);
         if (res.status == true) {
           toast.success("Profile has been Updated Successfully.", {
             position: toast.POSITION.TOP_RIGHT,
             toastId: "success",
           });
        //    setTimeout(() => {
        //      router.push("/company/thank-you");
        //    }, 1000);
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
                <div className="container mt-5" style={{ width: "76%", marginLeft: "274px" }}>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
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
                                                    <button type="submit" className="btn btn-primary">
                                                        UPDATE
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Business Information:
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="form-part">
                                        <h3>Business Information</h3>
                                        <form onSubmit={handleSubmit(submitBusinessInfoForm)}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Business Name" onChange={handleChangeBusinessInfo} name="business_name" value={businessDetails.business_name} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Registered Business Name" onChange={handleChangeBusinessInfo} name="reg_businessname" value={businessDetails.reg_businessname} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Website URL" onChange={handleChangeBusinessInfo} name="website_url" value={businessDetails.website_url} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <select
                                                            className="form-select form-css" onChange={handleChangeBusinessInfo} name="sector" value={businessDetails.sector}
                                                            aria-label="Default select example"
                                                        >
                                                            <option value="">--SELECT SECTOR--</option>
                                                            <option value="App Development">App Development</option>
                                                            <option value="IT/Technologies">IT/Technologies</option>
                                                            <option value="AI">AI</option>
                                                            <option value="Web Development">Web Development</option>
                                                            <option value="Agriculture">Agriculture</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <select
                                                            className="form-select form-css" onChange={handleChangeBusinessInfo} name="stage" value={businessDetails.stage}
                                                            aria-label="Default select example"
                                                        >
                                                            <option value="">--SELECT STAGE--</option>
                                                            <option value="Idea Stage">Idea Stage</option>
                                                            <option value="Intermediate Stage">Intermediate Stage</option>
                                                            <option value="Final Stage">Final Stage</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="date" className="form-control form-css" placeholder="DD/MM/YY" onChange={handleChangeBusinessInfo} name="startup_date" value={businessDetails.startup_date} max={new Date().toISOString().split("T")[0]} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Tagline" onChange={handleChangeBusinessInfo} name="tagline" value={businessDetails.tagline} />
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <select
                                                            className="form-select form-css" onChange={handleChangeBusinessInfo} name="type" value={businessDetails.type}
                                                            aria-label="Default select example"
                                                        >
                                                            <option value="">--SELECT FUND TYPE--</option>
                                                            <option value="Dicounting Invoice">Dicounting Invoice</option>
                                                            <option value="CSOP">CSOP</option>
                                                            <option value="CCSP">CCSP</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part mt-2">
                                                        <textarea
                                                            rows={4}
                                                            maxLength={100}
                                                            placeholder="Enter details here"
                                                            className="form-control"
                                                            {...register("description", { value: true, required: true, onChange: handleChange })}
                                                            name="description" value={businessDetails.description}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-sm-2">
                                                    <div className="logo">
                                                        <img src={businessDetails.logo} alt="logo" className="logo" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="file" className="mt-4 pt-4" name="logo" onChange={handleFileChangeLogo} />
                                                </div>
                                            </div>

                                            <div className=" mt-5 d-flex align-content-center">
                              <input
                                className="form-check-input w-auto"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value="1"
                                {...register("cofounder", { value:true, })}
                                name="cofounder"  onChange={handleChange}   checked={businessDetails.cofounder === '1' ? true : false}
                              />
                              <p className="">
                                You come from an entrepreneurial family or have
                                been a founder/co-founder of a business venture
                                family
                              </p>
                            </div>
                            <div className=" mt-2 d-flex align-items-left">
                              <input
                                className="form-check-input w-auto"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value="1"
                                {...register("kyc_purposes", { value:true,required:true })}
                                name="kyc_purposes"  onChange={handleChange}  checked={businessDetails.kyc_purposes === '1'}
                              />
                              <p className="">
                                I certify that all the information provided by
                                me is accurate and I am willing to provide
                                evidence for the same for KYC purposes when
                                requested.
                              </p>
                            </div>

                                            <div className="row mt-3">
                                                <div className="col-md-12 text-center">
                                                    <button type="submit" className="btn btn-primary">
                                                        UPDATE
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Proof Documents:
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                    <div className="form-part">
                                        <h3>Proof Documents</h3>
                                        <form onSubmit={handleSubmit(submitBasicInfoForm)}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Pan Card Number" onChange={handleChangeBasic} name="pan_number" value={basicDetails.pan_number}  maxLength={10} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Adhaar Card Number" onChange={handleChangeBasic} name="uid" value={basicDetails.uid}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="date" className="form-control form-css" placeholder="DOB" onChange={handleChangeBasic} name="dob" value={basicDetails.dob}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <div className="profile-pic">
                                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + basicDetails.proof_img} alt="proof-img" className="proof-img" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <input type="file" className="mt-4 pt-4" name="proof-img" onChange={handleFileChangeProof} />
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-md-12 text-center">
                                                    <button type="submit" className="btn btn-primary">
                                                        UPDATE
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFour">
                                <button className="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                    Bank Information:
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                    <div className="form-part">
                                        <h3>Bank Information</h3>
                                        <form onSubmit={handleSubmit(submitBankInfoForm)}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Bank Name" onChange={handleChangeBank} name="bank_name" value={bankDetails.bank_name}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Account Holder" onChange={handleChangeBank} name="account_holder" value={bankDetails.account_holder}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Account Number" onChange={handleChangeBank} name="account_no" value={bankDetails.account_no}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-part">
                                                        <input type="text" className="form-control form-css" placeholder="Ifsc Code" onChange={handleChangeBank} name="ifsc_code" value={bankDetails.ifsc_code}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-md-12 text-center">
                                                    <button type="submit" className="btn btn-primary">
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
    )
}

export default Profile