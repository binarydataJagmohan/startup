import React from 'react'
import Link from 'next/link';
export default function Blog() {
    return (
        <>
            <div className="page-title-area item-bg-1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Blog</h2>
                                <ul>
                                    <li><Link href="/">Home</Link></li>
                                    <li>Blogs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="blog-section pt-100 pb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Startup Investment <span>Success</span> Formula</h2>
                        <p>
                            Seasoned investor never pick low risk project, they know they are risky anyways. They pick high risk. They want someone who can maneuver risks. They want a seasoned veteran who has been there done that. A vision earned with scars. Investor want their money back. 3x return in 2 years, from next round. They invest in the script, not your operation income.</p>
                        <div className="bar" />
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="image">
                                    <Link href="/single-blog">
                                        <img src="assets/img/blog/1.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <span>20 March 2022</span>
                                    <h3>
                                        <Link href="/single-blog">
                                            Latest Developments in the Startup Ecosystem
                                        </Link>
                                    </h3>
                                    <p>The startup ecosystem is constantly evolving, with new players, technologies, and trends emerging all the time. In this blog post, we'll take a look at some of the latest developments in the industry and what they mean for startups.</p>
                                    <Link href="/single-blog" className="read-more">Read More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="image">
                                    <Link href="/single-blog">
                                        <img src="assets/img/blog/2.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <span>23 April 2022</span>
                                    <h3>
                                        <Link href="/single-blog">
                                            Emerging Technologies
                                        </Link>
                                    </h3>
                                    <p>Discuss the latest emerging technologies in the startup space, such as blockchain, artificial intelligence, and the Internet of Things.
                                        Explain how these technologies are being used by startups to solve real-world problems and disrupt traditional industries.</p>
                                    <Link href="/single-blog" className="read-more">Read More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="image">
                                    <Link href="/single-blog">
                                        <img src="assets/img/blog/3.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <span>27 June 2022</span>
                                    <h3>
                                        <Link href="/single-blog">
                                            Funding Trends
                                        </Link>
                                    </h3>
                                    <p>alk about the latest funding trends in the startup world, such as the rise of angel investing and crowdfunding.
                                        Provide some statistics and data on the current state of funding in the industry.<br/><br/><br/></p>
                                    <Link href="/single-blog" className="read-more">Read More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="image">
                                    <Link href="/single-blog">
                                        <img src="assets/img/blog/4.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <span>24 March 2022</span>
                                    <h3>
                                        <Link href="/single-blog">
                                            Regulatory Changes
                                        </Link>
                                    </h3>
                                    <p>Discuss any recent regulatory changes that may impact startups, such as new tax laws or changes to data privacy regulations.
                                        Explain how startups can navigate these changes and stay compliant.<br/><br/></p>
                                    <Link href="/single-blog" className="read-more">Read More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="image">
                                    <Link href="/single-blog">
                                        <img src="assets/img/blog/5.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <span>20 March 2022</span>
                                    <h3>
                                        <Link href="/single-blog">
                                        Choose the Right Platforms
                                        </Link>
                                    </h3>
                                    <p>Explain the importance of choosing the right social media platforms based on your target audience and goals.
Provide some tips on how to evaluate different platforms and decide which ones to focus on.<br/><br/></p>
                                    <Link href="/single-blog" className="read-more">Read More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="image">
                                    <Link href="/single-blog">
                                        <img src="assets/img/blog/6.jpg" alt="image" />
                                    </Link>
                                </div>
                                <div className="content">
                                    <span>17 March 2022</span>
                                    <h3>
                                        <Link href="/single-blog">
                                        Create Engaging Content
                                        </Link>
                                    </h3>
                                    <p>Discuss the importance of creating content that resonates with your target audience and drives engagement.
Provide some tips on how to create compelling social media content, such as using visuals and leveraging user-generated content.</p>
                                    <Link href="/single-blog" className="read-more">Read More</Link>
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
