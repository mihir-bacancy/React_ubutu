/**
 * @providesModule TubeScreenStyle
 */

import {StyleSheet,Dimensions} from 'react-native';
import {size} from 'global';

export default StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    iconMainController:{
        alignSelf: 'center',
        color: '#222',
        fontSize: 25,
        marginVertical: Dimensions.get('window').height * 0.02,
    },
    ////////Record camera styles///////
    userCameraContainer: {
        flex: 1,
        marginTop: 1,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'green',
    },
    userCameraContainerLandscape: {
        // flex: 1,
        margin: 2,  // 1 pixel for course border, 1 for margin
        borderWidth: 1,
        position: 'absolute',
        width: size.deviceHeight,   // width an height are passed in from the view
        height: size.deviceWidth,  // width an height are passed in from the view
        top: 0,
        left: 0,    // passed in with width of courseControl
        // opacity: 0.5,
        borderColor: 'green',
    },
    userCamera: {
        flex: 1,
    },
    userCameraLandscape: {
        flex: 1,
        //opacity: 0.5,
    },
    switchTypeButton: {
        width: size.deviceWidth / 6,
        height: size.deviceWidth / 6,
        // borderWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        right: 0,
        // top: 0,
    },
    switchTypeIcon: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    userRecStopButton: {
        position: 'absolute',
        width: size.deviceWidth,      // passed in from view
        top: size.deviceHeight / 7,    // passed in from view
        // backgroundColor: 'lightgreen',
        backgroundColor: 'rgba(0,0,0,0)',
        // borderWidth: 5,
        borderColor: 'white',
        // width: Config.deviceWidth / 6,
        // height: Config.deviceWidth / 6,
    },
    userRecStopIcon: {
        color: 'red'
    },
    recordingLightButton: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    recordingLightButtonLandscape: {
        position: 'absolute',
        top: 15,
        left: 10,
    },
    recordingLight: {
        color: 'red',
    }
});
