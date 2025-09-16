import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.fullSceenbackgroundColor,
    // ...fontSize.containerSafeArea,
    // marginHorizontal: -20,
    flex: 1
  },

  screenContainer: {
    //backgroundColor: Colors.fullSceenbackgroundColor,
    ...fontSize.containerSafeArea,
    flex: 1
    //  marginHorizontal:-20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
    borderWidth: 0,
    marginHorizontal: -10,
    marginTop: -0,
  },
  toggleButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 7,
    width: windowWidth / 3 - 18,
    // paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
  },
  activeButton: {
    backgroundColor: Colors.button,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  mainProductsWrap: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'column',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  jobDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  jobDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  jobQualification: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777',
    marginBottom: 8,
  },
  jobExperience: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777',
    marginBottom: 8,
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2ecc71', // Green for salary
    marginBottom: 8,
  },
  jobEmail: {
    fontSize: 14,
    color: '#3498db', // Blue for email
    marginBottom: 8,
  },
  jobMobile: {
    fontSize: 14,
    color: '#e74c3c', // Red for mobile
    marginBottom: 8,
  },
  jobAddress: {
    fontSize: 14,
    color: '#f39c12', // Yellow for address
    marginBottom: 8,
  },
  jobSeller: {
    fontSize: 14,
    color: '#8e44ad', // Purple for seller name
    fontWeight: 'bold',
    marginTop: 10,
  },
  jobStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  activeStatus: {
    color: '#27ae60', // Green for active status
  },
  inactiveStatus: {
    color: '#e74c3c', // Red for inactive status
  },
  statusChangeButton: {
    backgroundColor: '#3498db', // Blue button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusChangeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    centeredWrap: {
    flex: 1,
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 70,

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
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor,
    marginHorizontal:20,
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






  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -10,
    marginBottom: 18,
    paddingHorizontal: 10,
  },

  tabButton: {
    backgroundColor: 'rgb(255 255 255)',
    paddingVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: Colors.productDashboardBorderColor,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
  },
  activeButtonText: {
    color: '#fff'
  },
  itemBox: {
    backgroundColor: Colors.cardBackground || '#E0E0E0',
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
  },

  listStyle: {
    paddingBottom: 20,
  },
  activeTabButton: {
    backgroundColor: '#743bff',
  },
  textInputWrap: {
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: "#rgb(246 247 249)",
    borderColor: Colors.invoiceBorderColor,
    marginTop: 5,
  },
  textInputTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  nextImag: {
    width: 20,
    height: 20,
    alignSelf: "center"
  },
  selectGender: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#rgb(246 247 249)",
    borderColor: Colors.invoiceBorderColor,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectGenderText: {
    fontSize: 17,
  },
  deleteButtonWrap: {
    borderWidth: 0,
    textAlign: "auto",
    paddingHorizontal: 5,
    paddingVertical: 3,
    margin: "auto",
    marginTop: 10,
    marginLeft: 10,
  },
  imageSizeText: {
    color: "gray",
  },
  imageUploadWrap: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  bannerImageWrap: {
    borderWidth: 1,
    padding: 5,
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#rgb(246 247 249)",
    borderColor: Colors.invoiceBorderColor,
  },
  uploadWrap: {
    borderWidth: 0,
    paddingBottom: 10,
  },
  uploadText: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: "auto",
  },
  uploadImgButton: {
    borderWidth: 0,
    paddingHorizontal: 30,
    backgroundColor: "#743bff",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,

  },
  uploadImgButtonText: {
    fontWeight: "bold",
    color: "white",
  },

  bannarImage: {
    borderRadius: 10,
    borderWidth: 0,
    width: 70,
    height: 70,
    margin: 0,
    backgroundColor: "white",
    marginRight: 10,
    alignSelf: "center",

  },
  bottombutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0,
    borderRadius: 15,
    marginTop: 'auto',
    marginBottom:20,
    borderColor: "white",

  },
  savePassButtonStyle: {
    width: windowWidth - 40,
    marginBottom:10,
    underlayColor: "white",
    borderWidth: 0,
    backgroundColor: "#743bff",
    justifyContent: "flex-end"
  },
  signInButtonStyleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButtonStyle: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.productDashboardBorderColor
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: '#555',
  },
  location: {
    fontSize: 12,
    color: '#777',
  },
  dateBadge: {
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#007AFF',
  },
  detailsBox: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
  statusChangeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  statusChangeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  applyDate:{
    borderWidth:0,
    width:windowWidth/2-60,
      backgroundColor: "rgb(116 58 254)",

  },
   cancelDate:{
    borderWidth:1,
    width:windowWidth/2-60,
      borderColor: "rgb(116 58 254)",

  },
  cancelDateText: {
    fontWeight:'bold'
  },
  acceptText: {
    color: 'white',
    fontWeight: 'bold',
  },
})



export default styles;
