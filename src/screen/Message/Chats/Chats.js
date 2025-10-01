import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Container from '../../../../components/Container';
import TopHeader from '../../../../components/header/topHeader';
import styles from './styles';
import { View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext/ThemeContext';
import { postReceiverDetails } from '../../../api/api';
import { doc, getDoc, getFirestore } from "@react-native-firebase/firestore";

export default function ChatScreen({ route }) {
  const navigation = useNavigation();
  const { initialUserInfo, conversationId } = route.params || {};
  const [currentUser, setCurrentUser] = useState({});
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState(initialUserInfo || {});
  const { isEnabled } = useTheme();

  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;

  useFocusEffect(
    useCallback(() => {
      getStoredUser();
    }, [])
  );

  const getStoredUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        const id = userInfo?.userId || '';
        const chatId = conversationId ?? [id, `${userData?.id}_vendor`].sort().join('_');
        setChatId(chatId);
        setCurrentUser({ ...userData, vendorId: `${userData?.id}_vendor`, role: 'vendor' });
      }
    } catch (error) {
      console.log('Failed to get user:', error);
    }
  };

useEffect(() => {
  if (!chatId || !currentUser?.vendorId) return;
  const chatRef = firestore().collection('chats').doc(chatId);
  firestore().runTransaction(async (transaction) => {
    const chatDoc = await transaction.get(chatRef);
    if (!chatDoc.exists) return;
    const data = chatDoc.data();
    const unreadCounts = { ...data.unreadCounts, [currentUser.vendorId]: 0 };
    transaction.update(chatRef, { unreadCounts });
  }).catch(err => console.log('Failed to reset unread count:', err));
}, [chatId, currentUser]);


  useEffect(() => {
    if (!chatId) return;

    getChatParticipants(chatId);

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
              _id: data.senderId,
              avatar:
                data.senderPhoto ||
                (data.senderId === currentUser?.vendorId
                  ? currentUser?.profile_photo
                  : userInfo?.profile)
            }
          };
        });
        setMessages(allMsgs);
      });

    return () => unsubscribe();
  }, [chatId, userInfo, currentUser]);

  const getChatParticipants = async (chatId) => {
    const db = getFirestore();
    const chatRef = doc(db, 'chats', chatId);
    const docSnap = await getDoc(chatRef);
    if (docSnap.exists()) {
      const chatData = docSnap.data();
      const participants = chatData.participants || [];
      const user = participants.find(p => p.role === 'user');
      setUserInfo(initialUserInfo || user);
    }
  };

  // Send message
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

    // Update chat document with last message & unread counts
    firestore().collection('chats').doc(chatId).set({
      participants: [
        {
          id: currentUser?.id,
          vendorId: currentUser?.vendorId,
          profile: currentUser?.profile_photo,
          name: currentUser?.name,
          role: currentUser?.role
        },
        {
          id: userInfo?.id,
          userId: userInfo?.userId,
          name: userInfo?.name,
          profile: userInfo?.profile,
          role: userInfo?.role
        }
      ],
      participantIds: [currentUser?.vendorId, userInfo?.userId],
      lastMessage: msg.text,
      updatedAt: firestore.FieldValue.serverTimestamp(),
      unreadCounts: {
        [currentUser?.vendorId]: 0,
        [userInfo?.userId]: firestore.FieldValue.increment(1)
      }
    }, { merge: true });

    sendReceiverDetails(msg.text);
  }, [chatId, currentUser, userInfo]);

  const sendReceiverDetails = async (messageText) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const data = {
        chatId,
        user_id: userInfo?.id,
        title: `New message from ${currentUser?.name}`,
        user_type: userInfo?.role,
        message: messageText
      };
      await postReceiverDetails(data, header);
    } catch (err) {
      console.log('Error sending receiver details:', err);
    }
  };

  return (
    <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader conatinerStyle={containerStyle}>
      <View style={styles.container}>
        <TopHeader
          style={styles.topHeader}
          leftImage
          tintColorLeft={isEnabled ? '#fff' : '#121212'}
          stylesText={{ color: isEnabled ? '#fff' : '#121212' }}
          titleText
          title={userInfo?.name ? userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1) : ''}
          headerImageStyle={styles.profileImage}
          onLeftPress={() => navigation.goBack()}
        />
      </View>

      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: currentUser?.vendorId }}
        showUserAvatar={false}
        renderAvatarOnTop
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: isEnabled ? '#2C2C2E' : '#F0F0F0' },
              right: { backgroundColor: isEnabled ? '#1A73E8' : '#007AFF' },
            }}
            textStyle={{
              left: { color: isEnabled ? '#fff' : '#000' },
              right: { color: '#fff' },
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: isEnabled ? '#1C1C1E' : '#FFF',
              borderTopColor: isEnabled ? '#333' : '#EEE',
            }}
          />
        )}
        renderSend={props => (
          <Send {...props} containerStyle={{ justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
            <TouchableOpacity
              onPress={() => {
                if (!props.text?.trim()) return;
                props.onSend([{
                  _id: Math.random().toString(),
                  text: props.text,
                  createdAt: new Date(),
                  user: { _id: currentUser?.vendorId }
                }], true);
              }}
            >
              <Image
                source={require('../../../Images/send.png')}
                style={{ width: 30, height: 30, tintColor: isEnabled ? '#fff' : '#007AFF' }}
              />
            </TouchableOpacity>
          </Send>
        )}
        textInputStyle={{
          color: isEnabled ? '#fff' : '#000',
          backgroundColor: isEnabled ? '#2C2C2E' : '#F0F0F0',
          borderRadius: 20,
          paddingHorizontal: 15,
        }}
        placeholder="Type a message..."
        placeholderTextColor={isEnabled ? '#999' : '#555'}
      />
    </Container>
  );
}
