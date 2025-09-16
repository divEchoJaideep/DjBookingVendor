import 'react-native-gesture-handler';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { logout } = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState();
  const updateNavigationRef = useRef(null);
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return;

        const header = `Bearer ${token}`;
        const response = await profile(header);
        if (response?.data?.status === 'rejected') {
          Alert.alert('Account Rejected', 'Your account has been rejected.');
          await logout();
        }
      } catch (error) {
        //   console.error('Status check error:', error);
      }
    };


    checkUserStatus();
  }, [currentRoute])

  if (isAuthenticated === null) {
    return <ActiveIndicator fullScreen />;
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    requestUserPermission();
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={updateNavigationRef}
        onReady={() => setCurrentRoute(updateNavigationRef.current.getCurrentRoute().name)}
        onStateChange={() => setCurrentRoute(updateNavigationRef.current.getCurrentRoute().name)}
      >
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
