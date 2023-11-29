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
    const [newblogimage, setBlogNewImage] = useState("");
    const [showImage, setShowImage] = useState(true);
    const [showauthorImage, setauthorShowImage] = useState(true);
    const [previewAuthorImage, setPreviewAuthorImage]: any = useState("");
    const [fetchedPreviewImage, setFetchedPreviewImage] = useState('');
    const [fetchedAuthorPreviewImage, setAuthorFetchedPreviewImage] = useState('');
    const [slugError, setSlugError] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

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
        setSlugError('');
        setNameError('');
        setDescriptionError('');
        if (!slug) {
            setSlugError('Slug is required');
        }
        if (!name) {
            setNameError('Blog Name is required');
        }
        if (!description) {
            setDescriptionError('Description is required');
        }

        if (!slug || !name || !description) {
            return;
        }
        setSavingBlog(true);
        try {
            const currentUserData: any = getCurrentUserData();
            const data = {
                id: blog_id,
                name: name,
                slug: slug,
                author_name: authorname,
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
                setBlogNewImage(existingImage); // Set the blog image from database
                setFetchedPreviewImage(existingImage); // Show the preview of existing blog image
                setShowImage(false); // Hide the image upload box
            } else {
                setBlogNewImage("");
                setPreviewImage(""); // Clear the preview if no existing blog image
                setShowImage(true); // Show the image upload box
            }

            if (existingAuthorImage) {
                setBlogNewImage(existingAuthorImage); // Set the blog image from database
                setAuthorFetchedPreviewImage(existingAuthorImage); // Show the preview of existing blog image
                setauthorShowImage(false); // Hide the image upload box
            } else {
                setBlogNewImage("");
                setPreviewImage(""); // Clear the preview if no existing blog image
                setauthorShowImage(true); // Show the image upload box
            }
            setModalConfirm(true);
        }
    };

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value;
        const trimmedValue = inputValue.trim();
        const lowercasedValue = trimmedValue.toLowerCase(); // Convert to lowercase
        if (trimmedValue !== inputValue) {
            // If there were trailing spaces, show an error message or handle it as needed
            // For example, you can set an error state and display an error message to the user
            // setError("Spaces are not allowed at the end of the input");
        }
        const slug = lowercasedValue.replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, ''); // Remove special characters
        setBlogSlug(slug);
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
                        setPreviewAuthorImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setAuthorImage(file); // Set the blog image file
                    setAuthorImageError('');
                    setauthorShowImage(false);
                    setStartupLogoError('');
                } else {
                    setAuthorImageError('* Image size should be less than 2MB.');
                    setAuthorImage(null);
                    setPreviewAuthorImage(null);
                    setauthorShowImage(true); // Show the existing image box
                }
            } else {
                setAuthorImageError('* Please upload a JPG or PNG file');
                setAuthorImage(null);
                setPreviewAuthorImage(null);
                setauthorShowImage(true); // Show the existing image box
            }
        } else {
            setAuthorImage(null);
            setPreviewAuthorImage(null);
            setauthorShowImage(true); // Show the existing image box
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
                        setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setBlogImage(file); // Set the blog image file
                    setBlogImageError('');
                    setShowImage(false);
                    setStartupLogoError('');
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
        setFetchedPreviewImage("");
        setAuthorFetchedPreviewImage("");
        setPreviewAuthorImage("");
        setAuthorImageError("");
        setBlogupImageError("");
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
                                                                            ><i className="fa-solid fa-trash" />
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
                    staticClass="var-login"
                    handleClose={() => setModalConfirm(false)}
                    width={'700px'}
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
                                <h3>{blog_id ? "Edit blog" : "Add blog"}</h3>
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
                                {nameError && <p className="text-danger">{nameError}</p>}

                                <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                                    <span>Slug</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Blog Slug"
                                    className="form-control"
                                    value={slug}
                                    onChange={handleInputChange}
                                />
                                {slugError && <p className="text-danger">{slugError}</p>}

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
                                {descriptionError && <p className="text-danger" style={{ marginTop: '50px' }}>{descriptionError}</p>}

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

                                <div className="row">
                                    <div className="col-md-6">
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

                                            <div className="logo-box-data">
                                                {showauthorImage ? (
                                                    <div className="logo-box-data mt-2">
                                                        <Image
                                                            src={
                                                                process.env.NEXT_PUBLIC_BASE_URL + "/assets/images/logo-cir.png"
                                                            }
                                                            alt="logo-cir"
                                                            className=""
                                                            width={70}
                                                            height={70}
                                                        />
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
                                                            fetchedAuthorPreviewImage && (
                                                                <Image
                                                                    src={
                                                                        process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                        "images/blogs/author/" +
                                                                        fetchedAuthorPreviewImage
                                                                    }
                                                                    alt="Preview"
                                                                    className=""
                                                                    height={70}
                                                                    width={70}
                                                                />
                                                            )
                                                        )}


                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {authorImageError ? (
                                            <p className="text-danger">{authorImageError}</p>
                                        ) : (
                                            startUpLogoError && <p className="text-danger">{startUpLogoError}</p>
                                        )}
                                        <br />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
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
                                                <div className="logo-box-data mt-2">
                                                    <Image
                                                        src={
                                                            process.env.NEXT_PUBLIC_BASE_URL + "/assets/images/logo-cir.png"
                                                        }
                                                        alt="logo-cir"
                                                        className=""
                                                        width={70}
                                                        height={70}
                                                    />
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
                                                        fetchedPreviewImage && (
                                                            <Image
                                                                src={
                                                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                    "images/blogs/" +
                                                                    fetchedPreviewImage
                                                                }
                                                                alt="Preview"
                                                                className=""
                                                                height={70}
                                                                width={70}
                                                            />
                                                        )
                                                    )}


                                                </div>
                                            )}
                                        </div>
                                        {blogImageError ? (
                                            <p className="text-danger">{blogImageError}</p>
                                        ) : (
                                            blogUpImageError && <p className="text-danger">{blogUpImageError}</p>
                                        )}
                                    </div>
                                </div>

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
