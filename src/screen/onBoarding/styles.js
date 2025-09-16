import { StyleSheet } from "react-native";
import { Colors } from "../../../components/colors/colors";
import { fontSize } from "../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#743bff",
        //    paddingHorizontal:20,
        paddingHorizontal:0,
        flex: 1,
    },

    flatlist: {
        // margin:"auto",
        marginTop: 30,
    },
    flatlistImagescreen: {
       borderWidth:0,
        width: windowWidth-7,
        height: windowWidth-7,
    },
    flatlistTitletext: {
        ...fontSize.screenTitle,
        color: Colors.textColor,
    },
    flatlistText: {
        textAlign: "center",
        color: Colors.textColor,
        marginTop: 40,
    },
    pageIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "gray",
    },
    dotsWrap: {
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingBottom: 30,
        marginBottom: 70,
    },
    dots: {
        width: 10,
        height: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    button: {
        flexDirection: "row",
        margin: "auto",
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 0,
        borderColor: "white",
        marginBottom: 40,
    },
    registerButtonStyle: {
        backgroundColor: "white",
        paddingHorizontal:40,
    },
    signInButtonStyle: {
        underlayColor: "white",
        paddingHorizontal:40,
    },
    registerButtonStyleText: {
        fontWeight: "bold",

    },
    signInButtonStyleText: {
        color: "white",
        fontWeight: "bold",
    },
    isActiveDots: {
        backgroundColor: "#fff",
        width: 20,
        height: 10,
        borderRadius: 10,
    },
})

export default styles

