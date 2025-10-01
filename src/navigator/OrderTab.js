import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, Dimensions } from 'react-native';
import PendingOrder from '../screen/Order/orderDashboard/Pending/PendingOrder';
import RejectOrder from '../screen/Order/orderDashboard/Reject/RejectOrder';
import AcceptOrder from '../screen/Order/orderDashboard/Accept/AcceptOrder';
import CancelOrder from '../screen/Order/orderDashboard/Cancel/CancelOrder';
import CompleteOrder from '../screen/Order/orderDashboard/Complete/CompleteOrder';
import { useTheme } from '../ThemeContext/ThemeContext';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const OrderTabs = () => {
    const { isEnabled } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: { backgroundColor: '#007bff', height: 0, },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#888',
                // tabBarItemStyle: { width: screenWidth / 3 },
                tabBarStyle: {
                    backgroundColor: isEnabled ? '#121212' : '#fff',
                },
            }}
        >
            <Tab.Screen
                name="PendingOrder"
                component={PendingOrder}
                initialParams={{ status: 'pending' }}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{
                            color: focused ? '#007bff' : '#888', 
                            fontWeight: 'bold',
                            fontSize: 14,
                            textAlign: 'center',
                        }}>                            Pending Order
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="AcceptOrder"
                component={AcceptOrder}
                initialParams={{ status: 'accepted' }}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{
                            color: focused ? '#007bff' : '#888', 
                            fontWeight: 'bold',
                            fontSize: 14,
                            textAlign: 'center',
                        }}>                            Accepted Order
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="RejectOrder"
                component={RejectOrder}
                initialParams={{ status: 'rejected' }}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{
                            color: focused ? '#007bff' : '#888', 
                            fontWeight: 'bold',
                            fontSize: 14,
                            textAlign: 'center',
                        }}>                            Rejected Order
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="CancelOrder"
                component={CancelOrder}
                initialParams={{ status: 'cancelled' }}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{
                            color: focused ? '#007bff' : '#888', 
                            fontWeight: 'bold',
                            fontSize: 14,
                            textAlign: 'center',
                        }}>                            Cancelled Order
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="CompleteOrder"
                component={CompleteOrder}
                initialParams={{ status: 'completed' }}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{
                            color: focused ? '#007bff' : '#888', // important
                            fontWeight: 'bold',
                            fontSize: 14,
                            textAlign: 'center',
                        }}>                            Completed Order
                        </Text>
                    ),
                }}
            />
        </Tab.Navigator>

    );
};

export default OrderTabs;
