import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Container from '../../../../components/Container';
import TopHeader from '../../../../components/header/topHeader';
import styles from './styles';
import { View } from 'react-native';
import { useTheme } from '../../../ThemeContext/ThemeContext';

export default function ChatScreen({ route }) {
  const navigation = useNavigation();
  const { userInfo, conversationId } = route.params || {}; // chat with this user
  const [currentUser, setCurrentUser] = useState({})
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);
  console.log('messages :', messages);


  const { isEnabled } = useTheme();
  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;
  const grayContainer = isEnabled ? styles.darkGrayContainer : styles.lightContainer;

  useFocusEffect(
    useCallback(() => {
      getStoredUser();
    }, [])
  )

  const getStoredUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        const chatId = conversationId ?? [userInfo?.userId, `${user?.id}_vendor`].sort().join('_');
        setChatId(chatId)
        setCurrentUser({ ...userData, vendorId: `${userData?.id}_vendor`, role: 'vendor' });
      }
    } catch (error) {
      //Alert.alert('Failed to get user:');
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const allMsgs = snapshot?.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            user: {
              _id: data.senderId
            }
          };
        });
        setMessages(allMsgs);
      });
    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback((newMessages = []) => {
    const msg = newMessages[0];
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text: msg.text,
        senderId: currentUser?.vendorId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    // update chat meta
    firestore().collection('chats').doc(chatId).set({
      participants: [
        {
          id: currentUser?.id,
          vendorId: currentUser?.vendorId,
          name: currentUser?.name,
          role: currentUser?.role

        },
        {
          id: userInfo?.id,
          userId: userInfo?.userId,
          name: userInfo?.name,
          role: userInfo?.role

        }],
      participantIds: [currentUser?.vendorId, userInfo?.userId],
      lastMessage: msg.text,
      updatedAt: firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }, [chatId, currentUser?.vendorId, userInfo?.userId]);

  return (
    <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader containerStyle={containerStyle}>
      <View style={styles.container}>
        <TopHeader
          style={styles.topHeader}
          leftImage
          // profileImage
          // tintColorLeft={isEnabled ? '#fff' : '#121212'}
          // stylesText={{ color: isEnabled ? "#fff" : "#121212" }}
          titleText
          title={userInfo?.name.charAt(0).toUpperCase() + userInfo?.name.slice(1) || ''}
          // headerImage={userProfileImage}
          headerImageStyle={styles.profileImage}
          onLeftPress={() => navigation.goBack()}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: currentUser?.vendorId }}
        showUserAvatar={false}
        renderAvatar={null}
      />
    </Container>
  );
}