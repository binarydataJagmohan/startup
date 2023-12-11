import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { getAllCCSPCampaign, AdminAddTeamMember, AdminUpdateTeamMember, getAdminTeamdata, deleteTeam } from "@/lib/adminapi";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCurrentUserData } from "@/lib/session";

interface UserData {
    role?: string;
}
export default function AddCompetitorCompany() {

    const [teamMemberName, setTeamMemberName] = useState("");
    const [teammemberDesignation, setteammemberDesignation] = useState("");
    const [teamMemberPic, setTeamMemberPic]: any = useState("");
    const [teamMemberPic1, setTeamMemberPic1]: any = useState("");
    const [teamMemberDesc, setTeamMemberDesc] = useState("");
    const [teamdata, setAllTeamdata] = useState([]);
    const [teamId, setTeamId]: any = useState<number | null>(null);
    const [ccspid, setCCSPId]: any = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const router = useRouter();
    const { id } = router.query;

    const clearmemberInputData = () => {
        setTeamMemberPic1("");
        setTeamMemberPic("");
        setPreviewImage("");
        setteammemberDesignation("");
        setTeamMemberName("");
        setTeamMemberDesc("");
        setPreviewImage("");
        setFundImageName("");
    };


    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data.role !== 'admin') {
            router.back();
        }
        getAllCCSPCampaign()
            .then((res) => {
                if (res.status === true && res.data.length > 0) {
                    setCCSPId(res.data[0].ccsp_fund_id);
                } else {
                    toast.error("No active funds available", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                fetchAllTeamdata();
            })
    }, []);

    const fetchAllTeamdata = async () => {
        const res = await getAdminTeamdata();
        if (res.status) {
            const filteredData = res.data.filter((team: { ccsp_fund_id: string }) => team.ccsp_fund_id == id);
            setAllTeamdata(filteredData);
        }
    };

    const [teamMemberNameError, setteamMemberNameError] = useState('');
    const [teammemberDesignationError, setteammemberDesignationError] = useState('');
    const [teamMemberDescError, setteamMemberDescError] = useState('');
    const [teamMemberPicError, setteamMemberPicError] = useState('');

    const handleTeamSubmit = async (e: any) => {
        e.preventDefault();
        if (error !== '') {
            console.error('validation error');
            return;
        }
        const formData = new FormData();
        formData.append("ccsp_fund_id", ccspid);
        if (teamMemberName == '') {
            setteamMemberNameError('Please fill member name.');
            setteammemberDesignationError('');
            setteamMemberDescError('');
            setteamMemberPicError('');
            return;
        }
        if (teammemberDesignation == '') {
            setteammemberDesignationError('Please fill member name.');
            setteamMemberNameError('');
            setteamMemberDescError('');
            setteamMemberPicError('');
            return;
        }
        if (teamMemberDesc == '') {
            setteamMemberDescError('Please fill member description.');
            setteamMemberNameError('');
            setteammemberDesignationError('');
            setteamMemberPicError('');
            return;
        }
        if (teamMemberPic == '') {
            setteamMemberPicError('Please fill member description.');
            setteamMemberNameError('');
            setteammemberDesignationError('');
            setteamMemberDescError('');
            return;
        }
        formData.append("ccsp_fund_id", ccspid);
        formData.append('member_name', teamMemberName)
        formData.append('member_designation', teammemberDesignation)
        formData.append('member_pic', teamMemberPic)
        formData.append('description', teamMemberDesc)
        try {
            const response = await AdminAddTeamMember(formData);
            clearteamInputData();
            setIsAddFormVisible(!isAddFormVisible);
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            fetchAllTeamdata();
        } catch (error) {
            toast.error("Error occurred", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleUpdateCompetitorSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ccsp_fund_id", ccspid);
        formData.append('member_name', teamMemberName)
        formData.append('member_designation', teammemberDesignation)
        formData.append('member_pic', teamMemberPic1)
        formData.append('description', teamMemberDesc)
        formData.append('team_id', teamId);
        try {
            const response = await AdminUpdateTeamMember(formData);
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setExpandedCard(null);
            fetchAllTeamdata();
        } catch (error) {
            toast.error("Error occurred", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const clearteamInputData = () => {
        setTeamMemberName('');
        setteammemberDesignation('');
        setTeamMemberPic('');
        setTeamMemberDesc('');
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

        setTeamMemberPic(file);
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

    const [startUpLogoError, setStartupLogoError] = useState('');
    const [fundImageName, setFundImageName] = useState('');
    const [fundImageNameError, setFundImageNameError] = useState('');

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
                    setTeamMemberPic1(file);
                    setFundImageName(file.name);
                    setFundImageNameError('');
                    setStartupLogoError('');
                } else {
                    setFundImageNameError('* Image size should be less than 2MB.');
                    setTeamMemberPic1(null);
                    setPreviewImage(null);
                }
            } else {
                setStartupLogoError('* Please upload a JPG or PNG file');
                setTeamMemberPic1(null);
                setPreviewImage(null);
            }
        } else {
            setTeamMemberPic1(null);
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
            setTeamId(null);
        } else {
            setExpandedCard(index);
            setTeamId(index);
        }
        const res = await getAdminTeamdata();
        const conversation = res.data.find((team: { id: number }) => team.id === index);
        if (conversation) {
            setTeamMemberName(conversation.member_name)
            setteammemberDesignation(conversation.member_designation)
            setTeamMemberPic(conversation.member_pic)
            setTeamMemberDesc(conversation.description)
        }
    };

    const handleDelete = async (id: any) => {
        try {
            const response = await deleteTeam(id);
            if (response.status === true) {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                fetchAllTeamdata();
            } else {
                toast.error("Deletion failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast.error("Error occurred while deleting", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
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
                                                            process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"
                                                        }
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    Team
                                                </li>
                                                <li
                                                    className="breadcrumb-item active"
                                                    aria-current="page"
                                                >
                                                    <Link
                                                        href={
                                                            process.env.NEXT_PUBLIC_BASE_URL +
                                                            "admin/all-active-campaign"
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
                                            }} className="btnclasssmae">Add Team</button>
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
                                            <h3 className="card-title">Add New Team Member</h3>
                                        </div>
                                        <div className="card-body">

                                            <form onSubmit={handleTeamSubmit}>
                                                <div className="row g-3 mt-1">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label"
                                                        >
                                                            Member Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control h-75"
                                                            name="member_name"
                                                            placeholder="Member Name"
                                                            value={teamMemberName}
                                                            onChange={(e) => setTeamMemberName(e.target.value)}
                                                        />
                                                        {teamMemberNameError ?
                                                            <>
                                                                <p className="text-danger p-2">* {teamMemberNameError}</p>
                                                            </> : ''}
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label"
                                                        >
                                                            Member Designation <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control h-75"
                                                            name="member_designation"
                                                            placeholder="Member Designation"
                                                            value={teammemberDesignation}
                                                            onChange={(e) => setteammemberDesignation(e.target.value)}
                                                        />
                                                        {teammemberDesignationError ?
                                                            <>
                                                                <p className="text-danger p-2">* {teammemberDesignationError}</p>
                                                            </> : ''}
                                                    </div>
                                                </div>
                                                <div className="row g-3 mt-1">
                                                    <div className="col-md-12">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label mt-3"
                                                        >
                                                            Member Description <span className="text-danger">*</span>
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            placeholder="Enter details here"
                                                            className="form-control"
                                                            name="description"
                                                            value={teamMemberDesc}
                                                            onChange={(e) => setTeamMemberDesc(e.target.value)}
                                                        />
                                                    </div>
                                                    {teamMemberDescError ?
                                                        <>
                                                            <p className="text-danger p-2">* {teamMemberDescError}</p>
                                                        </> : ''}
                                                </div>
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label mt-3"
                                                    >
                                                        Member Logo image <span className="text-danger">*</span>
                                                    </label>

                                                    <div className="file-upload">
                                                        <div className="file-select">
                                                            <div
                                                                className="file-select-button"
                                                                id="fileName"
                                                            >
                                                                Choose File
                                                            </div>
                                                            <div className="file-select-name" id="noFile">
                                                                {fileName}
                                                            </div>
                                                            <input
                                                                type="file"
                                                                name="member_pic"
                                                                onChange={(e) => handleLogoChange(e)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                    {teamMemberPicError ?
                                                        <>
                                                            <p className="text-danger p-2">* {teamMemberPicError}</p>
                                                        </> : ''}
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
                                                <div className="row mt-3">
                                                    <div
                                                        className="col-md-6"
                                                        style={{ textAlign: "right" }}
                                                    >
                                                        <button type="submit" className="btnclasssmae">
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
                            {teamdata.length > 0 ? (
                                teamdata.map((team: any, index: number) => (
                                    <div className="col-12" key={index}>
                                        <div className="card border-0">
                                            <div className="card-header text-white" id={`title-${index}`}>
                                                <table
                                                    className="table-dash border-0 "
                                                    id="datatable"
                                                >
                                                    <thead>
                                                        <tr className="border-0">
                                                            <th>#</th>
                                                            <th>Member Pic</th>
                                                            <th>Member Name</th>
                                                            <th>Member Designation</th>
                                                            <th>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-0">
                                                            <td className="text-black">{index + 1}</td>
                                                            <td className="text-black">
                                                                <Image
                                                                    src={
                                                                        team.member_pic && typeof team.member_pic !== 'string'
                                                                            ? URL.createObjectURL(team.member_pic)
                                                                            : process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                            'images/memberPic/' +
                                                                            (team.member_pic || 'defaultImage.jpg')
                                                                    }
                                                                    alt="Member Logo"
                                                                    className='profile-pic set-img'
                                                                    style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                    width={300}
                                                                    height={200}
                                                                />
                                                            </td>
                                                            <td className="text-black">{team.member_name}</td>
                                                            <td className="text-black">{team.member_designation}</td>
                                                            <td className="text-black">{team.description}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div className="col-span-1 text-right">
                                                    <p style={{ cursor: "pointer" }} onClick={() => handleCardToggle(team.id)}>
                                                        <i
                                                            className={
                                                                expandedCard === team.id
                                                                    ? 'fa-solid fa-chevron-up'
                                                                    : 'fa-solid fa-chevron-down'
                                                            }
                                                        ></i>
                                                    </p>
                                                    <Link href="#" onClick={() => handleDelete(team.id)}>
                                                        <i className="fa-solid fa-trash" />
                                                    </Link>
                                                </div>
                                            </div>
                                            {expandedCard === team.id && (
                                                <div className="card-body">

                                                    <form onSubmit={handleUpdateCompetitorSubmit}>
                                                        <div className="row g-3 mt-1">
                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Member Name <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control h-75"
                                                                    name="member_name"
                                                                    placeholder="Member Name"
                                                                    value={teamMemberName}
                                                                    onChange={(e) => setTeamMemberName(e.target.value)}
                                                                />

                                                            </div>

                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    Member Designation <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control h-75"
                                                                    name="member_designation"
                                                                    placeholder="Member Designation"
                                                                    value={teammemberDesignation}
                                                                    onChange={(e) => setteammemberDesignation(e.target.value)}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row g-3 mt-1">
                                                            <div className="col-md-12">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label mt-3"
                                                                >
                                                                    Description <span className="text-danger">*</span>
                                                                </label>
                                                                <textarea
                                                                    rows={4}
                                                                    placeholder="Enter details here"
                                                                    className="form-control"
                                                                    name="description"
                                                                    value={teamMemberDesc}
                                                                    onChange={(e) => setTeamMemberDesc(e.target.value)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="col-md-6">
                                                            <label
                                                                htmlFor="exampleFormControlInput1"
                                                                className="form-label mt-3"
                                                            >
                                                                Profile Pic <span className="text-danger">*</span>
                                                            </label>

                                                            <div className="file-upload mt-5">
                                                                <div className="file-select">
                                                                    <div className="file-select-button" id="fileName">
                                                                        Choose File
                                                                    </div>
                                                                    <div className="file-select-name" id="noFile">
                                                                        {fundImageName ? fundImageName : (teamMemberPic ? teamMemberPic : "No File Chosen ...")}

                                                                    </div>
                                                                    <input
                                                                        className="input-file"
                                                                        id="logo"
                                                                        accept=".jpg, .jpeg, .png"
                                                                        type="file"
                                                                        name="member_pic"
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
                                                                            teamMemberPic1 && typeof teamMemberPic1 !== 'string'
                                                                                ? URL.createObjectURL(teamMemberPic1)
                                                                                : process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                                'images/memberPic/' +
                                                                                team.member_pic
                                                                        }
                                                                        alt="Profile Pic"
                                                                        className='profile-pic'
                                                                        style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                        width={300}
                                                                        height={200}
                                                                    />
                                                                )}
                                                            </div>

                                                        </div>
                                                        <div className="row mt-3">
                                                            <div
                                                                className="col-md-6"
                                                                style={{ textAlign: "right" }}
                                                            >
                                                                <button type="submit" className="btnclasssmae">
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
                                    <p className="text-center">No team created yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        </>
    )
}


