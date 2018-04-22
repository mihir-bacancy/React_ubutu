/**
 * @providesModule CourseInfoStyle
 */

import { StyleSheet } from 'react-native';
import { size } from 'global';

export default StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor:'#f4f4f4',
    },
    courseThumb:{
        height: (size.width * 0.75) * 0.5,
        width: size.width * 0.45,
        resizeMode:'stretch',
        borderRadius:0
    },
    courseContent:{
        flex:1,
        marginLeft:10,
        flexDirection:'column',
    },
    btnContainer:{
        flex:1,
        alignSelf:'flex-end'
    },
    courseTitle:{
        color:'#424242',
        marginTop: size.height * 0.005,

    },
    courseDescription:{
        color:'#707070',
        fontSize:12,
    },
    videoThumb:{
        height: (size.width * 0.35) * 0.5,
        width: size.width * 0.25,
        resizeMode:'stretch',
        borderRadius:0
    },
});
