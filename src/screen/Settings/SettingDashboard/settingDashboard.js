import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Switch,
    Alert,
} from 'react-native';
import styles from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import TopHeader from '../../../../components/header/topHeader';
import { AuthContext } from '../../../context/AuthContext';
import Container from '../../../../components/Container';
import Content from '../../../../components/Content';
import { notificationCount } from '../../../api/api';

const SettingDashboard = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    const { isEnabled, toggleSwitch } = useTheme();
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(0);
    const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;
    const lightGray = isEnabled ? styles.lightGrayContainer : styles.buttonbackgroundContrainer;

    useFocusEffect(
        useCallback(() => {
            getStoredUser();
            NotificationCount()
        }, [])
    );

    const getStoredUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setUser(JSON.parse(user));
            }
        } catch (error) {
            Alert.alert('Failed to get user:');
        }
    };

    const NotificationCount = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const header = `Bearer ${token}`;
            const response = await notificationCount(header);
            if (response?.status) {
                setNotification(response?.data?.unread_count);
            }
        } catch (error) {
            // console.error('Error fetching notification count:', error);
            return 0;
        }
    };

    const logoutHandler = () => {
        Alert.alert(
            `Confirm ${user?.name || 'User'}`,
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await logout();
                            Alert.alert('Logged out', 'You have been logged out.');
                        } catch (error) {
                            Alert.alert('Error', 'Logout failed.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader conatinerStyle={containerStyle}>
            <View style={styles.container}>
                <TopHeader
                    leftImage={false}
                    titleText={true}
                    stylesText={{ color: isEnabled ? '#fff' : '#121212' }}
                    tintColorLeft={isEnabled ? '#fff' : '#121212'}
                    title={'Settings'}
                    rightImage={false}
                />

                <Content
                    hasHeader
                    contentContainerStyle={[containerStyle, {
                        flex: 1,
                    }]}
                    extraScrollHeight={1}>
                    <TouchableOpacity style={styles.profileWrap} onPress={() => navigation.navigate('AccountSetting')}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: user?.profile_photo || 'path_to_default_image' }}
                                style={styles.bannarImage}
                            />
                            <Text style={[styles.title, textStyle]}>
                                {user?.name || 'User'}
                            </Text>
                        </View>
                        <Image
                            source={require('../../../Images/next.png')}
                            style={styles.nextImag}
                            tintColor={isEnabled ? '#fff' : '#121212'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingWrap} onPress={toggleSwitch}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/moon.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>Dark Mode</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#743bff' }}
                            thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingWrap} onPress={() => navigation.navigate('BankDetails')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/money.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>Bank Details</Text>
                        </View>
                        <Image
                            source={require('../../../Images/next.png')}
                            style={styles.nextImag}
                            tintColor={isEnabled ? '#fff' : '#121212'}
                        />
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.settingWrap} onPress={() => navigation.navigate('OrderMainScreen')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/shopping-bag.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>My Order</Text>
                        </View>
                        <Image
                            source={require('../../../Images/next.png')}
                            style={styles.nextImag}
                            tintColor={isEnabled ? '#fff' : '#121212'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingWrap} onPress={() => navigation.navigate('Notification')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/notification.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>Notification</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {notification > 0 && <Text style={[styles.notificationCount,]}>{notification}</Text>}
                            <Image
                                source={require('../../../Images/next.png')}
                                style={styles.nextImag}
                                tintColor={isEnabled ? '#fff' : '#121212'}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingWrap} onPress={() => navigation.navigate('Job')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/job.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>Find Workers</Text>
                        </View>
                        <Image
                            source={require('../../../Images/next.png')}
                            style={styles.nextImag}
                            tintColor={isEnabled ? '#fff' : '#121212'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingWrap} onPress={() => navigation.navigate('Terms')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/term.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>Terms & Conditions</Text>
                        </View>
                        <Image
                            source={require('../../../Images/next.png')}
                            style={styles.nextImag}
                            tintColor={isEnabled ? '#fff' : '#121212'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingWrap} onPress={() => navigation.navigate('Pricing')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/moneybag.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>Pricing</Text>
                        </View>
                        <Image
                            source={require('../../../Images/next.png')}
                            style={styles.nextImag}
                            tintColor={isEnabled ? '#fff' : '#121212'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingWrap} onPress={logoutHandler}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.settingImageWrap, lightGray]}>
                                <Image
                                    source={require('../../../Images/exit.png')}
                                    style={styles.settingImage}
                                    tintColor={isEnabled ? '#fff' : '#121212'}
                                />
                            </View>
                            <Text style={[styles.settingText, textStyle]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </Content>
            </View>
        </Container>
    );
};

export default SettingDashboard;
