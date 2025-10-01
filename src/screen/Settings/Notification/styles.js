import { StyleSheet } from "react-native";
import { Colors } from "../../../../components/colors/colors";
import { fontSize } from "../../../../components/size/size";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    topHeader: {
        // paddingHorizontal:20
    },
    listContainer: {
        padding: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 7,
        marginTop: -10,
        backgroundColor: '#aaa',
        borderRadius: 50,
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationCard: {
        // width:'95%',
        borderRadius: 16,
        padding: 10,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: Colors.productDashboardBorderColor,
        flexDirection: "row",
        gap: 10
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
    },
    message: {
        width: '93%',
        fontSize: 14,
        lineHeight: 20,
    },
    lightContainer: {
        backgroundColor: Colors.lightContainer
    },
    darkContainer: {
        backgroundColor: Colors.darkContainer
    },
    darkGray: {
        backgroundColor: Colors.darkGray
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
    settingImage: {
        width: 20,
        height: 20,
        alignSelf: "center",
    },
})

export default styles

