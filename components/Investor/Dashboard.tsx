import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getAllBusiness, getSingleBusinessDetails, getSingleClosedBusinessDetails, getAllCCSPfunddata, getAllCCSPCampaign } from '@/lib/investorapi';
import { getCurrentUserData } from "../../lib/session";
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import Image from 'next/image';
import { CheckUserApprovalStatus, sendNotification } from "../../lib/frontendapi";
interface UserData {
  id?: string;
  approval_status?: string;
  username?: string;
}
interface BusinessDetails {
  status: string;
}
const Dashboard = () => {

  const [businessDetails, setBusinessDetails] = useState<BusinessDetails[]>([]);
  const router = useRouter();
  const [current_user_id, setCurrentUserId] = useState("");
  const [currentPageFeatured, setCurrentPageFeatured] = useState(0);
  const [currentPagediscount, setcurrentPagediscount] = useState(0);
  const [currentPageopenCSOP, setCurrentPageopenCSOP] = useState(0);
  const [currentPageopenCCSP, setCurrentPageopenCCSP] = useState(0);
  const [currentPageClosed, setCurrentPageClosed] = useState(0);
  const [ccspfunddata, setCCSPfundData]: any = useState([]);
  const itemsPerPage = 3;
  const [investorRole, setInvestorRole] = useState('');
  const filteredBusinessDetails = businessDetails.filter(
    (details) => details.status === 'closed'
  );
  const OpenfilteredBusinessDetails = businessDetails.filter(
    (details) => details.status === 'open'
  );

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data?.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");

    } else {
      window.location.href = "/login";
    }

    const checkUserStatus = async () => {
      try {
        const res = await CheckUserApprovalStatus(current_user_data.id);
        setInvestorRole(res.data.investorType);
        if (res.status === true) {
          if (res.data.role === "investor") {
            if (res.data.investorType === "Regular Investor") {
              if (window.location.pathname !== '/investor/campaign') {
                window.location.href = "/investor/campaign";
              }
            } else if (res.data.approval_status === "pending" || res.data.approval_status === "reject") {
              window.location.href = "/investor/thank-you";
            } else if (res.data.approval_status === "approved") {
              if (window.location.pathname !== '/investor/campaign') {
                window.location.href = "/investor/campaign";
              }
            } else {
              // Handle other cases
              if (window.location.pathname !== '/investor/thank-you') {
                window.location.href = "/investor/thank-you";
              }
            }
          }
        }
      } catch (err) {
      }
    };

    const fetchData = async () => {
      const data = await getAllBusiness({});
      if (data) {
        setBusinessDetails(data.data);
        setCurrentPageClosed(0);
        setCurrentPageFeatured(0);
        setcurrentPagediscount(0);
        setCurrentPageopenCSOP(0);
        setCurrentPageopenCCSP(0);
      }
    };
    checkUserStatus();
    fetchData();
  }, []);


  useEffect(() => {
    fetchAllCCSPfundDetails();
  }, [])

  const fetchAllCCSPfundDetails = async () => {
    const res = await getAllCCSPCampaign();
    if (res.status) {
      setCCSPfundData(res.data);
      console.log(res.data);
    }
  };

  



  const getBusinessdetails = async (e: any, id: any) => {
    e.preventDefault();
    const current_user_data: UserData = getCurrentUserData();
    const startupDetails = await getSingleBusinessDetails(id);
    const startupName = startupDetails.data.business_name;

    // Check if the user has already viewed this startup's profile
    const viewedStartupKey = `viewedStartup_${id}`;
    const hasViewed = localStorage.getItem(viewedStartupKey);

    if (!hasViewed) {
      // If the user hasn't viewed the startup before, send the notification
      const notificationData = {
        notify_from_user: current_user_data.id,
        notify_to_user: 1,
        notify_msg: `Investor with ${current_user_data.username} viewed the details of startup "${startupName}".`,
        notification_type: "Startup Viewed Notification",
        each_read: "unread",
        status: "active"
      };

      // Send the notification to the admin
      sendNotification(notificationData)
        .then((notificationRes) => {
          console.log('Notification sent successfully');
        })
        .catch((error) => {
          console.error('Error sending notification:', error);
        });

      // Mark the startup as viewed in local storage
      localStorage.setItem(viewedStartupKey, 'true');
    }

    // After sending the notification, you can proceed to get the details of the business.
    getSingleBusinessDetails(id).then((res) => {
      if (res.data.type == 'CCSP') {
        window.location.href = `campaign/ccspdetail?id=${id}`;
      }
      else {
        window.location.href = `campaign/details?id=${id}`;
      }
    });
  };



  const getClosedBusinessdetails = (e: any, id: any) => {
    e.preventDefault();
    getSingleClosedBusinessDetails(id).then((res) => {
      router.push(`campaign/closed?id=${id}`);
    });
  };

  const pageCountOpen = Math.ceil(OpenfilteredBusinessDetails.length / itemsPerPage);


  const handlePageChangeClosed = (selectedPage: any) => {
    setCurrentPageClosed(selectedPage.selected);
  };
  const handlePageChangeFeatured = (selectedPage: any) => {
    setCurrentPageFeatured(selectedPage.selected);
  };
  const handlePageChangeDiscount = (selectedPage: any) => {
    setcurrentPagediscount(selectedPage.selected);
  };
  const handlePageChangeCSOP = (selectedPage: any) => {
    setCurrentPageopenCSOP(selectedPage.selected);
  };
  const handlePageChangeOpenCCSP = (selectedPage: any) => {
    setCurrentPageopenCCSP(selectedPage.selected);
  };

  const opendisplayedBusinessDetailsCOP = OpenfilteredBusinessDetails.slice(
    currentPageFeatured * itemsPerPage,
    (currentPageFeatured + 1) * itemsPerPage
  );
  const filteredDetailsDiscounting = OpenfilteredBusinessDetails.filter((details: any) => details.type === "Dicounting Invoice" && details.status === "open");
  const opendisplayedBusinessDetailsDiscounting = filteredDetailsDiscounting.slice(
    currentPagediscount * itemsPerPage,
    (currentPagediscount + 1) * itemsPerPage
  );
  const pageCountDiscounting = Math.ceil(filteredDetailsDiscounting.length / itemsPerPage);

  const filteredDetailsCCSP = OpenfilteredBusinessDetails.filter((details: any) => details.type === "CCSP" && details.status === "open");
  const opendisplayedBusinessDetailsCCSP = filteredDetailsCCSP.slice(
    currentPageopenCCSP * itemsPerPage,
    (currentPageopenCCSP + 1) * itemsPerPage
  );
  const pageCountCCSP = Math.ceil(filteredDetailsCCSP.length / itemsPerPage);

  const filteredDetailsCSOP = OpenfilteredBusinessDetails.filter((details: any) => details.type === "CSOP" && details.status === "open");
  const opendisplayedBusinessDetailsCSOP = filteredDetailsCSOP.slice(
    currentPageopenCSOP * itemsPerPage,
    (currentPageopenCSOP + 1) * itemsPerPage
  );
  const pageCountCSOP = Math.ceil(filteredDetailsCSOP.length / itemsPerPage);

  const filteredDetailsClosed = filteredBusinessDetails.filter((details: any) => details.status === "closed");
  const displayedBusinessDetails = filteredDetailsClosed.slice(
    currentPageClosed * itemsPerPage,
    (currentPageClosed + 1) * itemsPerPage
  );
  const pageCountClose = Math.ceil(filteredDetailsClosed.length / itemsPerPage);


  return (
    <>
      <section className="invertor-campaign">
        {investorRole != 'Regular Investor' ? (<>
          <div className="container py-5">
            <h3 className="featurred">Featured campaigns</h3>
            <h6 className="trending">Explore what is trending</h6>
            <div className="bar" />

            <div className="row">
              {opendisplayedBusinessDetailsCOP
                .filter((details: any) => (details.type === "Dicounting Invoice" || details.type === "CSOP") && details.status === "open")
                // .filter((details: any) => (details.type === "Dicounting Invoice" || details.type === "CSOP" || details.type === "CCSP") && details.status === "open")
                .map((details: any, index: any) => (
                  <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                    <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                      <div className="product-image">
                        <Link href="#" className="image">
                          {details.logo ? (
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + details.logo} alt="business-logo" width={416} height={140} />
                          ) : (
                            <Image src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small/placeholder.jpg'} alt="business-logo" width={416} height={140} />
                          )
                          }
                        </Link>
                      </div>

                      <div className="main-padding">
                        <div className="d-flex justify-content-between">
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.business_name}</a>
                            </h3>
                            <div className="price"></div>
                          </div>
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.tenure}</a>
                            </h3>
                            <div className="price">Tenure</div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.no_of_units}/{details.total_units}</a>
                            </h3>
                            <div className="price">Units Left</div>
                          </div>
                          <div className="product-content text-end">
                            <h3 className="title">
                              <a href="#">₹{details.minimum_subscription}</a>
                            </h3>
                            <div className="price">Min. Subscription</div>
                          </div>
                        </div>
                        <div className="text-center mt-3 d-flex">
                          {/* <a href="#" className="card-link">
                            💡13.6% Discount Rate
                          </a> */}
                          <a href="#" className="card-link">
                            🌟Repayment/Unit- ₹{details.minimum_subscription}
                          </a>
                        </div>
                      </div>
                      <div className="overlay">
                        <div className="columns">
                          <ul className="price m-0 p-0">
                            <li>
                              Units <span>{details.no_of_units}/{details.total_units}</span>
                            </li>
                            <li>
                              Average Amount Per Unit <span>₹{details.avg_amt_per_person}</span>
                            </li>
                            <li>
                              Tenure <span>{details.tenure} days</span>
                            </li>
                            {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0) <= 0 ? (
                              <li>
                                <span>Closed</span>
                              </li>
                            ) : (
                              <li> Closed in{ }
                                <span>
                                  { } {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0)} days
                                </span>
                              </li>
                            )}
                            <li className="border-0">
                              <a
                                href="#"
                                className="button-class"
                              >
                                View Details
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {pageCountOpen ? (<div className="my-3">
              <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCountOpen}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChangeFeatured}
                forcePage={currentPageFeatured}
                disableInitialCallback={true}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeLinkClassName="active"
              />
            </div>) :
              ('')}
          </div>
          <div className="container py-5">
            <h3 className="featurred">CSOP</h3>
            <h6 className="trending">
              Subscribe to fast growth businesses with low minimum
            </h6>
            <div className="bar" />

            <div className="row">
              {filteredDetailsCSOP.length > 0 ? (
                opendisplayedBusinessDetailsCSOP.map((details: any, index: any) => (
                  <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                    <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                      <div className="product-image">
                        <a href="#" className="image">
                          {details.logo ? (
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + details.logo} alt="business-logo" width={416} height={140} />
                          ) : (
                            <Image src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small/placeholder.jpg'} alt="business-logo" width={416} height={140} />
                          )
                          }
                        </a>
                      </div>
                      <div className="main-padding">
                        <div className="d-flex justify-content-between">
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.business_name} </a>
                            </h3>
                            <div className="price">Anchor</div>
                          </div>
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.tenure} days </a>
                            </h3>
                            <div className="price">Tenure</div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.no_of_units}/{details.total_units} </a>
                            </h3>
                            <div className="price">Units Left</div>
                          </div>
                          <div className="product-content text-end">
                            <h3 className="title">
                              <a href="#">₹{details.minimum_subscription} </a>
                            </h3>
                            <div className="price">Min. Subscription</div>
                          </div>
                        </div>
                        <div className="text-center mt-3 d-flex">
                          {/* <a href="#" className="card-link">
                            💡13.6% Discount Rate
                          </a> */}
                          <a href="#" className="card-link">
                            🌟Repayment/Unit- ₹{details.minimum_subscription}
                          </a>
                        </div>
                      </div>
                      <div className="overlay">
                        <div className="columns">
                          <ul className="price m-0 p-0">
                            <li>
                              Units <span>{details.no_of_units}/{details.total_units}</span>
                            </li>
                            <li>
                              Average Amount Per Unit <span>₹{details.avg_amt_per_person}</span>
                            </li>
                            <li>
                              Tenure <span>{details.tenure} days</span>
                            </li>
                            {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0) <= 0 ? (
                              <li>
                                <span>Closed</span>
                              </li>
                            ) : (
                              <li> Closed in{ }
                                <span>
                                  { } {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0)} days
                                </span>
                              </li>
                            )}
                            <li className="border-0">
                              <a
                                href="#"
                                className="button-class"
                              >
                                View Details
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Fund Raised</p>
              )}

            </div>
            {pageCountCSOP ? (
              <div className="my-3">
                <ReactPaginate
                  previousLabel={'«'}
                  nextLabel={'»'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCountCSOP}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChangeCSOP}
                  containerClassName={'pagination'}
                  forcePage={currentPageopenCSOP}
                  disableInitialCallback={true}
                  activeClassName={'active'}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  activeLinkClassName="active"
                />
              </div>)
              : ('')}
          </div>
          <div className="container py-5">
            <h3 className="featurred">CCSP</h3>
            <h6 className="trending">
              Subscribe to fast growth businesses with low minimum
            </h6>
            <div className="bar" />


            <div className="row">
              {/* {ccspfunddata.length > 0 ? (
                ccspfunddata.map((details: any, index: any) => ( */}
              {ccspfunddata.length > 0 ? (
                ccspfunddata
                  .filter((details: { approval_status: string; }) => details.approval_status === 'approved') // Filter approved funds
                  .map((details: any, index: any) => (
                    <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                      {/* <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}> */}
                      <div className="product-grid container1">
                        <div className="product-image">
                          <a href="#" className="image">

                            {details.fund_banner_image ? (
                              <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/fundbannerimage/' + details.fund_banner_image} alt="business-logo" width={416} height={140} />
                            ) : (
                              <Image src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small/placeholder.jpg'} alt="business-logo" width={416} height={140} />
                            )
                            }
                          </a>
                        </div>
                        <div className="main-padding">
                          <div className="d-flex justify-content-between">
                            <div className="product-content">
                              <h3 className="title">
                                <a href="#">{details.fund_name} </a>
                              </h3>
                              <div className="price">Fund Name</div>
                            </div>
                            <div className="product-content">
                              <h3 className="title text-end">
                                <a href="#">{details.dilution_percentage}%</a>
                              </h3>
                              <div className="price">Dilution</div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="product-content">
                              <h3 className="title">
                                {/* <a href="#">{details.min_commitment}/{details.max_commitment} </a> */}
                                <a href="#">{details.valuation_cap}</a>
                              </h3>
                              <div className="price">Valuation Cap</div>
                            </div>
                            <div className="product-content text-end">
                              <h3 className="title">
                                <a href="#">₹{details.valuation_cap} </a>
                              </h3>
                              <div className="price">Amount</div>
                            </div>
                          </div>
                          <div className="text-center mt-3 d-flex">
                            {/* <a href="#" className="card-link">
                              💡13.6% Discount Rate
                            </a> */}
                            <a href="#" className="card-link">
                              🌟Repayment/Unit- ₹{details.amount_raised}
                            </a>
                          </div>
                        </div>
                        <div className="overlay">
                          <div className="columns">
                            <ul className="price m-0 p-0">
                              <li>
                                Round Name <span>{details.round_name}</span>
                              </li>
                              <li>
                                Average Amount Per Unit <span>₹{details.amount_raised}</span>
                              </li>
                              <li>
                                Min Commitment <span>₹{details.min_commitment}</span>
                              </li>
                              <li>
                                Max Commitment <span>₹{details.max_commitment}</span>
                              </li>
                              {/* <li>
                                Tenure <span>{details.tenure} days</span>
                              </li> */}
                              {/* {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0) <= 0 ? (
                                <li>
                                  <span>Closed</span>
                                </li>
                              ) : (
                                <li> Closed in{ }
                                  <span>
                                    { } {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0)} days
                                  </span>
                                </li>
                              )} */}
                              <li className="border-0">
                                <a
                                  href={
                                    process.env.NEXT_PUBLIC_BASE_URL +
                                    `investor/campaign/ccspdetail?id=${details.ccsp_fund_id}`
                                  }
                                  className="button-class"
                                >
                                  View Details
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No Fund Raised</p>
              )}

            </div>

            {pageCountCCSP ?
              (<div className="my-3">
                <ReactPaginate
                  previousLabel={'«'}
                  nextLabel={'»'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCountCCSP}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChangeOpenCCSP}
                  containerClassName={'pagination'}
                  forcePage={currentPageopenCCSP}
                  disableInitialCallback={true}

                  activeClassName={'active'}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  activeLinkClassName="active"
                />
              </div>)
              : ('')}
          </div>
        </>
        ) : ('')}
        <div className="container py-5">
          <h3 className="featurred">Discounting </h3>
          <h6 className="trending">Short term fixed income opportunities</h6>
          <div className="bar" />
          <div className="row">
            {filteredDetailsDiscounting.length > 0 ? (
              opendisplayedBusinessDetailsDiscounting.map((details: any, index: any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                    <div className="product-image">
                      <a href="#" className="image">
                        {details.logo ? (
                          <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + details.logo} alt="business-logo" width={416} height={140} />
                        ) : (
                          <Image src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small/placeholder.jpg'} alt="business-logo" width={416} height={140} />
                        )
                        }
                      </a>
                    </div>
                    <div className="main-padding">
                      <div className="d-flex justify-content-between">
                        <div className="product-content">
                          <h3 className="title">
                            <a href="#">{details.business_name} </a>
                          </h3>
                          <div className="price">Anchor</div>
                        </div>
                        <div className="product-content">
                          <h3 className="title">
                            <a href="#">{details.tenure} days </a>
                          </h3>
                          <div className="price">Tenure</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="product-content">
                          <h3 className="title">
                            <a href="#">{details.no_of_units}/{details.total_units} </a>
                          </h3>
                          <div className="price">Units Left</div>
                        </div>
                        <div className="product-content text-end">
                          <h3 className="title">
                            <a href="#">₹{details.minimum_subscription} </a>
                          </h3>
                          <div className="price">Min. Subscription</div>
                        </div>
                      </div>
                      <div className="text-center mt-3 d-flex">
                        {/* <a href="#" className="card-link">
                          💡13.6% Discount Rate
                        </a> */}
                        <a href="#" className="card-link">
                          🌟Repayment/Unit- ₹{details.minimum_subscription}
                        </a>
                      </div>
                    </div>
                    <div className="overlay">
                      <div className="columns">
                        <ul className="price m-0 p-0">
                          <li>
                            Units <span>{details.no_of_units}/{details.total_units}</span>
                          </li>
                          <li>
                            Average Amount Per Unit <span>₹{details.avg_amt_per_person}</span>
                          </li>
                          <li>
                            Tenure <span>{details.tenure} days</span>
                          </li>
                          {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0) <= 0 ? (
                            <li>
                              <span>Closed</span>
                            </li>
                          ) : (
                            <li> Closed in{ }
                              <span>
                                { } {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0)} days
                              </span>
                            </li>
                          )}
                          <li className="border-0">
                            <a
                              href="#"
                              className="button-class"
                            >
                              View Details
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Fund Raised</p>
            )}
          </div>

          {pageCountDiscounting ?
            (<div className="my-3">
              <ReactPaginate
                previousLabel={'«'}
                nextLabel={'»'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCountDiscounting}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChangeDiscount}
                forcePage={currentPagediscount}
                disableInitialCallback={true}

                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeLinkClassName="active"
              />
            </div>) : ('')}

        </div>
        {investorRole != 'Regular Investor' ? (
          <div className="container py-5">
            <h3 className="featurred">Closed campaigns </h3>
            <h6 className="trending">Wall of successful startups</h6>
            <div className="bar" />
            <div className="row">

              {filteredDetailsClosed.length > 0 ? (
                displayedBusinessDetails.map((details: any, index: any) => (
                  <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                    <div className="product-grid container1" onClick={(e) => getClosedBusinessdetails(e, details.business_id)}>
                      <div className="product-image">
                        <a href="#" className="image">
                          {details.logo ? (
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + details.logo} alt="business-logo" width={416} height={140} />
                          ) : (
                            <Image src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small/placeholder.jpg'} alt="business-logo" width={416} height={140} />
                          )}
                        </a>
                      </div>
                      <div className="main-padding">
                        <div className="d-flex justify-content-between">
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.business_name}</a>
                            </h3>
                            {/* <div className="price"></div> */}
                          </div>
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.tenure}</a>
                            </h3>
                            <div className="price">Tenure</div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="product-content">
                            <h3 className="title">
                              <a href="#">{details.no_of_units}/{details.total_units}</a>
                            </h3>
                            <div className="price">Units Left</div>
                          </div>
                          <div className="product-content text-end">
                            <h3 className="title">
                              <a href="#">₹{details.minimum_subscription}</a>
                            </h3>
                            <div className="price">Min. Subscription</div>
                          </div>
                        </div>
                        <div className="text-center mt-3 d-flex">
                          {/* <a href="#" className="card-link">
                            💡13.6% Discount Rate
                          </a> */}
                          <a href="#" className="card-link">
                            🌟Repayment/Unit- ₹{details.minimum_subscription}
                          </a>
                        </div>
                      </div>
                      <div className="overlay">
                        <div className="columns">
                          <ul className="price">
                            {/* <li>
                              Subscribers <span>32</span>
                            </li> */}
                            <li>
                              Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                            </li>
                            <li>
                              Minimum Subscription <span>₹{details.minimum_subscription}</span>
                            </li>
                            {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0) <= 0 ? (
                              <li>
                                <span>Closed</span>
                              </li>
                            ) : (
                              <li> Closed in{' '}
                                <span>
                                  {Math.max(Math.ceil((new Date(details.closed_in).getTime() - new Date().getTime()) / 86400000), 0)} days
                                </span>
                              </li>
                            )}
                            <li className="border-0">
                              <a
                                href="#"
                                className="button-class"
                              >
                                View Details
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Fund Raised</p>
              )}

            </div>

            {pageCountClose ?
              (<div className="my-3">
                <ReactPaginate
                  previousLabel={'«'}
                  nextLabel={'»'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCountClose}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChangeClosed}
                  forcePage={currentPageClosed}
                  disableInitialCallback={true}

                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  activeLinkClassName="active"
                />
              </div>)
              :
              ('')}

          </div>
        ) : ('')}
      </section >
    </>
  );
}

export default Dashboard