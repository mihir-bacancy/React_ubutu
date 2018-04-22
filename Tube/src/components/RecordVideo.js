/**
 * @providesModule RecordVideo
 */

import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {Card, CardItem, Button} from 'native-base';
import Camera, {constants} from 'react-native-camera';
import * as Animatable from 'react-native-animatable';
import {size} from 'global';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

import TubeScreenAttempt from 'TubeScreenAttempt';
import TubeScreenStyle from 'TubeScreenStyle';
import Orientation from 'react-native-orientation';

const attempts1 = [];
const iconSize = 35;
export default class RecordVideo extends Component {
    constructor(props) {
        super(props);
        let orientation = Orientation.getInitialOrientation();
        this.RecordVideoRef=null;
        this.state = {
            userCameraAspect: constants.Aspect.fill, // where the aspect ratio of the camera's view is preserved by cropping the view
            userCameraCaptureTarget: constants.CaptureTarget.temp,  // saves in /private/var/mobile/Containers/Data/Application/FC7.../tmp/file.mov
            userCameraType: constants.Type.back,
            userCameraOrientation: constants.Orientation.auto,  // not used, default
            userCameraCaptureMode: constants.CaptureMode.video,
            userCameraTorchMode: constants.TorchMode.off,
            userCameraMaxRecording: 4000,       // max length of camera recording, in ms
            userCameraIsRecording: this.props.isRecording,
            // user video info =========================
            userVideoPath: null,
            userVideoResizeMode: 'cover', // cover or contain
            recordScreen: true,
            orientation: (Dimensions.get('window').height>Dimensions.get('window').width) ? 'PORTRAIT' : 'LANDSCAPE'
        }
        this.renderUserCamera = this.renderUserCamera.bind(this);
    }

    componentDidMount() {
        Orientation.addSpecificOrientationListener((specificOrientation)=>{this._updateOrientation(specificOrientation)});
    }

    componentWillUnmount() {
        Orientation.removeSpecificOrientationListener((specificOrientation)=>{this._updateOrientation(specificOrientation)});
    }

    _updateOrientation = (specificOrientation) => {
        if(this.RecordVideoRef)
        (Dimensions.get('window').height>Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.videoPath) {

        } else {
            if(nextProps.record) {
                if (nextProps.isRecording) {
                    this.cameraRecord();
                } else {
                    (this.state.userCameraIsRecording) ? this.cameraStop() : true;
                }

            }
        }

    }

    cameraRecord = () => {
        const {setRecordState} = this.props;
        // camera capture
        this.userCamera.capture()
            .then((data) => {
                // after capture finished...
                let {path} = data;
                setRecordState(path, false);
            })
            .catch(err => Alert.alert(err));
        // right after capture starts...

        // change recording state
        this.setState({
            userCameraIsRecording: true
        });
    }
    cameraStop = () => {

        this.userCamera.stopCapture();

        this.setState({
            userCameraIsRecording: false
        });
    }

    onPressCameraRecStop = () => {
        if (this.userCamera) {
            if (this.state.userCameraIsRecording) {
                // currently recording, button should stop
                this.cameraStop();

            } else {
                // not recording, button activates recording
                this.cameraRecord();

            }
        }
    }

    switchType = () => {
        let newType;
        const {back, front} = constants.Type;

        if (this.state.userCameraType === back) {
            newType = front;
        } else if (this.state.userCameraType === front) {
            newType = back;
        }
        this.setState({
            userCameraType: newType,
        });
    }

