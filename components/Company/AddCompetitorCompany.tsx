import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


import {
    getAllCCSPCampaign,
    AdminAddCometitorCompany,
    AdminUpdateCometitorCompany,
    getAdminCompanydata,
} from "@/lib/adminapi";

const TextEditor = dynamic(() => import("../Admin/TextEditor"), {
    ssr: false,
});



// export default function AddCompetitorCompany() {
const AddCompetitorCompany = () => {

    const [CompanyName, setCompanyName] = useState("");
    const [CompanyDesc, setCompanyDesc] = useState("");
    const [CompanyLogo, setCompanyLogo]: any = useState("");
    const [CompanyLogo1, setCompanyLogo1]: any = useState("");
    const [companydata, setAllCompanydata] = useState([]);
    const [competitorId, setCompetitorId]: any = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const [ccspid, setCCSPId]: any = useState<string | null>(null);
    const [startUpLogoError, setStartupLogoError] = useState('');
    const [fundImageName, setFundImageName] = useState('');
    const [fundImageNameError, setFundImageNameError] = useState('');
    const router = useRouter();
    const { id } = router.query;


    const clearmemberInputData = () => {
        setCompanyLogo1("");
        setCompanyLogo("");
        setPreviewImage("");
        setCompanyName("");
        setCompanyDesc("");
        setFundImageName("");
    };


    useEffect(() => {
        getAllCCSPCampaign().then((res) => {

            if (res.status === true && res.data.length > 0) {
                setCCSPId(res.data[0].ccsp_fund_id);
                console.log(res.data[0].ccsp_fund_id);

            } else {
                toast.error("No active funds available", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            fetchAllComoanydata();
        });
    }, []);



    const fetchAllComoanydata = async () => {
        try {
            const res = await getAdminCompanydata();
            if (res.status) {
                const filteredData = res.data.filter((company: { ccsp_fund_id: string }) => company.ccsp_fund_id == id);
                setAllCompanydata(filteredData);
                // console.log(filteredData);

            }
        } catch (error) {
            console.error("Error fetching company data:", error);
        }
    };


    const handleCompetitorSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append("fund_id", fundid);
        formData.append("ccsp_fund_id", ccspid);
        formData.append("company_desc", CompanyDesc);
        formData.append("competitor_logo", CompanyLogo);
        formData.append("company_name", CompanyName);
        try {
            const response = await AdminAddCometitorCompany(formData);
            clearmemberInputData();
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAddFormVisible(!isAddFormVisible);
            fetchAllComoanydata();
        } catch (error) {
            toast.error("Error occurred", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleUpdateCompetitorSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append("fund_id", fundid);
        formData.append("ccsp_fund_id", ccspid);
        formData.append("company_desc", CompanyDesc);
        formData.append("competitor_logo", CompanyLogo1);
        formData.append("company_name", CompanyName);
        formData.append('competitor_id', competitorId);
        console.log(formData);

        try {
            const response = await AdminUpdateCometitorCompany(formData);
            clearmemberInputData();
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setExpandedCard(null);
            fetchAllComoanydata();
        } catch (error) {
            toast.error("Error occurred", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleCompanydesc = (companydesc: string) => {
        setCompanyDesc(companydesc);
    };

    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');

    const handleLogoChange = (e: any) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSizeMB = 2; // 2MB limit

        if (file && file.size > maxSizeMB * 1024 * 1024) {
            setError('File size exceeds 2MB limit');
            return;
        }

        if (file && !allowedTypes.includes(file.type)) {
            setError('Only JPG and PNG files are allowed');
            return;
        }

        setCompanyLogo(file);
        setFileName(file.name);
        setError(''); 
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage('');
        }
    };


    const handleUpdateLogoChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 2 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setCompanyLogo1(file);
                    setFundImageName(file.name);
                    setFundImageNameError('');
                    setStartupLogoError('');
                } else {
                    setFundImageNameError('* Image size should be less than 2MB.');
                    setCompanyLogo1(null);
                    setPreviewImage(null);
                }
            } else {
                setStartupLogoError('* Please upload a JPG or PNG file');
                setCompanyLogo1(null);
                setPreviewImage(null);
            }
        } else {
            setCompanyLogo1(null);
            setPreviewImage(null);
        }
    };
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const handleAddButtonClick = () => {
        setIsAddFormVisible(!isAddFormVisible);
    };

    const [expandedCard, setExpandedCard] = useState<number | null>(null);


    const handleCardToggle = async (index: number) => {
        if (expandedCard === index) {
            setExpandedCard(null);
            setCompetitorId(null);
            setCompanyName('');
            setCompanyDesc('');
            setCompanyLogo('');
        } else {
            setExpandedCard(index);
            setCompetitorId(index);
            try {
                const res = await getAdminCompanydata();

                const conversation = res.data.find((company: { id: number }) => company.id === index);
                if (conversation) {
                    setCompanyName(conversation.company_name);
                    setCompanyDesc(conversation.company_desc);
                    setCompanyLogo(conversation.competitor_logo);
                }
            } catch (error) {
                // Handle errors here
                console.error("Error fetching company data:", error);
            }
        }
    };


    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <h6 className="page-title">Startup</h6>
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">
                                                    <Link
                                                        href={
                                                            process.env.NEXT_PUBLIC_BASE_URL + "company/dashboard"
                                                        }
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    Competitor Company
                                                </li>
                                                <li
                                                    className="breadcrumb-item active"
                                                    aria-current="page"
                                                >
                                                    <Link
                                                        href={
                                                            process.env.NEXT_PUBLIC_BASE_URL +
                                                            "company/ccsp-campaign"
                                                        }
                                                    >
                                                        Back
                                                    </Link></li>
                                            </ol>
                                        </div>
                                        <div className="col-lg-6 text-end">
                                            <button onClick={() => {
                                                handleAddButtonClick();
                                                clearmemberInputData();
                                            }} className="btnclasssmae">Add company data</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isAddFormVisible && (

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header text-white bg-dark" id="title">
                                            <h3 className="card-title m-0">Add New Competitor Company</h3>
                                            <div className="col-span-1 text-right">
                                                <p style={{ cursor: "pointer" }}>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <form onSubmit={handleCompetitorSubmit}>
                                                <div className="row g-3 mt-1">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label"
                                                        >
                                                            Company Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control h-75"
                                                            name="company_name"
                                                            placeholder="Company Name"
                                                            value={CompanyName}
                                                            onChange={(e) => setCompanyName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label"
                                                        >
                                                            Company Logo image
                                                        </label>

                                                        <div className="file-upload">
                                                            <div className="file-select">
                                                                <div className="file-select-button" id="fileName">
                                                                    Choose File
                                                                </div>
                                                                <div
                                                                    className="file-select-name"
                                                                    id="noFile"
                                                                >{fileName}</div>
                                                                <input
                                                                    type="file"
                                                                    name="competitor_logo"
                                                                    onChange={(e) => handleLogoChange(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show error */}

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
                                                                <></>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mt-1">
                                                    <div className="col-md-12">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label"
                                                        >
                                                            Company Description
                                                        </label>                                                       
                                                        <TextEditor
                                                            height={100}
                                                            value={CompanyDesc}
                                                            onChange={handleCompanydesc}
                                                            theme="snow"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div
                                                        className="col-md-6"
                                                        style={{ textAlign: "right" }}
                                                    >
                                                        <button type="submit" className="btnclasssmae mt-5">
                                                            SUBMIT
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* get data */}


                        <div className="row">
                            {companydata.length > 0 ? (
                                companydata.map((company: any, index: number) => (
                                    <div className="col-12" key={index}>
                                        <div className="card border-0">
                                            <div className="card-header text-white " id={`title-${index}`}>
                                                <table
                                                    className="table-dash border-0 "
                                                    id="datatable"
                                                >
                                                    <thead>
                                                        <tr className="border-0">
                                                            <th>#</th>
                                                            <th>Company Logo</th>
                                                            <th>Company Name</th>
                                                            <th>Company Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-0">
                                                            <td className="text-black">{index + 1}</td>
                                                            <td className="text-black">
                                                                {company.competitor_logo ? (
                                                                    <Image
                                                                        src={
                                                                            CompanyLogo && typeof CompanyLogo !== 'string'
                                                                                ? URL.createObjectURL(CompanyLogo)
                                                                                : process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                                'images/competitorlogo/' +
                                                                                company.competitor_logo
                                                                        }
                                                                        alt="Company Logo"
                                                                        className='profile-pic set-img'
                                                                        style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                        width={300}
                                                                        height={200}
                                                                    />
                                                                ) : (
                                                                    <Image
                                                                        src={process.env.NEXT_PUBLIC_BASE_URL +
                                                                            'assets/images/company.png'}
                                                                        alt="Company Logo"
                                                                        className='profile-pic set-img'
                                                                        style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                        width={300}
                                                                        height={200}
                                                                    />
                                                                )}


                                                            </td>
                                                            <td className="text-black">{company.company_name}</td>
                                                            <td className="text-black">
                                                                <div dangerouslySetInnerHTML={{ __html: company.company_desc }} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div className="col-span-1 text-right">
                                                    <p style={{ cursor: "pointer" }} onClick={() => handleCardToggle(company.id)}>
                                                        <i
                                                            className={
                                                                expandedCard === company.id
                                                                    ? 'fa-solid fa-chevron-up'
                                                                    : 'fa-solid fa-chevron-down'
                                                            }
                                                        ></i>
                                                    </p>

                                                </div>
                                            </div>

                                            {expandedCard === company.id && (
                                                <div className="card-body">
                                                    <form onSubmit={handleUpdateCompetitorSubmit}>
                                                        <div className="row g-3 mt-1">
                                                            <div className="col-md-6">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                                                    Company Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control h-75"
                                                                    name="company_name"
                                                                    placeholder="Company Name"
                                                                    value={CompanyName}
                                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                                                    Company Logo image
                                                                </label>

                                                                <div className="file-upload mt-5">
                                                                    <div className="file-select">
                                                                        <div className="file-select-button" id="fileName">
                                                                            Choose File
                                                                        </div>
                                                                        <div className="file-select-name" id="noFile">

                                                                            {fundImageName ? fundImageName : (CompanyLogo ? CompanyLogo.substring(0, 20) + '.....' : "No File Chosen ...")}

                                                                        </div>
                                                                        <input
                                                                            className="input-file"
                                                                            id="logo"
                                                                            accept=".jpg, .jpeg, .png"
                                                                            type="file"
                                                                            name="competitor_logo"
                                                                            onChange={(e) => handleUpdateLogoChange(e)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {fundImageNameError ? (
                                                                    <p className="text-danger">{fundImageNameError}</p>
                                                                ) : (
                                                                    startUpLogoError && <p className="text-danger">{startUpLogoError}</p>
                                                                )}

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
                                                                        <Image
                                                                            src={
                                                                                CompanyLogo1 && typeof CompanyLogo1 !== 'string'
                                                                                    ? URL.createObjectURL(CompanyLogo1)
                                                                                    : process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                                    'images/competitorlogo/' +
                                                                                    company.competitor_logo
                                                                            }
                                                                            alt="Company Logo"
                                                                            className='profile-pic'
                                                                            style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                            width={300}
                                                                            height={200}
                                                                        />
                                                                    )}
                                                                </div>



                                                            </div>
                                                        </div>
                                                        <div className="row g-3 mt-1">
                                                            <div className="col-md-12">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                                                    Company Description
                                                                </label>                                                               
                                                                <TextEditor
                                                                    height={100}
                                                                    value={CompanyDesc}
                                                                    onChange={handleCompanydesc}
                                                                    theme="snow"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-6" style={{ textAlign: "right" }}>
                                                                <button type="submit" className="btnclasssmae mt-5">
                                                                    SUBMIT
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <p className="text-center">No Company data created yet.</p>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        </>
    );
}

export default AddCompetitorCompany;
