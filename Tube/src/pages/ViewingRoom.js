import React, {Component} from 'react';
import {View} from 'react-native';
import withLoader from '../common/withLoader';
import {Content, Text} from 'native-base';
import withUser from '../common/withUser';
import withToast from '../common/withToast';
import InnerHeader from '../components/InnerHeader';
import VideoControllerMain from '../components/VideoContollerMain';
import ViewingRoomStyle from '../assets/style/ViewingRoomStyle';
import VideoPlay from '../components/VideoPlay';
import AttemptPlay from '../components/AttemptPlay';
import API from '../utils/AppUtil';

class ViewingRoom extends Component {

    constructor(props) {
        super(props);
        this.videoBack = null;
        this.state = {
            video: null,
            attempts: [],
            videoPaused: false,
            videoBack: false,
            position: 0,
            reset: false

        }
        this._getVideoDetails = this._getVideoDetails.bind(this);
    }

    componentWillMount() {
        const {videoId} = this.props;
        this._getVideoDetails(videoId);
    }

    _getVideoDetails = (videoId) => {
        const {loader, toast, user} = this.props;
        if (user != null) {
            loader(true);
            API.getVideoDetails({videoId: videoId})
                .then((responseJson) => {
                    loader(false);
                    const {status, data} = responseJson;
                    (status) ? this.setState({
                        video: data,
                        attempts: data.attempts
                    }) : toast({type: 'error', text: responseJson.message});
                });
        } else {
            loader(true);
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

    _onPressVideoPlayPause = () => {
        this.setState({
            videoPaused: !this.state.videoPaused,
            reset: false
        });
    }

    _onPressVideoBack = () => {
        this.setState({
            videoBack: !this.state.videoBack,
            reset: true
        });
    }

    _onPressNextVideo = () => {
        let {position, attempts} = this.state;
        if (attempts.length > 0 && position < attempts.length) {
            this.setState({
                position: position + 1,
                videoPaused: false,
                videoBack: true,
                reset: true
            });
        }
    }

    _onPressPrevVideo = () => {
        let {position} = this.state;
        if (position > 0) {
            this.setState({
                position: position - 1,
                videoPaused: false,
                videoBack: true,
                reset: true
            });
        }
    }


    render() {
        const {video, videoPaused, videoBack, position, reset, attempts} = this.state;

        let videoUrl = '';
        if (attempts && attempts.length > 0) {
            videoUrl = attempts[position].video;
        }
        return (
            <View
                style={ViewingRoomStyle.layout}>
                <InnerHeader {...this.props}/>
                <Content scrollEnabled={false}>

                    {
                        (video && video != null)
                            ?
                            <VideoPlay {...this.props} videoData={video} reset={reset} videoPaused={videoPaused}
                                       videoBack={videoBack}/>
                            :
                            <View><Text> Video not found</Text></View>
                    }

                    {
                        (attempts && attempts.length > 0)
                            ?

                            <AttemptPlay {...this.props} videoPaused={videoPaused} videoBack={videoBack}
                                         videoNext={this._onPressNextVideo}
                                         videoPrev={this._onPressPrevVideo}
                                         attempts={attempts}
                                         videoUrl={videoUrl}
                                         position={position}
                                         reset={reset}

                            />
                            :
                            <View/>
                    }

                </Content>

                {
                    ( attempts && attempts.length > 0)
                        ?
                        <VideoControllerMain {...this.props} videoPaused={videoPaused} videoBack={videoBack}
                                             onVideoPlayPause={this._onPressVideoPlayPause}
                                             onVideoBack={this._onPressVideoBack}
                        />
                        :
                        <View/>
                }
            </View>
        );
    }
}

export default withToast(withUser(withLoader(ViewingRoom)));
