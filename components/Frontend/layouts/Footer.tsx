import React from 'react'

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
                                                src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"}
                                                className="black-logo"
                                                alt="image"
                                            />
                                        </a>
                                        <p>We are dedicated to providing you with innovative investment opportunities that can help you grow your wealth and achieve your financial goals.</p>
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

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <div className="footer-heading">
                                    <h3>Important Links</h3>
                                </div>
                                <ul className="footer-quick-links">
                                    <li>
                                        <a href="/about">About Us</a>
                                    </li>
                                    <li>
                                        <a href="/project-one">Project</a>
                                    </li>
                                    <li>
                                        <a href="/services">Services</a>
                                    </li>
                                    <li>
                                        <a href="/blogs">Blog</a>
                                    </li>
                                    <li>
                                        <a href="/contact">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <div className="footer-heading">
                                    <h3>Featured Service</h3>
                                </div>
                                <ul className="footer-quick-links">
                                    <li>
                                        <a href="/team">Team</a>
                                    </li>
                                    {/* <li>
                                        <a href="/pricing">Pricing</a>
                                    </li> */}
                                    <li>
                                        <a href="/faq">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="/terms-condition">Term & Condition</a>
                                    </li>
                                    <li>
                                        <a href="/privacy-policy">Privacy policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <div className="footer-heading">
                                    <h3>Contact</h3>
                                </div>

                                <div className="footer-info-contact">
                                    <i className="flaticon-phone-call"></i>
                                    <h3>Phone</h3>
                                    <span><a href="tel:+882-569-756" style={{color:"black"}}>+123(456)123</a></span>
                                </div>

                                <div className="footer-info-contact">
                                    <i className="flaticon-envelope"></i>
                                    <h3>Email</h3>
                                    <span><a href="mailto:example@gmail.com" style={{color:"black"}}><span>example@gmail.com</span></a></span>
                                </div>

                                <div className="footer-info-contact">
                                    <i className="flaticon-pin"></i>
                                    <h3>Address</h3>
                                    <span>32 st Kilda Road, Melbourne VIC, 3004 Australia</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    </div>
  )
}

export default Footer
