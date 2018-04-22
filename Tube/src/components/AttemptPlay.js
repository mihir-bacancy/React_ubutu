/**
 * @providesModule AttemptPlay
 */

import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, CardItem, Button,} from 'native-base';
import Video from 'react-native-video';

import {MediaControls, PLAYER_STATE} from 'react-native-media-controls';
import Orientation from 'react-native-orientation';

export default class AttemptPlay extends Component {

    constructor(props) {
        super(props);
        this.userVideo = null;
        this.state = {
            // the amount that video rate is changed when icon clicked
            rateSteps: [0, 0.001, 0.002, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
            seekStep: 0.1,  // the amount of seconds seek is changed when icon clicked
            // user video info =========================
            userVideoTitle: null,
            userVideoPath: null,
            userVideoRate: 1.0,
            userVideoVolume: 1.0,
            userVideoCurrentTime: 0.0,
            userVideoMuted: false,
            userVideoPaused: true,
            userVideoRepeat: false,
            // player control
            isLoading: true,
            playerState: PLAYER_STATE.PAUSED,
            paused: false,
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
        if(this.userVideo) {
            (Dimensions.get('window').height>Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userVideoPaused: !nextProps.videoPaused,
            playerState: !nextProps.videoPaused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING,
        });
        if (nextProps.reset || this.state.playerState === 2)
            this.userVideo.seek(0);
    }

    // ==================================     COURSE VIDEO FUNCTIONS    ==================================

    _onUserVideoLoad = (data) => {
        // set time to 0 and toggle paused
        this.setState({
            userVideoPaused: true,
            duration: data.duration,
            isLoading: false
        });
    }

    _onUserVideoEnd = () => {
        this.setState({
            userVideoPaused: true,
            playerState: PLAYER_STATE.ENDED
        });
        this.forceUpdate();
    }

    _onUserVideoProgress = (data) => {
        if (this.state.isLoading || this.state.playerState === 2) return null;
        this.setState({
            userVideoCurrentTime: data.currentTime,
        });
    }

    _onPressUserVideoVolume = () => {
        this.setState({
            userVideoMuted: !this.state.userVideoMuted,
        });
    }

    _onPressUserVideoBack = () => {
        this.userVideo.seek(0);
    }

    _onPressUserVideoSlow = () => {
        // cycle through the rateSteps array to get previous rate, cannot be less than 0
        const newIndex = Math.max(this.state.rateSteps.indexOf(this.state.userVideoRate) - 1, 0);
        this.setState({
            userVideoRate: this.state.rateSteps[newIndex],
        });
    }

    _onPressUserVideoFast = () => {
        // cycle through the rateSteps array to get next rate, cannot be greater than index of array
        const newIndex = Math.min(this.state.rateSteps.indexOf(this.state.userVideoRate) + 1, this.state.rateSteps.length - 1);
        this.setState({
            userVideoRate: this.state.rateSteps[newIndex],
        });
    }

    _resetUserVideoRate = () => {
        this.setState({
            userVideoRate: 1,
        });
    }

    _onPressUserVideoPlayPause = () => {
        (this.state.playerState === 2) && this.userVideo.seek(0);
        this.setState({
            userVideoPaused: !this.state.userVideoPaused,
            playerState: !this.state.userVideoPaused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING
        });
        this.forceUpdate();
    }

    _onPressUserVideoStepBack = () => {
        const newTime = this.state.userVideoCurrentTime - this.state.seekStep;
        this.userVideo.seek(newTime);
    }

    _onPressUserVideoStepForward = () => {
        const newTime = this.state.userVideoCurrentTime + this.state.seekStep;
        this.userVideo.seek(newTime);

    }

    // ====================================     COURSE CONTROLS RENDER    ====================================
    _renderUserControls() {
        // show play/pause button only in landscape
        let playButton = null;
        let {orientation} = this.state;

        if (this.state.userVideoPaused) {
            // its paused, render play button
            playButton = (
                <Icon name="play"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: (Dimensions.get('window').height) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressUserVideoPlayPause.bind(this)}/>
            );
        } else {
            // its playing, render pause button
            playButton = (
                <Icon name="pause"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: (Dimensions.get('window').height) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressUserVideoPlayPause.bind(this)}/>
            );
        }
        let volumeButton = null;
        if (this.state.userVideoMuted) {
            volumeButton = (
                <Icon name="volume-off"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: (Dimensions.get('window').height) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressUserVideoVolume.bind(this)}/>
            );
        } else {
            volumeButton = (
                <Icon name="volume-up"
                      style={orientation === 'LANDSCAPE' ? {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: (Dimensions.get('window').height) * 0.05,
                          marginVertical: (Dimensions.get('window').height) * 0.02,
                      } : {
                          alignSelf: 'center',
                          color: '#d9534f',
                          fontSize: 20,
                          marginHorizontal: Dimensions.get('window').width * 0.03,
                      }}
                      onPress={this._onPressUserVideoVolume.bind(this)}/>
            );
        }

