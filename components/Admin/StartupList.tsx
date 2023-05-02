import React,{useState,useEffect} from 'react'
import {getAllStartupBusiness} from '../../lib/frontendapi';
const StartupList = () => {
    const [startups, setStartupData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllStartupBusiness({});
            if (data) {
                setStartupData(data.data);
                console.log(data.data);
            }
        };

        fetchData();
    }, []);
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
                                        <h3 className="card-title" >STARTUP COMPANIES</h3>
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
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {startups.map((startup, index) => (
                                                    <tr key={startup.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{startup.name}</td>
                                                        <td>{startup.email}</td>
                                                        <td>{startup.company}</td>
                                                        <td>{startup.stage}</td>
                                                        <td>
                                                            <span className={startup.status === 'active' ? 'badge bg-success' : 'badge bg-danger'}> {investor.status.toUpperCase()}</span>
                                                        </td>
                                                        <td>
                                                            <a href="#" className='m-1' ><span className='fa fa-edit'></span></a>
                                                            <a href="#" className='m-1' ><span className='fa fa-trash text-danger'></span></a>
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
        </>
    )
}

export default StartupList