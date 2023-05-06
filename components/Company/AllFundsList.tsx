import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {removeToken,removeStorageData,getCurrentUserData,} from "../../lib/session";
import {getAllFunds,getSingleBusinessInformation} from '../../lib/companyapi';
const AllFundsList = () => {
    const [funds, setFundsData] = useState([]);
    const [current_user_id, setCurrentUserId] = useState(false);
    const [businessInfo,setBusinessInfo]=useState('');

    useEffect(() => {
        const current_user_data = getCurrentUserData();
        if (current_user_data.id != null) {
          current_user_data.id
            ? setCurrentUserId(current_user_data.id)
            : setCurrentUserId("");
    
            getSingleBusinessInformation(current_user_data.id)
            .then((res) => {
                // console.log(res);
              if (res.status == true) {
                setBusinessInfo(res.data.id);
                getAllFunds(res.data.id)
                .then((res) => {
                    // console.log(res);
                  if (res.status == true) {
                    // Set the businessUnits state
                    setFundsData(res.data);
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
          window.location.href = "/login";
        }
    
      }, []);

      function updateStatus(id, status) {
        axios.post(process.env.NEXT_PUBLIC_API_URL + `/update-fund-status/${id}`, {status: status })
            .then(response => {
                  // Update the status in the state
             const updatedFunds = funds.map(fund => {
                if (fund.id === id) {
                    return {...fund, status: status};
                }
                return fund;
            });
            setFundsData(updatedFunds);
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
                                    All Funds Raise List
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
                                <h3 className="card-title" >FUND RAISE LIST</h3>
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
                                            <th>Fund Id</th>
                                            <th>Tenure</th>
                                            <th>Minimum Subscription</th>
                                            <th>Average Amount</th>
                                            <th>Repay Date</th>
                                            <th>Closing Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {funds.map((fund, index) => (
                                             <tr key={fund.id}>
                                                <td>{index + 1}</td>
                                                <td>{fund.fund_id}</td>
                                                <td>{fund.tenure}&nbsp;Days</td>
                                                <td>{fund.minimum_subscription}</td>
                                                <td>{fund.avg_amt_per_person}</td>
                                                <td>{new Date(fund.repay_date).toLocaleDateString('en-GB')}</td>
                                                <td>{new Date(fund.closed_in).toLocaleDateString('en-GB')}</td>
                                                <td>
                                                    <span className={fund.status === 'open' ? 'badge bg-success' : 'badge bg-danger'} onClick={() => updateStatus(fund.id, fund.status === 'open' ? 'closed' : 'open')}> {fund.status.toUpperCase()}</span></td>
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
        <ToastContainer autoClose={7000} />
    </div>
</>
  )
}

export default AllFundsList