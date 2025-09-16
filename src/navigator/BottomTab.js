import * as React from 'react';
import { Image, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../ThemeContext/ThemeContext';
import DashBorad from '../screen/DashBorad/DashBorad';
import settingDashboard from '../screen/Settings/SettingDashboard/settingDashboard';
import ProductsDashboard from '../screen/Product/ProductDashboard/ProductsDashboard';
import OrderMainScreen from '../screen/Order/orderDashboard/OrderMainScreen';
import MassageDashboard from '../screen/Message/MassageDashboard/MassageDashboard';

const Tab = createBottomTabNavigator();

const BottomTab = ({ route }) => {ProductsDashboard
  const { isEnabled } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        paddingBottom:Platform.OS === 'android' ? 20 : 20,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          if (route.name === 'DashBorad') {
            iconSource = focused
              ? require('../Images/home.png')
              : require('../Images/home.png');
          } else if (route.name === 'ProductsDashboard') {
            iconSource = focused
              ? require('../Images/menu1.png')
              : require('../Images/menu1.png');
          } else if (route.name === 'settingDashboard') {
            iconSource = focused
              ? require('../Images/user.png')
              : require('../Images/user.png');
          }
           else if (route.name === 'OrderMainScreen') {
            iconSource = focused
              ? require('../Images/shopping-bag.png')
              : require('../Images/shopping-bag.png');
          } 
     else if (route.name === 'MassageDashboard') {
            iconSource = focused
              ? require('../Images/messenge-active.png')
              : require('../Images/messenge-active.png');
          } 
          return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color,
              fontSize: 12,
              fontWeight: 'bold',
             
            }}
          >
            {route.name === 'DashBorad' && 'Home'}
            {route.name === 'ProductsDashboard' && 'Listing'}
            {route.name === 'settingDashboard' && 'Profile'}
            {route.name === 'OrderMainScreen' && 'My Order'} 
                        {route.name === 'MassageDashboard' && 'Message'} 

          </Text>
        ),
        tabBarActiveTintColor: '#743bff',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: isEnabled ? '#121212' : '#fff',
          // paddingVertical:25,
          // height: 70,
          // paddingBottom: insets.bottom, 
        },
      })}
    >
      <Tab.Screen name="DashBorad" component={DashBorad} initialParams={{ Name: route.params?.Name, Avtar: route.params?.Avtar }} />
      <Tab.Screen name="ProductsDashboard" component={ProductsDashboard} />
            <Tab.Screen name="MassageDashboard" component={MassageDashboard} />
      <Tab.Screen name="OrderMainScreen" component={OrderMainScreen} />
      <Tab.Screen name="settingDashboard" component={settingDashboard} />
    </Tab.Navigator>
  );
};

export default BottomTab;
