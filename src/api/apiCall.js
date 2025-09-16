import axios from "axios";

export const commonrequest = async (methods, url, body, header) => {
 // console.log('body :',body);
  
  let config = {
    method: methods,
    url,
    // headers: {},
    headers: header
      ? (header = { Authorization: header, Accept: "application/json" })

      : {
        "Content-Type": "application/json",
      },
    data: body,
  };

  // axios instance
  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.log("error: ", error?.response)
      return { success: false, message: error?.response?.data?.message};

    });
};

export const commonFileUpload = async (methods, url, body, header, onUploadProgress) => {
  let config = {
    method: methods,
    url,
    headers: header
      ? {
          'Content-Type': 'multipart/form-data',
          Authorization: header,
        }
      : {
          'Content-Type': 'multipart/form-data',
        },
    data: body,

    onUploadProgress, 
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
