/**
 * @providesModule RegisterStyle
 */

import { StyleSheet } from 'react-native';
import { size } from 'global';

export default StyleSheet.create({
    registerFormContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:size.width,
        marginTop: size.height * 0.03,
        paddingLeft: size.width * 0.05,
        paddingRight: size.width * 0.05,
    },
});
