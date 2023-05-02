import React, { useState, useEffect } from 'react'
import { getAllInvestors } from '../../lib/frontendapi';
const InvestorList = () => {
    const [investors, setInvestors] = useState([]);
    // const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllInvestors({});
            if (data) {
                setInvestors(data.data);
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
                                            All Investors
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
                                        <h3 className="card-title" >INVESTORS</h3>
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
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {investors.map((investor, index) => (
                                                    <tr key={investor.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{investor.name}</td>
                                                        <td>{investor.email}</td>
                                                        <td>{investor.investorType}</td>
                                                        <td>
                                                        <span className={investor.status === 'active' ? 'badge bg-success' : 'badge bg-danger'}> {investor.status.toUpperCase()}</span>
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

export default InvestorList