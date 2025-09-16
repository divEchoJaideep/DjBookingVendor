import { StyleSheet } from "react-native";
import { Colors } from "../../../components/colors/colors";
import { fontSize } from "../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.fullSceenbackgroundColor,
        ...fontSize.container,
        paddingBottom: 10,
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
    modalContainer: {
        // width: 360,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(121, 121, 121, 0.7)',

    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",

    },
    viewWrapModal: {
        width: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        width: windowWidth,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,



    },
    modalWrap: {
        width: windowWidth,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(121, 121, 121, 0.7)',

    },


    mainTitleText: {
        fontWeight: "bold",
        marginVertical: "auto",
        fontSize: 15,
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
        borderColor: Colors.productDashboardBorderColor,
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

    buttonWrap: {
        flexDirection: "row",
        marginVertical: 10,
        gap: 10,
    },


    productsQuantityWrap: {
        borderWidth: 0,
        margin: "auto",
        marginTop: 15,
        height: 25,
        width: 25,
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

    textInputWrap: {
        marginTop: 10,
    },

    textInputTitle: {
        fontWeight: "bold",
        fontSize: 15, marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        width: windowWidth - 40,
        borderColor: Colors.productDashboardBorderColor
    },

    bottomButtonWrap: {
        borderWidth: 0,
        flexDirection: "row",
        gap: 15,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        //   position: 'absolute', 
        marginTop: 40,
        top: windowHeight / 100 - 10,

    },
    cancelButton: {
        borderWidth: 0,
        width: windowWidth / 2 - 25,
        backgroundColor: "rgb(246 247 249)",

    },
    SaveButton: {
        borderWidth: 0,
        width: windowWidth / 2 - 30,
        backgroundColor: 'rgb(116 58 255)',
    },
    SaveButtonText: {
        fontWeight: "bold",
        color: "white",
    },
    cancelButtonText: {
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
    modalTitle: {
        fontWeight: "800",
        marginVertical: 30,
        fontSize: 20,
        textAlign: "left"

    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    closeImgWrap: {
        marginTop: 30,
        borderWidth: 0,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: "rgb(255 255 255)",
    },
    closeImg: {
        height: 10,
        width: 10,
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
    bankAccountDetailsWrap: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: Colors.fullSceenbackgroundColor,
        borderColor: Colors.productDashboardBorderColor,
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
        marginVertical: 20,

    },
    bankName: {
        color: "gray",
        fontSize: 13,
    },
    bankNameText: {
        fontWeight: 500,
        fontSize: 15,
    },
    bankNameWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#rgb(246 247 249)",
        borderWidth: 0,
        padding: 10,
        borderRadius: 10,

    },
    firstButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: Colors.productDashboardBorderColor,
        marginTop: 20,
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
})

export default styles

