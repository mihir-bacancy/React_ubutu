/**
 * @providesModule VideoPlay
 */

import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, CardItem, Button} from 'native-base';
import Video from 'react-native-video';
import {MediaControls, PLAYER_STATE} from 'react-native-media-controls';
import Orientation from 'react-native-orientation';

export default class VideoPlay extends Component {

    constructor(props) {
        super(props);
        this.courseVideo = null;
        this.state = {
            // the amount that video rate is changed when icon clicked
            rateSteps: [0, 0.001, 0.002, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
            seekStep: 0.1,  // the amount of seconds seek is changed when icon clicked
            // course video info =========================
            courseVideoTitle: null,
            courseVideoPath: null,
            courseVideoRate: 1.0,
            courseVideoVolume: 1.0,
            courseVideoCurrentTime: 0.0,
            courseVideoMuted: false,
            courseVideoPaused: true,
            courseVideoRepeat: false,
            // player control
            isLoading: true,
            playerState: PLAYER_STATE.PAUSED,
            currentTime: 0,
            duration: 0,
            orientation: (Dimensions.get('window').height>Dimensions.get('window').width) ? 'PORTRAIT' : 'LANDSCAPE'
        }

    }

    componentDidMount() {
        Orientation.addSpecificOrientationListener((specificOrientation)=>{this._updateOrientation(specificOrientation)});
    }

    componentWillUnmount() {
        Orientation.removeSpecificOrientationListener((specificOrientation)=>{this._updateOrientation(specificOrientation)});
    }

    _updateOrientation = (specificOrientation) => {
        if(this.courseVideo) {
            (Dimensions.get('window').height>Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            courseVideoPaused: !nextProps.videoPaused,
            playerState: !nextProps.videoPaused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING,
        });
        if (nextProps.reset || this.state.playerState === 2)
            this.courseVideo.seek(0);
    }

    // ==================================     COURSE VIDEO FUNCTIONS    ==================================

    _onCourseVideoLoad = (data) => {
        // set time to 0 and toggle paused
        this.setState({
            courseVideoPaused: true,
            duration: data.duration,
            isLoading: false
        });
    }

    _onCourseVideoEnd = () => {

        this.setState({
            courseVideoPaused: true,
            playerState: PLAYER_STATE.ENDED
        });
        this.forceUpdate();
    }

    _onCourseVideoProgress = (data) => {
        if (this.state.isLoading || this.state.playerState === 2) return null;
        this.setState({
            courseVideoCurrentTime: data.currentTime,
        });
    }

    _onPressCourseVideoVolume = () => {
        this.setState({
            courseVideoMuted: !this.state.courseVideoMuted,
        });
    }

    _onPressCourseVideoBack = () => {
        this.courseVideo.seek(0);
    }

    _onPressCourseVideoSlow = () => {
        // cycle through the rateSteps array to get previous rate, cannot be less than 0
        const newIndex = Math.max(this.state.rateSteps.indexOf(this.state.courseVideoRate) - 1, 0);
        this.setState({
            courseVideoRate: this.state.rateSteps[newIndex],
        });
    }

    _onPressCourseVideoFast = () => {
        // cycle through the rateSteps array to get next rate, cannot be greater than index of array
        const newIndex = Math.min(this.state.rateSteps.indexOf(this.state.courseVideoRate) + 1, this.state.rateSteps.length - 1);
        this.setState({
            courseVideoRate: this.state.rateSteps[newIndex],
        });
    }

    _resetCourseVideoRate = () => {
        this.setState({
            courseVideoRate: 1,
        });
    }

    _onPressCourseVideoPlayPause = () => {
        (this.state.playerState === 2) && this.courseVideo.seek(0);
        this.setState({
            courseVideoPaused: !this.state.courseVideoPaused,
            playerState: !this.state.courseVideoPaused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING
        });
        this.forceUpdate();
    }

    _onPressCourseVideoStepBack = () => {
        const newTime = this.state.courseVideoCurrentTime - this.state.seekStep;
        this.courseVideo.seek(newTime);
    }

    _onPressCourseVideoStepForward = () => {
        const newTime = this.state.courseVideoCurrentTime + this.state.seekStep;
        this.courseVideo.seek(newTime);
    }

    // ====================================     COURSE CONTROLS RENDER    ====================================
    _renderCourseControls() {
        // show play/pause button only in landscape
        let playButton = null;
        let {orientation} = this.state;
        if (this.state.courseVideoPaused) {
            // its paused, render play button
            playButton = (
                <Icon name="play"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: (Dimensions.get('window').height) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressCourseVideoPlayPause.bind(this)}/>
            );
        } else {
            // its playing, render pause button
            playButton = (
                <Icon name="pause"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: (Dimensions.get('window').height ) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressCourseVideoPlayPause.bind(this)}/>
            );
        }
        let volumeButton = null;
        if (this.state.courseVideoMuted) {
            volumeButton = (
                <Icon name="volume-off"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: (Dimensions.get('window').height) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressCourseVideoVolume.bind(this)}/>
            );
        } else {
            volumeButton = (
                <Icon name="volume-up"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: (Dimensions.get('window').height) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#3F51B5',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressCourseVideoVolume.bind(this)}/>
            );
        }

        return (
            <View
                style={orientation === 'LANDSCAPE' ? {
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.5,
                    width: Dimensions.get('window').width * 0.085,
                    marginHorizontal: Dimensions.get('window').width * 0.01,
                    paddingHorizontal: Dimensions.get('window').width * 0.015,
                    paddingVertical: (Dimensions.get('window').height) * 0.02,
                } : {
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.5,
                    marginVertical: Dimensions.get('window').height * 0.005,
                    marginHorizontal: Dimensions.get('window').width * 0.02,
                    paddingVertical: Dimensions.get('window').height * 0.010,
                }}
            >

                <View
                    style={orientation === 'LANDSCAPE' ? {
                        flex: 1,
                        flexDirection: 'column',
                    } : {
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <Icon name="backward"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#3F51B5',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              fontSize: 20,
                              color: '#3F51B5',
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressCourseVideoBack.bind(this)}/>
                    {playButton}
                    <Icon name="minus"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#3F51B5',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              fontSize: 20,
                              color: '#3F51B5',
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressCourseVideoSlow.bind(this)}/>
                    <Text
                        style={(orientation === 'LANDSCAPE') ? {
                            color: "#424242",
                            fontSize: (Dimensions.get('window').height) * 0.03,
                            marginVertical: (Dimensions.get('window').height) * 0.02,
                        } : {
                            color: "#424242",
                            marginVertical: Dimensions.get('window').height * 0.01,
                        }}
                        onPress={this._resetCourseVideoRate.bind(this)}>
                        {this.state.courseVideoRate.toFixed(3)}
                    </Text>
                    <Icon name="plus"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#3F51B5',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              fontSize: 20,
                              color: '#3F51B5',
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressCourseVideoFast.bind(this)}/>
                    <Icon name="fast-backward"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#3F51B5',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              fontSize: 20,
                              color: '#3F51B5',
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressCourseVideoStepBack.bind(this)}/>
                    <Icon name="fast-forward"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#3F51B5',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              fontSize: 20,
                              color: '#3F51B5',
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressCourseVideoStepForward.bind(this)}/>
                    {volumeButton}
                </View>
            </View>
        );
    }

    // player controller
    onSeek(seek) {
        this.courseVideo.seek(seek);
    };

    onPaused() {
        this.setState({
            courseVideoPaused: !this.state.courseVideoPaused,
            playerState: !this.state.courseVideoPaused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING
        });
    };

    onReplay() {
        this.setState({playerState: PLAYER_STATE.PLAYING, courseVideoPaused: false});
        this.courseVideo.seek(0);
    }

    render() {
        const {videoData: {title, video}} = this.props;
        const {orientation} = this.state;
        const {courseVideoRate, courseVideoVolume, courseVideoMuted, courseVideoPaused, courseVideoRepeat, playerState, isLoading, courseVideoCurrentTime, duration} = this.state;
        return (
            <View
                style={orientation === 'LANDSCAPE' ? {
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#f4f4f4',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: Dimensions.get('window').height * 0.015,
                    width: Dimensions.get('window').width * 0.89,
                    height: (Dimensions.get('window').height) * 0.8,
                } : null}
            >
                {this._renderCourseControls()}

                <View
                    style={ orientation === 'LANDSCAPE' ? {flex: 1} : {
                        flex: 1,
                        marginTop: Dimensions.get('window').height * 0.01
                    }}
                >
                    <View
                        style={orientation === 'LANDSCAPE' ? {
                            flex: 1,
                            width: Dimensions.get('window').width * 0.79,
                            //height: (Dimensions.get('window').height) * 0.36,
                        } : {
                            flex: 1,
                            width: Dimensions.get('window').width * 0.96,
                            height: (Dimensions.get('window').height ) * 0.318,
                            alignSelf: 'center'
                        }}>
                        <TouchableWithoutFeedback
                            onPress={ orientation === 'PORTRAIT' ? this._onPressCourseVideoPlayPause.bind(this) : null}>
                            <Video
                                ref={(ref) => {
                                    this.courseVideo = ref;
                                }}
                                source={{uri: video}}
                                rate={courseVideoRate}
                                volume={courseVideoVolume}
                                muted={courseVideoMuted}
                                paused={courseVideoPaused}
                                repeat={courseVideoRepeat}
                                progressUpdateInterval={1000.0}
                                resizeMode='contain'   // cover or contain
                                style={{flex: 1}}
                                onLoad={this._onCourseVideoLoad.bind(this)}
                                onEnd={this._onCourseVideoEnd.bind(this)}
                                onProgress={this._onCourseVideoProgress.bind(this)}
                            />
                        </TouchableWithoutFeedback>
                        {
                            (orientation != 'LANDSCAPE')
                                ?
                                <MediaControls
                                    mainColor="rgba(12, 83, 175, 0.1)"
                                    playerState={playerState}
                                    isLoading={isLoading}
                                    progress={courseVideoCurrentTime}
                                    duration={duration}
                                    onPaused={this.onPaused.bind(this)}
                                    onSeek={this.onSeek.bind(this)}
                                    onReplay={this.onReplay.bind(this)}
                                />
                                :
                                true
                        }
                    </View>
                </View>
            </View>
        );
    }
}
