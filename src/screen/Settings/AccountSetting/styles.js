import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal:20,
        flex: 1
    },
    returnButtonWrap: {
        borderWidth: 1,
        // paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: Colors.invoiceBorderColor,
        backgroundColor: "rgb(246 247 249)",
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
    imageUploadWrap: {
        justifyContent: "center",
        paddingLeft: 10,
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

    topButton: {
        borderWidth: 1,
        paddingHorizontal: "auto",
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 10,
        borderColor: Colors.productDashboardBorderColor,
        width: windowWidth / 2 - 30,
    },
    activeButton: {
        backgroundColor: '#743bff',
    },
    inactiveButton: {
        backgroundColor: 'rgb(255 255 255)',
    },

    activeText: {
        color: "white",


    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 10,
    },



    topTextButton: {
        fontWeight: "bold",
        textAlign: "center",
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
    deleteButton: {
        color: "red",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "600"

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

    bannerImageWrap: {
        borderWidth: 1,
        padding: 5,
        flexDirection: "row",
        borderRadius: 10,
        // marginTop: 20,
        backgroundColor: "#rgb(246 247 249)",
        borderColor: Colors.invoiceBorderColor,
        paddingVertical: 10,
    },
    uploadWrap: {
        borderWidth: 0,
        paddingBottom: 10,
        marginLeft: 20

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
    textInputWrap: {
        marginTop: 10,
    },

    bottombutton: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0,
        borderRadius: 15,
        paddingVertical: 10,

    },
    registerButtonStyle: {
        backgroundColor: "rgb(246 247 249)",
        paddingHorizontal: windowWidth / 6 - 20,
        borderWidth: 0,
        justifyContent: "flex-end"
    },
    signInButtonStyle: {
        underlayColor: "white",
        paddingHorizontal: windowWidth / 6 - 20,
        borderWidth: 0,
        backgroundColor: "rgb(116 58 255)",
        justifyContent: "flex-end"
    },
    registerButtonStyleText: {
        fontWeight: "bold",

    },
    signInButtonStyleText: {
        color: "#fff",
        fontWeight: "bold",
    },

    changPassButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0,
        borderRadius: 15,

        top: windowHeight / 2 - 20,
        borderColor: "white",
        marginBottom: 40,



    },
    cancelPassButtonStyle: {
        backgroundColor: "rgb(246 247 249)",
        paddingHorizontal: windowWidth / 5 - 30,
        borderWidth: 0,
        justifyContent: "flex-end"
    },
    savePassButtonStyle: {
        underlayColor: "white",
        paddingHorizontal: windowWidth / 7 - 40,
        borderWidth: 0,
        backgroundColor: "#743bff",
        justifyContent: "flex-end"
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
    nextImag: {
        width: 20,
        height: 20,
        alignSelf: "center"
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 0,
    },
    button: {
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 0,
        marginVertical: 10,
    },
    selectedButton: {
        backgroundColor: 'rgb(116 58 255)',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
    },
    selectedText: {
        fontSize: 18,
        color: '#000',
        marginTop: 20,
    },
    selectedButtonText: {
        color: "#fff",
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
})

export default styles

