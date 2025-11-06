import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

let logoutCallback = null;

export const setLogoutCallback = (cb) => {
  logoutCallback = cb;
};

export const globalLogout = async () => {
  try {
    await AsyncStorage.multiRemove(["isAuthenticated", "userToken", "user"]);

    Alert.alert(
      "Logged Out",
      "Your account is logged into another device.",
      [{ text: "OK" }]
    );
    if (logoutCallback) logoutCallback();
  } catch (e) {
    console.log("❌ Global logout error:", e);
  }
};
