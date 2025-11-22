import PhonePePaymentSDK from "react-native-phonepe-pg";
import base64 from "react-native-base64";
import { sha256 } from "react-native-sha256";
import { getPhonePeToken } from '../api/getSDKToken';
import { API_BASE_URL } from "../api/apiHelper";
import { Alert } from "react-native";

const getOrderToken = async (merchantTransactionId, amount) => {
  try {
    const token = await getPhonePeToken(); 
    if (!token) throw new Error("Failed to get OAuth token");

    const body = {
      merchantOrderId: merchantTransactionId,
      amount: amount, 
      paymentFlow: { type: "PG_CHECKOUT" },
    };

    const response = await fetch(`https://api.phonepe.com/apis/pg/checkout/v2/sdk/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `O-Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    if (!data.token) throw new Error("No order token returned");
    return data.token;

  } catch (error) {
    console.error("❌ Failed to get order token:", error);
    return null;
  }
};

export const phonePeStartTransaction = async (props) => {
  try {

    const amount = props.amount * 100; 
    const merchantTransactionId = props.transactionId;
    const merchantUserId = "USER_" + Date.now();
    const merchantId = "M232CTLAOBMEW";
    const salt_key = "b26fa16a-7c36-42dc-b70c-ba30274787ca";
    const salt_index = "1";

    const orderToken = await getOrderToken(merchantTransactionId, amount);
    if (!orderToken) return { success: false, message: "Failed to get order token" };

    const requestBody = {
      merchantId,
      merchantUserId,
      amount,
      orderId: merchantTransactionId,
      token: orderToken,
      paymentMode: { type: "PAY_PAGE" },
    };

    const jsonPayload = JSON.stringify(requestBody);
    const base64Payload = base64.encode(jsonPayload);
    const string = base64Payload + "/pg/v1/pay" + salt_key;
    const checksum = (await sha256(string)) + "###" + salt_index;

    const result = await PhonePePaymentSDK.startTransaction(jsonPayload, checksum);
    return { success: true, data: result };

  } catch (error) {
    // console.error("❌ Transaction Failed:", error);
    return { success: false, message: error.message };
  }
};

export const initPhonePeSDK = async () => {
  const merchantId = "M225RLNI4LMHX";
  const environment = "PRODUCTION";
  const flowId = "DJBOOKING_FLOW_" + Date.now();

  try {
    const result = await PhonePePaymentSDK.init(environment, merchantId, flowId, true);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const getPhonePeOrderStatus = async (merchantOrderId) => {
  try {
    const token = await getPhonePeToken(); 
    if (!token) throw new Error("Failed to get OAuth token");

    const response = await fetch(
      `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantOrderId}/status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `O-Bearer ${token}`,
        },
      }
    );
console.log('response status:',response);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.log("❌ Order Status Error:", error);
    return null;
  }
};
