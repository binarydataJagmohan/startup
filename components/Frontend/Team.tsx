import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
export default function Team() {
    return (
        <>
            {/* <div className="page-title-area item-bg-1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Team</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Team</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <section className="team-section pt-100 pb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Our <span>Expert</span> Team</h2>
                        <p>At our startup and investment website, we are proud to have assembled a team of experts with decades of combined experience in the financial industry. Our team includes professionals from a range of backgrounds, including finance, economics, technology, and more.</p>
                        <div className="bar" />
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="image">
                                    <Image src="assets/img/team/1.jpg" alt="image" width={356} height={478} />
                                    <ul className="social">
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-facebook" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-linkedin" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-instagram" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <h3>Alex Maxwel</h3>
                                    <span>Founder</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="image">
                                    <Image src="assets/img/team/2.jpg" alt="image" width={356} height={478} />
                                    <ul className="social">
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-facebook" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-linkedin" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-instagram" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <h3>Williams Halimton</h3>
                                    <span>Manager</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="image">
                                    <Image src="assets/img/team/3.jpg" alt="image" width={356} height={478} />
                                    <ul className="social">
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-facebook" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-linkedin" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-instagram" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <h3>Juhon Dew</h3>
                                    <span>CEO</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="image">                                    
                                    <Image src="assets/img/team/4.jpg" alt="image" width={356} height={478} />
                                    <ul className="social">
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-facebook" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-linkedin" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-instagram" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <h3>Louis Pasteur</h3>
                                    <span>Marketing Support</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="image">                                    
                                    <Image src="assets/img/team/5.jpg" alt="image" width={356} height={478} />
                                    <ul className="social">
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-facebook" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-linkedin" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-instagram" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <h3>Edmond Halley</h3>
                                    <span>Agent Management</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team-item">
                                <div className="image">                                    
                                    <Image src="assets/img/team/6.jpg" alt="image" width={356} height={478} />
                                    <ul className="social">
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-facebook" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-linkedin" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" target="_blank">
                                                <i className="bx bxl-instagram" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <h3>Brian Cox</h3>
                                    <span>Project Manager</span>
                                </div>
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
                <div className="default-shape">
                    <div className="shape-1">
                    <Image src="assets/img/shape/4.png" alt="image" width={15} height={15}/>
                    </div>
                    <div className="shape-2 rotateme">
                    <Image src="assets/img/shape/5.svg" alt="image" width={22} height={22}/>
                    </div>
                    <div className="shape-3">
                    <Image src="assets/img/shape/6.svg" alt="image" width={21} height={20}/>
                    </div>
                    <div className="shape-4">
                    <Image src="assets/img/shape/7.png" alt="image" width={18} height={18}/>
                    </div>
                    <div className="shape-5">
                    <Image src="assets/img/shape/8.png" alt="image" width={12} height={12}/>
                    </div>
                </div>
            </section>
        </>
    )
}
