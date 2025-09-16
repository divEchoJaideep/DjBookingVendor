import { View, Text } from 'react-native'
import React from 'react'
import OrderDashboard from '../orderDashboard'
import { useTheme } from '../../../../ThemeContext/ThemeContext';
import styles from '../styles';
import { useRoute } from '@react-navigation/native';

const RejectOrder = () => {
   const route = useRoute();
  const { status } = route.params;
    const { isEnabled } = useTheme();
    
     const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
         const textStyle = isEnabled ? styles.darkText : styles.lightText;
         const grayContainer = isEnabled ? styles.darkGrayContainer : styles.lightContainer;
       
  return (
    <View style={[styles.tabContainer,containerStyle]}>

    <OrderDashboard status={status} />
    </View>
  )
}

export default RejectOrder