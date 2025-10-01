import React, { useEffect, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, Dimensions } from 'react-native';
import CreateJob from '../screen/Settings/Job/CreateJob/CreateJob';
import ListedJob from '../screen/Settings/Job/ListedJob/ListedJob';
import AppliedJob from '../screen/Settings/Job/AppliedJob/AppliedJob';
import { useTheme } from '../ThemeContext/ThemeContext';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const JobTab = ({ activeTabIndex, onTabChange, searchQuery }) => {
  const { isEnabled } = useTheme();
  const navigationRef = useRef(null);

  useEffect(() => {
    if (!navigationRef.current) return;

    const routes = ['CreateJob', 'ListedJob', 'AppliedJob'];
    navigationRef.current.jumpTo(routes[activeTabIndex]);
  }, [activeTabIndex]);

  return (
    <Tab.Navigator
      ref={navigationRef}
      screenListeners={{
        state: (e) => {
          const index = e.data.state.index;
          if (onTabChange) onTabChange(index);
        },
      }}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: '#007bff', height: 0, width: screenWidth / 3 },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarItemStyle: { width: screenWidth / 3 },
        tabBarStyle: {
          backgroundColor: isEnabled ? '#121212' : '#fff',
          marginBottom: 20,
        },
      }}
    >
      <Tab.Screen
        name="CreateJob"
        children={(props) => <CreateJob {...props} onSwitchTab={onTabChange} />}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontWeight: 'bold', fontSize: 14 }}>Create Job</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ListedJob"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontWeight: 'bold', fontSize: 14 }}>Listed Job</Text>
          ),
        }}
      >
        {() => <ListedJob searchQuery={searchQuery} />}
      </Tab.Screen>
      <Tab.Screen
        name="AppliedJob"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontWeight: 'bold', fontSize: 14 }}>Applied Job</Text>
          ),
        }}
      >
        {() => <AppliedJob searchQuery={searchQuery} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default JobTab;
