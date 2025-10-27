import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import TopHeader from "../../../../components/header/topHeader";
import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../ThemeContext/ThemeContext";
import Container from "../../../../components/Container";
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead, notificationDelete } from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Notification = () => {
    const navigation = useNavigation();
    const { isEnabled } = useTheme();

    const [notificationData, setNotificationData] = useState({
        total: 0,
        notifications: [],
        current_page: 1,
        last_page: 1,
    });

    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getAllNotifications();

            // return () => {
            //     allReadNotifications();
            // };
        }, [])
    );

    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;
    const lightGray = isEnabled ? styles.lightGrayContainer : styles.buttonbackgroundContrainer;
    const darkGrayContainer = isEnabled ? styles.darkGray : styles.lightContainer;


    const getAllNotifications = async (page = 1) => {
        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;

        try {
            setLoading(true);
            const response = await getNotifications(header, page);

            if (response?.status) {
                const { notifications, current_page, last_page, total } = response.data;

                setNotificationData(prev => ({
                    total,
                    notifications: page === 1 ? notifications : [...prev.notifications, ...notifications],
                    current_page,
                    last_page,
                }));
            }
        } catch (error) {
            // console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };


    const allReadNotifications = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;
        try {
            const response = await markAllNotificationsAsRead(header);
            if (response?.status) {
                getAllNotifications();
            }
        } catch (error) {
            // console.error("Error marking all notifications as read:", error);
        }
    }

     const handleReadNotification = async(id) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;
          const response = await markNotificationAsRead(id ,header);
          console.log('response :',response);
          
          if (response?.status) {
            getAllNotifications();
          }          
        } catch (error) {
            
        }
    }

    const handleDeleteNotification = async (id) => {

        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;
        try {
            const response = await notificationDelete(id, header);
            if (response?.status) {
                Alert.alert('Alert', response?.message || 'Notification deleted successfully');
                getAllNotifications();
            }
        } catch (error) {
        }
        // Implement delete functionality here
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.notificationCard, darkGrayContainer]} onPress={() => handleReadNotification(item.id)}>
            <TouchableOpacity onPress={() => handleDeleteNotification(item.id)} style={styles.closeButton}>
                <Text>X</Text>
            </TouchableOpacity>
            <Image
                source={require('../../../Images/notification.png')}
                style={styles.settingImage}
                tintColor={isEnabled ? '#fff' : '#121212'}
            />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '87%' }}>
                    <View>
                        <Text style={[styles.title, { color: isEnabled ? '#fff' : '#000' }]}>{item.data.title}</Text>

                    </View>


                </View>
                <Text style={[styles.message, { color: isEnabled ? '#ccc' : '#555' }]} numberOfLines={2} multiline >{item.data.body}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Container lightContent={isEnabled} paddingBottomContainer={true} safeAreaView safeAreaViewHeader conatinerStyle={containerStyle}>
            <View style={[styles.container, containerStyle]}>
                <TopHeader
                    topHeaderStyle={styles.topHeader}
                    leftImage={true}
                    onLeftPress={() => navigation.goBack()}
                    titleText={true}
                    title={'Notifications'}
                    rightImage={false}
                    stylesText={{ color: isEnabled ? "#fff" : "#121212" }}
                    tintColorLeft={isEnabled ? '#fff' : '#121212'}
                />
                {loading ? (
                    <ActivityIndicator size="small" color="#rgb(116 58 255)" style={{ marginTop: 10 }} />
                ) : (
                    
                
                <FlatList
                    data={notificationData.notifications}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={renderItem}
                    onEndReached={() => {
                        if (notificationData.current_page < notificationData.last_page) {
                            getAllNotifications(notificationData.current_page + 1);
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
                            Notifications not found
                        </Text>
                    }
                />
                )}
            </View>
        </Container>
    );
};

export default Notification