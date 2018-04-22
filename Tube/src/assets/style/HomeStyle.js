/**
 * @providesModule HomeStyle
 */

import { StyleSheet } from 'react-native';
import { size } from 'global';

export default StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor:'#f4f4f4',
    },
    homeCourseContent:{
        flex: 1,
        flexDirection: 'row'
    },
    homeCourseColThumb:{
        flex:1,
        height: (size.width + size.height) * 0.08,
        width: (size.width + size.height) * 0.40,
    },
    homeCourseThumb:{
        flex:1,
        resizeMode:'stretch'
    },
    courseContent:{
        flex:1,
        marginLeft:10,
        flexDirection:'row',
        alignSelf:'flex-start'
    },
    btnContainer:{
        flex:1,
        flexDirection:'row',
        alignSelf:'flex-start'
    },
    courseTitle:{
        color:'#424242',
        marginTop: size.height * 0.005,
        alignSelf:'flex-start'
    },
    courseDescription:{
        color:'#707070',
        marginTop: size.height * 0.005,
        fontSize:12,
        alignSelf:'stretch'
    }
});
