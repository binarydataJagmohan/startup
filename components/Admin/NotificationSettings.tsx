import React, { useState, useEffect, useRef } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Switch from 'react-switch';
import Link from 'next/link';
import { notificationConfigStore, getOptionsConfig } from '../../lib/adminapi';
import { getCurrentUserData } from '@/lib/session';
type UserData = {
    id?: string;
};
const NotificationSettings = () => {

    const [current_user_id, setCurrentUserId] = useState("");
    const [options, setOptions] = useState([]);
    const [regNotification, setRegNotification] = useState(false);
    const [profileCompletedNotification, setProfileCompletedNotification] = useState(false);
    const [profileUpdateNotification, setProfileUpdateNotification] = useState(false);
    const [fundNotification, setFundNotification] = useState(false);
    const [fundStatusNotification, setFundStatusNotification] = useState(false);

    // User Register Notification Update..
    const handleRegistrationNotificationChange = async (checked: any, option: any) => {
        const current_user_data: UserData = getCurrentUserData();
        current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");
        setRegNotification(checked);
        const data = {
            user_id: current_user_data.id,
            option_name: option.option_name,
            option_value: checked ? 1 : 0,
        };
        try {
            await notificationConfigStore(data);
            console.log('Checkbox value stored successfully');
        } catch (error) {
            console.error('Error storing checkbox value:', error);
        }
    };

    // Profile Update Notification Update..
    const handleProfileUpdateNotificationChange = async (checked: any, option: any) => {
        const current_user_data: UserData = getCurrentUserData();
        current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");
        setProfileUpdateNotification(checked);
        const data: any = {
            user_id: current_user_data.id,
            option_name: option.option_name,
            option_value: checked ? 1 : 0,
        };
        try {
            setOptions(data);
            await notificationConfigStore(data);

            console.log('Checkbox value stored successfully');
        } catch (error) {
            console.error('Error storing checkbox value:', error);
        }
    };

    // Profile Completed Notification Update..
    const handleProfileNotificationChange = async (checked: any, option: any) => {
        const current_user_data: UserData = getCurrentUserData();
        current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");
        setProfileCompletedNotification(checked);
        const data: any = {
            user_id: current_user_data.id,
            option_name: option.option_name,
            option_value: checked ? 1 : 0,
        };
        try {
            setOptions(data);
            await notificationConfigStore(data);

            console.log('Checkbox value stored successfully');
        } catch (error) {
            console.error('Error storing checkbox value:', error);
        }
    };

    // Fund Raise And Update Notification Update..
    const handleFundNotificationChange = async (checked: any, option: any) => {
        const current_user_data: UserData = getCurrentUserData();
        current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");
        setFundNotification(checked);
        const data: any = {
            user_id: current_user_data.id,
            option_name: option.option_name,
            option_value: checked ? 1 : 0,
        };
        try {
            setOptions(data);
            await notificationConfigStore(data);

            console.log('Checkbox value stored successfully');
        } catch (error) {
            console.error('Error storing checkbox value:', error);
        }
    };

    // Fund raise Status Update Notification Update..
    const handleFundStatusNotificationChange = async (checked: any, option: any) => {
        const current_user_data: UserData = getCurrentUserData();
        current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");
        setFundStatusNotification(checked);
        const data: any = {
            user_id: current_user_data.id,
            option_name: option.option_name,
            option_value: checked ? 1 : 0,
        };
        try {
            setOptions(data);
            await notificationConfigStore(data);

            console.log('Checkbox value stored successfully');
        } catch (error) {
            console.error('Error storing checkbox value:', error);
        }
    };




    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        getOptionsConfig(current_user_data.id)
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error(error);
            });


    }, []);

    console.log(options)
    return (
        <>
            <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">Notification Configurations</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Notifications
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-white bg-dark">
                                        <h3 className="card-title">Notifications Configurations</h3>
                                    </div>
                                    <div className="card-body">
                                        {Array.isArray(options) ? (
                                            options.map((option: any) => (
                                                <div className="row notification" key={option.option_name}>
                                                    <label className="col-md-6">{option.option_name}</label>
                                                    <div className="col-md-6">
                                                        {option.option_name === 'Registration Notifications' && (
                                                            <Switch
                                                                onChange={(checked) => handleRegistrationNotificationChange(checked, option)}
                                                                checked={option.option_value}
                                                            />
                                                        )}
                                                        {option.option_name === 'Profile Update Notifications' && (
                                                            <Switch
                                                                onChange={(checked) => handleProfileUpdateNotificationChange(checked, option)}
                                                                checked={option.option_value}
                                                            />
                                                        )}
                                                        {option.option_name === 'Profile Completed Notifications' && (
                                                            <Switch
                                                                onChange={(checked) => handleProfileNotificationChange(checked, option)}
                                                                checked={option.option_value}
                                                            />
                                                        )}
                                                        {option.option_name === 'Fund Raise/Fund Update Notifications' && (
                                                            <Switch
                                                                onChange={(checked) => handleFundNotificationChange(checked, option)}
                                                                checked={option.option_value}
                                                            />
                                                        )}
                                                        {option.option_name === 'Fund Update Status Notifications' && (
                                                            <Switch
                                                                onChange={(checked) => handleFundStatusNotificationChange(checked, option)}
                                                                checked={option.option_value}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No options available.</p>
                                        )}
                                    </div>



                                    {/* <div className="card-body">
                                        {options.map((option: any) => (
                                            <div className='row notification'>
                                                <label className='col-md-6'>{option.option_name}</label>
                                                <div className='col-md-6'>
                                                    {option.option_name === 'Registration Notifications' && (
                                                        <Switch
                                                            onChange={(checked) => handleRegistrationNotificationChange(checked, option)}
                                                            checked={option.option_value}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                       

                                        <div className='row notification'>
                                            <label className='col-md-6'>Profile Update Notifications</label>
                                            <div className='col-md-6'>
                                            {option.option_name === 'Profile Update Notifications' && (
                                                <Switch
                                                    onChange={handleProfileUpdateNotificationChange}
                                                    checked={option.option_value}
                                                />
                                                )}
                                            </div>
                                        </div>

                                        <div className='row notification'>
                                            <label className='col-md-6'>Profile Completed Notifications</label>
                                            <div className='col-md-6'>
                                            {option.option_name === 'Profile Completed Notifications' && (
                                                <Switch
                                                    onChange={handleProfileNotificationChange}
                                                    checked={option.option_value}
                                                />
                                                )}
                                            </div>
                                        </div>
                                        <div className='row notification'>
                                            <label className='col-md-6'>Fund Raise/Fund Update Notifications</label>
                                            <div className='col-md-6'>
                                            {option.option_name === 'Fund Raise/Fund Update Notifications' && (
                                                <Switch
                                                    onChange={handleFundNotificationChange}
                                                    checked={option.option_value}
                                                />
                                                )}
                                            </div>
                                        </div>
                                        <div className='row notification'>
                                            <label className='col-md-6'>Fund Update Status Notifications</label>
                                            <div className='col-md-6'>
                                            {option.option_name === 'Fund Update Status Notifications' && (
                                                <Switch
                                                    onChange={handleFundStatusNotificationChange}
                                                    checked={option.option_value}
                                                />
                                            )}
                                            </div>
                                        </div>
 ))}
                                    </div> */}
                                </div>

                            </div>{" "}
                            {/* end col */}
                        </div>{" "}
                        {/* end row */}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                <ToastContainer autoClose={1000} />
            </div>
        </>
    )
}

export default NotificationSettings