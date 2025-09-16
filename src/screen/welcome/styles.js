import { StyleSheet } from "react-native";
import { Colors } from "../../../components/colors/colors";
import { fontSize } from "../../../components/size/size";



const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.background,
   paddingHorizontal:20,
        flex:1,
        width:350,
    },
    Welcome_img: {
       resizeMode:"cover",
        width: 320,
        height: 400,
       
        borderRadius:20,
        marginVertical:20,
       
    },
    title: {
        ...fontSize.screenTitle,
        marginTop:50,

    },
text:{
    textAlign:"center",
    marginTop:30,
},
    button:{
        flexDirection:"row",
        margin:"auto",
        borderWidth:3,
        borderRadius:10,
        marginTop:50,
        borderColor:"white",
    },
    registerButtonStyle:{
        backgroundColor:"white",
    },
    signInButtonStyle:{
        underlayColor:"white"
    },
   
})

export default styles

