import React, { useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getCountries } from '@/lib/frontendapi';
import { getAdminData } from '@/lib/adminapi';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useRouter } from 'next/router';

import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { getToken, getCurrentUserData } from "../../lib/session";

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
    //   console.log("this is id "+id);

    const [users, setUsers] = useState(
        { name: '', email: '', country: '', phone: '', city: '', status: '', role: '', linkedin_url: '', gender: '', profile_pic: '' });
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidFields, setInvalidFields] = useState<string[]>([]);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${users.profile_pic}`;



    useEffect(() => {
        const fetchData = async () => {
            const data = await getAdminData();
            if (data) {
                console.log(data.data);
                setUsers(data.data);
                setId(data.data.id);
                console.log(data.data.profile_pic);

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
        } else if (!/^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/(in|company)\/[\w-]+$/i.test(users.linkedin_url)) {
            setInvalidFields(prevFields => [...prevFields, "linkedin_url"]);
        }
        if (!users.country) setMissingFields(prevFields => [...prevFields, "Country"]);
        if (!users.phone) setMissingFields(prevFields => [...prevFields, "Phone"]);
        if (!users.gender) setMissingFields(prevFields => [...prevFields, "Gender"]);


        if (!users.status) setMissingFields(prevFields => [...prevFields, "Status"]);
        // if (!users.profile_pic) setMissingFields(prevFields => [...prevFields, "Profile Picture"]);
        if (!users.role) setMissingFields(prevFields => [...prevFields, "Role"]);
        if (!users.city) setMissingFields(prevFields => [...prevFields, "City"]);
        if (!users.profile_pic) setMissingFields(prevFields => [...prevFields, "Profile"]);

        if (missingFields.length > 0) {
            const errorMessage = `Please fill in the following fields: ${missingFields.join(", ")}`;
            setErrorMessage(errorMessage);
            return;
        }

        try {
            // console.log("this is updated" + id);
            // console.log(users);

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
                        'Content-Type': 'multipart/form-data' // Set the appropriate content type for file uploads
                    }
                }
            );
            // console.log(response.data);
            toast.success('Admin updated successfully');
        } catch (error) {
            console.error(error);
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
            console.log(file)
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
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
                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"}>Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/all-users"}>Admin</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Admin Edit Form
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
                                                    {missingFields.includes("Phone") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please fill in the Phone field.
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">LinkedIn Url
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>

                                                    <input type="text" className="form-control" id="linkedin_url" onChange={handleChange} value={users.linkedin_url} name="linkedin_url" placeholder="Enter Your LinkedIn profile" />
                                                    {missingFields.includes("linkedin_url") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please fill in the linkedin_url field.
                                                        </p>
                                                    )}
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
                                                    {missingFields.includes("City") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please fill in the City field.
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label mb-4">Country
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select className="form-select form-select-lg mb-3 css-1492t68"
                                                        onChange={handleChange}
                                                        name="country" value={users.country}
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="" >--SELECT COUNTRY--</option>

                                                        {countries.map((country, index) => (
                                                            <option
                                                                key={index}
                                                                value={country.name}
                                                            // selected={users.country === country.name}
                                                            >
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {missingFields.includes("Country") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please fill in the Country field.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label mb-4">Gender{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg css-1492t68"
                                                        onChange={handleChange}
                                                        name="gender" value={users.gender}
                                                        aria-label="Default select example"
                                                    >
                                                        <option value={users.gender}>{users.gender.charAt(0).toUpperCase() + users.gender.slice(1).toLowerCase()}</option>
                                                        {users.gender !== 'male' && <option value="male">Male</option>}
                                                        {users.gender !== 'female' && <option value="female">Female</option>}
                                                        {users.gender !== 'other' && <option value="other">Other</option>}

                                                    </select>
                                                    {missingFields.includes("Gender") && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            Please fill in the Gender field.
                                                        </p>
                                                    )}
                                                </div>





                                                <div className="col-md-6">
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
                                                                <Image
                                                                    src={typeof previewImage === 'string' ? previewImage : ''}
                                                                    alt="profile"
                                                                    width={300}
                                                                    height={200}
                                                                    style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/profile/' + users.profile_pic}
                                                                    alt="Document Image"
                                                                    style={{ width: '100%', height: 'auto', margin: '5% 0%', objectFit: 'cover' }}
                                                                />
                                                            )}
                                                        </div>

                                                        {/* <div className="profile-pic">
                                                            {previewImage ? (
                                                                <Image src={previewImage} alt="profile" width={300} height={200} style={{   margin:' 5% 0% ', objectFit: 'cover' }}/>
                                                            ) : (
                                                                <img src ={process.env.NEXT_PUBLIC_IMAGE_URL+ "images/profile/"+users.profile_pic} alt="Document Image"  style={{ width: '100%', height: 'auto',  margin:' 5% 0% ', objectFit: 'cover' }} />
                                                            )}
                                                        </div> */}
                                                        <input
                                                            className="input-file"
                                                            id="logo"
                                                            type="file" name="profile_pic" onChange={handleChange}

                                                        />

                                                        <label
                                                            htmlFor="fileupload"
                                                            className="input-file-trigger"
                                                            id="labelFU"
                                                            tabIndex={0}
                                                        >

                                                        </label>
                                                        {missingFields.includes("Profile") && (
                                                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                                Please choose the profile.
                                                            </p>
                                                        )}

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