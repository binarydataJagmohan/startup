import React from "react";

const Footer = () => {
  return (
    <div>
      <section className="footer-section pt-100 pb-70" id="footer-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <div className="footer-heading">
                  <div className="logo" id="logo-id">
                    <a href="/">
                      <img
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          "assets/img/footerlogo.png"
                        }
                        className="black-logo"
                        alt="image"
                      />
                    </a>
                    <p className="text-white">
                      We are dedicated to providing you with innovative
                      investment opportunities that can help you grow your
                      wealth and achieve your financial goals.
                    </p>
                  </div>
                </div>
                <ul className="footer-social">
                  <li>
                    <a href="https://www.facebook.com/">
                      <i className="flaticon-facebook"></i>
                    </a>
                  </li>

                  <li>
                    <a href="https://twitter.com/">
                      <i className="flaticon-twitter"></i>
                    </a>
                  </li>

                  <li>
                    <a href="https://in.pinterest.com/">
                      <i className="flaticon-pinterest"></i>
                    </a>
                  </li>

                  <li>
                    <a href="https://www.instagram.com/">
                      <i className="flaticon-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <div className="footer-heading">
                  <h3 className="text-white mb-4 pb-3">Important Links</h3>
                </div>
                <ul className="footer-quick-links text-white">
                  <li>
                    <a href="/about" className="text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-white">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/blogs" className="text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <div className="footer-heading">
                  <h3 className="text-white mb-4 pb-3">Featured Service</h3>
                </div>
                <ul className="footer-quick-links">
                  <li>
                    <a href="/team" className="text-white">
                      Team
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="text-white">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="/terms-condition" className="text-white">
                      Term & Condition
                    </a>
                  </li>
                  <li>
                    <a href="/privacy-policy" className="text-white">
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <div className="footer-heading">
                  <h3 className="text-white mb-4 pb-3">Contact</h3>
                </div>

                <div className="footer-info-contact">
                  <i className="flaticon-phone-call text-white"></i>
                  <div className="d-md-flex align-items-center">
                    <h3 className="text-white"><strong>Phone :</strong></h3>
                    <span>
                      <a
                        href="tel:+882-569-756"
                        style={{ color: "black" }}
                        className="text-white mx-md-2"
                      >
                        +123(456)123
                      </a>
                    </span>
                  </div>
                </div>

                <div className="footer-info-contact">
                  <i className="flaticon-envelope text-white"></i>

                  <div className="d-md-flex align-items-center">
                    <h3 className="text-white"><strong>Email :</strong></h3>
                    <span>
                      <a
                        href="mailto:support@risingcapitalist.com"
                        style={{ color: "black" }}
                        className="text-white mx-md-2"
                      >
                        <span>support@risingcapitalist.com</span>
                      </a>
                    </span>
                  </div>
                </div>

                <div className="footer-info-contact">
                  <i className="flaticon-pin text-white" ></i>
                  <div className="d-md-flex align-items-center">
                    <h3 className="text-white"><strong>Address :</strong></h3>
                    <span>
                      <a
                        href="https://maps.app.goo.gl/qfUTa7u5qc74X52p9"
                        style={{ color: "#232323" }}
                        className="text-white mx-md-2"
                        target="_blank"
                      >
                        32 st Kilda Road, Melbourne VIC, 3004 Australia
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
