import React from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import TopHeader from "../../../../components/header/topHeader";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../ThemeContext/ThemeContext";
import Container from "../../../../components/Container";



const Notification = () => {
    const navigation = useNavigation();
    const { isEnabled } = useTheme();


    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;
    const lightGray = isEnabled ? styles.lightGrayContainer : styles.buttonbackgroundContrainer;
    const darkGrayContainer = isEnabled ? styles.darkGray : styles.lightContainer;



    const dummyNotifications = [
        { id: '1', title: 'Booking Confirmed', message: 'Your booking has been confirmed for 5th June.' },
        { id: '2', title: 'New Offer', message: 'Get 20% off on your next booking!' },
        { id: '3', title: 'Reminder', message: 'Don’t forget your event tomorrow at 4 PM.' },
    ];

    const renderItem = ({ item }) => (
        <View style={[styles.notificationCard, darkGrayContainer]}>
            <Image
                source={require('../../../Images/notification.png')}
                style={styles.settingImage}
                tintColor={isEnabled ? '#fff' : '#121212'}
            />
            <View>

                <Text style={[styles.title, { color: isEnabled ? '#fff' : '#000' }]}>{item.title}</Text>
                <Text numberOfLines={0}multiline style={[styles.message, { color: isEnabled ? '#ccc' : '#555' }]}>{item.message}</Text>
            </View>
        </View>
    );

    return (
        <Container lightContent={isEnabled} safeAreaView paddingBottomContainer={true} safeAreaViewHeader conatinerStyle={containerStyle}>
            <View style={[styles.container,]}>
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
                <FlatList
                    data={dummyNotifications}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </Container>
    );
};

export default Notification