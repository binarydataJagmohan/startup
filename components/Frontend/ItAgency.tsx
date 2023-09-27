import React from "react";
import Link from 'next/link';
const It = () => {
  return (
    <>
      {/* Start Services Area */}
      <section className="services-section bg-color pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>
              Our team of experienced investment professionals will work with you to develop a customized investment strategy that aligns with your risk tolerance, time horizon, and financial objectives.
            </p>
            <div className="bar" />
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <Link href="/company-incorporation" className="read-btn">
                <div className="single-services">
                  <div className="icon">
                    <i className="flaticon-it" />
                  </div>
                  <h3>Company Incorporation</h3>
                  <p>
                    Company incorporation services for investment projects typically refer to the process of legally registering a new company or business entity for the purpose of carrying out a specific investment project.
                  </p>
                  Read More
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="/business-planning" className="read-btn">
                <div className="single-services">
                  <div className="icon">
                    <i className="flaticon-setting" />
                  </div>
                  <h3>Business Planning</h3>
                  <p>
                    Business Planning services are tailored to meet the unique needs of each investment project. We provide a range of services, including feasibility studies, market research, financial modeling, and risk assessment.
                  </p>
                  Read More
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="/website-development" className="read-btn">
                <div className="single-services">
                  <div className="icon">
                    <i className="flaticon-promotion" />
                  </div>
                  <h3>Website Development</h3>
                  <p>
                    In today's digital age, having a strong online presence is crucial for the success of any investment project. A well-designed and user-friendly website can help attract potential investors, build brand awareness, and showcase your investment opportunities in a professional manner.
                  </p>
                  Read More
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="/app-development" className="read-btn">
                <div className="single-services">
                  <div className="icon">
                    <i className="flaticon-cellphone" />
                  </div>
                  <h3>App Development</h3>
                  <p>
                    App development services are designed to help your investment project succeed in the digital age. We specialize in creating custom apps that meet the unique needs of our clients, whether you're launching a new investment platform or looking to streamline your existing operations.
                  </p>
                  Read More
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="/marketing-branding" className="read-btn">
                <div className="single-services">
                  <div className="icon">
                    <i className="flaticon-shopping-cart" />
                  </div>
                  <h3>Marketing and Branding</h3>
                  <p>
                    Marketing and branding services play a crucial role in the success of any business, especially for investment projects. Our team of experts specializes in developing effective marketing strategies that will help your business reach its target audience and stand out from competitors.
                  </p>
                  Read More
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link href="/cfo-services" className="read-btn">
                <div className="single-services">
                  <div className="icon">
                    <i className="flaticon-optimize" />
                  </div>
                  <h3>CFO Services</h3>
                  <p>
                    CFO (Chief Financial Officer) Services are an integral part of any successful business. It involves managing the financial aspects of a company and providing financial advice to help the company grow and make sound investment decisions.
                  </p>
                  Read More
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="default-shape">
          <div className="shape-1">
            <img src="assets/img/shape/4.png" alt="image" />
          </div>
          <div className="shape-2 rotateme">
            <img src="assets/img/shape/5.svg" alt="image" />
          </div>
          <div className="shape-3">
            <img src="assets/img/shape/6.svg" alt="image" />
          </div>
          <div className="shape-4">
            <img src="assets/img/shape/7.png" alt="image" />
          </div>
          <div className="shape-5">
            <img src="assets/img/shape/8.png" alt="image" />
          </div>
        </div>
        <div className="services-shape">
          <img src="assets/img/cloud.png" className="white-image" alt="image" />
          {/* <img
            src="assets/img/cloud-2.png"
            className="black-image"
            alt="image"
          /> */}
        </div>
      </section>
      {/* End Services Area */}
    </>
  );
};

export default It;