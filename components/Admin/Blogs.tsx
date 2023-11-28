import React, { useState, useEffect, useRef } from 'react'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import PopupModal from "../../components/commoncomponents/PopupModal";
import dynamic from 'next/dynamic';
import { EditAndSaveBlogData, getAllBlogs, deleteblog } from "@/lib/adminapi";
import { getCurrentUserData } from "../../lib/session";
import swal from "sweetalert";
import Image from 'next/image';


const TextEditor = dynamic(() => import("./TextEditor"), {
    ssr: false,
});

interface Blogs {
    name?: string;
    slug?: string;
    author_name?: string;
    tag?: string;
    description?: string;
    image?: string;
    author_image?: string;
    meta_tag?: string;
    meta_desc?: string;
    created_by_id?: string;
    created_at?: string;
    id?: string;
    blog_category_id?: string;
}


export default function Blogs() {
    const tableRef = useRef(null);
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    const [blog_id, setBlogId] = useState("");
    const [name, setBlogName]: any = useState("");
    const [authorname, setBlogAuthorName] = useState("");
    const [previewImage, setPreviewImage]: any = useState("");
    const [image, setBlogImage]: any = useState("");
    const [authorimage, setAuthorImage]: any = useState("");
    const [slug, setBlogSlug] = useState("");
    const [meta_tag, setBlogMetaTag] = useState("");
    const [meta_desc, setBlogMetaDesc] = useState("");
    const [tag, setBlogTag] = useState("");
    const [description, setBlogDesc] = useState<string>("");
    const [savingBlog, setSavingBlog] = useState<boolean>(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [authorImageError, setAuthorImageError] = useState('');
    const [startUpLogoError, setStartupLogoError] = useState('');
    const [blogImageError, setBlogImageError] = useState('');
    const [blogUpImageError, setBlogupImageError] = useState('');
    const [blogs, setAllBlogs] = useState<Blogs[]>([]);

    const [showAuthorImage, setShowAuthorImage] = useState(true);
    const [newblogauthorimage, setBlogNewAuthorImage] = useState("");
    const [newblogimage, setBlogNewImage] = useState("");
    const [showImage, setShowImage] = useState(true);
    const [previewAuthorImage, setPreviewAuthorImage]:any = useState("");


    const modalConfirmClose = () => {
        setModalConfirm(false);
    };


    useEffect(() => {
        if (blogs.length > 0 && !dataTableInitialized) {
            $(document).ready(() => {
                $('#datatable').DataTable({
                    lengthMenu: [10, 25, 50, 75, 100],
                    retrieve: true,
                    paging: false,
                    columnDefs: [
                        { targets: [0, 1, 2], orderable: true },
                        { targets: '_all', orderable: false },
                    ],
                });
                setDataTableInitialized(true);
            });
        }
    }, [blogs, dataTableInitialized]);

    useEffect(() => {
        fetchBlogData();
    }, [])

    const fetchBlogData = async () => {
        try {
            const response = await getAllBlogs();
            setAllBlogs(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const handlBlogSubmit = async (event: any) => {
        event.preventDefault();
        setSavingBlog(true);
        try {
            const currentUserData: any = getCurrentUserData();
            const data = {
                id: blog_id,
                name: name,
                slug: slug,
                author_name: authorname,
                // tag: tag,
                description: description,
                meta_tag: meta_tag,
                meta_desc: meta_desc,
                created_by_id: currentUserData.id,
            };
            const res = await EditAndSaveBlogData(data, image, authorimage);
            setSavingBlog(false);
            if ((res.status = true)) {
                setModalConfirm(false);
                fetchBlogData();
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });

            } else {

            }
        } catch (err) {
            setSavingBlog(false);
            console.log(err);
        }
    };

    const handleEdit = (id: any) => {
        const blog = blogs.find((record) => record.id === id);
        if (blog) {
            const {
                name,
                slug,
                author_name,
                tag,
                meta_tag,
                meta_desc,
                description,
                image: existingImage,
                author_image: existingAuthorImage,
            } = blog;
            setBlogName(name || "");
            setBlogSlug(slug || "");
            setBlogAuthorName(author_name || "");
            setBlogTag(tag || "");
            setBlogMetaTag(meta_tag || "");
            setBlogMetaDesc(meta_desc || "");
            setBlogDesc(description || "");
            setBlogId(id);
            toast.dismiss();

            if (existingImage) {
                setShowImage(false);
                setBlogNewImage(existingImage);
                
                setPreviewImage(existingImage); // Assuming `existingImage` is a URL
            } else {
                setShowImage(true);
                setBlogNewImage("");
                setPreviewImage(""); // Clear the preview if no existing image
            }
    
            // Handle existing author image
            if (existingAuthorImage) {
                setShowAuthorImage(false);
                setBlogNewAuthorImage(existingAuthorImage);
                setPreviewAuthorImage(existingAuthorImage); // Assuming `existingAuthorImage` is a URL
            } else {
                setShowAuthorImage(true);
                setBlogNewAuthorImage("");
                setPreviewAuthorImage(""); // Clear the preview if no existing author image
            }
            // Open the modal after setting the blog data
            setModalConfirm(true);
        }
    };




    const handledeleteblog = (id: any) => {
        swal({
            title: "Are you sure?",
            text: "You want to delete the Blog",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes, I am sure!"],
        }).then((willDelete) => {
            if (willDelete) {
                const data = {
                    id: id,
                };
                deleteblog(data)
                    .then((res) => {
                        if (res.status === true) {
                            toast.success(res.message, {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                            fetchBlogData();
                        } else {
                            console.log("Deletion failed");
                        }
                    })
                    .catch(() => {
                        // Handle error
                    });
            } else {
                console.log("Deletion failed");
            }
        });
    };

    const handleBlogdesc = (blogdesc: string) => {
        setBlogDesc(blogdesc);
    };


    const handleAuthorImage = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 2 * 1024 * 1024;
            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPreviewAuthorImage(reader.result); // Update the preview image state
                    };
                    reader.readAsDataURL(file);
                    setAuthorImage(file); // Set the author image file
                    setAuthorImageError('');
                    setShowAuthorImage(false); // Hide the existing image box
                } else {
                    setAuthorImageError('* Image size should be less than 2MB.');
                    setAuthorImage(null);
                    setPreviewAuthorImage(null);
                    setShowAuthorImage(true); // Show the existing image box
                }
            } else {
                setAuthorImageError('* Please upload a JPG or PNG file');
                setAuthorImage(null);
                setPreviewAuthorImage(null);
                setShowAuthorImage(true); // Show the existing image box
            }
        } else {
            setAuthorImage(null);
            setPreviewAuthorImage(null);
            setShowAuthorImage(true); // Show the existing image box
        }
    };
    

    const handleBlogImage = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 2 * 1024 * 1024;
            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPreviewImage(reader.result); // Update the preview image state
                    };
                    reader.readAsDataURL(file);
                    setBlogImage(file); // Set the blog image file
                    setBlogImageError('');
                    setShowImage(false); // Hide the existing image box
                } else {
                    setBlogImageError('* Image size should be less than 2MB.');
                    setBlogImage(null);
                    setPreviewImage(null);
                    setShowImage(true); // Show the existing image box
                }
            } else {
                setBlogImageError('* Please upload a JPG or PNG file');
                setBlogImage(null);
                setPreviewImage(null);
                setShowImage(true); // Show the existing image box
            }
        } else {
            setBlogImage(null);
            setPreviewImage(null);
            setShowImage(true); // Show the existing image box
        }
    };
    

    const resetForm = () => {
        setBlogName("");
        setBlogSlug("");
        setBlogAuthorName("");
        setBlogMetaTag("");
        setBlogMetaDesc("");
        setBlogDesc("");
        setBlogId("");
        setBlogTag("");
        setPreviewImage("");
    };

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
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="page-title-box">
                        <div className="row align-items-center">
                            <div className="col-md-12 d-flex justify-content-between align-items-center">
                                <div className="col-lg-6">
                                    <h6 className="page-title">Blogs</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Blogs
                                        </li>
                                    </ol>
                                </div>

                                <div className="col-lg-6 text-end">
                                    <button className="btnclasssmae" onClick={() => { setModalConfirm(true); resetForm() }}>
                                        Add Blog
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* end page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header bg-088395 text-white" id="title">
                                    <h3 className="card-title">Blogs</h3>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive1">
                                        <div className="box-card recent-reviews mb-4">
                                            <table className="table-dash" id="datatable" ref={tableRef}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Author Name</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {blogs && blogs.length > 0 ? (
                                                        blogs.map((blog, index) => (
                                                            <tr key={index}>
                                                                <td data-label="Account">{index + 1}</td>
                                                                <td data-label="Account">{blog.name}</td>
                                                                <td data-label="Due Date">{blog.author_name}</td>
                                                                <td data-label="Amount">{formatDate(blog.created_at || "")}
                                                                </td>
                                                                <td data-label="Period">
                                                                    <ul className="table-icons-right">
                                                                        <li className="edit">
                                                                            <a href="#" onClick={() => handleEdit(blog.id)}>
                                                                                <i className="fa-regular fa-pen-to-square" />
                                                                            </a>
                                                                        </li>
                                                                        <li className="trash">
                                                                            <a href="#" onClick={() => handledeleteblog(blog.id)}
                                                                            >
                                                                                <i className="fa-solid fa-trash" />
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        ))) : (
                                                        <tr>
                                                            <td className="text-center" colSpan={8}>No Blogs found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        {/* end col */}
                    </div>{" "}
                    {/* end row */}
                </div>{" "}
                {/* container-fluid */}



                <PopupModal
                    show={modalConfirm}
                    // handleClose={modalConfirmClose}
                    staticClass="var-login"
                    handleClose={() => setModalConfirm(false)}
                >
                    <div className="pop-b-round text-center">
                        <div className="row">
                            <div className="col-12 text-right">
                                <button
                                    type="button"
                                    className="btn-close m-min-top set-close"
                                    onClick={() => {
                                        setModalConfirm(false);
                                    }}
                                ></button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handlBlogSubmit}>
                        <div className="form-contact-set">

                            <label className="form-label">
                                <h4>{blog_id ? "Edit blog" : "Add blog"}</h4>
                            </label>
                            <div>

                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    <span>Blog Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Blog Name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setBlogName(e.target.value)}
                                />

                                <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                    <span>Slug</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Blog Slug"
                                    className="form-control"
                                    value={slug}
                                    onChange={(e) => setBlogSlug(e.target.value)}
                                />


                                <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                    <span>Author Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Author Name"
                                    className="form-control"
                                    value={authorname}
                                    onChange={(e) => setBlogAuthorName(e.target.value)}
                                />

                                <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                    <span>Description</span>
                                </label>

                                <TextEditor
                                    height={100}
                                    value={description}
                                    onChange={handleBlogdesc}
                                    theme="snow"
                                    placeholder="Description"

                                />

                                <label htmlFor="minCommitment" className="form-label mt-3 above-height">
                                    <span>Meta Tag</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Meta Tag"
                                    className="form-control"
                                    value={meta_tag}
                                    onChange={(e) => setBlogMetaTag(e.target.value)}
                                />

                                <label htmlFor="maxCommitment" className="form-label mt-3">
                                    <span>Meta Desc</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Meta Desc"
                                    className="form-control"
                                    value={meta_desc}
                                    onChange={(e) => setBlogMetaDesc(e.target.value)}
                                />

                                <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                    <span>Author Image</span>
                                </label>
                                <div className="file-upload">
                                    <div className="file-select">
                                        <div
                                            className="file-select-button"
                                            id="fileName"
                                        >
                                            Chose file
                                        </div>
                                        <div className="file-select-name" id="noFile">
                                            {/* {fundImageName ? fundImageName : (fundimage ? fundimage : "No File Chosen ...")} */}
                                        </div>
                                        <input
                                            className="input-file"
                                            id="logo"
                                            accept=".jpg, .jpeg, .png"
                                            type="file"
                                            name="author_image"
                                            onChange={(e) => handleAuthorImage(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-3">
                                    {showAuthorImage ? (
                                        <div className="logo-box-data">
                                            {/* <Image
                                                src={
                                                    process.env.NEXT_PUBLIC_BASE_URL + "/assets/images/author.jpeg"
                                                }
                                                alt="logo-cir"
                                                className=""
                                                width={70}
                                                height={70}
                                            /> */}
                                        </div>
                                    ) : (
                                        <div className="logo-box-data">
                                            {previewAuthorImage ? (
                                                <Image
                                                    src={previewAuthorImage}
                                                    alt="Preview"
                                                    className=""
                                                    height={70}
                                                    width={70}
                                                />
                                            ) : (
                                                <Image
                                                    src={
                                                        process.env.NEXT_PUBLIC_IMAGE_URL +
                                                        "images/blogs/author/" +
                                                        newblogauthorimage
                                                    }
                                                    alt="logo-cir"
                                                    className=""
                                                    height={70}
                                                    width={70}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {authorImageError ? (
                                    <p className="text-danger">{authorImageError}</p>
                                ) : (
                                    startUpLogoError && <p className="text-danger">{startUpLogoError}</p>
                                )}
                                <br />
                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                    <span>Blog Image</span>
                                </label>
                                <div className="file-upload">
                                    <div className="file-select">
                                        <div
                                            className="file-select-button"
                                            id="fileName"
                                        >
                                            Chose file
                                        </div>
                                        <div className="file-select-name" id="noFile">
                                            {/* {fundImageName ? fundImageName : (fundimage ? fundimage : "No File Chosen ...")} */}
                                        </div>
                                        <input
                                            className="input-file"
                                            id="logo"
                                            accept=".jpg, .jpeg, .png"
                                            type="file"
                                            name="image"
                                            onChange={(e) => handleBlogImage(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-3">
                                    {showImage ? (
                                        <div className="logo-box-data">
                                            {/* <Image
                                                src={
                                                    process.env.NEXT_PUBLIC_BASE_URL + "/assets/images/author.jpeg"
                                                }
                                                alt="logo-cir"
                                                className=""
                                                width={70}
                                                height={70}
                                            /> */}
                                        </div>
                                    ) : (
                                        <div className="logo-box-data">
                                            {previewImage ? (
                                                <Image
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className=""
                                                    height={70}
                                                    width={70}
                                                />
                                            ) : (
                                                <Image
                                                    src={
                                                        process.env.NEXT_PUBLIC_IMAGE_URL +
                                                        "images/blogs/" +
                                                        newblogimage
                                                    }
                                                    alt="logo-cir"
                                                    className=""
                                                    height={70}
                                                    width={70}
                                                />
                                            )}
                                            
                                        </div>
                                    )}
                                </div>
                                {blogImageError ? (
                                    <p className="text-danger">{blogImageError}</p>
                                ) : (
                                    blogUpImageError && <p className="text-danger">{blogUpImageError}</p>
                                )}

                                <br />

                                <button type="submit" className="btnclasssmae set-but-company mt-3">
                                    Submit
                                </button>


                            </div>
                        </div>
                    </form>
                </PopupModal>


            </div>
            <ToastContainer autoClose={1000} />
        </div>



    )
}
