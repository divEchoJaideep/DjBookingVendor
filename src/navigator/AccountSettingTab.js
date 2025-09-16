import React from 'react';
import { Dimensions, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileDetails from '../screen/Settings/AccountSetting/ProfileDetails/ProfileDetails';
import ChangePassword from '../screen/Settings/AccountSetting/ChangePassword/ChangePassword';
import { useTheme } from '../ThemeContext/ThemeContext';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const AccountSettingTab = () => {
  const { isEnabled } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom:10,
          fontWeight: '600',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#007bff',
          height: 3,
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: isEnabled ? '#121212' : '#fff',
        },
      }}
    >
      <Tab.Screen
        name="ProfileDetails"
        component={ProfileDetails}
         options={{
                 tabBarLabel: ({ color }) => (
                   <Text style={{ color, fontWeight: 'bold', fontSize: 14 }}>
                    Basic Details
                   </Text>
                 ),
               }}
      />
      <Tab.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
                  tabBarLabel: ({ color }) => (
                    <Text style={{ color, fontWeight: 'bold', fontSize: 14 }}>
                     Change Password
                    </Text>
                  ),
                }}
      />
    </Tab.Navigator>
  );
};

export default AccountSettingTab;
