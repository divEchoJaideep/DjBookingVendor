import 'react-native-gesture-handler';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveIndicator from './components/ActriveIndicator/ActiveIndicator';
import { ThemeProvider } from './src/ThemeContext/ThemeContext';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import AppStack from './src/navigator/AppStack';
import AuthStack from './src/navigator/AuthStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profile } from './src/api/api';
import { Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { requestUserPermission } from './src/lib/notificationHelper';
import { displayNotification } from './src/utlis/diplayNotification';
import { UnreadProvider } from './src/ThemeContext/UnreadContext';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const MainNavigator = () => {
  const { logout } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState();
console.log('isAuthenticated :', isAuthenticated);

  useEffect(() => {
    const checkUserStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return;

    const header = `Bearer ${token}`;
    const response = await profile(header);
    console.log('response :', response);

    // 🔹 Unauthorized (401)
    if (response?.unauthorized) {
      Alert.alert('Logged Out', 'Your account is logged into another device');
      await logout();
      return;
    }

    // 🔹 Logged in on another device
    // if (response?.success === false) {
    //   Alert.alert('Logged Out', 'Your account is logged into another device.');
    //   await logout();
    //   return;
    // }

    // 🔹 Network error / timeout → sirf alert, no logout
    // if (response?.error && !response?.unauthorized) {
    //   Alert.alert('Network Error', response.message || 'Please check your internet connection.');
    //   return;
    // }

  } catch (error) {
    // Catch unexpected JS errors → alert only
    // Alert.alert('Error', error.message || 'Something went wrong.');
  }
};

    checkUserStatus();
  }, [currentRoute]);

  if (isAuthenticated === null) return <ActiveIndicator fullScreen />;

  useEffect(() => {
    if (isAuthenticated) requestUserPermission();
  }, [isAuthenticated]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => setCurrentRoute(navigationRef.getCurrentRoute()?.name)}
        onStateChange={() => setCurrentRoute(navigationRef.getCurrentRoute()?.name)}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="AppStack" component={AppStack} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => {
  const orderNav = [
    { key: "new_order", screen: { name: "OrderMainScreen", child: "PendingOrder" } },
    { key: "order_accepted", screen: { name: "OrderMainScreen", child: "AcceptOrder" } },
    { key: "order_rejected", screen: { name: "OrderMainScreen", child: "RejectOrder" } },
    { key: "order_completed", screen: { name: "OrderMainScreen", child: "CompleteOrder" } },
    { key: "order_cancelled", screen: { name: "OrderMainScreen", child: "CancelOrder" } },
    { key: "chat_notification", screen: { name: "AppStack", child: 'Chats' } },
    { key: "new_applied", screen: { name: "Job", child: 'AppliedJob' } },

  ];

  const pendingNotification = useRef(null);

  const navigateToScreen = (screen, child = null, params = {}) => {
    if (!navigationRef.isReady()) {
      pendingNotification.current = () => navigateToScreen(screen, child, params);
      return;
    }

    if (child) {
      navigationRef.navigate(screen);
      setTimeout(() => {
        if (navigationRef.isReady()) {
          navigationRef.navigate(screen, { screen: child, params });
        }
      }, 300);
    } else {
      navigationRef.navigate(screen, params);
    }
  };

  useEffect(() => {
    const handleNotification = (remoteMessage) => {
      if (!remoteMessage?.data?.type) return;

      const type = remoteMessage.data.type;
      const matched = orderNav.find(item => item.key === type);
      if (!matched) return;

      let params = {};
      if (type === 'chat_notification' && remoteMessage.data.chatId) {
        params = { conversationId: remoteMessage.data.chatId };
      }

      navigateToScreen(matched.screen.name, matched.screen.child, params);
    };

    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      await displayNotification(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body,
        () => handleNotification(remoteMessage)
      );
    });

    const unsubscribeBackground = messaging().onNotificationOpenedApp(handleNotification);

    messaging().getInitialNotification().then(remoteMessage => {      
      if (remoteMessage) {
        if (!navigationRef.isReady()) {
          pendingNotification.current = () => handleNotification(remoteMessage);
        } else {
          handleNotification(remoteMessage);
        }
      }
    });

    const interval = setInterval(() => {
      if (navigationRef.isReady() && pendingNotification.current) {
        pendingNotification.current();
        pendingNotification.current = null;
      }
    }, 500);

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
      clearInterval(interval);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <UnreadProvider>
            <MainNavigator />
          </UnreadProvider>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
