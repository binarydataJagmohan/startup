import React, { useState, useEffect } from 'react';
import { getFailerErrorLog, } from '../../lib/frontendapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../Frontend/Common/Pagination';
import Swal from "sweetalert";
import swal from "sweetalert2";

import axios from 'axios';
import { getToken } from "../../lib/session";

interface allErrorlogs {
    error_message: string;
    id: string;
    file_name: string;
    line_number: string;
}
export default function ErrorLogs() {
    const [allErrorlogs, setAllErrorlog] = useState<allErrorlogs[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [filteredErrorlogs, setFilteredErrorlogs] = useState<allErrorlogs[]>(
        [],
    );

    const pageSize = 20;
    const paginate = (items: any[], pageNumber: number, pageSize: number) => {
        const startIndex = (pageNumber - 1) * pageSize;
        return items.slice(startIndex, startIndex + pageSize);
    };
    const paginatedErrorlog = paginate(filteredErrorlogs, currentPage, pageSize);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const authenticateUser = () => {

        const validatePassword = (password: any) => {
            if (password === 'Welcome90#@!') {
                setAuthenticated(true);
                return true;
            } else {
                swal.showValidationMessage(`Authentication failed. Please try again.`);
            }
        };

        swal.fire({
            title: 'Please enter password to access this page.',
            html: `
                <input type="password" id="password" class="swal2-input" placeholder="Password" autoComplete="off">
            `,
            confirmButtonText: 'Submit',
            focusConfirm: false,
            preConfirm: () => {
                const passwordInput = swal.getPopup()?.querySelector('#password') as HTMLInputElement;
                if (passwordInput) {
                    validatePassword(passwordInput.value);
                } else {
                    swal.showValidationMessage(`Please enter a password`);
                }
            },
        });
    };



    const filterBlogs = (allErrorlogs: allErrorlogs[], searchValue: string) => {
        const filteredErrorlogs = allErrorlogs.filter(Errorlog => {
            const errorMessageMatch = Errorlog.error_message
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const fileNameMatch = Errorlog.file_name && Errorlog.file_name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const lineNumberMatch = Errorlog.line_number && Errorlog.line_number.toString()
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const idMatch = Errorlog.id &&
                Errorlog.id.toString().toLowerCase() === searchValue.toLowerCase();

            return errorMessageMatch || fileNameMatch || lineNumberMatch || idMatch;
        });

        setFilteredErrorlogs(filteredErrorlogs);
        setCurrentPage(1);
    };
    const fetchData = async () => {
        getFailerErrorLog()
            .then(response => {
                setAllErrorlog(response.data);
                filterBlogs(response.data, searchQuery);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        fetchData();
        authenticateUser();
    }, []);

    function handledeleteAllErrorLog() {
        Swal({
            title: "Are you sure?",
            text: "You want to delete all error messages",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes, I am sure!"],
        }).then((willDelete) => {
            if (willDelete) {
                axios.post(process.env.NEXT_PUBLIC_API_URL + '/delete-all-error-log', null, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + getToken(),
                    }
                })
                    .then(response => {
                        fetchData();
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                    })
                    .catch(error => {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    });
            }
        });
    }

    function handleDeleteErrorLog(id: any) {
        Swal({
            title: "Are you sure?",
            text: "You want to delete the error message",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes, I am sure!"],
        }).then((willDelete) => {
            if (willDelete) {
                axios.post(process.env.NEXT_PUBLIC_API_URL + '/delete-error-log', { id: id }, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + getToken(),
                    }
                })
                    .then(response => {
                        fetchData();
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                    })
                    .catch(error => {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    });
            }
        });
    }



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchQuery(searchValue);
        filterBlogs(allErrorlogs, searchValue);
    };
    return (
        <>
            {authenticated ? (
                <div
                    style={{
                        padding: '4% 1%',
                        background: `url('images/errorlog-back.jpg')`,
                    }}>
                    <div
                        className=""
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '4px 4%',
                            marginBottom: '1%',
                            width: '100%',
                        }}>
                        <h5 className="f-100 w-700" style={{ color: '#088395' }}>
                            Displaying <span className="span-color-dash">Error</span> Logs
                        </h5>

                        <button
                            className="btn btn_error_logs"
                            style={{
                                fontSize: '19px',
                            }}
                            onClick={() => handledeleteAllErrorLog()}>
                            Delete All
                        </button>
                    </div>
                    <div className="data-management">
                        <div className="row justify-content-end" id="Errorlog_input">
                            <div className="col-lg-5 col-md-12">
                                <div>
                                    <div className="input-group  mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search message here.."
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-12">
                                <button
                                    type="button"
                                    className="btn btn_error_logs"
                                    onClick={() => {                                       
                                        toast.dismiss();
                                    }}>
                                    Search Message
                                </button>
                            </div>
                        </div>
                        <div className="table-part mt-4 max-w overflow-auto">
                            <table
                                className="rwd-table"
                                style={{ width: '100%', tableLayout: 'auto' }}>
                                <thead style={{ backgroundColor: '#088395', color: '#fff' }}>
                                    <tr>
                                        <th
                                            className="border-1 p-2">
                                            Action
                                        </th>
                                        <th
                                            className="border-1 p-2">
                                            Error Message
                                        </th>
                                        <th
                                            className="border-1 p-2">
                                            Line
                                        </th>
                                        <th
                                            className="border-1 p-2">
                                            File Name
                                        </th>
                                        <th
                                            className="border-1 p-2">
                                            Count
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedErrorlog.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td data-th="Action" className="text-center border-1 p-2">
                                                <i
                                                    className="fa-regular fa-trash-can del-trash"
                                                    onClick={() => handleDeleteErrorLog(item.id)}
                                                    style={{ color: 'red', cursor: 'pointer' }}></i>
                                            </td>
                                            <td
                                                data-th="Error Message"
                                                className="text-start border-1 p-2">
                                                {item.error_message}
                                            </td>
                                            <td data-th="Line" className="text-center border-1 p-2">
                                                {item.line_number ? item.line_number : 'null'}
                                            </td>
                                            <td data-th="File Name" className="text-start border-1 p-2">
                                                {item.file_name}
                                            </td>
                                            <td data-th="File Name" className="text-start border-1 p-2">
                                                {item.duplicate_count} <span>time</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className="pagination-wrapper mt-4"
                            style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredErrorlogs.length / pageSize)}
                                handlePageChange={onPageChange}
                            />
                        </div>
                    </div>
                </div >
            ) : ('')}
        </>
    )
}