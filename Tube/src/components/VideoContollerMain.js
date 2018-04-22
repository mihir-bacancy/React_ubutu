/**
 * @providesModule VideoControllerMain
 */

import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewingRoomStyle from 'ViewingRoomStyle';

export default class VideoControllerMain extends Component {
    constructor(props) {
        super(props);
        this.VideoControllerRef = null;
        this.state = {
            allVideoPaused: false,
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
        if(this.VideoControllerRef)
        (Dimensions.get('window').height>Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            allVideoPaused: nextProps.videoPaused,
        });
    }

    render() {
        const {allVideoPaused, orientation} = this.state;
        const {onVideoPlayPause, onVideoBack} = this.props;
        let playButton = null;
        if (allVideoPaused) {
            // its paused, render play button
            playButton = (
                <View style={ViewingRoomStyle.footerIconCotainer}>
                    <Icon name="pause"
                          style={[ViewingRoomStyle.footerIcon, {
                              fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.025,
                              paddingVertical: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.008,
                          }]}
                          onPress={onVideoPlayPause.bind(this)}
                    />
                </View>
            );

        } else {
            // its playing, render pause button
            playButton = (
                <View style={ViewingRoomStyle.footerIconCotainer}>
                    <Icon name="play"
                          style={[ViewingRoomStyle.footerIcon, {
                              fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.025,
                              paddingVertical: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.008,
                          }]}
                          onPress={onVideoPlayPause.bind(this)}
                    />
                </View>

            );
        }

        return (
            <View style={orientation === 'LANDSCAPE' ? null : {
                height: (Dimensions.get('window').height) * 0.07,
            }} ref={(ref) => {
                this.VideoControllerRef = ref;
            }}>
                <View style={ViewingRoomStyle.footerLayout}>
                    <View style={ViewingRoomStyle.footerContainer}>
                        <View style={ViewingRoomStyle.footerIconCotainer}>
                            <Icon name="backward" style={[ViewingRoomStyle.footerIcon, {
                                fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.025,
                                paddingVertical: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.008,
                            }]} onPress={onVideoBack.bind(this)}/>
                        </View>

                        {playButton}
                        <View style={ViewingRoomStyle.footerIconCotainer}>
                        </View>
                    </View>
                </View >
            </View>
        )
    }
}
