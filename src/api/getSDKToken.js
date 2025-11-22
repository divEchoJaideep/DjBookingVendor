export const   getPhonePeToken = async () => {
  try {
    console.log('getTokenSDK');

    // Prepare URL-encoded body
    const formBody = new URLSearchParams();
    formBody.append("client_id", "SU2510291440124279332990");
    formBody.append("client_version", "1"); // required by PhonePe
    formBody.append("client_secret", "b26fa16a-7c36-42dc-b70c-ba30274787ca");
    formBody.append("grant_type", "client_credentials");

    const response = await fetch(
      "https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      }
    );

    const data = await response.json();
    console.log("PhonePe Token Response:", data);

    return data.access_token || null;
  } catch (error) {
    console.error("Failed to get PhonePe token:", error);
    return null;
  }
};

