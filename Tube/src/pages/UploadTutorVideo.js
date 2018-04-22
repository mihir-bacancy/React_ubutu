/**
 * @providesModule UploadTutorVideo
 */

import React, {Component} from 'react';
import {
    View, TouchableWithoutFeedback, TouchableOpacity, Alert, Dimensions, Platform
} from 'react-native';
import Camera, {constants} from 'react-native-camera';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import UploadTutorAttemptPlay from '../components/UploadTutorAttemptPlay';
import TubeScreenStyle from '../assets/style/TubeScreenStyle';
import {Actions} from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import InnerHeader from '../components/InnerHeader';
import UploadTutorVideoStyle from '../assets/style/UploadTutorVideoStyle';
import UploadTutorVideoController from '../components/UploadTutorVideoController';
import RNFetchBlob from 'react-native-fetch-blob';
import API from '../utils/AppUtil';
import withLoader from '../common/withLoader';
import withUser from '../common/withUser';
import withToast from '../common/withToast';
import withLastAction from '../common/withLastAction';

const attempts1 = [];
const iconSize = 35;

class UploadTutorVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCameraAspect: constants.Aspect.fill, // where the aspect ratio of the camera's view is preserved by cropping the view
            userCameraCaptureTarget: constants.CaptureTarget.temp,  // saves in /private/var/mobile/Containers/Data/Application/FC7.../tmp/file.mov
            userCameraType: constants.Type.back,
            userCameraOrientation: constants.Orientation.auto,  // not used, default
            userCameraCaptureMode: constants.CaptureMode.video,
            userCameraTorchMode: constants.TorchMode.off,
            userCameraMaxRecording: 4000,       // max length of camera recording, in ms
            userCameraIsRecording: false,
            // user video info =========================
            userVideoPath: null,
            userVideoRate: 1.0,
            userVideoVolume: 1.0,
            userVideoDuration: 0.0,
            userVideoCurrentTime: 0.0,
            userVideoMuted: false,
            userVideoPaused: false,
            userVideoRepeat: false,
            userVideoResizeMode: 'cover', // cover or contain
            orientation: (Dimensions.get('window').height > Dimensions.get('window').width) ? 'PORTRAIT' : 'LANDSCAPE',
            record: true,
            recordScreen: true,
            video: null,
            attempts: [],
            videoPaused: false,
            videoBack: false,
            position: 0,
            reset: false
        }
        this.renderUserCamera = this.renderUserCamera.bind(this);
        this._gotoHome = this._gotoHome.bind(this);
    }

    componentDidMount() {
        Orientation.addSpecificOrientationListener((specificOrientation) => {
            this._updateOrientation(specificOrientation)
        });
    }

    componentWillUnmount() {
        Orientation.removeSpecificOrientationListener((specificOrientation) => {
            this._updateOrientation(specificOrientation)
        });
    }

    _updateOrientation = (specificOrientation) => {
        if (this.userCamera)
            (Dimensions.get('window').height > Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
    }

    cameraRecord = () => {
        const {setRecordState} = this.props;
        // camera capture
        // this.userCamera.capture({ mode: constants.CaptureMode.video })
        this.userCamera.capture()
            .then((data) => {
                // after capture finished...
                // clear timeout
                // save path to state
                this.setState({
                    userVideoPath: data.path,
                    record: false
                });
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

    _gotoHome = () => {
        Actions.Home();
    }

    renderUserCamera = () => {
        let {videoPath} = this.props
        if (!videoPath) {
            // when there is no userVideo path, render the camera

            // render record button overlay if not recording
            let recButton = null;
            if (!this.state.userCameraIsRecording) {
                recButton = (
                    <TouchableOpacity
                        style={[TubeScreenStyle.button, TubeScreenStyle.userRecStopButton, {
                            width: this.state.courseVideoWidth,
                            top: (this.state.courseVideoHeight / 2) - 20
                        }]}
                        onPress={() => this.onPressCameraRecStop()}
                    >
                        <Icon3 name="md-videocam" style={[TubeScreenStyle.icon, TubeScreenStyle.userRecStopIcon]}
                               size={iconSize}/>
                    </TouchableOpacity>
                );
            }
            if (!this.state.userCameraIsRecording && this.state.orientation === 'LANDSCAPE') {
                // if landscape, this layer is on top so also controls courseVideo, onPress masterPlay
                recButton = (
                    <TouchableOpacity
                        style={[TubeScreenStyle.button, TubeScreenStyle.userRecStopButton, {
                            width: this.state.courseVideoWidth,
                            top: (this.state.courseVideoHeight / 2) - 20
                        }]}
                    >
                        <Icon2 name="md-videocam" style={[TubeScreenStyle.icon, TubeScreenStyle.userRecStopIcon]}
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
                        <Icon3 name="ios-reverse-camera-outline"
                               style={[TubeScreenStyle.icon, TubeScreenStyle.switchTypeIcon]} size={iconSize + 10}/>
                    </TouchableOpacity>
                );
            }


            // main render
            return (
                <View style={{flex: 1}}>
                    <TouchableWithoutFeedback
                        onPress={this.state.orientation === 'LANDSCAPE' ? this.onPressCameraRecStop.bind(this) : this.onPressCameraRecStop.bind(this)}>
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
                            resizeMode="cover"
                            defaultTouchToFocus
                            captureAudio={true}
                            mirrorImage={this.state.userCameraType === 'front'}  // if front camera, then mirror, otherwise NO
                        />
                    </TouchableWithoutFeedback>

                    {recordingLight}

                    {switchButton}

                    {recButton}

                </View>
            );
        }
    }

    _onPressVideoDelete = () => {
        Alert.alert(
            'Are you sure you want to delete video?',
            null,
            [
                {
                    text: 'No', onPress: () => {
                }
                },
                {
                    text: 'YES',
                    onPress: () => {
                        const fileToDelete = this.state.userVideoPath;
                        let filePath = 'file://' + fileToDelete;  // android OK
                        if (Platform.OS === 'ios') {
                            filePath = fileToDelete;     // ios OK
                        }
                        // // use fetch blob to delete recording from this.state.userVideoPath
                        RNFetchBlob.fs.unlink(filePath).then((res) => {
                            this.setState({record: true, userVideoPath: null})
                        }).catch((err) => {
                        });
                    }
                },
            ]
        );
    }

    _uploadTutorAttemptVideo = () => {
        const {loader, toast} = this.props;
        const {userVideoPath, video} = this.state;
        loader(true);
        API.uploadTutorAttempt({
            videoUrl: userVideoPath,
            title: 'Tutor Course Video',
            free: true,
            courseId: this.props.courseId
        })
            .then((responseJson) => {
                loader(false);
                const {status, data} = responseJson.json();

                if (status) {
                    this.setState({
                        video: data
                    });
                    Actions.Home();
                } else {
                    toast({type: 'error', text: responseJson.message});
                }
            })
    }

    render() {
        const {record, userVideoPath, videoPaused, videoBack, position, reset, attempts, orientation} = this.state;
        return (
            <View style={UploadTutorVideoStyle.layout}>
                <InnerHeader {...this.props} onLeftPress={this._gotoHome.bind(this)}/>

                <View style={orientation === 'LANDSCAPE' ? {
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    backgroundColor: 'transparent',
                    width: Dimensions.get('window').width * 0.99,
                    height: (Dimensions.get('window').height) * 0.75,
                } : {
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    backgroundColor: 'transparent',
                    marginTop: Dimensions.get('window').height * 0.003,
                    marginRight: Dimensions.get('window').height * 0.003,
                    marginBottom: Dimensions.get('window').height * 0.003,
                    marginLeft: Dimensions.get('window').width * 0.003,
                }}>
                    {
                        (record) ?
                            this.renderUserCamera() :
                            <UploadTutorAttemptPlay {...this.props} videoPaused={videoPaused} videoBack={videoBack}
                                                    attempts={attempts}
                                                    videoUrl={userVideoPath}
                                                    position={position}
                                                    reset={reset}
                            />
                    }
                </View>

                <UploadTutorVideoController {...this.props}
                                            record={record}
                                            videoUrl={userVideoPath}
                                            onVideoDelete={this._onPressVideoDelete}
                                            onUploadUserVideo={this._uploadTutorAttemptVideo}
                />
            </View>
        );
    }
}

export default withToast(withUser(withLoader(withLastAction(UploadTutorVideo))));
