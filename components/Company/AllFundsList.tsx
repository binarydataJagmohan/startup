import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUserData } from "../../lib/session";
import { getAllFunds, getSingleBusinessInformation } from '../../lib/companyapi';
import Link from 'next/link';
interface UserData {
  id?: number;
}
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
}
const AllFundsList = () => {
  const [funds, setFundsData] = useState<Fund[]>([]);
  const [dataTableInitialized, setDataTableInitialized] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data.id != null) {
      getSingleBusinessInformation(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            getAllFunds(res.data.id)
              .then((res) => {
                if (res.status == true) {
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

  useEffect(() => {
    if (funds.length > 0 && !dataTableInitialized) {
      $(document).ready(() => {
        $('#datatable').DataTable({
          lengthMenu: [20, 50, 100, 150],
          columnDefs: [
            { targets: [0, 1, 2], orderable: true },
            { targets: '_all', orderable: false },
          ],
        });
        setDataTableInitialized(true);
      });
    }
  }, [funds, dataTableInitialized]);

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
                      <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/dashboard"}>Dashboard</Link>
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
                  <div className="card-header text-white bg-dark" id="title">
                    <h3 className="card-title" >ALL FUNDS</h3>
                  </div>
                  <div className="card-body mt-3">
                    <div className="table-responsive">
                      <div className="box-card recent-reviews mb-4">
                        {funds.length > 0 ? (
                          <table className="table-dash" id="datatable" ref={tableRef}>
                            <thead>
                              <tr>
                                <th>Serial no.</th>
                                <th>Fund Id</th>
                                <th>Tenure</th>
                                <th>Min. Subscription</th>
                                <th>Avg. Amount</th>
                                <th>Repay Date</th>
                                <th>Closing Date</th>                              
                              </tr>
                            </thead>
                            <tbody>
                              {funds && funds.length > 0 ? (
                                funds.map((fund, index: any) => (
                                  <tr key={index}>
                                    <td data-label="Serial no.">{index + 1}</td>
                                    <td data-label="Fund Id">{fund.fund_id}</td>
                                    <td data-label="Tenure">{fund.tenure}&nbsp;Days</td>
                                    <td data-label="Min. Subscription">{fund.minimum_subscription}</td>
                                    <td data-label="Avg. Amount">{fund.avg_amt_per_person}</td>
                                    <td data-label="Repay Date">{new Date(fund.repay_date).toLocaleDateString('en-GB')}</td>
                                    <td data-label="Closing Date">{new Date(fund.closed_in).toLocaleDateString('en-GB')}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td className="text-center" colSpan={8}>No funds found.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        ) : (
                          <p>No data available in table</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default AllFundsList