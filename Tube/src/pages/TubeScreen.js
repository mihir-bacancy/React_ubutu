import React, {Component} from 'react';
import {View, Alert, Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import withLoader from '../common/withLoader';
import {Content, Text} from 'native-base';
import withUser from '../common/withUser';
import withToast from '../common/withToast';
import withLastAction from '../common/withLastAction';
import InnerHeader from '../components/InnerHeader';
import VideoPlay from '../components/VideoPlay';
import API from '../utils/AppUtil';
import TubeScreenStyle from '../assets/style/TubeScreenStyle';
import RecordVideo from '../components/RecordVideo';
import PlayControllerMain from '../components/PlayControllerMain';


class TubeScreen extends Component {

    constructor(props) {
        super(props);
        this.videoBack = null;
        this.record = true;
        this.state = {
            video: null,
            videoPaused: false,
            videoBack: false,
            position: 0,
            reset: false,
            record: (this.props.videoPath) ? false : true,
            videoPath: (this.props.videoPath) ? this.props.videoPath : null,
            videoUploaded: false,
            isRecording: false
        }
        this._getVideoDetails = this._getVideoDetails.bind(this);
        this._onPressRecord = this._onPressRecord.bind(this);
    }

    componentWillMount() {
        const {videoId} = this.props;
        this._getVideoDetails(videoId);
    }

    _setRecordState = (path, status, uploaded = false) => {
        this.setState({record: status, videoPath: path, videoUploaded: uploaded});
    }

    _getVideoDetails = (videoId) => {
        const {loader, toast, user} = this.props;
        loader(true);
        if (user != null) {
            API.getVideoDetails({videoId: videoId})
                .then((responseJson) => {
                    loader(false);
                    const {status, data} = responseJson;
                    (status) ? this.setState({
                        video: data
                    }) : toast({type: 'error', text: responseJson.message});
                });
        } else {
            API.getVideoDetailsGuest({videoId: videoId})
                .then((responseJson) => {
                    loader(false);
                    const {status, data} = responseJson;
                    (status) ? this.setState({
                        video: data,
                    }) : toast({type: 'error', text: responseJson.message});
                });
        }
    }

    _uploadUserVideo = () => {
        const {loader, toast} = this.props;
        const {videoPath, video} = this.state;
        loader(true);
        API.uploadUserAttempt({videoUrl: videoPath, title: video.title, free: video.free, videoId: video._id})
            .then((responseJson) => {
                loader(false);
                const {status, data} = responseJson;
                this._deleteVideo(videoPath, false);
                if (status) {
                    this.setState({
                        videoPath: data,
                        videoUploaded: true
                    })
                    toast({type: 'success', text: responseJson.message});
                } else
                    toast({type: 'error', text: responseJson.message});


            })
    }

    _onPressVideoBack = () => {
        this.setState({
            videoBack: !this.state.videoBack,
            reset: true
        });
    }

    _onPressVideoPlayPause = () => {
        this.setState({
            videoPaused: !this.state.videoPaused,
            reset: false,
            isRecording: false
        });
    }

    _onPressRecord = () => {
        this.setState({
            isRecording : !this.state.isRecording
        })

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
                        const fileToDelete = this.state.videoPath;
                        this._deleteVideo(fileToDelete);
                    }
                },
            ]
        );
    }

    _deleteVideo = (fileToDelete, from = true) => {
        const {toast} = this.props;
        let filePath = 'file://' + fileToDelete;  // android OK
        if (Platform.OS === 'ios') {
            filePath = fileToDelete;     // ios OK
        }
        // // use fetch blob to delete recording from this.state.userVideoPath
        RNFetchBlob.fs.unlink(filePath).then((res) => {
            (from) ? this.setState({record: true, videoPath: null}) : null;
        }).catch((err) => {
            toast({type: 'error', text: err.toString()})
        });
    }

    render() {
        const {video, videoPaused, videoBack, reset, position, record, videoPath, videoUploaded, isRecording} = this.state;
        return (
            <View style={TubeScreenStyle.layout}>
                <InnerHeader {...this.props}/>
                <Content scrollEnabled={true}>
                    {
                        (video && video != null)
                            ?
                            <VideoPlay {...this.props} videoData={video} reset={reset} videoPaused={videoPaused}
                                       videoBack={videoBack}/>
                            :
                            <View><Text> Video not found</Text></View>
                    }
                    <RecordVideo {...this.props}
                                 isRecording = {isRecording}
                                 videoPaused={videoPaused} videoBack={videoBack}
                                 onVideoPlayPause={this._onPressVideoPlayPause}
                                 onVideoBack={this._onPressVideoBack}
                                 position={position}
                                 reset={reset}
                                 videoPath={videoPath}
                                 setRecordState={this._setRecordState}
                                 record={record}
                                 onPressRecord={this._onPressRecord}
                    />
                </Content>

                        <PlayControllerMain {...this.props}
                                            isRecording = {isRecording}
                                            videoPaused={videoPaused}
                                            onVideoPlayPause={this._onPressVideoPlayPause}
                                            onVideoBack={this._onPressVideoBack}
                                            onVideoDelete={this._onPressVideoDelete}
                                            onUploadUserVideo={this._uploadUserVideo}
                                            onBackToRecord={this._setRecordState}
                                            record={record}
                                            videoPath={videoPath}
                                            videoUploaded={videoUploaded}
                                            onPressRecord={this._onPressRecord}
                        />

            </View>
        );
    }
}

export default withToast(withUser(withLastAction(withLoader(TubeScreen))));