    renderUserCamera = () => {
        let {videoPath} = this.props;
        let {orientation} = this.state;
        if (!videoPath) {
            // when there is no userVideo path, render the camera
            // render record button overlay if not recording
            let recButton = null;
            if (!this.state.userCameraIsRecording) {
                recButton = (
                    <TouchableOpacity
                        style={[TubeScreenStyle.button, TubeScreenStyle.userRecStopButton, {width: Dimensions.get('window').width * 0.89}]}
                        onPress={this.props.onPressRecord}
                    >
                        <Icon name="video-camera" style={[TubeScreenStyle.icon, TubeScreenStyle.userRecStopIcon]}
                              size={iconSize}/>
                    </TouchableOpacity>
                );
            }
            if (!this.state.userCameraIsRecording && this.state.orientation === 'LANDSCAPE') {
                recButton = (
                    <TouchableOpacity
                        style={[TubeScreenStyle.button, TubeScreenStyle.userRecStopButton, {width: Dimensions.get('window').width * 0.89}]}
                        onPress={this.props.onPressRecord}
                    >
                        <Icon name="video-camera" style={[TubeScreenStyle.icon, TubeScreenStyle.userRecStopIcon]}
                              size={iconSize}/>
                    </TouchableOpacity>
                );
            }
            // render blinking recording light if recording
            let recordingLight = null;
            if (this.state.userCameraIsRecording) {
                recordingLight = (
                    <Animatable.View
                        easing='linear'
                        animation='flash'
                        iterationCount='infinite'
                        style={this.state.orientation === 'LANDSCAPE' ? TubeScreenStyle.recordingLightButtonLandscape : TubeScreenStyle.recordingLightButton}
                    >
                        <Icon name='circle' style={[TubeScreenStyle.icon, TubeScreenStyle.recordingLight]}
                              size={iconSize - 20}/>
                    </Animatable.View>
                );
            }
            // render switch camera button overlay if not recording
            let switchButton = null;
            if (!this.state.userCameraIsRecording) {
                switchButton = (
                    <TouchableOpacity
                        style={[TubeScreenStyle.button, TubeScreenStyle.switchTypeButton]}
                        onPress={this.switchType}
                    >
                        <Icon2 name="ios-reverse-camera-outline"
                               style={[TubeScreenStyle.icon, TubeScreenStyle.switchTypeIcon]} size={iconSize + 10}/>
                    </TouchableOpacity>
                );
            }
            // main render
            return (
                <View
                    style={orientation === 'LANDSCAPE' ? {
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        //height: (Dimensions.get('window').height) * 0.9,
                    } : null}
                >
                    <View
                        style={orientation === 'LANDSCAPE' ? {
                            flex: 1,
                        } : {
                            flex: 1,
                            marginTop: Dimensions.get('window').height * 0.01
                        }}
                    >
                        <View
                            style={orientation === 'LANDSCAPE' ? {
                                flex: 1,
                                width: Dimensions.get('window').width * 0.79,
                                //height: (Dimensions.get('window').height) * 0.9,
                            } : {
                                flex: 1,
                                width: Dimensions.get('window').width * 0.96,
                                height: (Dimensions.get('window').height) * 0.40,
                                alignSelf: 'center'
                            }}
                        >
                            <TouchableWithoutFeedback
                                onPress={orientation === 'LANDSCAPE' ? this.onPressCameraRecStop.bind(this) : this.onPressCameraRecStop.bind(this)}>
                                <Camera
                                    ref={(ref) => {
                                        this.userCamera = ref;
                                    }}
                                    style={this.state.orientation === 'LANDSCAPE' ? TubeScreenStyle.userCameraLandscape : TubeScreenStyle.userCamera}
                                    aspect={this.state.userCameraAspect}
                                    captureMode={this.state.userCameraCaptureMode}
                                    captureTarget={this.state.userCameraCaptureTarget}
                                    torchMode={this.state.userCameraTorchMode}
                                    type={this.state.userCameraType}
                                    keepAwake
                                    defaultTouchToFocus
                                    captureAudio={true}
                                    mirrorImage={this.state.userCameraType === 'front'}  // if front camera, then mirror, otherwise NO
                                />
                            </TouchableWithoutFeedback>
                            {recordingLight}
                            {switchButton}
                            {recButton}
                        </View>
                    </View>
                </View>
            );
        }
    }

    render() {
        const {videoPaused, videoBack, position, reset, record, videoPath} = this.props;
        let {orientation} = this.state;

        return (
            <View style={orientation === 'LANDSCAPE' ? {
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'flex-end',
                backgroundColor: 'transparent',
                marginTop: (record)?Dimensions.get('window').height * 0.015:Dimensions.get('window').height * 0.08,
                width: (record)?Dimensions.get('window').width * 0.895:Dimensions.get('window').width * 0.895,
                height: (record)?(Dimensions.get('window').height) * 0.79:(Dimensions.get('window').height) * 0.73,
                position: 'absolute',
                opacity:(record)?0.5:1
            } :null} ref={(ref) => {
                this.RecordVideoRef = ref;
            }}>
                {(record) ?
                    this.renderUserCamera()
                    : <TubeScreenAttempt {...this.props} videoPaused={videoPaused} videoBack={videoBack}
                                   videoUrl={videoPath}
                                   attempts={attempts1}
                                   position={position}
                                   reset={reset}
                    />
                }
            </View>
        );
    }
}


