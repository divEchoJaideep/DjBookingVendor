import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useTheme } from '../../src/ThemeContext/ThemeContext';

const ActiveIndicator = ({ fullScreen = false, withBackground = true }) => {
  const { isEnabled } = useTheme();

  return (
    <View
      style={[
        styles.mainContainer,
        fullScreen && styles.fullScreen,
        withBackground && { backgroundColor: isEnabled ? '#121212' : '#fff' },
      ]}
    >
      <ActivityIndicator size="large" color="#743bff" />
    </View>
  );
};

export default ActiveIndicator;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
  },
});
