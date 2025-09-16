import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    returnButtonWrap: {
        borderWidth: 1,
        paddingVertical: 10,
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
    bannarImage: {

        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.productDashboardBorderColor,
        width: 60,
        height: 60,
        marginRight: 15,
        backgroundColor: "white",

    },
    nextImag: {
        width: 20,
        height: 20,
        alignSelf: "center"
    },

    nextImagWhite: {
        width: 12,
        height: 12,
        alignSelf: "center",
        marginRight: 5,
    },
    profileWrap: {
        paddingTop: 15,
        borderWidth: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 2,
        marginTop: 15,
        borderColor: "rgb(246 247 249)",
    },

    settingWrap: {
        borderWidth: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 0,
        marginTop: 20,
        borderColor: "rgb(246 247 249)",

    },
    settingImageWrap: {
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: Colors.productDashboardBorderColor,
        justifyContent: "center",
        marginRight: 10,
        marginVertical: 3
    },
    settingImage: {
        width: 20,
        height: 20,
        alignSelf: "center",
    },
    settingText: {
        fontWeight: 500,
        fontSize: 15,
        margin: "auto"
    }, lightContainer: {
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

    lightGrayContainer: {
        backgroundColor: Colors.lightGray
    },

    buttonbackgroundContrainer: {
        backgroundColor: Colors.buttonBackground
    },
})

export default styles

