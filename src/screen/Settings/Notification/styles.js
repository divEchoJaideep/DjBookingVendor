import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
    },
    topHeader:{
        marginHorizontal:20
    },
    listContainer: {
        padding: 16,
    },
    notificationCard: {
    backgroundColor:Colors.fullSceenbackgroundColor,
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    width:'100%',
    borderColor:Colors.productDashboardBorderColor,
    flexDirection:"row",
    gap:10
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
     lightContainer: {
        backgroundColor: Colors.fullSceenbackgroundColor
    },
    darkContainer: {
        backgroundColor: Colors.darkContainer
    },
    darkGray:{
        backgroundColor:Colors.darkGray
    },
    lightText: {
        color: Colors.lightText
    },
    darkText: {
        color: Colors.darkText
    },

    lightGrayContainer: {
        backgroundColor: Colors.lightGray
    },

    buttonbackgroundContrainer: {
        backgroundColor: Colors.buttonBackground
    },
     settingImage:{
        width:20,
        height:20,
       alignSelf:"center",
    },
})

export default styles

