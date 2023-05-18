import { getToken } from "./session";
import axios from "axios";

export const getAllUsers = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-users', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};