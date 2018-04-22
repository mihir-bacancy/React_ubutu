/**
 * @providesModule InnerHeader
 */

import React, {Component} from 'react';
import {View, Dimensions, Text, TouchableOpacity, StatusBar} from 'react-native';
import {Header, Left, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import LayoutStyle from 'LayoutStyle';
import {SCREEN_TITLE} from 'global';
import {Actions} from 'react-native-router-flux';
import Orientation from 'react-native-orientation';

export default class InnerHeader extends Component {

    constructor(props) {
        super(props);
        this.innerHeader = null;
        this.state = {
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
        if (this.innerHeader)
            (Dimensions.get('window').height > Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
    }

    render() {
        const {sceneKey} = this.props;
        const {orientation} = this.state;
        return (

            <View ref={(ref) => {
                this.innerHeader = ref;
            }}>
                {
                    (orientation == 'PORTRAIT')
                        ?
                        <View style={LayoutStyle.headerLayout}>
                            <StatusBar
                                barStyle={'light-content'}
                            />
                            <View style={LayoutStyle.headerContainer}>
                                <View style={{left: 5}}>
                                    <TouchableOpacity
                                        style={LayoutStyle.headerIconCotainer}>
                                        <Icon name='chevron-left'
                                              style={[LayoutStyle.headerIcon, {
                                                  fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.03
                                              }]}
                                              onPress={() => Actions.pop({refresh: {test: true}})}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flex: 0,
                                    flexDirection: 'row',
                                    width: Dimensions.get('window').width * 0.40
                                }}>
                                    <Text style={{
                                        color: '#FFFFFF',
                                        fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.018,
                                        alignSelf: "center",
                                        fontWeight: 'bold',
                                    }}>{SCREEN_TITLE[sceneKey]}</Text>
                                </View>
                                <View style={{right: 15}}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{backgroundColor: '#3F51B5',paddingTop:20}}>
                            <StatusBar
                                barStyle={'light-content'}
                            />
                        </View>
                }
            </View>
        );
    }
}
