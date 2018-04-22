/**
 * @providesModule MarketPlaceStyle
 */

import { StyleSheet } from 'react-native';
import { size } from 'global';

export default StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor:'#f4f4f4',
    },
    btnView:{
        marginHorizontal: size.width * 0.02,
        alignItems:'flex-start'
    },
    courseTitle:{
        color:'#424242',
        marginTop: size.height * 0.005,
    },
    courseDescription:{
        color:'#707070',
        fontSize:12,
    },
    courseSubscribe:{
        flex: 1,
        alignSelf: 'flex-end'
    },
    categoryList:{
        marginHorizontal: size.width * 0.01,
    },
    sliderTitle:{
        color:'#424242',
        fontSize:12,
        marginHorizontal: size.width * 0.02,
        marginVertical: size.height * 0.01,
        fontWeight: 'bold',
    },
    sliderContainer:{
        marginHorizontal: size.width * 0.02,
    },
    sliderCourseTitle:{
        marginHorizontal: size.width * 0.02,
        marginVertical: size.height * 0.01,
        flex:1,
        flexDirection:'column',
        alignItems:'flex-start',
        alignContent:'flex-start',
    },
    courseRowTitle:{
        color:'#424242'
    },
    courseColThumb:{
        alignSelf: 'flex-start'
    },
    sliderCourseImage:{
        flex: 1,
        height: (size.width * 0.30) * 0.5,
        width: size.width * 0.40,
        resizeMode:'stretch',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    courseThumb:{
        height: (size.width * 0.50) * 0.5,
        width: size.width * 0.40,
        resizeMode:'stretch',
        borderRadius:0
    },
    courseContent:{
        flex:1,
        marginLeft:10,
        flexDirection:'row',
        alignSelf:'flex-start'
    },
    btnContainer:{
        flex:1,
        alignSelf:'flex-end'
    },
    courseGridContent:{
        flex: 1,
        flexDirection: 'row'
    }
});
