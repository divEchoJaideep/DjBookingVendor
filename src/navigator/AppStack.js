import React, { useEffect, useState, useContext } from 'react';
import { Alert, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTab from './BottomTab';
import AccountSetting from '../screen/Settings/AccountSetting/AccountSetting';
import BankDetails from '../screen/bankDetails/BankDetails';
import product from '../screen/Product/addProduct/Product';
import orderProductsDetails from '../screen/Order/orderProductsDetail/orderProductsDetails';
import orderDashboard from '../screen/Order/orderDashboard/orderDashboard';
import ProductDetails from '../screen/Product/ProductDetails/ProductDetails';
import { profile } from '../api/api';
import ActiveIndicator from '../../components/ActriveIndicator/ActiveIndicator';
import { AuthContext } from '../context/AuthContext';
import Job from '../screen/Settings/Job/Job';
import ProductsDashboard from '../screen/Product/ProductDashboard/ProductsDashboard';
import Notification from '../screen/Settings/Notification/Notification';
import OrderTabs from './OrderTab';
import OrderMainScreen from '../screen/Order/orderDashboard/OrderMainScreen';
import Chats from '../screen/Message/Chats/Chats';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { logout } = useContext(AuthContext);
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;
        const userProfile = await profile(header);
        if (userProfile) {
          if (userProfile.data?.name && userProfile.data?.name.trim() !== '') {
            setInitialRoute('BottomTab');
          } else {
            setInitialRoute('AccountSetting');
          }
        } else {
          Alert.alert('Error', 'Failed to fetch profile');
          setInitialRoute('Login');
        }
      } catch (error) {
       // console.error(error);
        Alert.alert('Error', 'Something went wrong');
        setInitialRoute('Login');
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, []);

  if (loading || initialRoute === null) {
    return <ActiveIndicator fullScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="product" component={product} />
      <Stack.Screen name="orderProductsDetails" component={orderProductsDetails} />
      <Stack.Screen name='ProductsDashboard' component={ProductsDashboard} />
       <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name='OrderMainScreen' component={OrderMainScreen}  />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Job" component={Job} />
      <Stack.Screen name='Notification' component={Notification} />
    </Stack.Navigator>
  );
};

export default AppStack;
