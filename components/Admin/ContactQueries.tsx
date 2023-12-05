import React, { useEffect, useRef, useState } from "react";
import { getCurrentUserData, getToken } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { getAllContactQueries } from "@/lib/adminapi";
import { useRouter } from "next/router";
import swal from "sweetalert";
import axios from "axios";
import PopupModal from "../commoncomponents/PopupModal";

interface UserData {
    id?: string;
    role?: any;
}
const Dashboard = () => {
    const tableRef = useRef(null);
    const [queries, setQueries] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const current_user_data: UserData = getCurrentUserData();
                if (current_user_data.role !== 'admin') {
                    router.back();
                    return;
                }
                const response = await getAllContactQueries();
                setQueries(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [router]);

    function deleteQuerie(id: number) {
        swal({
            title: "Are you sure?",
            text: `Are you sure want to delete this contact querie ?`,
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes, I am sure!"],
        }).then((willUpdate) => {
            if (willUpdate) {
                axios
                    .post(
                        `${process.env.NEXT_PUBLIC_API_URL}/delete-querie/${id}`,
                        {
                            headers: {
                                Accept: "application/json",
                                Authorization: "Bearer " + getToken(),
                            },
                            data: id,
                        }
                    )
                    .then((response) => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                        setTimeout(() => {
                            router.push("/admin/contact-queries");
                        }, 1500);
                    })
                    .catch((error) => {
                        toast.error(error.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    });
            }
        });
    }

    const [modalConfirm, setModalConfirm] = useState(false);
    const modalConfirmClose = () => {
        setModalConfirm(false);
    };
    const [queireName, setQueireName] = useState('');
    const [queireEmail, setQueireEmail] = useState('');
    const [queireSubject, setQueireSubject] = useState('');
    const [queireMessage, setQueireMessage] = useState('');

    const handleDropdownToggle = async (index: any, id: number, e: any) => {
        e.preventDefault();
        try {
            setModalConfirm(true);
            const response = await getAllContactQueries();
            if (response && response.status && response.data && response.data.length > 0) {
                const selectedquerie = response.data.find((querie: any) => querie.id === id);
                if (selectedquerie) {
                    setQueireName(selectedquerie.name);
                    setQueireEmail(selectedquerie.email);
                    setQueireSubject(selectedquerie.subject);
                    setQueireMessage(selectedquerie.message);
                } else {
                    setQueireName('');
                    setQueireEmail('');
                    setQueireSubject('');
                    setQueireMessage('');
                }
            } else {
                console.error("No data or invalid response received from the API");
            }
        } catch (error) {
            console.error("Error fetching querie details:", error);
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
                                <div className="col-md-8">
                                    <h6 className="page-title">All Campaign</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link
                                                href={
                                                    process.env.NEXT_PUBLIC_BASE_URL + "company/dashboard"
                                                }
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            All Active Campaign
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-white bg-dark" id="title">
                                        <h3 className="card-title">ALL Campaign</h3>
                                    </div>
                                    <div className="card-body mt-3 set-pading">
                                        <div className="">
                                            <div className="box-card recent-reviews mb-4">
                                                {queries.length > 0 ? (
                                                    <table
                                                        className="table-dash"
                                                        id="datatable2"
                                                        ref={tableRef}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>Serial no.</th>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Subject</th>
                                                                <th>Message</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {queries && queries.length > 0 ? (
                                                                queries.map((querie: any, index: any) => (
                                                                    <tr key={index}>
                                                                        <td data-label="Serial no.">{index + 1}</td>

                                                                        <td data-label="Name">{querie.name}</td>

                                                                        <td data-label="Email">
                                                                            {querie.email}
                                                                        </td>

                                                                        <td data-label="Subject">
                                                                            {querie.subject}
                                                                        </td>

                                                                        <td data-label="Message">
                                                                            {querie.message.substring(0, 25)}....
                                                                        </td>
                                                                        <td data-label="Delete">
                                                                            <Link
                                                                                onClick={(e) =>
                                                                                    handleDropdownToggle(
                                                                                        index,
                                                                                        querie.id, e
                                                                                    )
                                                                                }
                                                                                href={'#'}
                                                                                className="m-1"
                                                                            >
                                                                                <span className="fa fa-eye"></span>
                                                                            </Link>

                                                                            <Link
                                                                                href="javascript:void(0);"
                                                                                onClick={() => {
                                                                                    deleteQuerie(querie.id);
                                                                                }}
                                                                                className="m-1"
                                                                            >
                                                                                <span className="fa fa-trash text-danger"></span>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td className="text-center" colSpan={8}>
                                                                        No queries found.
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p>No data available in table</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end col */}
                        </div>{" "}
                        {/* end row */}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                <ToastContainer autoClose={1000} />
            </div>
            <PopupModal
                show={modalConfirm}
                handleClose={modalConfirmClose}
                staticClass="var-login"
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
                    <div className="heading">
                        <label className="form-label">
                            <h4>Contact Queries </h4>
                        </label>
                    </div>
                </div>
                <form>
                    <div className="form-contact-set mt-3">
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <label className="form-label">
                                    <span>Name :</span>
                                </label>
                            </div>
                            <div className="col-md-7 text-center">
                                <p>{queireName}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <label className="form-label">
                                    <span>Email :</span>
                                </label>
                            </div>
                            <div className="col-md-7 text-center">
                                <p>{queireEmail}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <label className="form-label">
                                    <span>Subject :</span>
                                </label>
                            </div>
                            <div className="col-md-7 text-center">
                                <p>{queireSubject}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <label className="form-label">
                                    <span>Message :</span>
                                </label>
                            </div>
                            <div className="col-md-7 text-center">
                                <p>{queireMessage}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </PopupModal>
        </>
    );
};

export default Dashboard;
