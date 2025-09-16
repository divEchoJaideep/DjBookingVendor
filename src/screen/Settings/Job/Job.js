import { View, Alert, Keyboard } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // add useFocusEffect
import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import TopHeader from '../../../../components/header/topHeader';
import Container from '../../../../components/Container';
import JobTab from '../../../navigator/JobTab';
import InvoiceTextInput from '../../../../components/invoiceTextInput';

const Job = () => {
  const { isEnabled } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();
  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
  const [activeTabIndex, setActiveTabIndex] = useState(0); 

  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');
    }, [])
  );

  return (
    <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader paddingBottomContainer={true} conatinerStyle={containerStyle}>
      <View style={[styles.container, containerStyle]}>
        <View style={{ paddingHorizontal: 20 }}>
          <TopHeader
            leftImage
            onLeftPress={() => navigation.goBack()}
            titleText
            title="Job"
            rightImage={false}
            stylesText={{ color: isEnabled ? '#fff' : '#121212' }}
            tintColorLeft={isEnabled ? '#fff' : '#121212'}
          />
        </View>

        {activeTabIndex !== 0 && (
          <InvoiceTextInput
            placeholder="Search here..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            color={isEnabled ? '#fff' : '#121212'}
            style={[styles.searchBarInput, containerStyle]}
          />
        )}

        <JobTab onTabChange={setActiveTabIndex} searchQuery={searchQuery} />
      </View>
    </Container>
  );
};

export default Job;
