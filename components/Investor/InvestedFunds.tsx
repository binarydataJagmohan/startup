import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { getAllInvestedFundDetails } from "@/lib/investorapi";
import { getCurrentUserData } from "../../lib/session";
import Link from 'next/link';
import { useRouter } from "next/router";
interface UserData {
    role?: any;
}
const InvestedFunds = () => {
    const [openBusinessDetails, setOpenBusinessDetails] = useState<any>([]);
    const fetchData = async () => {
        try {
            const current_user_data: any = getCurrentUserData()
            const data = await getAllInvestedFundDetails({ id: current_user_data.id });
            if (data) {
                const openDetails = data.data.filter(
                    (details: any) => details.status === "open"
                );
                setOpenBusinessDetails(openDetails);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const router = useRouter();
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data.role !== 'investor') {
            router.back();
        }
        fetchData();
    }, []);

    return (
        <>
            <section className="invertor-campaign">
                <div className="container py-5">
                    <h3 className="featurred">Purchased Funds</h3>
                    <h6 className="trending">Invested in Startup Funds</h6>
                    <div className="bar" />
                    <div className="row g-4" style={{ cursor: "pointer" }}>
                        {openBusinessDetails.map((details: any, index: any) => (
                            <div className="col-md-6 col-sm-12 col-lg-4" key={index} >
                                <div className="product-grid container1 transtion">
                                    <div className="product-image">
                                        <Link href="javascript:void(0)" className="image">
                                            {details.logo ? (
                                                <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + 'docs/' + details.logo} alt="business-logo" width={416} height={140} />
                                            ) : (
                                                <Image src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small/placeholder.jpg'} alt="business-logo" width={416} height={140} />
                                            )
                                            }
                                        </Link>
                                    </div>
                                    <div className="main-padding" style={{ cursor: "pointer " }}>
                                        <div className="d-flex justify-content-between">
                                            <div className="product-content">
                                                <h3 className="title">
                                                    <Link href="javascript:void(0)">
                                                        {details.business_name}{" "}
                                                    </Link>
                                                </h3>
                                                <div className="price">Anchor</div>
                                            </div>
                                            <div className="product-content">
                                                <h3 className="title text-end">
                                                    <Link href="javascript:void(0)">{details.tenure}</Link>
                                                </h3>
                                                <div className="price">Tenure</div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="product-content">
                                                <h3 className="title">
                                                    <Link href="javascript:void(0)">
                                                        {details.no_of_units}{" "}
                                                    </Link>
                                                </h3>
                                                <div className="price">Units Purchased</div>
                                            </div>
                                            <div className="product-content text-end">
                                                <h3 className="title">
                                                    <Link href="javascript:void(0)">₹{details.amount}</Link>
                                                </h3>
                                                <div className="price">Paid Amount</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container mb-3">
                    <div className="text-end">
                        <div className="pagination">
                            <Link href="javascript:void(0)">«</Link>
                            <Link href="javascript:void(0)" className="active">
                                1
                            </Link>
                            <Link href="javascript:void(0)">»</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InvestedFunds;