import axios from "axios";
import { globalLogout } from "../utlis/globalLogout";

// Flag to ensure logout is triggered only once
let isLoggingOut = false;

// Common API request function
export const commonrequest = async (method, url, body, header) => {
  const config = {
    method: method,
    url: url,
    headers: header
      ? { Authorization: header, Accept: "application/json" }
      : { "Content-Type": "application/json" },
    data: body,
    timeout: 15000,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Server responded with a status code
    if (error.response) {
      console.log("Error Response:", error.response.data, error.response.status);

      // Handle 401 Unauthorized once
      if (error.response.status === 401 && !isLoggingOut) {
        isLoggingOut = true;
        await globalLogout();
        isLoggingOut = false; // Reset after logout completes
        return {
          error: true,
          unauthorized: true,
          message: error.response.data?.message || "Unauthorized. Please login again.",
        };
      }

      // Other server errors
      return {
        error: true,
        status: error.response.status,
        message: error.response.data?.message || "Server error occurred.",
      };
    }

    // Network Error
    if (error.message === "Network Error") {
      return { error: true, message: "Network Error: Please check your internet connection." };
    }

    // Timeout Error
    if (error.code === "ECONNABORTED") {
      return { error: true, message: "Request timed out. Please try again." };
    }

    // Unknown Error
    return { error: true, message: error.message || "Something went wrong." };
  }
};

// Common File Upload function

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
