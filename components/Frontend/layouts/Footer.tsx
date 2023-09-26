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
                                                src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"}
                                                className="black-logo"
                                                alt="image"
                                                width={150}
                                                height={70}
                                            />
                                        </Link>
                                        <p>We are dedicated to providing you with innovative investment opportunities that can help you grow your wealth and achieve your financial goals.</p>
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

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <div className="footer-heading">
                                    <h3>Important Links</h3>
                                </div>
                                <ul className="footer-quick-links">
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>
                                    {/* <li>
                                        <Link href="/project-one">Project</Link>
                                    </li> */}
                                    <li>
                                        <Link href="/services">Services</Link>
                                    </li>
                                    <li>
                                        <Link href="/blogs">Blog</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact</Link>
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
                                        <Link href="/team">Team</Link>
                                    </li>
                                    {/* <li>
                                        <Link href="/pricing">Pricing</Link>
                                    </li> */}
                                    <li>
                                        <Link href="/faq">FAQ</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-condition">Term & Condition</Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">Privacy policy</Link>
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
                                    <span><Link href="tel:+882-569-756" style={{ color: "black" }}>+123(456)123</Link></span>
                                </div>

                                <div className="footer-info-contact">
                                    <i className="flaticon-envelope"></i>
                                    <h3>Email</h3>
                                    <span><Link href="mailto:example@gmail.com" style={{ color: "black" }}><span>example@gmail.com</span></Link></span>
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
