import React from 'react'
import Link from 'next/link';
export default function ProjectTwo() {
    return (
        <>
            <div className="page-title-area item-bg-1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Projects Two</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Projects Two</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="protfolio-section pt-100 pb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Our <span>Impressive</span> Portfolio</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidiunt labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                        <div className="bar" />
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-protfolio">
                                <div className="image">
                                    <Link href="single-projects.html">
                                        <img src="assets/img/portfolio/1.png" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-projects.html">
                                        <h3>Creative Web Develop</h3>
                                    </Link>
                                    <Link href="single-projects.html">
                                        <span>Web Design</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-protfolio">
                                <div className="image">
                                    <Link href="single-projects.html">
                                        <img src="assets/img/portfolio/2.png" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-projects.html">
                                        <h3>Digital Services</h3>
                                    </Link>
                                    <Link href="single-projects.html">
                                        <span>App Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-protfolio">
                                <div className="image">
                                    <Link href="single-projects.html">
                                        <img src="assets/img/portfolio/3.png" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-projects.html">
                                        <h3>Complex Design</h3>
                                    </Link>
                                    <Link href="single-projects.html">
                                        <span>Software Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-protfolio">
                                <div className="image">
                                    <Link href="single-projects.html">
                                        <img src="assets/img/portfolio/4.png" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-projects.html">
                                        <h3>Creative Web Develop</h3>
                                    </Link>
                                    <Link href="single-projects.html">
                                        <span>React Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-protfolio">
                                <div className="image">
                                    <Link href="single-projects.html">
                                        <img src="assets/img/portfolio/5.png" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-projects.html">
                                        <h3>Digital Services</h3>
                                    </Link>
                                    <Link href="single-projects.html">
                                        <span>E-commerce Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-protfolio">
                                <div className="image">
                                    <Link href="single-projects.html">
                                        <img src="assets/img/portfolio/6.png" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <Link href="single-projects.html">
                                        <h3>Complex Design</h3>
                                    </Link>
                                    <Link href="single-projects.html">
                                        <span>Software Engineering</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
