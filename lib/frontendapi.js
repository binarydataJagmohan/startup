import { getToken } from "./session";
import axios from "axios";

export const login = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL+'/user-login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        //'Authorization': 'Bearer '+getToken()
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const register = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL+'/register', {
      method: 'post',
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
export const getCurrentUserData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL+'/getcurrentuserdata', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};