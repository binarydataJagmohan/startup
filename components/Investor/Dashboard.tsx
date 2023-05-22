import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {getAllBusiness,getSingleBusinessDetails } from '@/lib/investorapi';

const Dashboard = () => {

  const [businessDetails, setBusinessDetails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await  getAllBusiness({});
      if (data) {
        setBusinessDetails(data.data);
          console.log(data.data);
      }
  };

  fetchData();
  }, []);
   
  const getBusinessdetails = (e: any, id: any) => {
    e.preventDefault();
    // alert(id)
    getSingleBusinessDetails(id).then((res) => {
      router.push(`campaign/details?id=${id}`);
    });
  };
   
  console.log(businessDetails);
    
  return (
    <>
      <section className="invertor-campaign">
        <div className="container py-5">
          <h3 className="featurred">Featured campaigns</h3>
          <h6 className="trending">Explore what is trending</h6>
          <div className="bar" />

          <div className="row">
            {businessDetails
              .filter((details: any) => details.type === "Dicounting Invoice")
              .map((details:any,index:any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.id)}>
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
                          🌟Repayment/Unit- ₹10,167
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
                            Average Amount Per Subscriber <span>₹{details.	avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>20 days</span>
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

          <div className="text-end mt-4">
            <div className="pagination">
              <a href="#">«</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">»</a>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <h3 className="featurred">CSOP</h3>
          <h6 className="trending">
            Subscribe to fast growth businesses with low minimum
          </h6>
          <div className="bar" />

          <div className="row">
            {businessDetails
              .filter((details: any) => details.type === "CSOP")
              .map((details: any,index:any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.id)}>
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
                            <a href="#">{details.	no_of_units}/{details.total_units} </a>
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
                          🌟Repayment/Unit- ₹10,167
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
                            Average Amount Per Subscriber <span>₹{details.	avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>{details.closed_in} days</span>
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

          <div className="text-end mt-4">
            <div className="pagination">
              <a href="#">«</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">»</a>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <h3 className="featurred">Discounting </h3>
          <h6 className="trending">Short term fixed income opportunities</h6>
          <div className="bar" />

          <div className="row">
            {businessDetails
              .filter((details: any) => details.type === "Dicounting Invoice")
              .map((details: any,index: any) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={(e) => getBusinessdetails(e, details.id)}>
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
                          🌟Repayment/Unit- ₹10,167
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
                            Average Amount Per Subscriber <span>₹{details.	avg_amt_per_person}</span>
                          </li>
                          <li>
                            Minimum Subscription <span>₹{details.minimum_subscription}</span>
                          </li>
                          <li>
                            Closes in <span>20 days</span>
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

          <div className="text-end mt-4">
            <div className="pagination">
              <a href="#">«</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">»</a>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <h3 className="featurred">Closed campaigns </h3>
          <h6 className="trending">Wall of successful startups</h6>
          <div className="bar" />
          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-4">
              <div className="product-grid container1">
                <div className="product-image">
                  <a href="#" className="image">
                    <img
                      className="pic-1 image"
                      src="https://images.pexels.com/photos/3153208/pexels-photo-3153208.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    {/* <img class="pic-2" src="images/img-2.jpg"> */}
                  </a>
                </div>
                <div className="main-padding">
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="#">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="#" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="#" className="card-link">
                      🌟Repayment/Unit- ₹10,167
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
                        Average Amount Per Subscriber <span>₹12,000</span>
                      </li>
                      <li>
                        Minimum Subscription <span>₹12,000</span>
                      </li>
                      <li>
                        Closes in <span>20 days</span>
                      </li>
                      <li>
                        <a href="#" className="button-class">
                          proptech
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-lg-4">
              <div className="product-grid container1">
                <div className="product-image">
                  <a href="#" className="image">
                    <img
                      className="pic-1 image"
                      src="https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    {/* <img class="pic-2" src="images/img-2.jpg"> */}
                  </a>
                </div>
                <div className="main-padding">
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="#">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="#" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="#" className="card-link">
                      🌟Repayment/Unit- ₹10,167
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
                        Average Amount Per Subscriber <span>₹12,000</span>
                      </li>
                      <li>
                        Minimum Subscription <span>₹12,000</span>
                      </li>
                      <li>
                        Closes in <span>20 days</span>
                      </li>
                      <li>
                        <a href="#" className="button-class">
                          proptech
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-lg-4">
              <div className="product-grid container1">
                <div className="product-image">
                  <a href="#" className="image">
                    <img
                      className="pic-1 image"
                      src="https://images.pexels.com/photos/5256816/pexels-photo-5256816.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    {/* <img class="pic-2" src="images/img-2.jpg"> */}
                  </a>
                </div>
                <div className="main-padding">
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="#">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="#">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="#" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="#" className="card-link">
                      🌟Repayment/Unit- ₹10,167
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
                        Average Amount Per Subscriber <span>₹12,000</span>
                      </li>
                      <li>
                        Minimum Subscription <span>₹12,000</span>
                      </li>
                      <li>
                        Closes in <span>20 days</span>
                      </li>
                      <li>
                        <a href="#" className="button-class">
                          proptech
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="text-end">
            <div className="pagination">
              <a href="#">«</a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">»</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard