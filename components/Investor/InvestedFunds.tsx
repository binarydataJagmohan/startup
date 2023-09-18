import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getAllInvestedFundDetails,getSingleBusinessDetails} from "@/lib/investorapi";

const InvestedFunds = () => {
    const router = useRouter();
    const [businessDetails, setBusinessDetails] = useState<any>([]);
    const [openBusinessDetails, setOpenBusinessDetails] = useState<any>([]);
    const fetchData = async () => {
        try {
            const data = await getAllInvestedFundDetails({});
            if (data) {
                setBusinessDetails(data.data);
                const openDetails = data.data.filter((details:any)=> details.status === 'open');
                setOpenBusinessDetails(openDetails);
                console.log(openDetails);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getBusinessdetails = (e: any, id: any) => {
        e.preventDefault();
        alert(id)
        getSingleBusinessDetails(id).then((res) => {
            router.push(`payment-detail?id=${id}`);
          });
      };
    return (
        <>
            <section className="invertor-campaign">
                <div className="container py-5">
                    <h3 className="featurred">Purchased Funds</h3>
                    <h6 className="trending">Invested in Startup Funds</h6>
                    <div className="bar" ></div>
                    <div className="row">
                    {openBusinessDetails.map((details: any ,index:any) => (
                        <div className="col-md-6 col-sm-12 col-lg-4 mb-3" key="index">
                            <div className="product-grid container1">
                                <div className="product-image">
                                    <a href="javascript:void(0)" className="image">
                                        <img className="pic-1 image" src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + details.logo} />
                                        {/* <img class="pic-2" src="images/img-2.jpg"> */}
                                    </a>
                                </div>
                                <div className="main-padding">
                                    <div className="d-flex justify-content-between">
                                        <div className="product-content">
                                            <h3 className="title"><a href="javascript:void(0)">{details.business_name} </a></h3>
                                            <div className="price">Anchor</div>
                                        </div>
                                        <div className="product-content">
                                            <h3 className="title"><a href="javascript:void(0)">{details.tenure}</a></h3>
                                            <div className="price">Tenure</div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="product-content">
                                            <h3 className="title"><a href="javascript:void(0)">{details.investor_no_of_units} </a></h3>
                                            <div className="price">Units Purchased</div>
                                        </div>
                                        <div className="product-content text-end">
                                            <h3 className="title"><a href="javascript:void(0)">₹{details.amount}</a></h3>
                                            <div className="price">Paid Amount</div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        {/* <a href="javascript:void(0)" className="card-link">💡13.6% Discount Rate</a> */}
                                        <a href="javascript:void(0)" onClick={(e) => getBusinessdetails(e, details.bid)} className="card-link"><span className='fa fa-eye'>View Invoice</span></a>
                                    </div>
                                </div>
                                {/* <div className="overlay">
                                    <div className="columns">
                                        <ul className="price">
                                            <li>Subscribers <span>32</span></li>
                                            <li>Average Amount Per Subscriber <span>₹12,000</span></li>
                                            <li>Minimum Subscription <span>₹12,000</span></li>
                                            <li>Closes in <span>20 days</span></li>
                                            <li><a href="javascript:void(0)" className="button-class">proptech</a></li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                           ))}
                    </div>
                </div>
                <div className="container mb-3">
                    <div className="text-end">
                        <div className="pagination">
                            <a href="javascript:void(0)">«</a>
                            <a href="javascript:void(0)" className="active">1</a>
                            <a href="javascript:void(0)">»</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InvestedFunds