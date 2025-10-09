import { commonFileUpload, commonrequest } from './apiCall';
import { API_BASE_URL } from './apiHelper';

export const categoryLogoUrl = "https://app.tisabooking.com/public/storage";

export const signpage = async (data) => {
  return await commonrequest('POST', `${API_BASE_URL}/login`, data, "");
};

export const SignUpUser = async (data) => {
  return await commonrequest('POST', `${API_BASE_URL}/register`, data, "");
};

export const otpVerify = async (data) => {
  return await commonrequest('POST', `${API_BASE_URL}/verify-phone`, data, "");
};

export const profile = async (header) => {
  return await commonrequest('GET', `${API_BASE_URL}/profile`, "", header);
};

export const profileUpdate = async (data, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/profile/update`, data, header);
};

export const ImageUpload = async (data, header, onUploadProgress) => {
  return await commonFileUpload('POST', `${API_BASE_URL}/image/upload`, data, header, onUploadProgress);
};

export const createProduct = async (data, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/listing`, data, header);
};

export const setting = async (header) => {
  return await commonrequest('GET', `${API_BASE_URL}/setting`, "", header);
};

export const Subcategory = async (category_id, header) => {
  return await commonrequest('GET', `${API_BASE_URL}/subcategory?category_id=${category_id}`, "", header);
};

export const Field = async (data, header) => {
  return await commonrequest('GET', `${API_BASE_URL}/fields?category_id=${data.category_id}&subcategory_id=${data.subcategory_id}`, "", header);
};

export const getCities = async (state_id, header) => {
  return await commonrequest('GET', `${API_BASE_URL}/city?state_id=${state_id}`, "", header);

};


export const getLocalities = async (city_id, header) => {
  return await commonrequest('GET', `${API_BASE_URL}/locality?city_id=${city_id}`, "", header);

};

export const getProducts = async (category_id, search, page, header) => {
  return await commonrequest('GET', `${API_BASE_URL}/listing?page=${page}&category_id=${category_id}&search=${search}`, "", header);

};

export const deleteProduct = async (header, id) => {
  return await commonrequest('DELETE', `${API_BASE_URL}/listing/${id}`, "", header);
};

export const updateProduct = async (id, data, header) => {
  return await commonrequest('PUT', `${API_BASE_URL}/listing/${id}`, data, header);
};

export const updateStatus = async (id, data, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/listing/update_status/${id}`, data, header);
};
export const getOrder = async (page, data, header) => {
  let url = `${API_BASE_URL}/order?page=${page}&status=${data?.status || ''}`;

  if (data?.start_date) {
    url += `&start_date=${data.start_date}`;
  }
  if (data?.end_date) {
    url += `&end_date=${data.end_date}`;
  }

  return await commonrequest('GET', url, "", header);
};

export const updateOrderStatus = async (id, reason, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/order/update_status/${id}`, reason, header);
};

export const boostOrder = async (data, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/boost/listing`, data, header);
};

export const createJob = async (data, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/jobs`, data, header);
};

export const getJob = async (search, header) => {
  return await commonrequest('GET', `${API_BASE_URL}/jobs?search=${search}`, "", header);
};


export const getApplicant = async (page,search, header) => {
  return await commonrequest('GET', `${API_BASE_URL}/job/applications?page=${page}?search=${search}`, "", header);
};

export const updateJobStatus = async (id, data, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/jobs/update_status/${id}`, data, header);
};

export const updatePassword = async (data, header) => {
  return await commonrequest('POST', `${API_BASE_URL}/profile/update/password`, data, header);
};

export const forgotPasswordOtp = async (data) => {
  return await commonrequest('POST', `${API_BASE_URL}/forget-otp`, data, '');
};

export const forgotPasswordAPI = async (data) => {
  return await commonrequest('POST', `${API_BASE_URL}/forgot-password`, data, '');
};

export const getNext7DayOrder = async (header) => {
  return await commonrequest('GET', `${API_BASE_URL}/getNextSevenDaysOrders`, "", header);
};

export const boostedAmount = async (locality_id,category_id,header) => {
  return await commonrequest('GET', `${API_BASE_URL}/maximum-boosted-amount/${locality_id}?category_id=${category_id}`, "", header);
};

export const saveFCMToken = async (data, header) => {
    return await commonrequest('POST', `${API_BASE_URL}/save-firebase-token`, data, header);
};


export const getNotifications = async (header) => {
    return await commonrequest('GET', `${API_BASE_URL}/notifications`, '', header);
};

export const markNotificationAsRead = async (id,data, header) => {
    return await commonrequest('POST', `${API_BASE_URL}/notifications/mark-as-read/${id}`, data, header);
};

export const markAllNotificationsAsRead = async (header) => {
    return await commonrequest('POST', `${API_BASE_URL}/notifications/mark-all-as-read`, '', header);
};

export const notificationDelete = async (id, header) => {
    return await commonrequest('DELETE', `${API_BASE_URL}/notifications/${id}`, '', header);
};

export const notificationCount = async (header) => {
    return await commonrequest('GET', `${API_BASE_URL}/notifications/unread-count`, '', header);
};

export const postReceiverDetails = async (data, header) => {
    return await commonrequest('POST', `${API_BASE_URL}/chat/notify`, data, header);
};
