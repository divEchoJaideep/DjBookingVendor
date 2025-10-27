import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex:1,
    // paddingBottom: 30,
    paddingHorizontal:20,
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
  mainButtonWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,

  },
  topButton: {
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Colors.productDashboardBorderColor,
  },
  activeButton: {
    backgroundColor: 'rgb(116 58 255)',
  },
  inactiveButton: {
    backgroundColor: 'rgb(255 255 255)',
  },

  activeText: {
    color: "white",

  },
  topTextButton: {
    fontWeight: "bold",
  },
  productsQuantityWrap: {
    borderWidth: 0,
    margin: "auto",
    marginTop: 15,
    height: 25,
    minWidth: 25,
    paddingHorizontal:5,
    margin: 10,
    borderRadius: 100,
    backgroundColor: "rgb(74 190 11)",
  },
  productsQuantity: {
    margin: "auto",
    // textAlign:"center",
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  addPlusImg: {
    borderWidth: 0,
    width: 15,
    height: 15,
  },
  addNewProducts: {

    backgroundColor: "rgb(116 58 254)",
    borderWidth: 0,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFilterImg: {
    width: 15,
    height: 15,

  },
  addFilter: {
    borderWidth: 1,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addFilter: {
    borderWidth: 1,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.productDashboardBorderColor,
  },
  buttonWrap: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  mainTitleText: {
    fontWeight: "bold",
    marginVertical: "auto",
    fontSize: 15,
  },
  productImageWrap: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    backgroundColor: "rgb(246 245 253)",
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  opreationImageWrap: {
    borderWidth: 0,

    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "rgb(246 245 253)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  opreationImage: {
    alignSelf: "center",
    width: 17,
    height: 17,
  },
  productsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0,


  },
  mainProductsWrap: {
    borderWidth: 1,
    width: windowWidth - 40,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: Colors.productDashboardBorderColor,
  },
  firstButton: {
    // paddingBottom: 70,

  },
  productsNumber: {
    color: 'rgb(175 146 235)',
    fontWeight: "600",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 17,
  },
  dottedLine: {
    height: 0,
    width: '100%',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.productDashboardBorderColor,
    borderStyle: 'dashed',
    borderWidth: 1,
    marginVertical: 10,


  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 17,
  },
  productTypeWra: {
    borderWidth: 0,
    backgroundColor: "#feeee9",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  typeName: {
    color: "#faa68c",
  },
  bottomTabImage: {
    width: 20,
    height: 20,
    alignSelf: "center",
  },
  bottomTabText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  categoryName: {
    fontWeight: "600",
  },
  totalProductsNumber: {
    color: "gray",
    fontSize: 13,
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
  darkgray: {
    backgroundColor: Colors.lightGray
  },
  bottomTabAddButton: {
    borderWidth: 1,
    borderColor: "white",
    width: 45,
    height: 45,
    borderRadius: 50,

    justifyContent: "center",
    paddingHorizontal: 4,
    backgroundColor: "rgb(116 58 254)",
    marginTop: -40,
    marginBottom: 40,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: windowWidth,
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

  originalPrice: {
    fontWeight: "bold",
    fontSize: 17,
    color: 'red',

  },
  strikethrough: {
    textDecorationLine: 'line-through',

  },
  mainunitsWrap: {
    borderWidth: 1,
    borderRadius: 10,
    width: windowWidth / 2 - 30,
    padding: 10,
    marginVertical: 10,
    borderColor: Colors.productDashboardBorderColor,
  },
  totalCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },
  totalProductWrap: {
    flexDirection: 'row',
    gap: 5,
    marginTop: -10,

  },
  numberWrap: {
    borderWidth: 0,
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "rgb(144, 238, 144)"
  },
  searchBarInput: {
    marginBottom: 10,
    marginTop: -10,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
  },
  categoryContainer: {
    borderWidth: 0,
    // marginRight: 10,
    paddingVertical: 8,
    // paddingHorizontal: 16,
    borderRadius: 20,
    width: windowWidth / 3 - 15,
    marginHorizontal: 4
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
  },
  activeCategory: {
    backgroundColor: Colors.parssedButton,
  },
  activeCategoryText: {
    color: '#fff',
  },
  inactiveCategory: {
    backgroundColor: '#e0e0e0',
  },
  inactiveCategoryText: {
    color: '#121212',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButtonRow: {
    // flexDirection: 'row',
    // backgroundColor: 'red',
    alignSelf: 'center',
    width: '100%',
    gap: 15
  },
  modalButton: {
    width:'100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  boostInput: {
    width: 200,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: Colors.productDashboardBorderColor
  },
  boostText: {
    fontSize: 25,
    marginRight: 5,
    alignSelf: "center"
  },
  modalButtonBoost: {
    backgroundColor: 'green'
  },
  modalButtonCancel: {
    backgroundColor: 'gray'
  },
  modalButtonText: {
    color: '#fff'
  },
    centeredWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles

