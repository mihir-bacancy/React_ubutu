/**
 * @providesModule UserProfileStyle
 */

import { StyleSheet } from 'react-native';
import { size } from 'global';

export default StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor:'#e7ebe6',
    },
    styleEmail:{
        color:'#636363',
        fontSize:12,
    },
    styleName: {
        marginTop: 15,
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    },
    avatarContainer:{
        paddingBottom: 10,
    },
    cardContainer:{
        flex:1,
        paddingTop: 15,
        paddingBottom: 20,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch'
    }
});
