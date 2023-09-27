import React from 'react';
import Link from 'next/link';
export default function ServiceTwo() {
    return (
        <>
            {/* <div className="page-title-area item-bg-2">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Services</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Services II</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
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
                                        <img src="assets/img/agency-services/1.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Market Forecast</h3>
                                    </Link>
                                    {/* <Link href="single-services.html">
                                        <span>Web Design</span>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/img/agency-services/2.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Strategic planning</h3>
                                    </Link>
                                    {/* <Link href="single-services.html">
                                        <span>Agency</span>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/img/agency-services/3.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Budget Accounting</h3>
                                    </Link>
                                    {/* <Link href="single-services.html">
                                        <span>Solutions</span>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/img/agency-services/4.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Target Marketing</h3>
                                    </Link>
                                    {/* <Link href="single-services.html">
                                        <span>Analysis</span>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/img/agency-services/5.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Case Analysis</h3>
                                    </Link>
                                    {/* <Link href="single-services.html">
                                        <span>Marketing</span>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-agency">
                                <div className="image">
                                    <Link href="single-services.html">
                                        <img src="assets/img/agency-services/6.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-services.html">
                                        <h3>Strategic Advice</h3>
                                    </Link>
                                    {/* <Link href="single-services.html">
                                        <span>Explanation</span>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-12 col-md-12">
                            <div className="pagination-area">
                                <Link href="#" className="prev page-numbers">
                                    <i className="flaticon-left" />
                                </Link>
                                <Link href="#" className="page-numbers">1</Link>
                                <span className="page-numbers current" aria-current="page">2</span>
                                <Link href="#" className="page-numbers">3</Link>
                                <Link href="#" className="page-numbers">4</Link>
                                <Link href="#" className="next page-numbers">
                                    <i className="flaticon-right" />
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
