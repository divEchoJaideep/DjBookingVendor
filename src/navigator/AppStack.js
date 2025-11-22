import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import BottomTab from './BottomTab';
import AccountSetting from '../screen/Settings/AccountSetting/AccountSetting';
import BankDetails from '../screen/bankDetails/BankDetails';
import product from '../screen/Product/addProduct/Product';
import orderProductsDetails from '../screen/Order/orderProductsDetail/orderProductsDetails';
import ProductsDashboard from '../screen/Product/ProductDashboard/ProductsDashboard';
import ProductDetails from '../screen/Product/ProductDetails/ProductDetails';
import OrderMainScreen from '../screen/Order/orderDashboard/OrderMainScreen';
import Chats from '../screen/Message/Chats/Chats';
import Notification from '../screen/Settings/Notification/Notification';
import Job from '../screen/Settings/Job/Job';
import Terms from '../screen/Terms&Conditions/Terms';
import Pricing from '../screen/Pricing/Pricing';

import ActiveIndicator from '../../components/ActriveIndicator/ActiveIndicator';
import NetworkErrorPopup from '../../components/NetworkSkeleton/NetworkErrorPopup';
import NetworkError from './../../components/NetworkSkeleton/NetworkSkeleton';
import { profile } from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { logout } = useContext(AuthContext);

  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  console.log('initialRoute :', initialRoute);

  const determineInitialRoute = async () => {
    setLoading(true);
    setNetworkError(false);
    setInitialRoute(null);

    try {
      const token = await AsyncStorage.getItem('userToken');
      // const header = `Bearer ${token}`;
      // const userProfile = await profile(header);
      // console.log("userProfile :", userProfile);
      // const name = userProfile?.data?.name?.trim();
      const user = await AsyncStorage.getItem('user');
      const name = JSON.parse(user).name;

      if (token && name) {
        setInitialRoute('BottomTab');
      } else {
        setInitialRoute('AccountSetting');
      }

    } catch (error) {
      console.log("Error fetching profile: ", error);
      setNetworkError(true);

    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setNetworkError(true);
      } else {
        if (networkError) {
          determineInitialRoute();
        }
      }
    });

    return () => unsubscribe();
  }, [networkError]);

  useEffect(() => {
    determineInitialRoute();
  }, []);

  if (loading || initialRoute === null) {
    return <ActiveIndicator fullScreen />;
  }

  if (networkError) {
    return <NetworkError onRetry={determineInitialRoute} />;
  }

  return (
    //  <>
    //   <NetworkErrorPopup
    //     visible={networkError}
    //     onRetry={() => {
    //       setNetworkError(false);
    //       determineInitialRoute();
    //     }}
    //     onClose={() => setNetworkError(false)}
    //   />

    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="product" component={product} />
      <Stack.Screen name="orderProductsDetails" component={orderProductsDetails} />
      <Stack.Screen name='ProductsDashboard' component={ProductsDashboard} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name='OrderMainScreen' component={OrderMainScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Job" component={Job} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='Terms' component={Terms} />
      <Stack.Screen name='Pricing' component={Pricing} />
    </Stack.Navigator>
    // </>
  );
};

export default AppStack;
