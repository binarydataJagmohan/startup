import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentUserData } from '@/lib/session';
import { getSingleUserData, getCountries, getBusinessInformation, businessInfoSave, getBasicInformation, basicInformationSave, getBankInformation, bankInformationSave } from '@/lib/frontendapi';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import { InvestorPersonalInfoUpdate } from '../../lib/investorapi';
import businessinfo from '@/pages/steps/customizereview';
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
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [current_user_id, setCurrentUserId] = useState("");
    const [profile_pic, setProfilePic] = useState(null);
    const [profilePicError, setProfilePicError] = useState('');
    const [profilePicName, setProfilePicName] = useState('');
    const [profilePicSizeError, setProfilePicSizeError] = useState('');
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const [logoError, setLogoError] = useState('');
    const [logoName, setLogoName] = useState('');
    const [logoSizeError, setLogoSizeError] = useState('');
    const [previewLogoImage, setPreviewLogoImage] = useState<string | ArrayBuffer | null>(null);
    const [proofImgError, setProofImgError] = useState('');
    const [proofImgName, setProofImgName] = useState('');
    const [proofImgSizeError, setProofImgSizeError] = useState('');
    const [priviewProofImage, setPriviewProofImage] = useState<string | ArrayBuffer | null>(null);
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
        user_id: current_user_id,
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
        const file = event.target.files[0];
        if (file) {

            const allowedTypes = ["image/jpeg", "image/png"];
            const maxSize = 2 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setProfilePic(event.target.files[0]);
                    setProfilePicName(file.name);
                } else {
                    setProfilePicSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setProfilePicError('* Please upload a JPG or PNG file');
                event.target.value = null;
            }
        }
    };

    const handleFileChangeLogo = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png"];
            const maxSize = 2 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPreviewLogoImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setLogo(event.target.files[0]);
                    setLogoName(file.name);
                } else {
                    setLogoSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setLogoError('* Please upload a JPG or PNG file');
                event.target.value = null;
            }
        }
    };

    const handleFileChangeProof = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const maxSize = 20 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPriviewProofImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setProofImg(event.target.files[0]);
                    setProofImgName(file.name);
                } else {
                    setProofImgSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setProofImgError('* Please upload a PDF, PPT, or DOC file');
                event.target.value = null;
            }
        }
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
                    setProofImgName(res.data.proof_img);
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
                    setBankDetails(res.data);
                    // console.log(res.data);
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

    const submitPersonalInfoForm = async (e: any) => {
        e.preventDefault();
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
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast.error(res.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        }
        catch (err: any) {
            const errorFields = ["name", "linkedin_url", "phone", "country", "city", "gender"];
            if (err.response.data.errors) {
                errorFields.forEach((field) => {
                    if (err.response.data.errors[field]) {
                        toast.error(err.response.data.errors[field][0], {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        }
    };

    // Update Business Information...
    const submitBusinessInfoForm = async (event: any) => {
        event.preventDefault();
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
            const res = await businessInfoSave(formData);

            if (res.status === true) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast.error(res.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        } catch (err: any) {
            const errorFields = ["business_name", "reg_businessname", "website_url", "sector", "stage", "startup_date","description"];
            if (err.response.data.errors) {
                errorFields.forEach((field) => {
                    if (err.response.data.errors[field]) {
                        toast.error(err.response.data.errors[field][0], {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        }
    };

    const submitBasicInfoForm = async (event: any) => {
        event.preventDefault();
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
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        } catch (err: any) {
            const errorFields = ["pan_number", "uid", "dob"];
            if (err.response.data.errors) {
                errorFields.forEach((field) => {
                    if (err.response.data.errors[field]) {
                        toast.error(err.response.data.errors[field][0], {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        }
    };

    //Update for Adhar Information 
    const submitBankInfoForm = async (event: any) => {
        event.preventDefault();
        try {
            const res = await bankInformationSave(bankDetails);
            if (res.status == true) {
                toast.success("Profile has been updated successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });              
            } else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        } catch (err: any) {
            const errorFields = ["bank_name", "account_holder", "account_no","ifsc_code"];
            if (err.response.data.errors) {
                errorFields.forEach((field) => {
                    if (err.response.data.errors[field]) {
                        toast.error(err.response.data.errors[field][0], {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        }
    };

    // Validation for comapny url
    register('website_url', {
        required: 'Company website url is required',
        pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
            message: 'Enter a valid website',
        },
    });
    return (
        <>
            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">Startup</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/company/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Profile
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <section className="form-faq">
                            <div className="container">
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
                                                    <form onSubmit={submitPersonalInfoForm}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-part">
                                                                    <label
                                                                        htmlFor="exampleFormControlInput1"
                                                                        className="form-label"
                                                                    >
                                                                        Name{" "}
                                                                        <span style={{ color: "red" }}>*</span>
                                                                    </label>
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
                                                                    <label
                                                                        htmlFor="exampleFormControlInput1"
                                                                        className="form-label"
                                                                    >
                                                                        Email ID{" "}
                                                                        <span style={{ color: "red" }}>*</span>
                                                                    </label>
                                                                    <input type="email" className="form-control form-css" placeholder="Email" {...register("email", {
                                                                        // onChange: handleChange,
                                                                        required: true,
                                                                        value: true,
                                                                    })} onChange={handleChange} name="email" value={user.email} readOnly />
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
                                                                    <label
                                                                        htmlFor="exampleFormControlInput1"
                                                                        className="form-label"
                                                                    >
                                                                        Linkedin URL{" "}
                                                                        <span style={{ color: "red" }}>*</span>
                                                                    </label>
                                                                    <input type="text" className="form-control form-css" placeholder="www.linkedin.com" onChange={handleChange} name="linkedin_url" value={user.linkedin_url} />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Phone Number{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
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
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Country of Citizenship{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
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
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Which city do you live in?{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="City" onChange={handleChange} name="city" value={user.city} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-5">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Gender{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
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
                                                            {/* <div className="col-sm-2 ">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Profile{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="profile-pic">
                                                                    {previewImage ? (
                                                                        <Image
                                                                            src={typeof previewImage === 'string' ? previewImage : ''}
                                                                            width={300}
                                                                            height={200}
                                                                            alt=''
                                                                            className='profile-pic'
                                                                            style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                        />
                                                                    ) : (
                                                                        user.profile_pic ? (
                                                                            <Image
                                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/' + user.profile_pic}
                                                                                className="profile-pic"
                                                                                alt="preview"
                                                                                width={100}
                                                                                height={100}
                                                                            />
                                                                        ) : (
                                                                            <Image
                                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/profile.webp'}
                                                                                alt="business-logo"
                                                                                width={100}
                                                                                height={100}
                                                                            />
                                                                        )
                                                                    )}

                                                                </div>
                                                            </div> */}
                                                            <div className="col-sm-6 ">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Profile{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div
                                                                    id="divHabilitSelectors"
                                                                    className="input-file-container "
                                                                >
                                                                    <div className="file-upload mt-3">
                                                                        <div className="file-select">
                                                                            <div
                                                                                className="file-select-button"
                                                                                id="fileName"
                                                                            >
                                                                                Choose File
                                                                            </div>
                                                                            <div className="file-select-name" id="noFile">
                                                                                {profilePicName ? profilePicName : (user.profile_pic ? user.profile_pic : "No File Chosen ...")}
                                                                            </div>
                                                                            <input
                                                                                // ref={fileInputRef}
                                                                                id="proof_img"
                                                                                type="file"
                                                                                accept='.jpg, .jpeg, .png'
                                                                                name="profile_pic"
                                                                                onChange={handleFileChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {profilePicSizeError ? (
                                                                    <p className='text-danger'>{profilePicSizeError}</p>
                                                                ) : (
                                                                    profilePicError && <p className='text-danger'>{profilePicError}</p>
                                                                )}
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
                                                    <form onSubmit={submitBusinessInfoForm}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Name of Startup {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Business Name" {...register("business_name", { value: true, required: true, })} onChange={handleChangeBusinessInfo} name="business_name" value={businessDetails.business_name} />
                                                                    {errors.business_name &&
                                                                        errors.business_name.type === "required" && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Enter Company Name.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Registered name of Startup {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Registered Business Name"  {...register("reg_businessname", { onChange: handleChangeBusinessInfo, value: true, required: true, })} name="reg_businessname" value={businessDetails.reg_businessname} />
                                                                    {errors.reg_businessname &&
                                                                        errors.reg_businessname.type === "required" && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Enter  Registered Company Name.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Website URL {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Website URL"  {...register("website_url", { onChange: handleChangeBusinessInfo })} name="website_url" value={businessDetails.website_url} />
                                                                    {errors.website_url && (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                                        >
                                                                            *Please Enter Comapny's Website Url.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Sector of Startup{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <select
                                                                        className="form-select form-css"  {...register("sector", { validate: (value) => value != "", required: true, onChange: handleChangeBusinessInfo })} name="sector" value={businessDetails.sector}
                                                                        aria-label="Default select example"
                                                                    >
                                                                        <option value="">--SELECT SECTOR--</option>
                                                                        <option value="E-commerce">E-commerce</option>
                                                                        <option value="Food & Restaurents Startups">Food  & Restaurents Startups</option>
                                                                        <option value="App Development">App Development</option>
                                                                        <option value="IT/Technologies">IT/Technologies</option>
                                                                        <option value="AI and Machine Learning">AI and Machine Learning</option>
                                                                        <option value="Web Development">Web Development</option>
                                                                        <option value="FinTech (Financial Technology)">FinTech (Financial Technology)</option>
                                                                        <option value="HealthTech (Healthcare Technology)">HealthTech (Healthcare Technology)</option>
                                                                        <option value="EdTech (Education Technology)">EdTech (Education Technology)</option>
                                                                        <option value="Real Estate & PropTech (Property Technology)">Real Estate & PropTech (Property Technology)</option>
                                                                        <option value="Agriculture Startups">Agriculture Startups</option>
                                                                        <option value="RetailTech (Retail Technology)">RetailTech (Retail Technology)</option>
                                                                        <option value="CleanTech (Clean Technology)">CleanTech (Clean Technology)</option>
                                                                        <option value="SaaS (Software as a Service)">SaaS (Software as a Service)</option>
                                                                        <option value="Travel & Transportation and Mobility">Travel & Transportation and Mobility</option>
                                                                    </select>
                                                                    {errors.sector &&
                                                                        errors.sector.type === "required" && !businessDetails.sector && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Select Sector of Your Business.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Stage of Startup{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <select
                                                                        className="form-select form-css"  {...register("stage", { validate: (value) => value != "", required: true, onChange: handleChangeBusinessInfo })} name="stage" value={businessDetails.stage}
                                                                        aria-label="Default select example"
                                                                    >
                                                                        <option value="">--SELECT STAGE--</option>
                                                                        <option value="Idea Stage">Idea Stage</option>
                                                                        <option value="Validation Stage">Validation Stage</option>
                                                                        <option value="Development Stage">Development Stage</option>
                                                                        <option value="Launch Stage">Launch Stage</option>
                                                                        <option value="Growth Stage">Growth Stage</option>
                                                                        <option value="Expansion Stage">Expansion Stage</option>
                                                                        <option value="Maturity Stage">Maturity Stage</option>
                                                                    </select>
                                                                    {errors.stage &&
                                                                        errors.stage.type === "required" && !businessDetails.stage && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Select Stage of Your Business.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Month & year of inception{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="date" className="form-control form-css" placeholder="DD/MM/YY" {...register("startup_date", { value: true, required: true, onChange: handleChangeBusinessInfo })} name="startup_date" value={businessDetails.startup_date} max={new Date().toISOString().split("T")[0]} />
                                                                    {errors.startup_date &&
                                                                        errors.startup_date.type === "required" && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Enter Your Business of Inception.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Tagline
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Tagline" {...register("tagline", { value: true, onChange: handleChangeBusinessInfo })} name="tagline" value={businessDetails.tagline ? businessDetails.tagline : ''} />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Startup Logo{" "}                                                                    
                                                                </label>
                                                                <div
                                                                    id="divHabilitSelectors"
                                                                    className="input-file-container "
                                                                >
                                                                    <div className="file-upload mt-3">
                                                                        <div className="file-select">
                                                                            <div
                                                                                className="file-select-button"
                                                                                id="fileName"
                                                                            >
                                                                                Choose File
                                                                            </div>
                                                                            <div className="file-select-name" id="noFile">
                                                                                {logoName ? logoName : (businessDetails.logo ? businessDetails.logo : "No File Chosen ...")}
                                                                            </div>
                                                                            <input
                                                                                // ref={fileInputRef}
                                                                                id="proof_img"
                                                                                type="file"
                                                                                {...register("logo", { value: true, required: !businessDetails.logo })} name="logo" onChange={handleFileChangeLogo} accept='.jpg, .jpeg, .png'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {logoSizeError ? (
                                                                    <p className='text-danger'>{logoSizeError}</p>
                                                                ) : (
                                                                    logoError && <p className='text-danger'>{logoError}</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    1000 characters to tell us about your business{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part mt-2">
                                                                    <textarea
                                                                        rows={4}
                                                                        maxLength={1000}
                                                                        placeholder="Enter details here"
                                                                        className="form-control"
                                                                        {...register("description", { value: true, required: true, onChange: handleChangeBusinessInfo })}
                                                                        name="description" value={businessDetails.description}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* <div className="col-sm-2">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Startup Logo
                                                                </label>
                                                                <div className="logo">
                                                                    {previewLogoImage ? (
                                                                        <Image
                                                                            src={typeof previewLogoImage === 'string' ? previewLogoImage : ''}
                                                                            width={300}
                                                                            height={200}
                                                                            alt=''
                                                                            className='profile-pic'
                                                                            style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                        />
                                                                    ) : (
                                                                        businessDetails.logo ? (
                                                                            <Image
                                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/docs/' + businessDetails.logo} className="profile-pic" alt="preview"
                                                                                width={100}
                                                                                height={100}
                                                                            />
                                                                        ) : (
                                                                            <Image
                                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/profile.webp'}
                                                                                alt="business-logo"
                                                                                width={100}
                                                                                height={100}
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div> */}

                                                        </div>
                                                      
                                                        <div className="mt-2 d-flex align-items-left">
                                                            <input
                                                                className="w-auto"
                                                                type="checkbox"
                                                                id="checkboxNoLabel"                                                                
                                                                value="1" style={{ marginLeft: "1px", marginBottom: "auto" }}
                                                                {...register("kyc_purposes", { value: true, required: true })}
                                                                name="kyc_purposes" checked={businessDetails.kyc_purposes === '1'}
                                                            />
                                                            <p className="mt-2 mx-3">
                                                                I certify that all the information provided by
                                                                me is accurate and I am willing to provide
                                                                evidence for the same for KYC purposes when
                                                                requested.
                                                            </p>
                                                        </div>

                                                        {errors.kyc_purposes &&
                                                            errors.kyc_purposes.type === "required" && (
                                                                <p
                                                                    className="text-danger"
                                                                    style={{ textAlign: "left", fontSize: "12px" }}
                                                                >
                                                                    *Please certify the kyc information.
                                                                </p>
                                                            )}

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
                                                    <form onSubmit={submitBasicInfoForm}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Pan Card Number{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Pan Card Number"  {...register("pan_number", { value: true, required: true, })} onChange={handleChangeBasic} name="pan_number" value={basicDetails.pan_number} maxLength={10} />
                                                                    {errors.pan_number &&
                                                                        errors.pan_number.type === "required" && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Enter Pan Card Number.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Adhaar Card Number{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Adhaar Card Number" {...register("uid", { value: true, required: true })} onChange={handleChangeBasic} name="uid" value={basicDetails.uid} />
                                                                    {errors.uid && (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                                        >
                                                                            *Please Enter Adhaar Card Number.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    DOB {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="date" className="form-control form-css" placeholder="DOB" {...register("dob", { value: true, required: true, })} onChange={handleChangeBasic} name="dob" value={basicDetails.dob} min={`${new Date().getMonth() - 18}-01-01`} max={`${new Date().getFullYear() - 18}-12-31`} />
                                                                    {errors.dob && errors.dob.type === "required" && (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                                        >
                                                                            *Please Enter Your Date Of Birth.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-sm-2">
                                                                <div className="profile-pic">
                                                                    {priviewProofImage && typeof priviewProofImage === 'string' && priviewProofImage.endsWith('.pdf') ? (
                                                                        <embed
                                                                            src={priviewProofImage}
                                                                            width="100%"
                                                                            height="600px"
                                                                            type="application/pdf"
                                                                        />
                                                                    ) : (
                                                                        basicDetails.proof_img ? (
                                                                            <Image
                                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/profile.webp'}
                                                                                alt="proof-img"
                                                                                className="proof-img"
                                                                                width={120}
                                                                                height={120}
                                                                            />
                                                                        ) : (
                                                                            <Image
                                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/profile.webp'}
                                                                                alt="business-logo"
                                                                                width={100}
                                                                                height={100}
                                                                            />
                                                                        )
                                                                    )}

                                                                </div>
                                                            </div> */}
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Identity card{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div
                                                                    id="divHabilitSelectors"
                                                                    className="input-file-container "
                                                                 >
                                                                    <div className="file-upload mt-3">
                                                                        <div className="file-select">
                                                                            <div
                                                                                className="file-select-button"
                                                                                id="fileName"
                                                                            >
                                                                                Choose File
                                                                            </div>


                                                                            <div className="file-select-name" id="noFile">
                                                                                {proofImgName ? proofImgName : (basicDetails.proof_img ? basicDetails.proof_img : "No File Chosen ...")}
                                                                            </div>

                                                                            <input
                                                                                id="proof_img"
                                                                                type="file"
                                                                                name="proof-img" accept='.pdf, .docx, .ppt' onChange={handleFileChangeProof}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {proofImgSizeError ? (
                                                                    <p className='text-danger'>{proofImgSizeError}</p>
                                                                ) : (
                                                                    proofImgError && <p className='text-danger'>{proofImgError}</p>
                                                                )}
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
                                                    <form onSubmit={submitBankInfoForm}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Bank Name {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Bank Name" {...register("bank_name", { value: true, required: true, })} onChange={handleChangeBank} name="bank_name" value={bankDetails.bank_name} />
                                                                    {errors.bank_name &&
                                                                        errors.bank_name.type === "required" && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Enter Your Bank Name.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Account Holder's Name {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Account Holder" {...register("account_holder", { value: true, required: true, })} onChange={handleChangeBank} name="account_holder" value={bankDetails.account_holder} />
                                                                    {errors.account_holder &&
                                                                        errors.account_holder.type === "required" && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Enter Your Account Holder Name.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Account Number  {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Account Number" {...register("account_no", { value: true, required: true, })} onChange={handleChangeBank} name="account_no" value={bankDetails.account_no} />
                                                                    {errors.account_no &&
                                                                        errors.account_no.type === "required" && (
                                                                            <p
                                                                                className="text-danger"
                                                                                style={{ textAlign: "left", fontSize: "12px" }}
                                                                            >
                                                                                *Please Enter Your Account Number.
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    IFSC Code {" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="form-part">
                                                                    <input type="text" className="form-control form-css" placeholder="Ifsc Code" {...register("ifsc_code", { value: true, required: true, max: 11 })} onChange={handleChangeBank} name="ifsc_code" value={bankDetails.ifsc_code} />
                                                                    {errors.ifsc_code && (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                                        >
                                                                            *Please Enter Your valid IFSC Code.
                                                                        </p>
                                                                    )}
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
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ToastContainer autoClose={2000} />
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile