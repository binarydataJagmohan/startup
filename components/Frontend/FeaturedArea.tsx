import Image from "next/image";

export default function FeaturedArea() {
    return (
        <>
            {/* Start Features Area */}
            <section className="development-area pt-100 pb-100 mb-3 mt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="development-main-section">
                                <div className="development-text">
                                    <h3>For Startups</h3>
                                    <div className="bar" />
                                    <p>
                                        We provide comprehensive range of services to support you at
                                        every stage of your entrepreneurial journey:
                                    </p>
                                </div>
                                <div className="development-content">
                                    <div className="icon mb-3">
                                        <i
                                            className="flaticon-tick"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                lineHeight: "30px",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                backgroundColor: "#088395",
                                            }}
                                        />
                                    </div>
                                    {/* <h3>Investment Research</h3> */}
                                    <p>
                                        Raise funds from investors in the form of preferred shares or
                                        debentures
                                    </p>
                                </div>
                                <div className="development-content">
                                    <div className="icon bg-05dbcf">
                                        <i
                                            className="flaticon-tick"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                lineHeight: "30px",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                backgroundColor: "#088395",
                                            }}
                                        />
                                    </div>
                                    {/* <h3>Investment Management</h3> */}
                                    <p>Working capital funding through invoice discounting</p>
                                </div>
                                <div className="development-content">
                                    <div className="icon bg-fec66f">
                                        <i
                                            className="flaticon-tick"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                lineHeight: "30px",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                backgroundColor: "#088395",
                                            }}
                                        />
                                    </div>
                                    {/* <h3>Online Investment</h3> */}
                                    <p>
                                        CFO services including financial planning and analysis,
                                        financials, and tax compliance
                                    </p>
                                </div>
                                <div className="development-content">
                                    <div className="icon bg-fec66f">
                                        <i
                                            className="flaticon-tick"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                lineHeight: "30px",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                backgroundColor: "#088395",
                                            }}
                                        />
                                    </div>
                                    {/* <h3>Online Investment</h3> */}
                                    <p>
                                        Legal assistance with a variety of matters, such as drafting
                                        and negotiating contracts, shareholder agreement, reviewing
                                        term sheets, and complying with regulatory requirements
                                    </p>
                                </div>
                                <div className="development-content">
                                    <div className="icon bg-fec66f">
                                        <i
                                            className="flaticon-tick"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                lineHeight: "30px",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                backgroundColor: "#088395",
                                            }}
                                        />
                                    </div>
                                    {/* <h3>Online Investment</h3> */}
                                    <p>Registered valuer and merchant banker valuation reports</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-group-image">
                                <Image className="image shake-y" src="assets/images/about/about-22.jpg" alt="Image" height={636} width={622} />
                                <Image className="shape-one pulse" src="assets/images/about/about-2.png" alt="Image" height={160} width={169} />
                                <Image className="shape-two pulse" src="assets/images/about/about-3.png" alt="Image" height={230} width={140} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*========== About Section Start ==============*/}
            <section className="tj-about-section pt-100 pb-100 mb-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-0 order-last">
                            <div className="about-group-image">
                                <Image className="image shake-y" src="assets/images/about/about-1.jpg" alt="Image" height={636} width={622} />
                                <Image className="shape-one pulse" src="assets/images/about/about-2.png" alt="Image" height={160} width={169} />
                                <Image className="shape-two pulse" src="assets/images/about/about-3.png" alt="Image" height={230} width={140} />
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-0 order-first">
                            <div className="development-text">
                                <h3>For Investors</h3>
                                <div className="bar" />
                            </div>
                            <div className="development-content">
                                <div className="icon mb-3">
                                    <i
                                        className="flaticon-tick"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            lineHeight: "30px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            backgroundColor: "#088395",
                                        }}
                                    />
                                </div>

                                <p>
                                    Engage with a spectrum of innovative startups seeking
                                    investment opportunities
                                </p>
                            </div>
                            <div className="development-content">
                                <div className="icon bg-05dbcf">
                                    <i
                                        className="flaticon-tick"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            lineHeight: "30px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            backgroundColor: "#088395",
                                        }}
                                    />
                                </div>

                                <p>Transact through our proprietary digital platform</p>
                            </div>
                            <div className="development-content">
                                <div className="icon bg-fec66f">
                                    <i
                                        className="flaticon-tick"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            lineHeight: "30px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            backgroundColor: "#088395",
                                        }}
                                    />
                                </div>

                                <p>Manage portfolio of startup investments</p>
                            </div>
                            <div className="development-content">
                                <div className="icon bg-fec66f">
                                    <i
                                        className="flaticon-tick"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            lineHeight: "30px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            backgroundColor: "#088395",
                                        }}
                                    />
                                </div>

                                <p>Get regular updates on the performance of the startups</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}