import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../../components/colors/colors';
import { fontSize } from '../../../../components/size/size';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        ...fontSize.containerSafeArea,
        marginHorizontal: -20,
        flex: 1,
        backgroundColor: 'rgb(238 238 238)',
        marginBottom: 0,
        //backgroundColor:"#fff"

    },
    scrollViewContent: {
        flex: 1,
        marginBottom: 0,

    },
    productImageContainer: {
        position: 'relative',
    },
    productImage: {
        width: screenWidth,
        height: screenHeight / 2 + 30,
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: -10,
        left: 20,
        zIndex: 999,
    },
    backIcon: {
        marginTop: 20,
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
    productDetailsContainer: {
        padding: 15,
    },
    productLabel: {
        fontSize: 16,
        fontWeight: 500,
        borderWidth: 0,
        // verticalAlign:"middle",
        width: '30%'


    },
    productName: {
        fontSize: 17,
        fontWeight: 500,
        // marginTop: 10,

    },
    productInfo: {
        marginTop: 10,
    },
    productPrice: {
        fontSize: 20,
    },
    productText: {
        textAlign: "right",
            // backgroundColor: 'red',
        width: '75%',
        fontSize: 14,
        marginTop: 0,
    },
    descriptionText:{
          textAlign: "right",
        // backgroundColor: 'red',
        // width: '75%',
        fontSize: 14,
        marginTop: 0,
    },
    button: {
        borderWidth: 0,
        width: screenWidth - 30,
        borderRadius: 30,
        backgroundColor: Colors.buttonBackgroundColor,
        //   marginVertical:30,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    iconWrap: {
        marginTop: 50,
        // paddingTop:30,
        borderWidth: 0,
        borderRadius: 50,
        paddingLeft: 10,
        width: 40,
        height: 40,
        justifyContent: "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: '#fff',
        flex: 1,
    },
    verticalLine: {
        borderWidth: 1,
        width: 2,
        height: 2,
        backgroundColor: 'black',
    },
    middleBody: {
        borderWidth: 0,
        borderColor: Colors.productDashboardBorderColor,
        marginHorizontal: 20,
        marginBottom: 0,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#121212",
        borderBottomWidth: 1,
        //   backgroundColor:Colors.backgroundColor, 
        // elevation: 4,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // paddingHorizontal: 15,
        // paddingTop: 10,
        // backgroundColor: "#fff",
    },
    buttonshare: {
        color: "#fff",
    },
    btnContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    MyButton: {
        borderWidth: 0,
        borderRadius: 30,
        backgroundColor: Colors.parssedButton
    },

    MyButtonText: {
        fontWeight: "bold",
        color: '#fff'
    },
    middleBodyButton: {
        borderWidth: 0,
        width: screenWidth / 2 - 30,
        justifyContent: "center",
        borderRadius: 20,
        flexDirection: "row",
        // marginHorizontal: -15,
        paddingHorizontal: 9,
        paddingVertical: 10,
        marginBottom: 0,
        gap: 10,
        borderColor: Colors.productDashboardBorderColor,
        borderWidth: 1,
        marginHorizontal: -10
    },
    selectDate: {
        flexDirection: "row",
        gap: 10,
    },
    nextImag: {
        width: 20,
        height: 20,
        alignSelf: "center"
    },

    middleBodyButtonImag: {
        width: 20,
        height: 20,
        alignSelf: "center",
    },
    discriptionTextWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        marginVertical: 5,
    },
    productDetailsWrap: {
        marginRight:10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        marginVertical: 5,
    },
    discriptionWrap: {
        flexDirection: "row",

    },
    middleBodyText: {
        fontSize: 17,
        fontWeight: 700
    },

    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    bottomSheetContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        position: 'absolute',
        bottom: -30,
    },

    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bottomSheetText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },

    strikethrough: {
        textDecorationLine: 'line-through',
    },
    closeButton: {
        borderWidth: 2,
        width: screenWidth / 3,
        marginHorizontal: 10,
        borderColor: 'rgb(26 60 85)',


    },
    closeButtonText: {
        fontWeight: "bold",

        color: "rgb(26 60 85)",
    },
    payButton: {
        borderWidth: 0,
        width: screenWidth / 3,
        marginHorizontal: 10,
        backgroundColor: Colors.buttonBackgroundColor,
        paddingVertical: 2,
    },
    payButtonText: {
        fontWeight: "bold",
        color: "#fff",
    },
    modalSheetContaint: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: Colors.invoiceBorderColor,
        marginHorizontal: -10,
        paddingHorizontal: 20,
    },
    buttonWrap: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,

    },
    priceText: {
        fontWeight: "bold",
        fontSize: 17,
        textAlign: "center",

    },
    priceWrap: {
        justifyContent: "center",
        borderColor: "rgb(26 60 85)",
        borderWidth: 2,
        borderRadius: 10,
        width: screenWidth / 3
    },
    locationImg: {
        width: 20,
        height: 20,
        alignSelf: "center",
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

    grayText: {
        color: Colors.grayText
    },
    grayContainer: {
        backgroundColor: Colors.lightGray,
    },
    darkGray: {
        backgroundColor: Colors.darkGray
    },
    bottomWrap: {
        // borderWidth:1,
        // marginTop: -55,
        paddingTop: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingVertical: 20,
        backgroundColor: '#fff',
        paddingBottom: 40,

    },

    pageIndicatorContainer: {
        borderWidth: 0,
        flexDirection: 'row',
        position: "absolute",
        alignSelf: "center",
        // top: screenWidth - 20,
        marginTop: -40,
    },

    inactivePageIndicator: {
        // alignSelf:"center", 

        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#d3d3d3',
        margin: 4,
    },

    activePageIndicator: {
        backgroundColor: '#fff',
        alignSelf: "center",
        width: 20,
        height: 8,
        borderRadius: 10,
    },
    AddressInput: {
        width: screenWidth - 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.productDashboardBorderColor,
        marginVertical: -0,
        marginRight: -10

    },
    modalSheetContainAddresst: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: Colors.invoiceBorderColor,
        marginHorizontal: -10,
        paddingHorizontal: 10,
    },

});
