import React, { useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getSingleUserData, getCountries } from '@/lib/frontendapi';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
type Country = {
    name: string;
    country_code: string;
}
const EditUser = () => {
    const [user, setUser] = useState([]);
    const [countries, setcountries] = useState<Country[]>([]);
    const [selectedRole, setSelectedRole] = useState([]);
    // const [selectedGender setSelectedGender] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        getSingleUserData(id)
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

        const fetchData = async () => {
            const data = await getCountries({});
            if (data) {
                setcountries(data.data);
            }
        };

        fetchData();

    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        setUser((prevState) => {
            return {
                ...prevState,
                [name]: value,
                id: id,
                country_code: countryCode ? `${countryCode}` : " ",
            };
        });

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

        setUser((prevState: any) => {
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
                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/all-users"}>All Users</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            User Edit Form
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className='card'>
                                    <div className="card-header text-white" id="title">
                                        <h3 className="card-title" >Form</h3>
                                    </div>
                                    <div className='card-body'>
                                        <form className="needs-validation mb-4">

                                            <div className="row g-3 mt-1">

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Name{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="text" className="form-control" id="name" name="name" value={user.name} placeholder="Enter Your Name" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email Address{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="email" className="form-control" id="email"  {...register("email", {
                                                       onChange:handleChange,required: "Email is required", 
                                                       pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                                    })}
                                                        name="email" value={user.email} placeholder="Enter Your Email Address" />
                                                    {errors.email && (
                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            <span>{errors.email.message}</span>
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
                                                        value={user.phone}
                                                        onChange={(value) => setUser((prevState) => ({ ...prevState, phone: value }))}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">LinkedIn Url
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="text" className="form-control" id="linkedin_url" value={user.linkedin_url} name="linkedin_url" placeholder="Enter Your LinkedIn profile" />
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">City{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="text" className="form-control" id="city" name="city" value={user.city} placeholder="Enter Your City" />
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label mb-4">Country
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select className="form-select form-select-lg mb-3 css-1492t68"
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
                                                </div>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label mb-4">Gender{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg css-1492t68"
                                                        name="gender" value={user.gender}
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="">--SELECT GENDER--</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label mb-4">Role{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select className="form-select w-lg form-select-lg css-1492t68" value={user.role}>
                                                        <option value="">--SELECT ROLE--</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="startup">Startup</option>
                                                        <option value="investor">Investor</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                {/* <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">DoB{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="date" className="form-control" id="dob" name="dob" placeholder="Enter Your Dob" />
                                                </div> */}

                                                <div className="col-md-12">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label mb-4">Status{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select className="form-select form-select-lg css-1492t68 " value={user.status}
                                                        name="status"
                                                        aria-label="Default select example">
                                                        <option value="">--SELECT STATUS--</option>
                                                        <option value="active">Active</option>
                                                        <option value="deactive">Deactivate</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row mt-5">
                                                <div
                                                    className="col-md-12"
                                                    style={{ textAlign: "center" }}
                                                >
                                                    <button type="submit" className="btn btn-primary">
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

export default EditUser