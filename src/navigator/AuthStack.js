import React, { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';
import SignUp from '../screen/signUp/SignUp';
import signIn from '../screen/signIn/SignIn';
// import SignIn from '../screen/SignIn/SignIn';
import OTPVerification from '../screen/otpVerification/OTPVerification';
import ForgotPassword from '../screen/ForgotPass/forgotPassword'


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const backPressCount = useRef(0);

  const currentRouteName = useNavigationState((state) =>
    state?.routes?.[state.index]?.name 
  );

  useEffect(() => {
    const backAction = () => {
      if (
        currentRouteName === 'SignIn' ||
        currentRouteName === 'SignUp' ||
        currentRouteName === 'ForgotPassword'
      ) {
        if (backPressCount.current === 0) {
          backPressCount.current += 1;
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

          setTimeout(() => {
            backPressCount.current = 0;
          }, 2000);

          return true;
        } else {
          BackHandler.exitApp();
          return true;
        }
      }

      return false; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [currentRouteName]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={signIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />

    </Stack.Navigator>
  );
};

export default AuthStack;
