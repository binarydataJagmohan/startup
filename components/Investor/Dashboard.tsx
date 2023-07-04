import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getAllBusiness, getSingleBusinessDetails } from '@/lib/investorapi';
import { getCurrentUserData } from "../../lib/session";
import ReactPaginate from 'react-paginate';


import { CheckUserApprovalStatus } from "../../lib/frontendapi";
interface UserData {
  id?: string;
  approval_status?: string;
}
interface BusinessDetails {
  status: string;
}
const Dashboard = () => {

  const [businessDetails, setBusinessDetails] = useState<BusinessDetails[]>([]);
  const router = useRouter();
  const [current_user_id, setCurrentUserId] = useState("");
  const [currentPageCOP, setCurrentPageCOP] = useState(0);
  const [currentPagediscount, setcurrentPagediscount] = useState(0);
  const [currentPageopen, setCurrentPageopen] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);




  const itemsPerPage = 3;

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

        if (res.status === true) {

          if (res.data.role === "investor") {
            if (res.data.approval_status === "pending" || res.data.approval_status === "reject") {
              window.location.href = "/investor/thank-you";
            } else if (res.data.approval_status === "approved") {
              if (window.location.pathname !== '/investor/campaign') {
                window.location.href = "/investor/campaign";
              }
            } else {
              if (window.location.pathname !== '/investor/thank-you') {
                window.location.href = "/investor/thank-you";
              }
            }
          }
        }
      } catch (err) {
        // console.error(err);
      }
    };

    const fetchData = async () => {
      const data = await getAllBusiness({});
      if (data) {
        setBusinessDetails(data.data);


        // Set the initial page to 0
        setCurrentPage(0);
        setCurrentPageCOP(0);
        setcurrentPagediscount(0);
        setCurrentPageopen(0);
        //  console.log(data.data);
      }
    };

    checkUserStatus();
    fetchData();
  }, []);



  const getBusinessdetails = (e: any, id: any) => {
    e.preventDefault();
    // alert(id)
    getSingleBusinessDetails(id).then((res) => {
      router.push(`campaign/details?id=${id}`);
    });
  };
  const pageCount = Math.ceil(filteredBusinessDetails.length / itemsPerPage);
  const pageCountOpen = Math.ceil(OpenfilteredBusinessDetails.length / itemsPerPage);


  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };
  const handlePageChangeCOP = (selectedPage: any) => {
    setCurrentPageCOP(selectedPage.selected);
  };
  const handlePageChangeDiscount = (selectedPage: any) => {
    setcurrentPagediscount(selectedPage.selected);
  };
  const handlePageChangeOpen = (selectedPage: any) => {
    setCurrentPageopen(selectedPage.selected);
  };
  const displayedBusinessDetails = filteredBusinessDetails.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const opendisplayedBusinessDetailsCOP = OpenfilteredBusinessDetails.slice(
    currentPageCOP * itemsPerPage,
    (currentPageCOP + 1) * itemsPerPage
  );
  const opendisplayedBusinessDetailsDiscounting = OpenfilteredBusinessDetails.slice(
    currentPagediscount * itemsPerPage,
    (currentPagediscount + 1) * itemsPerPage
  );
  const opendisplayedBusinessDetails = OpenfilteredBusinessDetails.slice(
    currentPageopen * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <section className="invertor-campaign">
        <div className="container py-5">
          <h3 className="featurred">Featured campaigns</h3>
          <h6 className="trending">Explore what is trending</h6>
          <div className="bar" />

          <div className="row">
            {opendisplayedBusinessDetailsCOP
              .filter((details: any) => (details.type === "Dicounting Invoice" || details.type === "CSOP" || details.type === "CCSP") && details.status === "open")
              .map((details: any, index: any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                    <div className="product-image">
                      <a href="#" className="image">
                        { }
                        <img
                          className="pic-1 image"
                          src={details.logo}
                        />
                      </a>
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
                      <div className="text-center mt-3">
                        <a href="#" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="#" className="card-link">
                          🌟Repayment/Unit- ₹{details.minimum_subscription}
                        </a>
                      </div>
                    </div>
                    <div className="overlay">
                      <div className="columns">
                        <ul className="price">
                          <li>
                            Subscribers <span>32</span>
                          </li>
                          <li>
                            Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>{details.tenure}&nbsp;days</span>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="button-class"
                            >
                              proptech
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="my-3">
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCountOpen}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChangeCOP}
              forcePage={currentPageCOP}
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
          </div>
        </div>
        <div className="container py-5">
          <h3 className="featurred">CSOP</h3>
          <h6 className="trending">
            Subscribe to fast growth businesses with low minimum
          </h6>
          <div className="bar" />

          <div className="row">
            {opendisplayedBusinessDetails.filter((details: any) => details.type === "CSOP" && details.status === "open").length > 0 ? (
              opendisplayedBusinessDetails
                .filter((details: any) => details.type === "CSOP" && details.status === "open")
                .map((details: any, index: any) => (
                  <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                    <div className="product-image">
                      <a href="#" className="image">
                        <img
                          className="pic-1 image"
                          src={details.logo}
                        />
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
                      <div className="text-center mt-3">
                        <a href="#" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="#" className="card-link">
                          🌟Repayment/Unit- ₹{details.minimum_subscription}
                        </a>
                      </div>
                    </div>
                    <div className="overlay">
                      <div className="columns">
                        <ul className="price">
                          <li>
                            Subscribers <span>32</span>
                          </li>
                          <li>
                            Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>{details.tenure}&nbsp;days</span>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="button-class"
                            >
                              proptech
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

            {/* {opendisplayedBusinessDetails
              .filter((details: any) => details.type === "CSOP" && details.status === "open")
              .map((details: any, index: any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                    <div className="product-image">
                      <a href="#" className="image">
                        <img
                          className="pic-1 image"
                          src={details.logo}
                        />
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
                      <div className="text-center mt-3">
                        <a href="#" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="#" className="card-link">
                          🌟Repayment/Unit- ₹{details.minimum_subscription}
                        </a>
                      </div>
                    </div>
                    <div className="overlay">
                      <div className="columns">
                        <ul className="price">
                          <li>
                            Subscribers <span>32</span>
                          </li>
                          <li>
                            Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>{details.tenure}&nbsp;days</span>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="button-class"
                            >
                              proptech
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}
          </div>
          <div className="my-3">
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCountOpen}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChangeOpen}
              containerClassName={'pagination'}
              forcePage={currentPageopen}
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
          </div>

          {/* <div className="text-end mt-4">
            <div className="pagination">
              <a href="#">«</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">»</a>
            </div>
          </div> */}
        </div>

        <div className="container py-5">
          <h3 className="featurred">CCSP</h3>
          <h6 className="trending">
            Subscribe to fast growth businesses with low minimum
          </h6>
          <div className="bar" />

          <div className="row">
            {opendisplayedBusinessDetails.filter((details: any) => details.type === "CCSP" && details.status === "open").length > 0 ? (
              opendisplayedBusinessDetails
                .filter((details: any) => details.type === "CCSP" && details.status === "open")
                .map((details: any, index: any) => (
                  <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                    <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                      <div className="product-image">
                        <a href="#" className="image">
                          <img
                            className="pic-1 image"
                            src={details.logo}
                          />
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
                        <div className="text-center mt-3">
                          <a href="#" className="card-link">
                            💡13.6% Discount Rate
                          </a>
                          <a href="#" className="card-link">
                            🌟Repayment/Unit- ₹{details.minimum_subscription}
                          </a>
                        </div>
                      </div>
                      <div className="overlay">
                        <div className="columns">
                          <ul className="price">
                            <li>
                              Subscribers <span>32</span>
                            </li>
                            <li>
                              Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                            </li>
                            <li>
                              Minimum Subscription <span>₹{details.minimum_subscription}</span>
                            </li>
                            <li>
                              Closes in <span>{details.tenure}&nbsp;days</span>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="button-class"
                              >
                                proptech
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
            {/* {opendisplayedBusinessDetails
              .filter((details: any) => details.type === "CCSP" && details.status === "open")
              .map((details: any, index: any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                    <div className="product-image">
                      <a href="#" className="image">
                        <img
                          className="pic-1 image"
                          src={details.logo}
                        />
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
                      <div className="text-center mt-3">
                        <a href="#" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="#" className="card-link">
                          🌟Repayment/Unit- ₹{details.minimum_subscription}
                        </a>
                      </div>
                    </div>
                    <div className="overlay">
                      <div className="columns">
                        <ul className="price">
                          <li>
                            Subscribers <span>32</span>
                          </li>
                          <li>
                            Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>{details.tenure}&nbsp;days</span>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="button-class"
                            >
                              proptech
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}
          </div>
          <div className="my-3">
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCountOpen}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChangeOpen}
              containerClassName={'pagination'}
              forcePage={currentPageopen}
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
          </div>

          {/* <div className="text-end mt-4">
            <div className="pagination">
              <a href="#">«</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">»</a>
            </div>
          </div> */}
        </div>

        <div className="container py-5">
          <h3 className="featurred">Discounting </h3>
          <h6 className="trending">Short term fixed income opportunities</h6>
          <div className="bar" />

          <div className="row">
          {opendisplayedBusinessDetails.filter((details: any) => details.type === "Dicounting Invoice" && details.status === "open").length > 0 ? (
              opendisplayedBusinessDetails
                .filter((details: any) => details.type === "Dicounting Invoice" && details.status === "open")
                .map((details: any, index: any) => (
                  <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                    <div className="product-image">
                      <a href="#" className="image">
                        <img
                          className="pic-1 image"
                          src={details.logo}
                        />
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
                      <div className="text-center mt-3">
                        <a href="#" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="#" className="card-link">
                          🌟Repayment/Unit- ₹{details.minimum_subscription}
                        </a>
                      </div>
                    </div>
                    <div className="overlay">
                      <div className="columns">
                        <ul className="price">
                          <li>
                            Subscribers <span>32</span>
                          </li>
                          <li>
                            Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>{details.tenure}&nbsp;days</span>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="button-class"
                            >
                              proptech
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

          <div className="my-3">
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCountOpen}
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
          </div>
          {/* <div className="text-end mt-4">
            <div className="pagination">
              <a href="#">«</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">»</a>
            </div>
          </div> */}
        </div>
        <div className="container py-5">
          <h3 className="featurred">Closed campaigns </h3>
          <h6 className="trending">Wall of successful startups</h6>
          <div className="bar" />
          <div className="row">
            {displayedBusinessDetails
              .filter((details: any) => details.status === "closed")
              .map((details: any, index: any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.business_id)}>
                    <div className="product-image">
                      <a href="#" className="image">
                        <img
                          className="pic-1 image"
                          src={details.logo}
                        />
                      </a>
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
                      <div className="text-center mt-3">
                        <a href="#" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="#" className="card-link">
                          🌟Repayment/Unit- ₹{details.minimum_subscription}
                        </a>
                      </div>
                    </div>
                    <div className="overlay">
                      <div className="columns">
                        <ul className="price">
                          <li>
                            Subscribers <span>32</span>
                          </li>
                          <li>
                            Average Amount Per Subscriber <span>₹{details.avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closed at <span>{new Date(details.closed_in).toLocaleDateString()}</span>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="button-class"
                            >
                              proptech
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="my-3">
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              forcePage={currentPage}
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
          </div>
        </div>

      </section>
    </>
  );
}

export default Dashboard