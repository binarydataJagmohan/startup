import React, { useState, useEffect } from "react";
import { getAllStartupBusiness } from "../../lib/frontendapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getToken } from "../../lib/session";
const StartupList = () => {
  const [startups, setStartupData] = useState([]);
  const [selectedStage, setSelectedStage] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllStartupBusiness({});
            if (data) {
                setStartupData(data.data);
                //console.log(data.data);
            }
        };
        fetchData();

    }, []);

    // for approval status update
    function updateApprovalStatus(id, status) {
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
                // console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    }

    // for user account status Active and Deactive
    function updateStatus(id, status) {
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
    function updateStartupStage(id, stage) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-startup-stage/${id}`, { stage })
            .then(response => {
                // set value in startups state
                const updatedStartupData = startups.map(startup => {
                    if (startup.id === id) {
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
    const handleChange = (e) => {
        updateStartupStage(startup.id, e.target.value);
    };
    fetchData();
  }, []);
  function updateApprovalStatus(id, status) {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/update-startup-status/${id}`, {
        approval_status: status,
      })
      .then((response) => {
        setStartupData([]);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success",
        });
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      });
  }
  function updateStartupStage(id, stage) {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/update-startup-stage/${id}`, {
        stage,
      })
      .then((response) => {
        // console.log(response.data);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success",
        });
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      });
  }
  const handleChange = (e) => {
    updateStartupStage(startup.id, e.target.value);
  };
  const deleteStartup = async (id) => {
    try {
      const response = await fetch(`/api/startups/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer` + getToken(),
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Remove the deleted startup from the startupList state
        setStartupData(startups.filter((startup) => startup.id !== id));
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
    } catch (error) {
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
                                        <table
                                            id="datatable"
                                            className="table table-bordered dt-responsive nowrap"
                                            style={{
                                                borderCollapse: "collapse",
                                                borderSpacing: 0,
                                                width: "100%"
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
                                                            <select className="form-select form-select-lg mb-3 css-1492t68 mt-0" value={startup.stage} onChange={(e) => updateStartupStage(startup.id, e.target.value)}>
                                                                <option value="Idea Stage">Idea Stage</option>
                                                                <option value="Intermediate Stage">Intermediate Stage</option>
                                                                <option value="Final Stage">Final Stage</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <span className={startup.status === 'active' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(startup.id, startup.status === 'active' ? 'deactive' : 'active')}> {startup.status.toUpperCase()}</span>
                                                        </td>
                                                        <td>
                                                            <span className={startup.approval_status === 'approved' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateApprovalStatus(startup.id, startup.approval_status === 'approved' ? 'reject' : 'approved')}> {startup.approval_status.toUpperCase()}</span></td>
                                                        <td>
                                                            <a href="#" className='m-1' ><span className='fa fa-edit'></span></a>
                                                            <button onClick={() => deleteStartup(startup.id)} className='btn btn-danger m-1'>
                                                                <span className='fa fa-trash'></span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>{" "}
                            {/* end col */}
                        </div>{" "}
                        {/* end row */}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header text-white" id="title">
                    <h3 className="card-title">COMPANIES</h3>
                  </div>
                  <div className="card-body">
                    <table
                      id="datatable"
                      className="table table-bordered dt-responsive nowrap"
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
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
                              <select
                                className="form-select form-select-lg mb-3 css-1492t68 mt-0"
                                value={startup.stage}
                                onChange={(e) =>
                                  updateStartupStage(startup.id, e.target.value)
                                }
                              >
                                <option value="Idea Stage">Idea Stage</option>
                                <option value="Intermediate Stage">
                                  Intermediate Stage
                                </option>
                                <option value="Final Stage">Final Stage</option>
                              </select>
                            </td>
                            <td>
                              <span
                                className={
                                  startup.status === "active"
                                    ? "badge bg-success"
                                    : "badge bg-danger"
                                }
                              >
                                {" "}
                                {startup.status.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <span
                                className={
                                  startup.approval_status === "approved"
                                    ? "badge bg-success"
                                    : "badge bg-danger"
                                }
                                onClick={() =>
                                  updateApprovalStatus(
                                    startup.id,
                                    startup.approval_status === "approved"
                                      ? "reject"
                                      : "approved"
                                  )
                                }
                              >
                                {" "}
                                {startup.approval_status.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <a href="#" className="m-1">
                                <span className="fa fa-edit"></span>
                              </a>
                              <button
                                onClick={() => deleteStartup(startup.id)}
                                className="btn btn-danger m-1"
                              >
                                <span className="fa fa-trash"></span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>{" "}
          {/* container-fluid */}
        </div>
        <ToastContainer autoClose={7000} />
      </div>
    </>
  );
};

export default StartupList;
