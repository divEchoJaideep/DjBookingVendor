import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { GiftedChat, Bubble, Send, Day, InputToolbar } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';
import Container from '../../../../components/Container';
import TopHeader from '../../../../components/header/topHeader';
import styles from './styles';
import messagesData from './ChatMsg'; 
import { Colors } from '../../../../components/colors/colors';
import { useTheme } from '../../../ThemeContext/ThemeContext';

const ChatMessageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName, userProfileImage } = route.params || {};

  const [messages, setMessages] = useState([]);
  const { isEnabled } = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle(isEnabled ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isEnabled ? '#121212' : '#fff');
  }, [isEnabled]);

  useEffect(() => {
    setMessages(messagesData);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
  }, []);

  const renderSend = (props) => (
    <Send  {...props} containerStyle={styles.chatSendBtnContainer}>
      <Image
        style={styles.topSymbolImgback} 
        resizeMode="contain"
        source={require('../../../Images/send.png')}
      />
    </Send>
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          // backgroundColor: Colors.white,
          borderWidth: 1,
          // borderColor: Colors.lightGray,
          borderRadius: 12,
        },
        right: {
           backgroundColor: Colors.chatUserMessage,
          borderRadius: 12,
        },
      }}
      textStyle={{
        // left: { color: Colors.black },
        // right: { color: Colors.white },
      }}
    />
  );

  const renderDay = (props) => (
    <Day
      {...props}
      textStyle={styles.dateTextStyle}
      containerStyle={styles.dateTextContainerStyle}
    />
  );

  const renderInputToolbar = (props) => (
    <View style={styles.textInputWraper}>

    <InputToolbar
      {...props}
      containerStyle={styles.textInput}
      primaryStyle={{ alignItems: 'center' }}
      />
       </View>
  );

  return (
    <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader  conatinerStyle={isEnabled ? styles.darkContainer : styles.lightContainer}>
      <View style={styles.container}>
        <TopHeader
        style={styles.topHeader}
          leftImage
          profileImage
          tintColorLeft={isEnabled ? '#fff' : '#121212'}
          stylesText={{ color: isEnabled ? "#fff" : "#121212" }}
          titleText
          title={userName}
          headerImage={userProfileImage}
          headerImageStyle={styles.profileImage}
          onLeftPress={() => navigation.goBack()}
        />
      </View>

      <GiftedChat
        messages={messages}
        showUserAvatar ={false}
        renderAvatar={null}
        onSend={onSend}
        user={{ _id: 1 }} 
        renderSend={renderSend}
        renderBubble={renderBubble}
        renderDay={renderDay}
        renderInputToolbar={renderInputToolbar}
        alwaysShowSend
        scrollToBottom
        placeholder="Type a message..."
      />
    </Container>
  );
};

export default ChatMessageScreen;
