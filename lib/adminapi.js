import { getToken } from "./session";
import axios from "axios";

export const getAllUsers = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-users",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getTotalUsers = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-user-count",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const getInvestorCounts = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-investor-count",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getStartupCounts = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-startup-count",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const getAdminData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-admin-data",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getSingleFundRaiseData = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/fund-single/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAllActiveFunds = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-active-funds",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAllActiveFundsCount = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/totalcount-active-funds",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAllNotifications = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-notifications",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getTotalCountOfNotifications = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/notifications-count/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getTotalNotifications = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-notifications/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getCountOfUnreadNotifications = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/unread-notifications-count/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const updateNotification = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/update-notifications/" + id,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const CreateTermsAndConditionByAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/terms-and-conditions-by-admin",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const notificationConfigStore = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/notification-config-store/",
      data,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getOptionsConfig = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-options/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const deleteNotification = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/notifications-delete/" + id,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getSingleBusinessInformation = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-buisness-id/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const fundInformationSave = async (formData, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/fund-raise-store",
      formData,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getSingleBusinessUnitInfo = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-single-buisness-unit/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminAddCampaignDetail = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-add-campaign-detail",
      data,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        data: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminAddCometitorCompany = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-add-campany-data",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminUpdateCometitorCompany = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-update-campany-data",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminAddTeamMember = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-add-team-members",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminUpdateTeamMember = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-update-team-data",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAdminTeamdata = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-team-data",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAdminCompanydata = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-company-data",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminAddRoundDetail = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-add-round-details",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminAddProducts = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-add-products",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminUpdateProduct = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-update-products",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAdminProductdata = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-product-data",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const deleteCompany = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/company-delete/" + id,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const deleteProduct = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/product-delete/" + id,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const deleteTeam = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/team-delete/" + id,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAllCCSPCampaign = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-campaign",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAllCampaignDetaildata = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-campaign-detail-data",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

/********* Chats *********/
export const getAdminMessageData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-admin-message-data",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const getClickAdminChefUserChatData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-click-admin-chef-user-chat-data",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const ContactByAdminToUserAndChef = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/contact-by-admin-to-user-and-chef",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const ContactByAdminToUserAndChefWithShareFile = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
          "/contact-by-admin-to-user-and-chef-with-share-file",
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
export const getAllUserData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-user-data",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const SendMessageToUserByAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/send-message-to-user-by-admin",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};
export const CreateGroupChatByAdmin = async (data, image) => {
  let formdata = new FormData();
  formdata.append("image", image);
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/create-group-by-admin",
      formdata,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const AdminAddFundNameAndImage = async (data) => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + getToken(),
    "Content-Type": "multipart/form-data",
  };
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin-add-fundName",
      data,
      headers
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getCCSPCampaignForStartup = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-ccsp-detail-for-startup/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAllBlogs = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-all-blogs",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const getAllBlogCategories = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-blog-category",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const EditAndSaveBlogData = async (data, image, author_image) => {
  let formdata = new FormData();
  formdata.append("image", image);
  formdata.append("author_image", author_image);
  formdata.append("id", data.id);
  formdata.append("name", data.name);
  formdata.append("slug", data.slug);
  formdata.append("author_name", data.author_name);
  // formdata.append("tag", data.tag);
  formdata.append("description", data.description);
  formdata.append("meta_tag", data.meta_tag);
  formdata.append("meta_desc", data.meta_desc);
  formdata.append("created_by_id", data.created_by_id);
  return new Promise((resolve, reject) => {
    const req = axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/edit-and-save-blog-data",
      formdata,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": `multipart/form-data; boundary=${formdata._boundary}`,
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const deleteblog = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/delete-blog",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};


export const getSingleBlogBySlug = async (slug) => {
  return new Promise((resolve, reject) => {
    const req = axios.request( process.env.NEXT_PUBLIC_API_URL  + "/get-blog-by-slug/" + slug, {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};