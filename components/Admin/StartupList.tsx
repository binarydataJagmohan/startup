import React, { useState, useEffect } from 'react'
import { getAllStartupBusiness } from '../../lib/frontendapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { getToken } from "../../lib/session";
type Startup = {
    id: number;
    name: string;
    email:string;
    business_name:string;
    stage:string;
    status:string;
    approval_status: number |string;
    
  }
const StartupList = () => {
    const [startups, setStartupData] = useState<Startup[]>([]);
    const [selectedStage, setSelectedStage] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllStartupBusiness({});
            if (data) {
                setStartupData(data.data);
            }
        };
        fetchData();

    }, []);

    // for approval status update
    function updateApprovalStatus(id: number, status: number | string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-startup-status/${id}`, { approval_status: status })
            .then(response => { 
                const updatedData = startups.map(startup => {
                    if (startup.id === id) {
                      return {
                        ...startup,
                        approval_status: status,
                      };
                    }
                    return startup;
                  });
                  setStartupData(updatedData);
                  toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch(error => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }

    // for user account status Active and Deactive
    function updateStatus(id: number, status: string) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-status/${id}`, {status: status })
            .then(response => { 
                const updatedData = startups.map(startup => {
                    if (startup.id === id) {
                      return {
                        ...startup,
                        status: status,
                      };
                    }
                    return startup;
                  });
                  setStartupData(updatedData);
                  toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch(error => {
                // console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }

    // For update business stage
    function updateStartupStage(id: string, stage: string) {
        const startupId = parseInt(id);
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-startup-stage/${id}`, { stage })
            .then(response => {
                // set value in startups state
                const updatedStartupData = startups.map(startup => {
                    if (startup.id === startupId) {
                        return {
                            ...startup,
                            stage: stage
                        }
                    }
                    return startup;
                });
                setStartupData(updatedStartupData);
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            })
            .catch(error => {
                // console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }
    const handleChange = (id: string, e: React.ChangeEvent<HTMLSelectElement>) => {
        updateStartupStage(id, e.target.value);
    };
    // delete the startup 
    const deleteStartup = async (id: number) => {
        try {
            const response = await fetch(`/api/startups/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer`+ getToken(),
                },
            });
            const data = await response.json();
            if (response.ok) {
                //Deleted the startup from the startupList
                setStartupData(startups.filter(startup => startup.id !== id));
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
            } else {
                toast.error(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
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
                                <div className="col-md-8">
                                    <h6 className="page-title">Startup</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Startup Companies
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-white" id="title">
                                        <h3 className="card-title" >COMPANIES</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className='table-responsive'>
                                        <table
                                            id="datatable"
                                            className="table table-bordered dt-responsive nowrap"
                                            style={{
                                                borderCollapse: "collapse",
                                                borderSpacing: 0,
                                                width: "100%",
                                                overflow:'hidden'
                                            }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email Address</th>
                                                    <th>Company</th>
                                                    <th>Stage</th>
                                                    <th>Status</th>
                                                    <th>Approval</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {startups.map((startup, index) => (
                                                    <tr key={startup.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{startup.name}</td>
                                                        <td>{startup.email}</td>
                                                        <td>{startup.business_name}</td>
                                                        {/* <td>{startup.stage}</td> */}
                                                        <td>
                                                            <select className="form-select form-select-lg mb-3 css-1492t68 mt-0" value={startup.stage} onChange={(e) => updateStartupStage(String(startup.id), e.target.value)}>
                                                                <option value="Idea Stage">Idea Stage</option>
                                                                <option value="Intermediate Stage">Intermediate Stage</option>
                                                                <option value="Final Stage">Final Stage</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <span style={{cursor: "pointer"}} className={startup.status === 'active' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(startup.id, startup.status === 'active' ? 'deactive' : 'active')}> {startup.status.toUpperCase()}</span>
                                                        </td>
                                                        <td>
                                                            <span style={{cursor: "pointer"}} className={startup.approval_status === 'approved' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateApprovalStatus(startup.id, startup.approval_status === 'approved' ? 'reject' : 'approved')}>  {typeof startup.approval_status === 'string' ? startup.approval_status.toUpperCase() : startup.approval_status}</span>
                                                        </td>
                                                        <td className='d-flex'>
                                                            <a href="#" className='m-1' ><span className='fa fa-edit'></span></a>
                                                            <a onClick={() => deleteStartup(startup.id)} className='delete'>
                                                                <span className='fa fa-trash'></span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>{" "}
                            {/* end col */}
                        </div>{" "}
                        {/* end row */}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                <ToastContainer autoClose={1000} />
            </div>
        </>
    )
}

export default StartupList