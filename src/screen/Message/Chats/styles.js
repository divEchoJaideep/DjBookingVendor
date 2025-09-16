import { StyleSheet } from 'react-native';
import { fontSize } from '../../../../components/size/size';
import { Colors } from '../../../../components/colors/colors';

export default StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 20,
    },
    topHeader: {
      
    },
    textInputWraper: {
        // backgroundColor: 'red',
        height: 40,
        paddingHorizontal:10,
        marginBottom:10
    },
    topHeaderWrap: {
        padding: 10,
    },
    backText: {
        fontSize: 18,
        color: 'blue',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    headerProfileWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20, // Circle shape for profile image
    },
    messageContainer: {
        // flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
    },
    senderMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        borderRadius: 10,
        maxWidth: '70%',
    },
    receiverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E4E6EB',
        borderRadius: 10,
        maxWidth: '70%',
    },
    messageContent: {
        fontSize: 16,
    },
    senderMessageContent: {
        color: '#000',
    },
    receiverMessageContent: {
        color: '#333',
    },
    timestamp: {
        fontSize: 10,
        color: '#999',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        // padding: 10,
        backgroundColor: '#fff',

    },
    textInput: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        borderWidth: 0,
        paddingVertical: 'auto'
    },
    sendButton: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#25D366',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    messagesList: {
        paddingBottom: 10,
        paddingTop: 10,
    },
    chatSendBtnContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    topSymbolImgback: {
        // width: 17,
        // height: 17,
        // resizeMode: 'contain',
        // verticalAlign:"'"
        ...fontSize.backButton,
    },

  lightContainer: {
    backgroundColor: Colors.lightContainer
  },
  darkContainer: {
    backgroundColor: Colors.darkContainer
  },
  lightText: {
    color: Colors.lightText
  },
  darkText: {
    color: Colors.darkText
  },
  darkGrayContainer: {
    backgroundColor: Colors.lightGray
  }
});
