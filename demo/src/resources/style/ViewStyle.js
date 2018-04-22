import { StyleSheet } from 'react-native';
const styles1 = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
        fontSize: 17,
        fontWeight: 'bold',
        textDecorationLine :'underline',
        color : 'black',
        justifyContent:'flex-end',

    },
    style_View: {
        flexDirection:'row',
      //  justifyContent:'flex-start',
        backgroundColor :'white'
    },
    container_View : {
        padding : 10,
        flex :1,
        marginTop:2
    },
    text_Input :{
        color :'black',
        borderColor : 'gray',
        borderBottomWidth : 2,
        height:35,
        width:330,
    },
    Circle: {
        height: 180,
        width: 180,
        borderRadius: 180,
        borderColor: 'gray',
        borderWidth: 3,
        marginBottom : 15,
    }


});
export default styles1