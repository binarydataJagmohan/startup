import React from 'react'
import Link from 'next/link';
export default function Pricing() {
    return (
        <>
            <div className="page-title-area item-bg-1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Pricing</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Pricing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="pricing-section pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <h2>Our <span>Pricing</span> Plan</h2>
                        <p>At our startup and investment website, we offer a range of pricing plans designed to meet the needs of businesses and investors of all sizes. Our pricing plans are designed to be affordable and flexible, allowing you to choose the plan that best fits your needs and budget. Here are some of the pricing plans we offer:</p>
                        <div className="bar" />
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-pricing">
                                <div className="pricing-header">
                                    <h3>Basic</h3>
                                    <p>Business Up</p>
                                </div>
                                <div className="price">
                                    <sup>$</sup>29<sub>/mo</sub>
                                </div>
                                <p>
                                Our basic plan is designed for businesses and investors who are just getting started and need a simple, affordable solution. This plan includes access to our trading and investment platform, as well as basic research and analysis tools. Pricing for our basic plan starts at $29 per month.<br/><br/><br/>
                                </p>
                                <div className="price-btn">
                                    <Link href="pricing.html" className="default-btn">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-pricing">
                                <div className="pricing-header">
                                    <h3>Standard</h3>
                                    <p>Business Up</p>
                                </div>
                                <div className="price">
                                    <sup>$</sup>79<sub>/mo</sub>
                                </div>
                                <p>
                                Our standard plan is designed for businesses and investors who require more advanced research. This plan includes access to our trading and investment platform, as well as more advanced research and analysis tools, including real-time market data and news. Pricing for our standard plan starts at $79 per month.<br/><br/>
                                </p>
                                <div className="price-btn">
                                    <Link href="pricing.html" className="default-btn">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                            <div className="single-pricing">
                                <div className="pricing-header">
                                    <h3>Premium</h3>
                                    <p>Business Up</p>
                                </div>
                                <div className="price">
                                    <sup>$</sup>99<sub>/mo</sub>
                                </div>
                                <p>
                                Our premium plan is designed for businesses and investors who require advanced research and analysis tools. This plan includes access to our trading and investment platform, as well as personalized investment advice from our team of experts. Pricing for our premium plan starts at $99.99 per month.
                                </p>
                                <div className="price-btn">
                                    <Link href="pricing.html" className="default-btn">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
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
            </section>
        </>
    )
}
