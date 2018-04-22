/**
 * @providesModule PlayControllerMain
 */

import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';
import Orientation from 'react-native-orientation';
import {Actions} from 'react-native-router-flux';

export default class PlayControllerMain extends Component {
    constructor(props) {
        super(props);
        this.PlayControllerRef = null;
        this.state = {
            allVideoPaused: false,
            orientation: (Dimensions.get('window').height > Dimensions.get('window').width) ? 'PORTRAIT' : 'LANDSCAPE'
        }
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
        if (this.PlayControllerRef)
            (Dimensions.get('window').height > Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
    }

    _requiredLogin = () => {
        const {setLastAction,videoPath,toast,videoId} = this.props;
        toast({type: 'success', text: 'Login required!'});
        setLastAction({routeName: 'TubeScreen', params: {videoPath,videoId}});
        Actions.Login();
    }

    render() {
        const {allVideoPaused, orientation} = this.state;
        const {onVideoPlayPause, onVideoBack, onVideoDelete, record, onUploadUserVideo, videoUploaded, onBackToRecord, user, onPressRecord, isRecording} = this.props;
        let playButton = null;
        let recordButton = null;

        if (allVideoPaused) {
            // its paused, render play button
            playButton = (
                <Button vertical
                        onPress={onVideoPlayPause.bind(this)}
                >
                    <Icon name="pause"/>
                </Button>
            );

        } else {
            // its playing, render pause button
            playButton = (
                <Button vertical
                        onPress={onVideoPlayPause.bind(this)}>
                    <Icon name="play"/>
                </Button>
            );
        }
        let uploadBtn = (videoUploaded) ?
            <Button vertical iconRight onPress={() => onBackToRecord(null, true)}><Icon name="video-camera"/></Button>
            : <Button vertical iconRight
                      onPress={(user != null) ? onUploadUserVideo.bind(this) : this._requiredLogin.bind(this)}><Icon
                name="upload"/></Button>;

        if (isRecording) {
            // its paused, render play button
            recordButton = (
                <Button vertical
                        onPress={onPressRecord.bind(this)}
                >
                    <Icon name="circle"/>
                </Button>
            );

        } else {
            // its playing, render pause button
            recordButton = (
                <Button vertical
                        onPress={onPressRecord.bind(this)}>
                    <Icon name="video-camera"/>
                </Button>
            );
        }

        return (
            <View style={orientation === 'LANDSCAPE' ? null : {
                height: (Dimensions.get('window').height) * 0.07,
            }} ref={(ref) => {
                this.PlayControllerRef = ref;
            }}>
                {(!record) ?
                    <Footer>
                        <FooterTab>
                            <Button vertical iconLeft onPress={onVideoBack.bind(this)}>
                                <Icon name="backward"/>
                            </Button>
                            {playButton}
                            <Button vertical onPress={onVideoDelete.bind(this)}>
                                <Icon name="trash"/>
                            </Button>
                            {uploadBtn}
                        </FooterTab>
                    </Footer>
                    : <Footer>
                        <FooterTab>
                            <Button vertical iconLeft onPress={onVideoBack.bind(this)}>
                                <Icon name="backward"/>
                            </Button>
                            {recordButton}
                            <Button/>
                            <Button/>


                        </FooterTab>
                    </Footer>
                }
            </View>

        );
    }
}
