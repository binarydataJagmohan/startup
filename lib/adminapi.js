import { getToken } from "./session";
import axios from "axios";

export const getAllUsers = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-users', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getTotalUsers = async (data)=>{
   return new Promise((resolve,reject)=>{
   const req = axios.request(process.env.NEXT_PUBLIC_API_URL+ '/get-user-count',{
     method : 'get',
     headers:{
        'Accept':'application/json',
        'Authorization': 'Bearer ' + getToken()

     },
     data:{
        ...data
     },
   });
   req.then(res=>resolve(res.data))
      .catch(err=>reject(err));

   });

}
export const getInvestorCounts = async(data)=>{
      return new Promise((resolve,reject)=>{
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-investor-count',{
            method :'get',
            headers:{
                'Accept':'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data:{
                ...data
            },
          });
          req.then(res=>resolve(res.data))
          .catch(err =>reject(err));
      });
    
}

export const getStartupCounts = async(data)=>{
    return new Promise((resolve,reject)=>{
       const req = axios.request(process.env.NEXT_PUBLIC_API_URL+ '/get-startup-count',{
        method:'get',
        headers:{
            'Accept':'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        data:{
            ...data
        },
       });
       req.then(res=>resolve(res.data))
        .catch(err =>reject(err));
    });
}
export const getAdminData = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-data', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getSingleFundRaiseData = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/fund-single/' + id, {
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


export const getAllActiveFunds = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-active-funds', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getAllActiveFundsCount = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/totalcount-active-funds', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};


export const getAllNotifications = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-notifications', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getTotalCountOfNotifications = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/notifications-count/' + id, {
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

  export const getTotalNotifications = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-notifications/'+id, {
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

  export const getCountOfUnreadNotifications = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/unread-notifications-count/'+id, {
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

  export const updateNotification = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-notifications/'+id, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };
  

  export const CreateTermsAndConditionByAdmin = async data => {
    return new Promise((resolve, reject) => {
      const req = axios.request(
        process.env.NEXT_PUBLIC_API_URL +'/terms-and-conditions-by-admin',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            "Content-Type": "multipart/form-data",
            Authorization: 'Bearer ' + getToken(),
          },
          data: {
            ...data,
          },
        },
      );
      req.then(res => resolve(res.data)).catch(err => reject(err));
    });
  };
  export const notificationConfigStore = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/notification-config-store/',data, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        data: {
            ...data
        }
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  export const getOptionsConfig = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-options/' + id, {
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


  export const deleteNotification = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/notifications-delete/'+id, {
        method: 'post',
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