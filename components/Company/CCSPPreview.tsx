import { getStartupIfinworthDetail } from "@/lib/investorapi";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getBusinessInformation, getLatestIfinworthDetail, getSingleUserData } from "@/lib/frontendapi";
import { getToken, getCurrentUserData } from "../../lib/session";
import Image from "next/image";
import Link from "next/link";
import swal from "sweetalert";
import { useRouter } from "next/router";
import axios from 'axios';

interface UserData {
    id?: any;
}
const CCSPCampaign = () => {

    const [ifinworth, setIfinworth] = useState({
        startup_id: "",
        round_of_ifinworth: "",
        ifinworth_currency: "",
        ifinworth_amount: "",
        pre_committed_ifinworth_currency: "",
        pre_committed_ifinworth_amount: "",
        pre_committed_investor: "",
        ifinworth_kind_of_investor: [],
        other_funding_detail: "",
        pitch_deck: "",
        one_pager: "",
        previous_financials: "",
        latest_cap_table: "",
        other_documents: "",
        updated_at: "",
        approval_status: "",
        ccsp_fund_id: "",
    });

    const [businessDetails, setBusinessDetails] = useState({
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

    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        country: "",
    });
    const { id } = router.query;
    const [current_user_id, setCurrentUserId] = useState("");
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data?.id != null) {
            setCurrentUserId(current_user_data.id);
            
            if(id)
            {
                getStartupIfinworthDetail(id)
                .then((res) => {
                    if (res.status == true) {
                        setIfinworth(res.data);
                        console.log(current_user_id);
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
            } else {
                getLatestIfinworthDetail()    
                .then((res)=>{
                    if (res.status == true) {
                        setIfinworth(res.data);                  
                    } else {
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                })
            }        
          
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


    }, []);
    const shortDescription = (description: any, words: any) => {
        const wordArray = description.split(' ');
        const truncatedDescription = wordArray.slice(0, words).join(' ');
        return truncatedDescription;
    };

    function publishFund(startupId: string, isApproved: string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/publish-ccsp-fund/${startupId}`, { approval_status: isApproved }, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
            .then(response => {
                swal({
                    title: "Your deal request has been submitted successfully.",
                    text: "Kindly wait for administration approval!",
                    icon: "success",
                    dangerMode: false,
                    buttons: ["Ok", "Dashboard"],
                }).then((clickedButton) => {
                    if (clickedButton === "Dashboard") {
                        router.push("/company/dashboard");
                    } else {
                        router.push('/company/ccsp-campaign');
                    }
                });
            })
            .catch(error => {

                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    };

    return (
        <>
            <section className="step-form pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="form-part">
                                <div className="upload-file">
                                    <p className="c-blue"><i className="fa-solid fa-upload"></i> Preview  Publish </p>
                                </div>

                                <p className="label-text">Once published, this is how your listing will look like.</p>
                                <div className="fund">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <Image className="logo-portfolio rounded-circle" src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + (businessDetails.logo || 'default.png')} alt="portfolio" width={150} height={150} style={{ height: '150px !important' }} />
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="f-20 c-blue mb-2"><b>{user.name}</b></p>
                                            <p className="f-16 mb-2">{businessDetails.tagline}</p>
                                            <p className="f-16 mb-2"> {user.country} {businessDetails.startup_date.split('-')[0]}  </p>
                                            <p className="f-16 mb-2"><i className="fa-solid fa-rss"></i> {businessDetails.stage}</p>

                                        </div>
                                    </div>
                                    <hr className="opacity-25" />

                                    <div className="row">
                                        <div className="col-4">
                                            <p>Fund Raising Stage:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>Open For Conversation</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <p>Looking to raise:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{ifinworth.round_of_ifinworth}</p>
                                        </div>
                                    </div>

                                    <div className="deal-text">
                                        <div className="row">
                                        <div className="col-sm-12">
                                                <p className="post-text">Deal updated: {new Date(ifinworth.updated_at).toLocaleDateString()} - {new Date(ifinworth.updated_at).toLocaleTimeString()}</p>
                                            </div>                                                                                    
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="form-part">
                                <div className="your-selection">
                                    <h5 className="up-file"> Your Selection</h5>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6"> <p className="label-text mt-0">Company Details</p></div>
                                    <div className="col-6 text-end">
                                        {ifinworth.approval_status === 'pending' ?
                                            ''
                                            :
                                            <Link href="/company/profile" className="pen"><i className="fa-solid fa-pencil"></i> Edit</Link>
                                        }
                                    </div>
                                </div>


                                <div className="row mb-1">
                                    <div className="col-6">Company</div>
                                    <div className="col-6">{user.name}</div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6">Description</div>
                                    <div className="col-6">{shortDescription(businessDetails.description, 3)}...</div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6">Founded year</div>
                                    <div className="col-6">{businessDetails.startup_date.split('-')[0]}</div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6">Location</div>
                                    <div className="col-6">{user.country}</div>
                                </div>


                                <div className="row mb-1">
                                    <div className="col-6">Sector</div>
                                    <div className="col-6">{businessDetails.sector}</div>
                                </div>

                                <div className="row">
                                    <div className="col-6">Company Stage</div>
                                    <div className="col-6">{businessDetails.stage}</div>
                                </div>



                                <div className="row mt-4">
                                    <div className="col-6"> <p className="label-text mt-0">Deal Details</p></div>
                                    <div className="col-6 text-end">
                                        {ifinworth.approval_status === 'pending' ?
                                            ''
                                            :
                                            <Link href={
                                                process.env.NEXT_PUBLIC_BASE_URL +
                                                `company/ccsp-request/?id=${ifinworth.ccsp_fund_id}`
                                            } className="pen"><i className="fa-solid fa-pencil"></i> Edit</Link>
                                        }
                                    </div>
                                </div>


                                <div className="row mb-1">
                                    <div className="col-6">Tyepe of Round</div>
                                    <div className="col-6">{ifinworth.round_of_ifinworth}</div>
                                </div>

                                {/* <div className="row mb-1">
                                    <div className="col-6">Current stage of Funding</div>
                                    <div className="col-6">Not yet started but open for Conversation  Open for conversation</div>
                                </div> */}

                                <div className="row mb-1">
                                    <div className="col-6">Looking to raise (Amount)</div>
                                    <div className="col-6">{ifinworth.ifinworth_amount}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        {ifinworth.approval_status === 'incomplete' ?
                            <Link href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                `company/ccsp-request/?id=${ifinworth.ccsp_fund_id}`
                            }><button className="back-step">Previous</button></Link>
                            :
                            ''
                        }
                        {ifinworth.approval_status === 'approved' ?
                            <button className="continue">Published</button>
                            :
                            ifinworth.approval_status === 'incomplete' ?
                                <button className="continue"
                                    onClick={() => publishFund(ifinworth.ccsp_fund_id, ifinworth.approval_status === 'incomplete' ? 'pending' : 'incomplete')}
                                >
                                    Publish
                                </button>
                                :
                                ifinworth.approval_status === 'pending' ?
                                    <>
                                        <Link href={"/company/ccsp-campaign"}><button className="continue">Requested</button></Link>
                                    </>
                                    : ''
                        }
                    </div>

                </div>
            </section>
        </>
    );
}

export default CCSPCampaign;