        return (
            /* <Card playerControls landscapeControllerRight={orientation === 'LANDSCAPE' ? true : false}>*/

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
                    marginVertical: Dimensions.get('window').height * 0.010,
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
                              color: '#d9534f',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: 20,
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressUserVideoBack.bind(this)}/>
                    {playButton}
                    <Icon name="minus"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: 20,
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressUserVideoSlow.bind(this)}/>
                    <Text
                        style={(orientation === 'LANDSCAPE') ? {
                            color: "#424242",
                            fontSize: (Dimensions.get('window').height) * 0.03,
                            marginVertical: (Dimensions.get('window').height) * 0.02,
                        } : {
                            color: "#424242",
                            marginVertical: Dimensions.get('window').height * 0.01,
                        }}
                        onPress={this._resetUserVideoRate.bind(this)}>
                        {this.state.userVideoRate.toFixed(3)}
                    </Text>
                    <Icon name="plus"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: 20,
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressUserVideoFast.bind(this)}/>
                    <Icon name="fast-backward"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: 20,
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressUserVideoStepBack.bind(this)}/>
                    <Icon name="fast-forward"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: (Dimensions.get('window').height) * 0.05,
                              marginVertical: (Dimensions.get('window').height) * 0.02,
                          } : {
                              alignSelf: 'center',
                              color: '#d9534f',
                              fontSize: 20,
                              marginHorizontal: Dimensions.get('window').width * 0.03,
                          }}
                          onPress={this._onPressUserVideoStepForward.bind(this)}/>
                    {volumeButton}
                </View>
            </View>
            /*</Card>*/

        );
    }


    // player controller
    _onSeek = (seek) => {
        this.userVideo.seek(seek);
    };

    _onPaused = () => {
        this.setState({
            userVideoPaused: !this.state.userVideoPaused,
            playerState: !this.state.userVideoPaused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING
        });
    };

    _onReplay = () => {
        this.setState({playerState: PLAYER_STATE.PLAYING, userVideoPaused: false});
        this.userVideo.seek(0);
    }

    render() {
        const {attempts, position, videoNext, videoPrev, videoUrl} = this.props;
        const {orientation} = this.state;
        let {userVideoRate, userVideoVolume, userVideoMuted, userVideoPaused, userVideoRepeat, playerState, isLoading, userVideoCurrentTime, duration} = this.state;
        return (
            <View
                style={orientation === 'LANDSCAPE' ? {
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    backgroundColor: 'transparent',
                    marginTop: Dimensions.get('window').height * 0.015,
                    width: Dimensions.get('window').width * 0.895,
                    height: (Dimensions.get('window').height) * 0.8,
                    position: 'absolute',
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
                            flexDirection: 'row',
                            width: Dimensions.get('window').width * 0.79,
                            //height: (Dimensions.get('window').height) * 0.36,
                        } : {
                            flex: 1,
                            width: Dimensions.get('window').width * 0.96,
                            height: (Dimensions.get('window').height) * 0.318,
                            alignSelf: 'center'
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={ orientation === 'PORTRAIT' ? this._onPressUserVideoPlayPause.bind(this) : null}>
                            <Video
                                ref={(ref) => {
                                    this.userVideo = ref;
                                }}
                                source={{uri: videoUrl}}
                                rate={userVideoRate}
                                volume={userVideoVolume}
                                muted={userVideoMuted}
                                paused={userVideoPaused}
                                repeat={userVideoRepeat}
                                progressUpdateInterval={1000.0}
                                resizeMode='contain'   // cover or contain
                                style={orientation === 'LANDSCAPE' ? {
                                    flex: 1,
                                    opacity: 0.5
                                } : {
                                    flex: 1,
                                }}
                                onLoad={this._onUserVideoLoad.bind(this)}
                                onEnd={this._onUserVideoEnd.bind(this)}
                                onProgress={this._onUserVideoProgress.bind(this)}
                            />
                        </TouchableWithoutFeedback>
                        {
                            (orientation != 'LANDSCAPE')
                                ?
                                <MediaControls
                                    mainColor="rgba(12, 83, 175, 0.1)"
                                    playerState={playerState}
                                    isLoading={isLoading}
                                    progress={userVideoCurrentTime}
                                    duration={duration}
                                    onPaused={this._onPaused.bind(this)}
                                    onSeek={this._onSeek.bind(this)}
                                    onReplay={this._onReplay.bind(this)}
                                />
                                :
                                true
                        }
                        {
                            (position > 0 ) && <Icon name="chevron-left"
                                                     style={orientation === 'LANDSCAPE' ? {
                                                         position: 'absolute',
                                                         fontSize: 30,
                                                         left: 0,
                                                         top: Dimensions.get('window').height * 0.34,
                                                         backgroundColor: "transparent",
                                                         color: '#ccd0cb'
                                                     } : {
                                                         position: 'absolute',
                                                         fontSize: 30,
                                                         left: 0,
                                                         top: Dimensions.get('window').height * 0.14,
                                                         backgroundColor: "transparent",
                                                         color: '#ccd0cb'
                                                     }}
                                                     onPress={videoPrev.bind(this)}/>
                        }
                        {
                            ((attempts.length - 1) > position) &&
                            <Icon name="chevron-right"
                                  style={orientation === 'LANDSCAPE' ? {
                                      position: 'absolute',
                                      fontSize: 30,
                                      right: 0,
                                      top: Dimensions.get('window').height * 0.34,
                                      backgroundColor: "transparent",
                                      color: '#ccd0cb'
                                  } : {
                                      position: 'absolute',
                                      fontSize: 30,
                                      right: 0,
                                      top: Dimensions.get('window').height * 0.14,
                                      backgroundColor: "transparent",
                                      color: '#ccd0cb'
                                  }}
                                  onPress={videoNext.bind(this)}/>
                        }
                    </View>


                </View>
                {this._renderUserControls()}
            </View>
        );
    }
}
