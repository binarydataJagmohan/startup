import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { getAllActiveFunds, AdminAddTeamMember, AdminUpdateTeamMember, getAdminTeamdata } from "@/lib/adminapi";
import { useRouter } from 'next/router';


interface Fund {
    id: number;
    fund_id: number;
    tenure: string;
    minimum_subscription: string;
    amount: number;
    status: string;
    avg_amt_per_person: string;
    repay_date: string;
    closed_in: string;
    type: string;
    company_overview: string;
}

export default function AddCompetitorCompany() {

    const [teamMemberName, setTeamMemberName] = useState("");
    const [teammemberDesignation, setteammemberDesignation] = useState("");
    const [teamMemberPic, setTeamMemberPic]: any = useState("");
    const [teamMemberPic1, setTeamMemberPic1]: any = useState("");
    const [teamMemberDesc, setTeamMemberDesc] = useState("");
    const [fundid, setFundId]: any = useState<string | null>(null);
    const [teamdata, setAllTeamdata] = useState([]);
    const [teamId, setTeamId]: any = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const router = useRouter();
    const { id } = router.query;


    useEffect(() => {
        getAllActiveFunds()
            .then((res) => {
                if (res.status === true && res.data.length > 0) {
                    setFundId(res.data[0].fund_id);
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
        // if (res.status) {
        //     setAllTeamdata(res.data);
        // }
        if (res.status) {
            const filteredData = res.data.filter((team: { fund_id: string }) => team.fund_id == id);
            setAllTeamdata(filteredData);
        }
    };

    const handleTeamSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append('fund_id', fundid)
        formData.append("fund_id", id as string);
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
        // formData.append("fund_id", fundid);
        formData.append("fund_id", id as string);
        formData.append('member_name', teamMemberName)
        formData.append('member_designation', teammemberDesignation)
        formData.append('member_pic', teamMemberPic1)
        formData.append('description', teamMemberDesc)
        formData.append('team_id', teamId);
        console.log(formData);

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

    const handleLogoChange = (e: any) => {
        const file = e.target.files[0];
        setTeamMemberPic(file);
    };

    const handleUpdateLogoChange = (e: any) => {
        const file = e.target.files[0];
        setTeamMemberPic1(file);
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
                                            </ol>
                                        </div>
                                        <div className="col-lg-6 text-end">
                                            <button onClick={handleAddButtonClick} className="btnclasssmae">Add Team</button>
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
                                                            Company Name
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
                                                            Member Designation
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
                                                            Company Description
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
                                                        Company Logo image
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
                                                            </div>
                                                            <input
                                                                type="file"
                                                                name="member_pic"
                                                                onChange={(e) => handleLogoChange(e)}
                                                            />
                                                        </div>
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
                                                {/* <h3 className="card-title">Add New Team Member</h3> */}
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
                                                                {team.member_pic ? (
                                                                    <img
                                                                        src={
                                                                            teamMemberPic && typeof teamMemberPic !== 'string'
                                                                                ? URL.createObjectURL(teamMemberPic)
                                                                                : process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                                'images/memberPic/' +
                                                                                team.member_pic
                                                                        }
                                                                        alt="Company Logo"
                                                                        className='profile-pic set-img'
                                                                        style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={process.env.NEXT_PUBLIC_BASE_URL +
                                                                            'assets/images/company.png'}
                                                                        alt="Company Logo"
                                                                        className='profile-pic set-img'
                                                                        style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                    />
                                                                )}


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
                                                                    Member Name
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
                                                                    Member Designation
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
                                                                    Description
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
                                                                Profile Pic
                                                            </label>

                                                            <div className="file-upload mt-5">
                                                                <div className="file-select">
                                                                    <div className="file-select-button" id="fileName">
                                                                        Choose File
                                                                    </div>
                                                                    <div className="file-select-name" id="noFile">
                                                                        {teamMemberPic.member_pic ? teamMemberPic.member_pic : 'No file chosen...'}
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

                                                            <div className="profile-pic">
                                                                {previewImage ? (
                                                                    <img
                                                                        src={typeof previewImage === 'string' ? previewImage : ''}
                                                                        width={300}
                                                                        height={200}
                                                                        alt=''
                                                                        className='profile-pic'
                                                                        style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                                    />
                                                                ) : (
                                                                    <img
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


