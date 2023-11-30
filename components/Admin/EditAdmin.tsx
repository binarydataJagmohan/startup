import React, { useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getCountries } from '@/lib/frontendapi';
import { getAdminData } from '@/lib/adminapi';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { getToken, getCurrentUserData } from "@/lib/session";
import { set } from 'nprogress';

type Country = {
    name: string;
    country_code: string;
}
interface UserData {
    id?: string;
}
const EditAdmin = () => {

    const [countries, setcountries] = useState<Country[]>([]);
    const [selectedRole, setSelectedRole] = useState([]);
    // const [selectedGender setSelectedGender] = useState([]);
    const [current_user_id, setCurrentUserId] = useState("");
    const { register, handleSubmit, formState: { errors: any }, } = useForm();





    const router = useRouter();

    const [id, setId] = useState('');


    const [users, setUsers] = useState(
        { name: '', email: '', country: '', phone: '', city: '', status: '', role: '', linkedin_url: '', gender: '', profile_pic: '' });
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidFields, setInvalidFields] = useState<string[]>([]);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${users.profile_pic}`;
    const [startUpLogoError, setStartupLogoError] = useState('');
    const [startUpLogoSizeError, setStartupLogoSizeError] = useState('');
    const [startupLogoName, setStartupLogoName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAdminData();
            if (data) {

                setUsers(data.data);
                setId(data.data.id);


            }
        };

        fetchData();

    }, []);

    const updateAdmin = async (e: any) => {
        e.preventDefault();
        setMissingFields([]);
        setInvalidFields([]);

        if (!users.name) setMissingFields(prevFields => [...prevFields, "Name"]);

        if (!users.email) {
            setMissingFields(prevFields => [...prevFields, "Email"]);
        } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(users.email)) {
            setInvalidFields(prevFields => [...prevFields, "Email"]);
        }
        if (!users.linkedin_url) {
            setMissingFields(prevFields => [...prevFields, "linkedin_url"]);
        }
        //  else if (
        //     /^(https:\/\/)?(www\.)?linkedin\.com\/(in\/[a-zA-Z0-9_-]+|company\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+\/?)\/?$/i
        //         .test(users.linkedin_url)
        // ) {
        //     setInvalidFields(prevFields => [...prevFields, "linkedin_url"]);
        // }

        if (!users.country) setMissingFields(prevFields => [...prevFields, "Country"]);
        if (!users.phone) setMissingFields(prevFields => [...prevFields, "Phone"]);
        if (!users.gender) setMissingFields(prevFields => [...prevFields, "Gender"]);


        if (!users.status) setMissingFields(prevFields => [...prevFields, "Status"]);
        // if (!users.profile_pic) setMissingFields(prevFields => [...prevFields, "Profile Picture"]);
        if (!users.role) setMissingFields(prevFields => [...prevFields, "Role"]);
        if (!users.city) setMissingFields(prevFields => [...prevFields, "City"]);
        if (!users.profile_pic) setMissingFields(prevFields => [...prevFields, "Profile"]);

        if (missingFields.length > 0 || invalidFields.length > 0) {
            const errorMessage = `Please fill in the following fields: ${missingFields.join(", ")}`;
            setErrorMessage(errorMessage);
            return;
        }

        try {


            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/update-admin`,
                {
                    ['name']: users.name,
                    ['email']: users.email,
                    ['country']: users.country,
                    ['phone']: users.phone,
                    ['city']: users.city,
                    ['gender']: users.gender,
                    ['linkedin_url']: users.linkedin_url,
                    ['profile_pic']: users.profile_pic
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + getToken(),
                    }
                }
            );

            toast.success('Admin updated successfully');
            window.location.reload();
        } catch (error) {

            // toast.error('Please Try Again!');
        }
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

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');


        const fetchData = async () => {
            const data = await getCountries({});
            if (data) {
                setcountries(data.data);
            }
        };

        fetchData();

    }, []);
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        setMissingFields([]);
        setInvalidFields([]);


        let selectedCountry = countries.find((country) => country.name === value);
        let countryCode = selectedCountry ? selectedCountry.country_code : '';

        if (event.target.name === "profile_pic") {
            // Handle logo file input change
            const file = event.target.files && event.target.files[0];

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
                        setStartupLogoName(file.name);
                    } else {
                        setStartupLogoSizeError('* Please upload a file that is no larger than 2MB.');
                    }
                } else {
                    setStartupLogoError('* Please upload a JPG or PNG file');
                    event.target.value = null;
                }
            }

            setUsers((prevdata) => ({
                ...prevdata,
                profile_pic: file || prevdata.profile_pic,
            }));
        } else {
            // Handle other field changes
            setUsers((prevdata) => ({
                ...prevdata,
                [event.target.name]: event.target.value,
            }));
        }
    };

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

        setUsers((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
                id: id,
                country_code: countryCode ? `${countryCode}` : " ",
            };
        });
    }
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
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/all-users"}>Admin</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Form
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className='card'>
                                    <div className="card-header text-white bg-dark" id="title">
                                        <h3 className="card-title" >Form</h3>
                                    </div>
                                    <div className='card-body'>
                                        <form onSubmit={updateAdmin} className="needs-validation mb-4">

                                            <div className="row g-3 mt-1">

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Name{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={users.name} placeholder="Enter Your Name" />
                                                    {missingFields.includes("Name") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please fill in the Name field.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email Address{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        placeholder="Email"
                                                        className="form-control"
                                                        value={users.email}
                                                        name="email"
                                                        onChange={handleChange}

                                                    />
                                                    <div className="help-block with-errors" />
                                                    {missingFields.includes("Email") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please fill in the Email field.
                                                        </p>
                                                    )}
                                                    {invalidFields.includes("Email") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please enter a valid email address.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <PhoneInput
                                                        onClick={phonClick}
                                                        country={"us"}
                                                        value={users.phone}
                                                        onChange={(value) => setUsers((prevState) => ({ ...prevState, phone: value }))}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">LinkedIn Url
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>

                                                    <input type="text" className="form-control" id="linkedin_url" value={users.linkedin_url} name="linkedin_url" placeholder="Enter Your LinkedIn profile" />
                                                    {invalidFields.includes("linkedin_url") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please enter a valid linkedin_url address.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">City{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>

                                                    <input type="text" onChange={handleChange} className="form-control" id="city" name="city" value={users.city} placeholder="Enter Your City" />
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label ">Country
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select className="form-select"
                                                        onChange={handleChange}
                                                        name="country" value={users.country}
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="" >--SELECT COUNTRY--</option>

                                                        {countries.map((country, index) => (
                                                            <option
                                                                key={index}
                                                                value={country.name}
                                                            >
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label mt-4">Gender{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        onChange={handleChange}
                                                        name="gender" value={users.gender}
                                                        aria-label="Default select example"
                                                    >
                                                        {
                                                            users.gender && (
                                                                <option value={users.gender}>{users.gender.charAt(0).toUpperCase() + users.gender.slice(1).toLowerCase()}</option>
                                                            )
                                                        }

                                                        {users.gender !== 'male' && <option value="male">Male</option>}
                                                        {users.gender !== 'female' && <option value="female">Female</option>}
                                                        {users.gender !== 'other' && <option value="other">Other</option>}

                                                    </select>
                                                </div>





                                                <div className="col-md-6">
                                                    <div id="divHabilitSelectors" className="input-file-container">
                                                        <div className="row">
                                                            <div className="col-md-4 mt-4">
                                                                <div
                                                                    id="divHabilitSelectors"
                                                                    className="input-file-container"
                                                                >
                                                                    <label
                                                                        htmlFor="logo"
                                                                        className="form-label"
                                                                    >
                                                                        Profile Image
                                                                        <span style={{ color: "red" }}>*</span>
                                                                    </label>
                                                                    <div className="profile-pic">
                                                                        {previewImage ? (
                                                                            <Image src={typeof previewImage === 'string' ? previewImage : ''}
                                                                                width={300}
                                                                                height={200}
                                                                                alt=''
                                                                                className='profile-pic'
                                                                                style={{ margin: '5% 0%', objectFit: 'cover' }} />
                                                                        ) : (
                                                                            <Image
                                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/' + users.profile_pic}
                                                                                alt="Document Image"
                                                                                className='profile-pic'
                                                                                style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                                width={9020}
                                                                                height={9020}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8 mt-4">
                                                                <div
                                                                    id="divHabilitSelectors"
                                                                    className="input-file-container"
                                                                >
                                                                    <div className="file-upload mt-5">
                                                                        <div className="file-select">
                                                                            <div
                                                                                className="file-select-button"
                                                                                id="fileName"
                                                                            >
                                                                                Choose File
                                                                            </div>
                                                                            <div className="file-select-name" id="noFile">
                                                                                {startupLogoName ? startupLogoName : (users.profile_pic ? users.profile_pic.substring(0, 20) + '.....' : "No File Chosen ...")}
                                                                            </div>
                                                                            <input
                                                                                className="input-file"
                                                                                id="logo"
                                                                                accept='.jpg, .jpeg, .png'
                                                                                type="file" name="profile_pic"
                                                                                onChange={handleChange}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <label
                                                                        htmlFor="fileupload"
                                                                        className="input-file-trigger mt-1"
                                                                        id="labelFU"
                                                                        style={{ fontSize: "12px", marginLeft: "12px" }}
                                                                        tabIndex={0}
                                                                    >
                                                                        <p>You can upload any logo's image jpg,png,jpeg file only (max size 2 MB)<span style={{ color: "red" }}>*</span></p>
                                                                    </label>
                                                                    {startUpLogoSizeError ? (
                                                                        <p className='text-danger'>{startUpLogoSizeError}</p>
                                                                    ) : (
                                                                        startUpLogoError && <p className='text-danger'>{startUpLogoError}</p>
                                                                    )}
                                                                </div>
                                                                {startUpLogoSizeError ? (
                                                                    <p className='text-danger'>{startUpLogoSizeError}</p>
                                                                ) : (
                                                                    startUpLogoError && <p className='text-danger'>{startUpLogoError}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                            <div className="row mt-5">
                                                <div
                                                    className="col-md-12"
                                                    style={{ textAlign: "center" }}
                                                >
                                                    <button type="submit" className="btnclasssmae">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                    </div>{" "}{/* container-fluid */}
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        </>
    )
}

export default EditAdmin;