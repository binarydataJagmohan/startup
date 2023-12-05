import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
    getAllCCSPCampaign,
    AdminAddProducts,
    AdminUpdateProduct,
    getAdminProductdata,
    deleteProduct
} from "@/lib/adminapi";
import { useRouter } from "next/router";
import Image from 'next/image';
import { getCurrentUserData } from "@/lib/session";

interface UserData {   
    role?: string; 
}
export default function AddProducts() {
    const [productdescription, setProductDescription] = useState("");
    const [productimage, setProductImage]: any = useState("");
    const [productimage1, setProductImage1]: any = useState("");
    const [productoverview, setProductOverview] = useState("");
    const [productdata, setAllProductdata] = useState([]);
    const [productId, setProductId]: any = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
        null
    );

    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = router.query;

    const clearmemberInputData = () => {
        setProductDescription("");
        setProductImage("");
        setProductImage1("");
        setPreviewImage("");
        setProductDescription("");
        setProductOverview("");
        setPreviewImage("");
        setFundImageName("");
        setFileName("");
    };

    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();    
        if (current_user_data.role !== 'admin') {
            router.back();
        }  
        getAllCCSPCampaign().then((res) => {

            fetchAllproductdata();
        });
    }, []);

    const fetchAllproductdata = async () => {
        const res = await getAdminProductdata();
        if (res.status) {
            const filteredData = res.data.filter(
                (member: { ccsp_fund_id: string }) => member.ccsp_fund_id == id
            );
            setAllProductdata(filteredData);
        }
    };

    const handleProductSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ccsp_fund_id", id as string);
        formData.append("product_description", productdescription);
        formData.append("product_image", productimage);
        formData.append("product_overview", productoverview);
        try {
            const response = await AdminAddProducts(formData);
            clearmemberInputData();
            setIsAddFormVisible(!isAddFormVisible);
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            fetchAllproductdata();
        } catch (error) {
            toast.error("Error occurred", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleUpdateCompetitorSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ccsp_fund_id", id as string);
        formData.append("product_description", productdescription);
        formData.append("product_image", productimage1);
        formData.append("product_id", productId);
        formData.append("product_overview", productoverview);
        try {
            const response = await AdminUpdateProduct(formData);
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setExpandedCard(null);
            fetchAllproductdata();
        } catch (error) {
            toast.error("Error occurred", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleLogoChange = (e: any) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSizeMB = 2; // 2MB limit

        if (file && file.size > maxSizeMB * 1024 * 1024) {
            setError('File size exceeds 2MB limit');
            return;
        }

        if (file && !allowedTypes.includes(file.type)) {
            setError('Only JPG and PNG files are allowed');
            return;
        }

        setProductImage(file);
        setFileName(file.name);
        setError(''); // Clear any previous error

        // Display a preview of the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage('');
        }
    };


    const [startUpLogoError, setStartupLogoError] = useState('');
    const [fundImageName, setFundImageName] = useState('');
    const [fundImageNameError, setFundImageNameError] = useState('');

    const handleUpdateLogoChange = (e: any) => {
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
                    setProductImage1(file);
                    setFundImageName(file.name);
                    setFundImageNameError('');
                    setStartupLogoError('');
                } else {
                    setFundImageNameError('* Image size should be less than 2MB.');
                    setProductImage1(null);
                    setPreviewImage(null);
                }
            } else {
                setStartupLogoError('* Please upload a JPG or PNG file');
                setProductImage1(null);
                setPreviewImage(null);
            }
        } else {
            setProductImage1(null);
            setPreviewImage(null);
        }
    };

    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const handleAddButtonClick = () => {
        setIsAddFormVisible(!isAddFormVisible);
    };

    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const handleCardToggle = async (index: number) => {
        if (expandedCard === index) {
            setExpandedCard(null);
            setProductId(null);
        } else {
            setExpandedCard(index);
            setProductId(index);
        }
        const res = await getAdminProductdata();
        const conversation = res.data.find(
            (product: { id: number }) => product.id === index
        );
        if (conversation) {
            setProductDescription(conversation.product_description);
            setProductImage(conversation.product_image);
            setProductOverview(conversation.product_overview);
        }
    };

    const handleDelete = async (id: any) => {
        try {
            const response = await deleteProduct(id);
            if (response.status === true) {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                fetchAllproductdata();
            } else {
                toast.error("Deletion failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast.error("Error occurred while deleting", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <h6 className="page-title">Startup</h6>
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">
                                                    <Link
                                                        href={
                                                            process.env.NEXT_PUBLIC_BASE_URL +
                                                            "admin/dashboard"
                                                        }
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li
                                                    className="breadcrumb-item active"
                                                    aria-current="page"
                                                >
                                                    Product
                                                </li>
                                                <li
                                                    className="breadcrumb-item active"
                                                    aria-current="page"
                                                >
                                                    <Link
                                                        href={
                                                            process.env.NEXT_PUBLIC_BASE_URL +
                                                            "admin/all-active-campaign"
                                                        }
                                                    >
                                                        Back
                                                    </Link></li>
                                            </ol>
                                        </div>
                                        <div className="col-lg-6 text-end">
                                            <button
                                                onClick={() => {
                                                    handleAddButtonClick();
                                                    clearmemberInputData();
                                                }}
                                                className="btnclasssmae"
                                            >
                                                Add Products
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isAddFormVisible && (
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header text-white bg-dark" id="title">
                                            <h3 className="card-title">Add New Product</h3>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleProductSubmit}>
                                                <div className="row g-3 mt-1">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label mt-3"
                                                        >
                                                            Product Description
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            placeholder="Enter details here"
                                                            className="form-control"
                                                            name="product_description"
                                                            value={productdescription}
                                                            onChange={(e) =>
                                                                setProductDescription(e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="exampleFormControlInput1"
                                                            className="form-label mt-3"
                                                        >
                                                            Product Overview
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            placeholder="Enter details here"
                                                            className="form-control"
                                                            name="description"
                                                            value={productoverview}
                                                            onChange={(e) => setProductOverview(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label mt-3"
                                                    >
                                                        Product Image
                                                    </label>

                                                    <div className="file-upload">
                                                        <div className="file-select">
                                                            <div className="file-select-button" id="fileName">
                                                                Choose File
                                                            </div>
                                                            <div
                                                                className="file-select-name"
                                                                id="noFile"
                                                            >{fileName}</div>
                                                            <input
                                                                type="file"
                                                                name="product_image"
                                                                onChange={(e) => handleLogoChange(e)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                    <div className="profile-pic">
                                                        {previewImage ? (
                                                            <Image
                                                                src={typeof previewImage === 'string' ? previewImage : ''}
                                                                width={300}
                                                                height={200}
                                                                alt=''
                                                                className='profile-pic'
                                                                style={{ margin: '5% 0%', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div
                                                        className="col-md-6"
                                                        style={{ textAlign: "right" }}
                                                    >
                                                        <button type="submit" className="btnclasssmae">
                                                            SUBMIT
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* get data */}

                        <div className="row">
                            {productdata.length > 0 ? (
                                productdata.map((product: any, index: number) => (
                                    <div className="col-12" key={index}>
                                        <div className="card border-0">
                                            <div
                                                className="card-header text-white"
                                                id={`title-${index}`}
                                            >
                                                <table className="table-dash border-0 " id="datatable">
                                                    <thead>
                                                        <tr className="border-0">
                                                            <th>#</th>
                                                            <th>Product Image</th>
                                                            <th>Product Description</th>
                                                            <th>Product Overview</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-0">
                                                            <td className="text-black">{index + 1}</td>
                                                            <td className="text-black">
                                                                {product.product_image ? (
                                                                    <Image
                                                                        src={
                                                                            productimage &&
                                                                                typeof productimage !== "string"
                                                                                ? URL.createObjectURL(productimage)
                                                                                : process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                                "images/products/" +
                                                                                product.product_image
                                                                        }
                                                                        alt="Company Logo"
                                                                        className="profile-pic set-img"
                                                                        style={{
                                                                            margin: "5% 0%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                        width={300}
                                                                        height={200}
                                                                    />
                                                                ) : (
                                                                    <Image
                                                                        src={
                                                                            process.env.NEXT_PUBLIC_BASE_URL +
                                                                            "assets/images/company.png"
                                                                        }
                                                                        alt="Company Logo"
                                                                        className="profile-pic set-img"
                                                                        style={{
                                                                            margin: "5% 0%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                        width={300}
                                                                        height={200}
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="text-black">
                                                                {product.product_description}
                                                            </td>
                                                            <td className="text-black">
                                                                {product.product_overview}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div className="col-span-1 text-right">
                                                    <p
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleCardToggle(product.id)}
                                                    >
                                                        <i
                                                            className={
                                                                expandedCard === product.id
                                                                    ? "fa-solid fa-chevron-up"
                                                                    : "fa-solid fa-chevron-down"
                                                            }
                                                        ></i>
                                                    </p>
                                                    <Link href="#" onClick={() => handleDelete(product.id)}>
                                                        <i className="fa-solid fa-trash" />
                                                    </Link>
                                                </div>
                                            </div>
                                            {expandedCard === product.id && (
                                                <div className="card-body">
                                                    <form onSubmit={handleUpdateCompetitorSubmit}>
                                                        <div className="row g-3 mt-1">
                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label mt-3"
                                                                >
                                                                    Product Description
                                                                </label>
                                                                <textarea
                                                                    rows={4}
                                                                    placeholder="Enter details here"
                                                                    className="form-control"
                                                                    name="product_description"
                                                                    value={productdescription}
                                                                    onChange={(e) =>
                                                                        setProductDescription(e.target.value)
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="col-md-6">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label mt-3"
                                                                >
                                                                    Product Overview
                                                                </label>
                                                                <textarea
                                                                    rows={4}
                                                                    placeholder="Enter details here"
                                                                    className="form-control"
                                                                    name="product_overview"
                                                                    value={productoverview}
                                                                    onChange={(e) => setProductOverview(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label
                                                                htmlFor="exampleFormControlInput1"
                                                                className="form-label mt-3"
                                                            >
                                                                Product Image
                                                            </label>
                                                            <div className="file-upload mt-5">
                                                                <div className="file-select">
                                                                    <div
                                                                        className="file-select-button"
                                                                        id="fileName"
                                                                    >
                                                                        Choose File
                                                                    </div>
                                                                    <div className="file-select-name" id="noFile">
                                                                        {fundImageName ? fundImageName : (productimage ? productimage : "No File Chosen ...")}
                                                                    </div>
                                                                    <input
                                                                        className="input-file"
                                                                        id="logo"
                                                                        accept=".jpg, .jpeg, .png"
                                                                        type="file"
                                                                        name="product_image"
                                                                        onChange={(e) => handleUpdateLogoChange(e)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {fundImageNameError ? (
                                                                <p className="text-danger">{fundImageNameError}</p>
                                                            ) : (
                                                                startUpLogoError && <p className="text-danger">{startUpLogoError}</p>
                                                            )}

                                                            <div className="profile-pic">
                                                                {previewImage ? (
                                                                    <Image
                                                                        src={
                                                                            typeof previewImage === "string"
                                                                                ? previewImage
                                                                                : ""
                                                                        }
                                                                        width={300}
                                                                        height={200}
                                                                        alt=""
                                                                        className="profile-pic"
                                                                        style={{
                                                                            margin: "5% 0%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                ) : product.product_image ? (
                                                                    <Image
                                                                        src={
                                                                            productimage1 &&
                                                                                typeof productimage1 !== "string"
                                                                                ? URL.createObjectURL(productimage1)
                                                                                : process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                                "images/products/" +
                                                                                product.product_image
                                                                        }
                                                                        alt="Product Image"
                                                                        className="profile-pic"
                                                                        style={{
                                                                            margin: "5% 0%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                        width={300}
                                                                        height={200}
                                                                    />
                                                                ) : (
                                                                    <Image
                                                                        src={
                                                                            process.env.NEXT_PUBLIC_BASE_URL +
                                                                            "assets/images/company.png"
                                                                        }
                                                                        alt="Company Logo"
                                                                        className="profile-pic"
                                                                        style={{
                                                                            margin: "5% 0%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                        width={300}
                                                                        height={200}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div
                                                                className="col-md-6"
                                                                style={{ textAlign: "right" }}
                                                            >
                                                                <button type="submit" className="btnclasssmae">
                                                                    SUBMIT
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <p className="text-center">No Products created yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        </>
    );
}
