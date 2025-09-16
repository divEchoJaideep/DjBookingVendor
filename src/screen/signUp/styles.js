import { StyleSheet } from "react-native";
import { Colors } from "../../../components/colors/colors";
import { fontSize } from "../../../components/size/size";
import { isIphoneX } from "../../../libs/Utils";



const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#f1effc",
        // paddingHorizontal: 20,
        flex: 1,
        // width:360,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        paddingTop: 70,
        // flex: 1,
    },
    loaderStyle:{
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        ...fontSize.screenTitle,
        marginTop: 70,
    },

    text: {
        ...fontSize.mainText,
    },
    recoverpassbtn: {
        borderWidth: 0,
        marginHorizontal: 20,
        marginLeft: 150,
        marginTop: 20,
    },
    recoverpasstext: {
        fontSize: 20,
        textAlign: "right",
    },
    signInButton: {
        marginTop: 20,
        borderWidth: 0,
        backgroundColor: Colors.buttonBackgroundColor,
        marginBottom: 40,
    },
    signInButtonText: {
        ...fontSize.buttonText,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'

    },
    lineText: {
        width: 140,
        textAlign: 'center'

    },
    loginLogoBtn: {
        borderWidth: 0,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
        margin: "auto",
        marginVertical: 40,
        borderColor: "white",
    },
    logInLogoimg: {
        width: 40,
        height: 40,
        borderWidth: 0,



    },
    redirectWrap: {
        flexDirection: "row",
        // margin: "auto",
        marginHorizontal: "auto",
        marginTop: 'auto',
        // marginTop:50,

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

        marginTop: -40,
        marginBottom: 20,
        marginRight: 15,
    },
    view: {
        width: 20,
        height: 20,
    },

})

export default styles

