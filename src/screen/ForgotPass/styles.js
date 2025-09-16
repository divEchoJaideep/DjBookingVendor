import { StyleSheet } from "react-native";
import { Colors } from "../../../components/colors/colors";
import { fontSize } from "../../../components/size/size";
import { isIphoneX } from "../../../libs/Utils";


const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.background,
        // paddingHorizontal: 20,
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        paddingTop: 70,
        flex: 1,
    },
    title: {
        ...fontSize.screenTitle,
        marginTop: 70,
    },
    text: {
        ...fontSize.mainText,
        marginBottom: 20,
    },
    mobile: {
        fontWeight: '600',
        fontSize: 17,
    },
    sendOTPButton: {
        borderWidth: 0,
        marginTop: 20,
        backgroundColor: Colors.buttonBackgroundColor,
    },
    btnText: {

        ...fontSize.buttonText
    },
    redirectWrap: {
        flexDirection: "row",
        marginHorizontal: "auto",
        marginTop: "auto"

    },
    sendAgain: {
        flexDirection: "row",
        marginHorizontal: "auto",

    },
    redirectText: {
        ...fontSize.redirectScreenText,
    },
    redirect: {
        ...fontSize.redirectScreenButton,
    },
    viewButton: {
        borderWidth: 0,
        alignSelf: 'flex-end',

        marginTop: -47,
        marginBottom: 27,
        marginRight: 15,
    },
    view: {
        width: 20,
        height: 20,
    },
    edit: {
        width: 17,
        height: 17,

    },
    editButton: {
        borderWidth: 0,
        flexDirection: "row",
        justifyContent: "center",

        marginTop: -10,
        marginBottom: 20,
        gap: 10,
    },

})

export default styles

