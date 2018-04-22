/**
 * @providesModule UploadTutorVideoStyle
 */

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    iconMainController:{
        alignSelf: 'center',
        color: '#222',
        fontSize: 25,
        marginVertical: Dimensions.get('window').height * 0.02
    }

});
