import React from 'react'
import Link from 'next/link';
export default function ProjectDetails() {
    return (
        <>
            <div className="page-title-area item-bg-5">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Projects</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Single Projects</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="project-details-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="project-details-image">
                                <img src="assets/img/services-details/4.jpg" alt="projects" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="project-details-image">
                                <img src="assets/img/services-details/img1.jpg" alt="projects" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="projects-details-desc">
                                <h3>Competitor Analysis</h3>
                                <p>Lorem ipsum dolor sit amet, conse cte tuer adipiscing elit, sed diam no nu m nibhie eui smod. Facil isis atve eros et accumsan etiu sto odi dignis sim qui blandit praesen lup ta de er. At molestiae appellantur pro. Vis wisi oportere per ic ula ad, ei latine prop riae na, mea cu purto debitis.</p>
                                <div className="features-text">
                                    <h4><i className="flaticon-tick" /> Core Development</h4>
                                    <p>No fake products and services. The customer is king, their lives and needs are the inspiration.</p>
                                </div>
                                <div className="features-text">
                                    <h4><i className="flaticon-tick" /> Define Your Choices</h4>
                                    <p>No fake products and services. The customer is king, their lives and needs are the inspiration.</p>
                                </div>
                                <p>Nost rud no eos, no impedit dissenti as mea, ea vide labor amus neglegentur vix. Ancillae intellegat vix et. Sit causae laoreet nolu ise. Ad po exerci nusquam eos te. Cu altera expet enda qui, munere oblique theo phrastu ea vix. Ne nec modus civibus modera tius, sit ei lorem doctus. Ne docen di verterem reformidans eos. Cu altera expetenda qui, munere oblique theophr astus ea vix modus civiu mod eratius.</p>
                                <div className="project-details-info">
                                    <div className="single-info-box">
                                        <h4>Client</h4>
                                        <span>James Anderson</span>
                                    </div>
                                    <div className="single-info-box">
                                        <h4>Category</h4>
                                        <span>Network, Marketing</span>
                                    </div>
                                    <div className="single-info-box">
                                        <h4>Date</h4>
                                        <span>February 28, 2022</span>
                                    </div>
                                    <div className="single-info-box">
                                        <h4>Share</h4>
                                        <ul className="social">
                                            <li><Link href="https://www.facebook.com/" target="_blank"><i className="flaticon-facebook" /></Link></li>
                                            <li><Link href="https://twitter.com/" target="_blank"><i className="flaticon-twitter" /></Link></li>
                                            <li><Link href="https://in.pinterest.com/" target="_blank"><i className="flaticon-pinterest" /></Link></li>
                                            <li><Link href="https://www.instagram.com/" target="_blank"><i className="flaticon-instagram" /></Link></li>
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
