import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    signup_container: {
        flex: 1,
        flexDirection:'column',
        marginTop: 70,
        paddingLeft:15,
        paddingRight:15
    },
    login_container: {
        flex: 1,
        flexDirection:'column',
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'white'


    },
    link1: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'center'
    },
    input:{
        backgroundColor:'#fff',
        borderWidth:5,
        borderColor:"#fff",
    },
    image_class:{
        justifyContent:'center',
        alignItems:'center',
        //borderRadius:75,
        marginBottom:5,
        marginTop:20
    }

});

export default styles