import React, { useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getSingleUserData, getCountries, sendNotification } from '@/lib/frontendapi';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from 'next/link';
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
const EditUser = () => {

    const [countries, setcountries] = useState<Country[]>([]);
    // const [selectedGender setSelectedGender] = useState([]);
    const [current_user_id, setCurrentUserId] = useState("");   
    const router = useRouter();

    const { id } = router.query;


    const [users, setUsers] = useState(
        { name: '', email: '', country: '', phone: '', city: '', status: '', role: '', linkedin_url: 'fsd', gender: '' });   
    const [missingFields, setMissingFields] = useState<string[]>([]);




    useEffect(() => {
        const fetchData = async (id: any) => {
            //    console.log("id for userdatafetch"+id);
            const data = await getSingleUserData(id);
            if (data) {
                setUsers(data.data);
            }
        };
        if (router.query.id) {
            fetchData(router.query.id);
        }
    }, [router.query.id]);

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
   
    return (
        <>
            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">Edit Users</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/all-users"}>All Users</Link>
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
                                    <div className="card-header text-white bg-dark" id="title">
                                        <h3 className="card-title" >Form</h3>
                                    </div>
                                    <div className='card-body'>
                                        <form className="needs-validation mb-4">

                                            <div className="row g-3 mt-1">

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Name{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="text" className="form-control " id="name" name="name" readOnly value={users.name} placeholder="Enter Your Name" />
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
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <PhoneInput
                                                        disabled
                                                        country={"us"}
                                                        value={users.phone}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">LinkedIn Url
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>

                                                    <input type="text" className="form-control" id="linkedin_url" readOnly value={users.linkedin_url} name="linkedin_url" placeholder="Enter Your LinkedIn profile" />
                                                </div>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-6 mt-4">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">City{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>

                                                    <input type="text" readOnly className="form-control" id="city" name="city" value={users.city} placeholder="Enter Your City" />

                                                </div>

                                                <div className="col-md-6 mt-4">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label ">Country
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="text" readOnly className="form-control" id="Country" name="Country" value={users.country} placeholder="Enter Your Country" />
                                                </div>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-6 mt-5">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Gender{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input type="text" readOnly className="form-control" id="gender" name="gender" value={users.gender} placeholder="Enter Your City" />
                                                </div>

                                                <div className="col-md-6 mt-5">
                                                    <div className='row'>
                                                        <div className='col-sm-6'>
                                                            <label htmlFor="exampleFormControlInput1" className="form-label">Role{" "}
                                                                <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <input type="text" readOnly className="form-control" id="role" name="role" value={users.role} placeholder="Enter Your Role" />
                                                        </div>
                                                        <div className='col-sm-6'>
                                                            <label htmlFor="exampleFormControlInput1" className="form-label">Status{" "}
                                                                <span style={{ color: "red" }}>*</span>
                                                                <input type="text" readOnly className="form-control mt-2" id="status" name="status" value={users.status} placeholder="Enter Your status" />
                                                            </label>
                                                        </div>
                                                    </div>
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

export default EditUser;