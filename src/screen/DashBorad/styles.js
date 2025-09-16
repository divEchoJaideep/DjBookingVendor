import { Modal, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../components/colors/colors";
import { fontSize } from "../../../components/size/size";


const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.fullSceenbackgroundColor,
      flex:1,
   },
   topContainer: {
      backgroundColor: "#743bff",
      paddingHorizontal: 20,
      paddingBottom: 40,
      marginBottom: 0,
      // paddingTop: 30,
   },
   totalIncome: {
      marginTop: 10,
      fontSize: 30,
      fontWeight: "bold",
      color: "white",
   },
   totalIncomeText: {
      color: "white",
      marginTop: 20,
   },
   FlatList: {
      borderWidth: 0,
      marginHorizontal: -0,
      marginTop: 10,
   },
   flatlistImagescreen: {
      width: 20,
      height: 20,
      marginLeft: 0,

   },
   flatlistItem: {
      borderWidth: 0,
      padding: 10,
      borderRadius: 10,
      backgroundColor: "white",
   },
   flatlistTitletext: {
      fontWeight: 500,
      fontSize: 16,
      marginBottom: 5,
   },
   flatlistAmount: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 5,
      marginVertical: -0,
   },
   flatlistImagearrow: {
      width: 15,
      height: 15,
      marginTop: 2,
      textAlign: "right",
   },
   flatlistText2: {
      marginTop: 0,
      color: "green",
   },
   flatlistUpDown: {
      flexDirection: "row",
      borderWidth: 0,
      backgroundColor: "#f1effc",
      padding: 3,
      borderRadius: 5,
      marginBottom: 3,

   },
   flatlistText: {
      fontSize: 12,
      color: "gray",
      marginBottom: 5,
   },
   flatlistImagePluse: {
      width: 20,
      height: 20,
      margin: "auto",
   },

   flatlistImagePluseWhite: {
      width: 12,
      height: 12,
      margin: "auto",
   },
   bottomContainer: {
      flex: 1,
      marginTop: -20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: "white",
      // marginHorizontal: -20,
      paddingHorizontal: 20,
      paddingBottom: 5,
   },
   bottomContainerTitle: {
      fontWeight: 500,
      fontSize: 16,
      marginBottom: 0,
      marginTop: 10,
   },
   flatListBottom: {
      borderRadius: 1,
   },
   flatlistItemBottom: {

      marginTop: 10,
      marginHorizontal: 5,
   },
   weeklyButton: {
      paddingVertical: 3,
      borderWidth: 1,
      marginTop: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: "gray",
      paddingVertical: 10
   },
   weeklyButtonText: {
      //   paddingVertical:3,
      marginLeft: 5,
      marginRight: 3,
   },
   bottomContainerTitleMain: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
   },
   bottomContainerText: {
      color: "gray",
      fontSize: 15,
      marginVertical: 5,
      marginTop: -25
   },
   bottomContainerAmount: {
      fontWeight: "bold",
      fontSize: 20,
      marginTop: 0,
      marginBottom: 10
   },
   graph: {
      borderWidth: 1,
      borderColor: "gray",
      paddingHorizontal: 10,
      borderRadius: 10,
      marginTop: 20,
      paddingBottom: 20,
      borderColor: Colors.productDashboardBorderColor
   },
   modalButtonText: {
      borderWidth: 0,
      paddingHorizontal: 30,
      paddingVertical: 5,
      fontWeight: 500,
      marginBottom: 10,
   },
   modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   modalContainer: {
      width: 170,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',

   },
   modalWrap: {
      width: windowWidth,
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(121, 121, 121, 0.7)',

   },
   barChartWrap: {
      marginHorizontal: -5,
      borderWidth: 0,
      marginTop: 10,

   },
   barChart: {
      marginHorizontal: 0,

   },
   invoice: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: "#e9f0fd",
   },
   product: {
      padding: 10,
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: "#fdf7e5",
   },
   customer: {
      padding: 10,
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: "#ecf8e7",
   },
   category: {
      padding: 10,
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: "#fbe6e6",
   },
   units: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: "#edd4fb",
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
   darkGrayContaine: {
      backgroundColor: Colors.lightGray
   },

   bottomTab: {
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: -5,
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginBottom: -5,
      borderColor: Colors.productDashboardBorderColor
   },
   bottImageWhite: {
      width: 20,
      height: 20,
      marginBottom: 5,
      alignSelf: "center",
   },
   bottomtabText: {
      fontWeight: 'bold',
   },
   //  productWrap:{
   //    borderWidth:0,
   //    paddingVertical:0,
   //    paddingHorizontal:30,
   //    borderRadius:40,
   //    marginVertical:-5,
   //    paddingVertical:5,
   //    backgroundColor: "#743bff",
   //  },
   productButtonText: {
      fontWeight: "bold",

      fontSize: 17,
   },
   listProducts: {
      borderWidth: 0,
      backgroundColor: "#743bff",
      justifyContent: "center",
      marginTop: 10,
   },
   listProductsText: {
      fontWeight: "bold",
      color: "#fff",
   },
   listProductsWrap: {
      flexDirection: "row",
      borderWidth: 0,
      justifyContent: "center",
      gap: 5,
      backgroundColor: "#743bff",
      borderRadius: 10,
      marginVertical: 20,
      marginBottom: -3,
   },

   listProductsImg: {
      width: 20,
      height: 20,
      alignSelf: "center",

   },

   completedOrder: {
      borderWidth: 0,
      width: 10,
      height: 10,
      borderRadius: 20,
      backgroundColor: "#743bff",
      //  marginBottom:5,
      marginTop: 5,
   },
   pendingOrder: {
      borderWidth: 0,
      width: 10,
      height: 10,
      borderRadius: 20,
      marginTop: 5,

      backgroundColor: "red",
   },
})

export default styles

