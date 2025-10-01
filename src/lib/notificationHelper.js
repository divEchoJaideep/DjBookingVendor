import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { saveFCMToken } from '../api/api';


export async function requestUserPermission() {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
                title: "Notification Permission",
                message: "This app needs access to send you notifications.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Notification permission granted");
            getFcmToken();
        } else {
            console.log("Notification permission denied");
        }
    } else { // iOS
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            getFcmToken();
        }
    }
}

const getFcmToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    // await messaging().deleteToken();
    const token = await messaging().getToken();
    const header = await AsyncStorage.getItem('userToken');;
    if (!header) {
        console.log('No FCM token found');
        return;
    }
    saveFCMToken({ "device_token": token }, `Bearer ${header}`).then((response) => {
        console.log("device_token response: ", response)
        if (!response?.success) throw new Error(response.message);
        console.log("FCM Token saved successfully:", token);
    }).catch((error) => {
        console.error('Error saving FCM token:', error);
    });
};


export const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        if (remoteMessage.from == "/topics/notifications") {
            router.push("notifications/notificationsScreen");
        } else {
            router.push("message/messageScreen");
        }
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                // e.g. "Settings"
            }
        });
};

export const topicSubscribe = async (topic = "notifications") => {
    messaging()
        .subscribeToTopic(topic)
        .then(() => console.log(`Subscribed to topic: ${topic}`));
}