import { getToken } from "./session";
import axios from "axios";

export const fundInformationSave = async(formData,data) => {
    return new Promise((resolve, reject) => {
        const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/fund-raise-store', formData,{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'multipart/form-data'
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};
export const getSinglestartup = async (id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/single-startup/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};



export const getSingleBusinessInformation = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-buisness-id/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getAllFunds = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-funds/' + id, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };
  
  export const getTotalCountOfFunds = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/total-raised-funds/' + id, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };


  export const getTotalCountOfUnits = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/total-units/' + id, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };