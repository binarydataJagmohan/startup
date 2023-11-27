import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
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
                    <Link href="/">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          "assets/img/footerlogo.png"
                        }
                        className="black-logo"
                        alt="image"
                        height={68}
                        width={190}
                      />
                    </Link>
                    <p className="text-white">
                      We are dedicated to providing you with innovative
                      investment opportunities that can help you grow your
                      wealth and achieve your financial goals.
                    </p>
                  </div>
                </div>
                <ul className="footer-social">
                  <li>
                    <Link href="https://www.facebook.com/">
                      <i className="flaticon-facebook"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://twitter.com/">
                      <i className="flaticon-twitter"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://in.pinterest.com/">
                      <i className="flaticon-pinterest"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://www.instagram.com/">
                      <i className="flaticon-instagram"></i>
                    </Link>
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
                    <Link href="/about" className="text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-white">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white">
                      Contact
                    </Link>
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
                    <Link href="/team" className="text-white">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-white">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-condition" className="text-white">
                      Term & Condition
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-white">
                      Privacy policy
                    </Link>
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
                  <div className="d-md-flex">
                    <h3 className="text-white"><strong>Phone :</strong></h3>
                    <span>
                      <Link
                        href="tel:+882-569-756"
                        style={{ color: "black" }}
                        className="text-white"
                      >
                        +123(456)123
                      </Link>
                    </span>
                  </div>
                </div>

                <div className="footer-info-contact">
                  <i className="flaticon-envelope text-white"></i>

                  <div className="d-md-flex">
                    <h3 className="text-white"><strong>Email :</strong></h3>
                    <span>
                      <Link
                        href="mailto:support@risingcapitalist.com"
                        style={{ color: "black" }}
                        className="text-white"
                      >
                        <span>support@risingcapitalist.com</span>
                      </Link>
                    </span>
                  </div>
                </div>

                <div className="footer-info-contact">
                  <i className="flaticon-pin text-white" ></i>
                  <div className="d-md-flex">
                  <h3 className="text-white"><strong>Address :</strong></h3>
                    <span>
                      <Link
                        href="https://maps.app.goo.gl/qfUTa7u5qc74X52p9"
                        style={{ color: "#232323" }}
                        className="text-white"
                        target="_blank"
                      >
                        Shop 13 Trishul Terraces, Sector 20, Koparkhairne, Thane, Maharashtra – 400709
                      </Link>
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
