import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderTabs from '../../../navigator/OrderTab';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import TopHeader from '../../../../components/header/topHeader';
import styles from './styles';
import Container from '../../../../components/Container';

const OrderMainScreen = () => {
  const { isEnabled } = useTheme();
  const navigation = useNavigation();

  

  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;

  return (
    <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader conatinerStyle={containerStyle}>
      <View style={[styles.container, containerStyle,]}>
        <View style={{ marginHorizontal: 20 }}>
          <TopHeader
            leftImage={false}
            onLeftPress={() => navigation.goBack()}
            titleText={true}
            stylesText={{ color: isEnabled ? "#fff" : "#121212" }}
            tintColorLeft={isEnabled ? '#fff' : '#121212'}
            title={'My Orders'}
          />
        </View>
        <OrderTabs />
      </View>
    </Container>
  );
};

export default OrderMainScreen;
