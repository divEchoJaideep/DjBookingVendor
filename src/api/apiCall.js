import axios from "axios";

export const commonrequest = async (methods, url, body, header) => {
  let config = {
    method: methods,
    url,
    headers: header
      ? { Authorization: header, Accept: "application/json" }
      : { "Content-Type": "application/json" },
    data: body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Console me detailed error log
    if (error.response) {
      // Server responded with a status other than 2xx
      console.log("Error Response:", error.response.data, error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.log("Error Request:", error.request);
    } else {
      // Something else caused the error
      console.log("Error Message:", error.message);
    }
    return { error: true, details: error };
  }
};

export const commonFileUpload = async (methods, url, body, header) => {
  let config = {
    method: methods,
    url,
    headers: header
      ? { "Content-Type": "multipart/form-data", Authorization: header }
      : { "Content-Type": "multipart/form-data" },
    data: body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("File Upload Error Response:", error.response.data, error.response.status);
    } else if (error.request) {
      console.log("File Upload Error Request:", error.request);
    } else {
      console.log("File Upload Error Message:", error.message);
    }
    return { error: true, details: error };
  }
};
