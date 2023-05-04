import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {getAllBusiness } from '@/lib/investorapi';

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
   

  const detailsa = () => {
    router.push('campaign/details');
    
  };
   

  return (
    <>
      <section className="invertor-campaign">
        <div className="container py-5">
          <h3 className="featurred">Featured campaigns</h3>
          <h6 className="trending">Explore what is trending</h6>
          <div className="bar" />

          <div className="row">
            {businessDetails
              .filter((details) => details.type === "Discounting")
              .map((details) => (
                <div className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1" onClick={detailsa}>
                    <div className="product-image">
                      <a href="javascript:void(0)" className="image">
                        <img
                          className="pic-1 image"
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/img/img/digital.png"
                          }
                        />
                      </a>
                    </div>
                    <div className="main-padding">
                      <div className="d-flex justify-content-between">
                        <div className="product-content">
                          <h3 className="title">
                            <a href="javascript:void(0)">{details.business_name}</a>
                          </h3>
                          <div className="price"></div>
                        </div>
                        <div className="product-content">
                          <h3 className="title">
                            <a href="javascript:void(0)"></a>
                          </h3>
                          <div className="price">Tenure</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="product-content">
                          <h3 className="title">
                            <a href="javascript:void(0)">50/250</a>
                          </h3>
                          <div className="price">Units Left</div>
                        </div>
                        <div className="product-content text-end">
                          <h3 className="title">
                            <a href="javascript:void(0)">₹10,000</a>
                          </h3>
                          <div className="price">Min. Subscription</div>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <a href="javascript:void(0)" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="javascript:void(0)" className="card-link">
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
                            <a
                              href="javascript:void(0)"
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
              <a href="javascript:void(0)">«</a>
              <a href="javascript:void(0)" className="active">
                1
              </a>
              <a href="javascript:void(0)">»</a>
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
              .filter((details) => details.type === "CSOP")
              .map((details) => (
                <div className="col-md-6 col-sm-12 col-lg-4">
                  <div className="product-grid container1">
                    <div className="product-image">
                      <a href="javascript:void(0)" className="image">
                        <img
                          className="pic-1 image"
                          src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=600"
                        />
                        {/* <img class="pic-2" src="images/img-2.jpg"> */}
                      </a>
                    </div>
                    <div className="main-padding">
                      <div className="d-flex justify-content-between">
                        <div className="product-content">
                          <h3 className="title">
                            <a href="javascript:void(0)">{details.business_name} </a>
                          </h3>
                          <div className="price">Anchor</div>
                        </div>
                        <div className="product-content">
                          <h3 className="title">
                            <a href="javascript:void(0)">45 days </a>
                          </h3>
                          <div className="price">Tenure</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="product-content">
                          <h3 className="title">
                            <a href="javascript:void(0)">50/250 </a>
                          </h3>
                          <div className="price">Units Left</div>
                        </div>
                        <div className="product-content text-end">
                          <h3 className="title">
                            <a href="javascript:void(0)">₹10,000 </a>
                          </h3>
                          <div className="price">Min. Subscription</div>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <a href="javascript:void(0)" className="card-link">
                          💡13.6% Discount Rate
                        </a>
                        <a href="javascript:void(0)" className="card-link">
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
                            <a
                              href="javascript:void(0)"
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
              <a href="javascript:void(0)">«</a>
              <a href="javascript:void(0)" className="active">
                1
              </a>
              <a href="javascript:void(0)">»</a>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <h3 className="featurred">Discounting </h3>
          <h6 className="trending">Short term fixed income opportunities</h6>
          <div className="bar" />

          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-4">
              <div className="product-grid container1">
                <div className="product-image">
                  <a href="javascript:void(0)" className="image">
                    <img
                      className="pic-1 image"
                      src="https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    {/* <img class="pic-2" src="images/img-2.jpg"> */}
                  </a>
                </div>
                <div className="main-padding">
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="javascript:void(0)">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="javascript:void(0)" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="javascript:void(0)" className="card-link">
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
                        <a href="javascript:void(0)" className="button-class">
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
                  <a href="javascript:void(0)" className="image">
                    <img
                      className="pic-1 image"
                      src="https://images.pexels.com/photos/3747140/pexels-photo-3747140.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    {/* <img class="pic-2" src="images/img-2.jpg"> */}
                  </a>
                </div>
                <div className="main-padding">
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="javascript:void(0)">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="javascript:void(0)" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="javascript:void(0)" className="card-link">
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
                        <a href="javascript:void(0)" className="button-class">
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
                  <a href="javascript:void(0)" className="image">
                    <img
                      className="pic-1 image"
                      src="https://images.pexels.com/photos/4065624/pexels-photo-4065624.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    {/* <img class="pic-2" src="images/img-2.jpg"> */}
                  </a>
                </div>
                <div className="main-padding">
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="javascript:void(0)">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="javascript:void(0)" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="javascript:void(0)" className="card-link">
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
                        <a href="javascript:void(0)" className="button-class">
                          proptech
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-end mt-4">
            <div className="pagination">
              <a href="javascript:void(0)">«</a>
              <a href="javascript:void(0)" className="active">
                1
              </a>
              <a href="javascript:void(0)">»</a>
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
                  <a href="javascript:void(0)" className="image">
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
                        <a href="javascript:void(0)">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="javascript:void(0)">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="javascript:void(0)" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="javascript:void(0)" className="card-link">
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
                        <a href="javascript:void(0)" className="button-class">
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
                  <a href="javascript:void(0)" className="image">
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
                        <a href="javascript:void(0)">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="javascript:void(0)">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="javascript:void(0)" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="javascript:void(0)" className="card-link">
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
                        <a href="javascript:void(0)" className="button-class">
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
                  <a href="javascript:void(0)" className="image">
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
                        <a href="javascript:void(0)">Trutech Vision </a>
                      </h3>
                      <div className="price">Anchor</div>
                    </div>
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">45 days </a>
                      </h3>
                      <div className="price">Tenure</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="product-content">
                      <h3 className="title">
                        <a href="javascript:void(0)">50/250 </a>
                      </h3>
                      <div className="price">Units Left</div>
                    </div>
                    <div className="product-content text-end">
                      <h3 className="title">
                        <a href="javascript:void(0)">₹10,000 </a>
                      </h3>
                      <div className="price">Min. Subscription</div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="javascript:void(0)" className="card-link">
                      💡13.6% Discount Rate
                    </a>
                    <a href="javascript:void(0)" className="card-link">
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
                        <a href="javascript:void(0)" className="button-class">
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
              <a href="javascript:void(0)">«</a>
              <a href="javascript:void(0)" className="active">
                1
              </a>
              <a href="javascript:void(0)">»</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard