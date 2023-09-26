import React from 'react'

export default function ServiceDetail() {
    return (
        <>
            {/* <div className="page-title-area item-bg-4">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Services</h2>
                                <ul>
                                    <li><a href="index.html">Home</a></li>
                                    <li>Services Detail</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <section className="services-details-area ptb-100">
                <div className="container">
                    <div className="services-details-video">
                        <div className="details-image">
                            <img src="assets/img/services-details/bg.jpg" alt="image" />
                        </div>
                        <div className="details-video">
                            <a href="https://www.youtube.com/watch?v=gFQNPmLKj1k" className="video-btn popup-youtube">
                                <i className="bx bx-play" />
                            </a>
                        </div>
                        <div className="text">
                            <h3>How investment and startup services are beneficial?</h3>
                            <p>Our services are designed to help people achieve their entrepreneurial goals and financial objectives. These services provide guidance, support, and resources to help individuals and businesses start, grow, and succeed. By leveraging the expertise and experience of investment and startup professionals, people can gain access to a wealth of knowledge and tools to help them make informed decisions, navigate challenges, and seize opportunities. Whether you're looking to launch a new business venture or grow an existing one, investment and startup services can help you achieve your goals and reach new heights of success.</p>
                        </div>
                    </div>
                    <div className="services-details-overview">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-desc">
                                    <h3>Invest Together. Grow Together.</h3>
                                    <p>At our startup firm, we believe that investing together is the key to success. By pooling our resources and expertise, we can support promising startups and help them achieve their full potential. </p>
                                    <div className="features-text">
                                        <h4>Reasons to go with investment</h4>
                                        <p>One of the main reasons to go with investment is access to capital. Investors provide the funds startups need to launch, grow, and scale their businesses.</p>
                                    </div>
                                    <div className="features-text">
                                        <h4>Reasons to go with fundraising</h4>
                                        <p>Fundraising allows startups to tap into the power of community support. By engaging with their customers and fans, startups can raise awareness, build loyalty, and rally support for their mission and vision.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-image">
                                    <img src="assets/img/services-details/1.jpg" alt="image" />
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
                                    <p>Have questions about starting a business or making investments? We've got you covered. Check out our frequently asked questions below for answers to some of the most common questions we receive. </p>
                                    <div className="services-details-accordion">
                                        <ul className="accordion">
                                            <li className="accordion-item">
                                                <a className="accordion-title active" href="#">
                                                    <i className="bx bx-plus" />
                                                    Are there any risks associated with starting a business or making investments?
                                                </a>
                                                <p className="accordion-content show">Yes, there are always risks involved with any business venture or investment. However, by doing your research, seeking advice, and making informed decisions, you can help mitigate those risks and increase your chances of success.</p>
                                            </li>
                                            <li className="accordion-item">
                                                <a className="accordion-title" href="#">
                                                    <i className="bx bx-plus" />
                                                    What should I look for when choosing a service?
                                                </a>
                                                <p className="accordion-content">It's important to look for a service that has a strong track record of success, offers personalized guidance and support, and aligns with your values and goals.</p>
                                            </li>
                                            <li className="accordion-item">
                                                <a className="accordion-title" href="#">
                                                    <i className="bx bx-plus" />
                                                    How do I get started with a startup or investment service?
                                                </a>
                                                <p className="accordion-content">You can typically get started by scheduling a consultation with a service provider, or by exploring their website and resources to learn more about their offerings and approach.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
