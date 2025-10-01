import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TopHeader from '../../../../components/header/topHeader';
import Container from '../../../../components/Container';
import { collection, query, where, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import { UnreadContext } from '../../../ThemeContext/UnreadContext';
import EventBus from '../../../utlis/EventBus';
import styles from './styles';

const MassageDashboard = () => {
    const navigation = useNavigation();
    const { isEnabled } = useTheme();
    const { setHasUnread } = useContext(UnreadContext);

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;
    const grayContainer = isEnabled ? styles.darkGrayContainer : styles.lightContainer;

    const handleUserPress = (item, chatId) => {
        const userInfo = {
            id: item.id,
            userId: item?.userId,
            name: item?.name,
            profile: item?.profile,
            role: item?.role
        };
        navigation.navigate('Chats', { initialUserInfo: userInfo, conversationId: chatId });
    };

    const getStoredUser = async () => {
        try {
            setLoading(true);
            const user = await AsyncStorage.getItem('user');
            if (!user) return;
            const userData = JSON.parse(user);
            const currentUserKey = `${userData?.id}_vendor`;
            const db = getFirestore();
            const q = query(collection(db, 'chats'), where('participantIds', 'array-contains', currentUserKey));

            // Realtime listener
            const unsubscribe = onSnapshot(q, snapshot => {
                let conversation = [];
                let foundUnread = false;

                snapshot.forEach(doc => {
                    const data = doc.data();
                    const key = doc.id;
                    const unreadCount = data?.unreadCounts?.[currentUserKey] || 0;
                    if (unreadCount > 0) foundUnread = true;
                    conversation.push({ ...data, key, unreadCount });
                });

                // Sort chats by last message (latest first)
                conversation.sort((a, b) => {
                    const t1 = a.updatedAt?._seconds || 0;
                    const t2 = b.updatedAt?._seconds || 0;
                    return t2 - t1;
                });

                setChats(conversation);
                setHasUnread(foundUnread);
                setLoading(false);
            });

            return unsubscribe;
        } catch (error) {
            console.error("Failed to get chats:", error);
            setLoading(false);
        }
    };

    // Setup listener on screen focus
    useFocusEffect(
        useCallback(() => {
            let unsubscribe;
            getStoredUser().then(unsub => unsubscribe = unsub);
            return () => unsubscribe && unsubscribe();
        }, [])
    );

    // Listen for new messages via EventBus
    useEffect(() => {
        const handler = () => getStoredUser();
        EventBus.on('NEW_CHAT_MESSAGE', handler);
        return () => EventBus.off('NEW_CHAT_MESSAGE', handler);
    }, []);

    const renderMessage = ({ item }) => {
        const user = item?.participants.find(p => p.role === 'user');
        const timestamp = item?.updatedAt?._seconds ? new Date(item.updatedAt._seconds * 1000) : null;
        const formattedTime = timestamp ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

        return (
            <TouchableOpacity key={item.key} onPress={() => handleUserPress(user, item.key)}>
                <View style={[styles.messageContainer, grayContainer]}>
                    {/* Red border for unread */}
                    {/* <View
                        style={{
                            borderWidth: item.unreadCount > 0 ? 2 : 0,
                            borderColor: 'red',
                            borderRadius: 50,
                            padding: 2,
                        }}
                    > */}
                    <Image source={{ uri: user?.profile }} style={styles.avatar} />
                    {/* </View> */}
                    <View style={styles.messageInfo}>
                        <Text style={[styles.senderName, textStyle]}>
                            {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[styles.messageContent, textStyle, { fontWeight: item.unreadCount > 0 ? 'bold' : 'normal' }]}>
                                {item.lastMessage}
                            </Text>
                            <Text style={[styles.timestamp, { color: item.unreadCount > 0 ? 'red' : isEnabled ? '#fff' : 'gray' }]}>{formattedTime}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader conatinerStyle={containerStyle}>
            <View style={[styles.container, containerStyle]}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        <TopHeader
                            titleText
                            tintColorLeft={isEnabled ? '#fff' : '#121212'}
                            stylesText={{ color: isEnabled ? '#fff' : '#121212' }}
                            title="Message"
                            onLeftPress={() => navigation.goBack()}
                        />
                        {loading ? (
                            <ActivityIndicator size='small' color="#6C63FF" />
                        ) : (
                            <FlatList
                                data={chats}
                                renderItem={renderMessage}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.key}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                ListEmptyComponent={
                                    <View style={styles.centeredWrap}>
                                        <Text style={[styles.emptyText, textStyle]}>No Messages Found</Text>
                                    </View>
                                }
                            />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Container>
    );
};

export default MassageDashboard;
