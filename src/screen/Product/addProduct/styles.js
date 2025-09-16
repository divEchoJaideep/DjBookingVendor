import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.fullSceenbackgroundColor,
        ...fontSize.containerSafeArea,

        flex: 1
    },
    removeIcon: {
        position: 'absolute',
        top: 4,
        right: -0,
        backgroundColor: Colors.mainButton,
        borderRadius: 12,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: '#000'
    },

    removeIconText: {
        color: 'white',
        fontSize: 14,
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
    bannerImageWrap: {
        borderWidth: 1,
        padding: 5,
        flexDirection: "row",
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: "#rgb(246 247 249)",
        borderColor: Colors.invoiceBorderColor,
    },
    imageUploadWrap: {
        borderWidth: 0,
        borderRadius: 10,
        padding: 5,
        // backgroundColor:"#f1effc",
    },
    bannarImage: {
        borderRadius: 10,
        borderWidth: 0,
        width: 80,
        height: 80,
        margin: 0,
        backgroundColor: "white",

    },
    uploadText: {
        fontWeight: "bold",
        fontSize: 18,
        margin: "auto",
    },
    uploadImgButton: {
        borderWidth: 0,
        width: windowWidth / 3,
        // paddingHorizontal: 60,
        backgroundColor: "#743bff",
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10,

    },
    uploadImgButtonText: {
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    textInputWrap: {
        borderWidth: 0,
        // borderColor: Colors.invoiceBorderColor,
        // marginVertical: 10,
        // backgroundColor: "#rgb(246 247 249)",
        // borderRadius: 10,

    },
    textInput: {
        borderWidth: 1,
        width: windowWidth - 40,
        borderColor: Colors.invoiceBorderColor,
        backgroundColor: Colors.invoiceTextInput,
        borderRadius: 10,
        marginTop: 5,

    },

    selectOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        width: windowWidth - 42,
        borderColor: Colors.invoiceBorderColor,
        backgroundColor: Colors.invoiceTextInput,
        marginTop: 5,

    },

    textInputTitle: {
        fontWeight: "bold",
        fontSize: 15,
    },
    textInputText: {
        textAlign: "center",
        alignSelf: "center",
        marginLeft: 10,

    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    avatar2: {
        marginTop: 10,
        marginBottom: 3,
        width: 90,
        height: 90,
        borderRadius: 10,
        marginHorizontal: 10,

    },
    select: {
        borderWidth: 0,
        fontSize: 16
    },

    selectImage: {
        width: 20,
        height: 20,
        alignSelf: "center",

    },

    selectImagewhite: {
        width: 12,
        height: 12,
        alignSelf: "center",
    },
    addPhotoWrap: {
        borderWidth: 1,
        borderColor: Colors.invoiceBorderColor,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 7,
        backgroundColor: "#rgb(246 247 249)",
        // flexDirection:"row",
        justifyContent: "space-between",

    },
    addPhotoButtonWrap: {
        borderWidth: 0,
        marginLeft: 10,
        justifyContent: "flex-end",
    },
    addPhotoButton: {

        borderWidth: 1,
        borderColor: Colors.invoiceBorderColor,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#rgb(246 247 249)",
        height: 40,
    },
    addPhotoText: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#743bff",
        verticalAlign: "middle",
    },
    savebutton: {
        borderWidth: 0,
        backgroundColor: "#743bff",
        marginHorizontal: 20,
        marginBottom:20
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
    },

    addMoreImage: {
        width: 50,
        height: 50,
    },
    addMoreImageButton: {
        borderWidth: 0,
        margin: "auto",
        marginRight: 0,
        marginTop: 50,

    },
    addMoreImageButtonWrap: {
        borderWidth: 0,
        paddingHorizontal: 10,

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
    modalWrap: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#1E1E3F',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingVertical: 20,
        paddingHorizontal: 20,
        maxHeight: '80%',
    },
    listCategoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
    },
    listCategory: {
        backgroundColor: '#2C2C54',
        borderRadius: 12,
        paddingVertical: 10,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    listCategoryIcon: {
        width: '80%',
        height: 50,
        marginBottom: 5,
        borderWidth: 0,
        borderRadius: 5,
        resizeMode:'stretch'
    },
    paymentText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
        marginTop: 15,
    },

    deleteButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },

    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dropdownContainer: {
        paddingLeft: 10,
        backgroundColor: "#f8f9fb",
        paddingBottom: 10,
    },
    imageWrapper: {
        width: 90,
        height: 90,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        //   backgroundColor: '#f2f2f2', 
        borderRadius: 8,
        overflow: 'hidden',
    },
    progressOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional: adds subtle fade
    },
    picker: {
        paddingVertical: -10,
        borderWidth: 1,
        width: windowWidth - 42,
        borderColor: Colors.invoiceBorderColor,
        backgroundColor: Colors.invoiceTextInput,
        borderRadius: 10,
        marginTop: 5,
    },


});

export default styles

