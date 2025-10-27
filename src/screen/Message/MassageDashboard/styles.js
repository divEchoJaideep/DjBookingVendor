import { Dimensions, StyleSheet } from 'react-native';
import { fontSize } from '../../../../components/size/size';
import { Colors } from '../../../../components/colors/colors';



const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({

  container: {
    flex:1,
    paddingHorizontal:20
  },
  topHeader: {
    flexDirection: 'row',

    alignItems: 'center',
    // justifyContent: 'space-between',



  },
  topHeaderMain: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topHeaderWrap: {
    padding: 5,
  },
  topSymbolImgback: {
    // width: 17,
    // height: 17,
    // resizeMode: 'contain',
    ...fontSize.backButton,
  },
  topSymbolImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  SearchBar: {
    marginHorizontal:0,
    borderWidth:1,
    borderColor:Colors.productDashboardBorderColor,
    marginTop:-0,
    paddingVertical:0,
    paddingHorizontal:10,
      marginBottom:20,
    height:40,
    // color:'#121212'
  },
  
  SearchBarLight: {
   
    color:'#121212'
  },
  SearchBarDark: {
   
    color:'#fff'
  },
   messageContainerWrap: {
      width: '98%',
       flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
     paddingVertical: 12,
    backgroundColor: 'transparent',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 4,
    marginBottom: 4,
  },

  // 🔹 Inner card (actual content)
  messageContainer: {
    alignItems:"center",
    marginTop:10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    resizeMode: 'cover',
  },
  messageInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  messageContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },

  // lightContainer: {
  //   backgroundColor: Colors.lightContainer
  // },
  // darkContainer: {
  //   backgroundColor: Colors.darkContainer
  // },
  // lightText: {
  //   color: Colors.lightText
  // },
  // darkText: {
  //   color: Colors.darkText
  // },
  // grayContainer:{
  //   backgroundColor:Colors.lightGray,
  // },
  // darkGray:{
  //   backgroundColor:Colors.darkGray,
  
  // },
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
  },
    centeredWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    emptyText: {
    fontSize: 15,
    color: 'black',
  },
});

export default styles;
