import Link from 'next/link'
import React from 'react'

export default function serviceThree() {
    return (
        <>
            {/* <div className="page-title-area item-bg-4">
                <div className="d-table">
                    <div className="d-table-cell service-title">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Website Development</h2>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li>Website Development</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className='Services-box ser-banner-5'>
            <div className='bg-overlay'>
                <div className="container">
                <h3>Website Development Services for Investment Projects</h3>
                <p>A well-designed website is critical to the success of any business, and this is especially true for investment projects. A website is often the first point of contact that potential investors have with your project, and it can be a powerful tool for generating interest and building trust.</p>
                </div>
             </div>
            </section>

            <section className="services-details-area ptb-50">
                <div className="container">
                    {/* <div className="services-details-video">
                        <div className="details-image">
                            <img src="assets/img/services-details/Website-Development.png" alt="image" />
                        </div>
                        {  <div className="details-video">
                            <a href="https://www.youtube.com/watch?v=gFQNPmLKj1k" className="video-btn popup-youtube">
                                <i className="bx bx-play" />
                            </a>
                        </div>  }
                        <div className="text">
                            <h3>Website Development Services for Investment Projects</h3>
                            <p>A well-designed website is critical to the success of any business, and this is especially true for investment projects. A website is often the first point of contact that potential investors have with your project, and it can be a powerful tool for generating interest and building trust.</p>
                        </div>
                    </div> */}
                    <div className="services-details-overview">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-desc">
                                    <h3>Our website development services include:</h3>
                                    <p>development a company offers several benefits to investment projects, including:</p>
                                    <ul>
                                    <li><p>Custom website design</p></li>
                                        <li><p>User experience optimization</p></li>
                                        <li><p>Website maintenance</p></li>
                                        <li><p>Responsive design</p></li>
                                        <li><p>Website Design and Development</p></li>
                                        <li><p>Content Management System</p></li>
                                        <li><p>E-Commerce Functionality</p></li>
                                        <li><p>Search Engine Optimization </p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-image">
                                    <img src="assets/img/services-details/Website-Development-single.jpg" alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="services-details-overview">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-image">
                                    <img src="assets/img/services-details/2.jpg" alt="image" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-desc">
                                    <h3>FAQ's</h3>
                                    <p>Have questions about Company Incorporation services in investment projects? We've got you covered. Check out our frequently asked questions below for answers to some of the most common questions we receive. </p>
                                    <div className="services-details-accordion">
                                        <ul className="accordion">
                                            <li className="accordion-item">
                                                <a className="accordion-title active" href="#">
                                                    <i className="bx bx-plus" />
                                                    What is Company Incorporation?
                                                </a>
                                                <p className="accordion-content show">Company incorporation is the process of legally establishing a new business entity by registering it with the government.</p>
                                            </li>
                                            <li className="accordion-item">
                                                <a className="accordion-title" href="#">
                                                    <i className="bx bx-plus" />
                                                    Why is it important to incorporate a company?
                                                </a>
                                                <p className="accordion-content">Incorporating a company gives it a separate legal existence from its owners and limits their personal liability for business debts and obligations. It also enhances the credibility of the business and makes it easier to raise funds from investors.</p>
                                            </li>
                                            <li className="accordion-item">
                                                <a className="accordion-title" href="#">
                                                    <i className="bx bx-plus" />
                                                    What are the benefits of incorporating a company for an investment project?
                                                </a>
                                                <p className="accordion-content">Incorporating a company for an investment project provides various benefits such as limited liability protection, ease of raising capital, enhanced credibility, tax benefits, and perpetual existence.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                            <div className="send-btn text-center mt-5">
                            <Link href="/contact"><button className="default-btn">Contact-us</button></Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
