/**
 * @providesModule ViewingRoomStyle
 */

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    footerIconCotainer:{
        flexDirection: null,
        backgroundColor: "transparent",
        borderColor: null,
        elevation: 0,
        shadowColor: null,
        shadowOffset: null,
        shadowRadius: null,
        shadowOpacity: null,
        alignSelf: "center",
        flex: 1,
    },
    footerLayout:{
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: "#cbcbcb",
        elevation: 3,
        left: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    footerContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        alignSelf: "stretch"
    },
    footerIcon:{
        alignSelf: 'center',
        color: '#222',
    },

});
