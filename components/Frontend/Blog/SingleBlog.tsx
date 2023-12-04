import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'next-share';


interface Blog {
    name: string;
    description: string;
    slug: string;
    image: string;
    author_name: string;
    meta_desc: string;
    meta_tag: string;
    created_at: string;
    tag: string;
}


export default function SingleBlog(props: any) {


    const [blog, setBlog] = useState<Blog | null>(null);
    const [blogs, setAllBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        if (props) {
            setBlog(props.singleblog.data);
            setAllBlogs(props.blog.data);
        }
    }, [props]);


    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
    };

    const router = useRouter();
    const { slug } = router.query;
    return (
        <>
            <section className="blog-section pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="blog-details-desc">
                                <div className="article-image">
                                    {blog?.image ? (
                                        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}images/blogs/${blog.image}`} alt={`${blog?.name} - Rising Capitalist`} width={736} height={504} layout="responsive" style={{ height: "300px" }} />
                                    ) : (
                                        <Image src={process.env.NEXT_PUBLIC_BASE_URL + "/assets/images/placeholder.jpg"} alt={`${blog?.name} - Rising Capitalist`} width={736} height={504} layout="responsive" />
                                    )}
                                </div>
                                <div className="article-content">
                                    <div className="entry-meta" style={{ marginTop: "20px" }}>
                                        <ul>
                                            <li>
                                                <span>Posted On: </span>
                                                <Link href="#"> {formatDate(blog?.created_at || "")}</Link>
                                            </li>
                                            <li>
                                                <span>Posted By: </span>
                                                <Link href="#">  {blog?.author_name}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3>Welcome to our blog - your source for insights and inspiration!</h3>
                                    <p>Welcome to our blog! We're excited to share our knowledge, experience, and insights with you, and help you navigate the ever-changing landscape of business and entrepreneurship. Whether you're a startup founder, a small business owner, or just someone interested in the world of business, our blog has something for everyone.</p>
                                    <blockquote className="wp-block-quote">
                                        <p>"Insights and Inspiration for Business and Entrepreneurship"</p>
                                        <cite>Tom Cruise</cite>
                                    </blockquote>
                                    <p>
                                        <div dangerouslySetInnerHTML={{ __html: blog?.description ?? "" }} />

                                    </p>
                                </div>
                                <div className="article-footer">
                                    <div className="article-share d-flex">
                                        <ul className="social set-icon-social">
                                            <li><span>Share:</span></li>
                                            <li>
                                                <FacebookShareButton
                                                    url={`${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`}
                                                >
                                                    <li><Link href="#" style={{ fontSize: '15px' }}><i className="flaticon-facebook"></i></Link></li>
                                                </FacebookShareButton>
                                            </li>
                                            <li>
                                                <TwitterShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`}>
                                                    <li><Link href="#">
                                                        <i className="flaticon-twitter"></i>
                                                    </Link></li>
                                                </TwitterShareButton>
                                            </li>
                                            <li>
                                                <LinkedinShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`}>
                                                    <li><Link href="#" ><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                                </LinkedinShareButton>
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
