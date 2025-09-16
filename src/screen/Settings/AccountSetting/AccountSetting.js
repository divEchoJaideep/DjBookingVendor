import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import TopHeader from '../../../../components/header/topHeader'
import AccountSettingTab from '../../../navigator/AccountSettingTab'
import { useTheme } from '../../../ThemeContext/ThemeContext'
import Container from '../../../../components/Container'

const AccountSetting = () => {
    const { isEnabled } = useTheme();
    const navigation = useNavigation();
    const [backButton, setBackButton] = useState(false);
    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;
useFocusEffect(
  useCallback(() => {
    loadProfile();
  }, [])
);

    const loadProfile = async () => {
        try {
            const fetchProfile = await AsyncStorage.getItem('user');
            if (fetchProfile) {
                const parsedProfile = JSON.parse(fetchProfile);
                const profileImageURL = parsedProfile.profile_picture;

                if (parsedProfile.email) {
                    setBackButton(true);
                }
            } else {
                Alert.alert('No profile data found in ');
            }
        } catch (error) {
            Alert.alert('Something went wrong. Please try again.');
        }
    };



    return (
        <Container lightContent={isEnabled} paddingBottomContainer={true} safeAreaView safeAreaViewHeader conatinerStyle={[styles.container, containerStyle]}>
            <View style={{paddingHorizontal:20}}  >
                <TopHeader
                    leftImage={backButton}
                    onLeftPress={() => navigation.goBack()}
                    onTitletextPress={() => navigation.goBack()}
                    titleText
                    rightImage={false}
                    title={backButton ? 'Account Settings' : 'Update Details'}
                    stylesText={{ color: isEnabled ? "white" : "black" }}
                    tintColorLeft={isEnabled ? '#fff' : '#121212'}
                />
            </View>
            <AccountSettingTab />
        </Container>
    )
}

export default AccountSetting