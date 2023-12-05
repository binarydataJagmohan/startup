import React from 'react';
import Link from 'next/link';
export default function ServiceTwo() {
    return (
        <>
            <section className="agency-services-section pt-100 pb-100" id="service-title">
                <div className="container">
                    <div className="section-title">
                        <h2>Consulting <span>Services</span></h2>
                        <p>Get the edge you need to succeed in today's rapidly changing business landscape with our comprehensive consulting services.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/images/agency-services/1.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Market Forecast</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/images/agency-services/2.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Strategic planning</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/images/agency-services/3.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Budget Accounting</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/images/agency-services/4.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Target Marketing</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/images/agency-services/5.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Case Analysis</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/images/agency-services/6.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Strategic Advice</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
