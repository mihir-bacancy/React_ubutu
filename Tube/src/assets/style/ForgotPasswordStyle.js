/**
 * @providesModule ForgotPasswordStyle
 */

import { StyleSheet } from 'react-native';
import { size } from 'global';

export default StyleSheet.create({
    logoFormContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:size.width,
        marginTop: size.height * 0.07,
        paddingLeft: size.width * 0.05,
        paddingRight: size.width * 0.05,
    }
});
