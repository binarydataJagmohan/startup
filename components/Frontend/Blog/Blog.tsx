import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { getAllBlogs } from "@/lib/adminapi";
import Image from 'next/image';
import Pagination from '../../../helpers/pagination';


export default function Blog() {

    const [blogs, setAllBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;
    const paginate = (array: any, currentPage: any, pageSize: any) => {
        const startIndex = (currentPage - 1) * pageSize;
        return array.slice(startIndex, startIndex + pageSize);
    };

    const paginatedBlogs = paginate(blogs, currentPage, pageSize);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getAllBlogs()
            .then((res) => {
                setAllBlogs(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>
            <section className="blog-section pt-100 pb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Startup Investment <span>Success</span> Formula</h2>
                        <p>
                            Seasoned investor never pick low risk project, they know they are risky anyways. They pick high risk. They want someone who can maneuver risks. They want a seasoned veteran who has been there done that. A vision earned with scars. Investor want their money back. 3x return in 2 years, from next round. They invest in the script, not your operation income.
                        </p>
                        <div className="bar" />
                    </div>

                    {paginatedBlogs.length > 0 ? (
                        <div className="row">
                            {paginatedBlogs.map((blog: any, index: number) => (
                                <div className="col-lg-4 col-md-6" key={index}>
                                    <div className="single-blog">
                                        <div className="image">
                                            <Link href={`/blog/${blog.slug}`}>
                                                {blog.image ? (
                                                    <Image
                                                        src={
                                                            process.env.NEXT_PUBLIC_IMAGE_URL +
                                                            "images/blogs/" +
                                                            blog.image
                                                        }
                                                        alt="tab-1"
                                                        width={356}
                                                        height={478}
                                                        layout="responsive"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={
                                                            process.env.NEXT_PUBLIC_BASE_URL +
                                                            "/assets/images/placeholder.jpg"
                                                        }
                                                        alt="Default Blog"
                                                        width={356}
                                                        height={478}
                                                        layout="responsive"
                                                    />
                                                )}
                                            </Link>
                                        </div>
                                        <div className="content">
                                            <span>{formatDate(blog.created_at || "")}</span>
                                            <h3>
                                                <Link href={`/blog/${blog.slug}`}>
                                                    {blog.name}
                                                </Link>
                                            </h3>
                                            <p>
                                                <div dangerouslySetInnerHTML={{ __html: blog?.description?.slice(0, 100) ?? "" }} />
                                            </p>
                                            <Link href={`/blog/${blog.slug}`} className="read-more">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-12">
                            <p className="text-center">No Blogs created yet.</p>
                        </div>
                    )}
                </div>
                <div className="pagination-wrapper">
                    <Pagination
                        items={blogs}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        activePage={currentPage}
                    />
                </div>
            </section>
        </>
    )
}
