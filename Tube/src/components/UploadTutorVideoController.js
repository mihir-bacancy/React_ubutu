/**
 * @providesModule UploadTutorVideoController
 */

import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

export default class UploadTutorVideoController extends Component {
    constructor(props) {
        super(props);
        this.UploadTutorVideoControllerRef=null;
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
        if(this.UploadTutorVideoControllerRef)
            (Dimensions.get('window').height>Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            allVideoPaused: nextProps.videoPaused,
        });
    }

    _requiredLogin = () => {
        const {setLastAction,videoUrl,toast} = this.props;
        toast({type: 'success', text: 'Login required!'});
        setLastAction({routeName: 'TubeScreen', params: {videoUrl}});
        Actions.Login();
    }

    render() {
        const {allVideoPaused, orientation} = this.state;
        const {onVideoDelete, record, onUploadUserVideo, user} = this.props;
        let playButton = null;
        if (allVideoPaused) {
            // its paused, render play button
            playButton = (
                <Button vertical
                >
                    <Icon name="pause"
                          style={orientation === 'LANDSCAPE' ? {
                              alignSelf: 'center',
                              color: '#222',
                              fontSize: Dimensions.get('window').height * 0.08,
                              marginVertical: Dimensions.get('window').height * 0.02,
                          } : {
                              alignSelf: 'center',
                              color: '#222',
                              fontSize: Dimensions.get('window').height * 0.08,
                              marginVertical: Dimensions.get('window').height * 0.02,
                          }}
                    />
                </Button>
            );

        } else {
            // its playing, render pause button
            playButton = (
                <Button vertical>
                    <Icon name="play" style={orientation === 'LANDSCAPE' ? {
                        alignSelf: 'center',
                        color: '#222',
                        fontSize: Dimensions.get('window').height * 0.08,
                        marginVertical: Dimensions.get('window').height * 0.02,
                    } : {
                        alignSelf: 'center',
                        color: '#222',
                        fontSize: Dimensions.get('window').height * 0.08,
                        marginVertical: Dimensions.get('window').height * 0.02,
                    }}

                    />
                </Button>

            );
        }

        return (
            <View style={orientation === 'LANDSCAPE' ? null : null} ref={(ref) => {
                this.UploadTutorVideoControllerRef = ref;
            }}>
                {(!record && orientation == 'PORTRAIT') ?
                    <Footer>
                        <FooterTab>
                            <Button vertical onPress={onVideoDelete}>
                                <Icon name="trash" style={orientation === 'LANDSCAPE' ? null : {
                                    alignSelf: 'center',
                                    color: '#222',
                                    fontSize: Dimensions.get('window').height * 0.04,
                                    marginVertical: Dimensions.get('window').height * 0.02,
                                }}/>
                            </Button>
                            <Button vertical iconRight onPress={(user!=null)?onUploadUserVideo:this._requiredLogin()}>
                                <Icon name="upload" style={orientation === 'LANDSCAPE' ? null : {
                                    alignSelf: 'center',
                                    color: '#222',
                                    fontSize: Dimensions.get('window').height * 0.04,
                                    marginVertical: Dimensions.get('window').height * 0.02,
                                }}/>
                            </Button>
                        </FooterTab>
                    </Footer>
                    : <View/>
                }
            </View>
        )
    }
}
