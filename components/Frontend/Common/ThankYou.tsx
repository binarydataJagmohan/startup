import React from "react";

const Thankyou = () => {
  return (
    <>
      {/* Start Preloader Area */}
      <div className="preloader">
        <div className="preloader">
          <span />
          <span />
        </div>
      </div>
      {/* End Preloader Area */}
      {/* Start Error Area */}
      <section className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="error-content">
                <h1>
                  thank <span className="color-span">you</span>
                </h1>
                <div className="bar" />
                <h3>Please Verify Your Email!</h3>
                <p>
                  The page you are looking for might have been removed had its
                  name changed or is temporarily unavailable. The page you are
                  looking for might have been removed had its name changed or is
                  temporarily unavailable.
                </p>
                <a href="#;" className="default-btn">Resend Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Thankyou;
