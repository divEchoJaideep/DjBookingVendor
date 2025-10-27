import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.fullSceenbackgroundColor,
    paddingHorizontal: 20,
    // ...fontSize.containerSafeArea,
    // paddingBottom:90
  },

  contant: {
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderColor: Colors.productDashboardBorderColor,
    borderRadius: 10,
    // flex: 1

  },

  returnButtonWrap: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: Colors.invoiceBorderColor,
    backgroundColor: "#rgb(246 247 249)",
    borderRadius: 5,

  },
  returnButton: {
    borderWidth: 0,

    width: 10,
    height: 10,

  },
  title: {
    ...fontSize.internalScreenTitle,

  },

  productImage: {
    width: 50,
    height: 70,
    resizeMode: 'contain',
    borderWidth:0,
    backgroundColor:Colors.gray,
    borderRadius:5,

   
  },
  productName: {
    fontSize: 17,
    fontWeight: 500,
  },
  productID: {
    fontSize: 18,
    marginVertical: 10,
  },
  productType: {
    fontSize: 18,
  },
  productTotal: {
    fontSize: 18,
    fontWeight: "bold",

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

  // darkContainer:{
  //   backgroundColor:Colors.lightGray
  // },
  header: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",

  },


  originalPrice: {
    // fontWeight:"bold",
    // fontSize:17,

    color: 'gray',


  },
  strikethrough: {
    textDecorationLine: 'line-through',

  },

  totalPrice: {
    fontWeight: "bold",
    fontSize: 17,
  },
  prodeuctQuan: {
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 10,
  },
  billSummary: {
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
    borderRadius: 10,
    paddingBottom: 10,
    marginVertical: 20,
    padding: 10,
  },
  billText: {
    fontWeight: 500,
    textAlign: "right",
    // backgroundColor:'red',
    width:windowWidth/2 + 20
  },
  lableWrap:{
    maxWidth:'30%'
  },
  lable: {
    fontWeight: 500,

  },
  textwrap: {
    marginRight:23,
    borderWidth: 0,
     maxWidth:'60%'
  },
  billTextWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    width:windowWidth -63,

  },
  billSummaryTitle: {
    fontWeight: "bold",
    fontSize: 23,
    marginVertical: 10,
  },
  totalbillDiscount: {
    color: "gray",
    marginVertical: 15,
  },
  billSummaryWrap: {
    borderBottomWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
    paddingBottom: 10,
  },
  saveWrap: {
    flexDirection: "row",
    borderWidth: 0,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(226 234 226)',
    paddingHorizontal: 5,
  },
  saveText: {
    fontWeight: 'bold',
    color: "rgb(68 154 109)",
  },
  downloadInvoice: {
    borderWidth: 0,
    width: windowWidth / 2,
    marginVertical: 20,
    backgroundColor: "rgb(242 225 254)",
  },
  downloadInvoiceText: {
    color: "rgb(134 63 178)",
  },
  originolPriceWrap: {
    width: windowWidth / 2 - 45
  },

  fixedButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderTopColor: '#ddd',
   paddingBottom:10,
  },
  buttonWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0,
    borderRadius: 15,
    top: windowHeight / 22 - 20,
    borderColor: "white",
    marginBottom: 40,

  },
  rateOrder: {
    borderWidth: 1,
    borderRadius: 5,
    width: windowWidth / 2 - 30,
    borderColor: "rgb(255 50 106)",
  },
  orderAgain: {
    borderWidth: 1,
    width: windowWidth / 2 - 40,
    borderRadius: 5,
    backgroundColor: 'rgb(255 50 106)',
     borderColor: "rgb(255 50 106)",
  },
  orderAgainText: {
    fontWeight: "bold",
    color: "#fff",
  },

  rateOrderText: {
    fontWeight: "bold",
    color: "rgb(255 50 106)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  productNameInModal: {
    fontWeight: 'bold',
    color: '#007BFF',  // nice accent color
  },
  modalGuideText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
    borderColor: Colors.productDashboardBorderColor,
  },
  darkInput: {
    borderColor: '#444',
    backgroundColor: '#222',
    color: '#eee',
  },
  lightInput: {
    borderColor: '#ccc',
    backgroundColor: '#fafafa',
    color: '#222',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalCancelButton: {
    backgroundColor: '#ddd',
  },
  modalConfirmButton: {
    backgroundColor: '#007BFF',
  },
  modalCancelText: {
    color: '#333',
    fontSize: 16,
  },
  modalConfirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default styles

