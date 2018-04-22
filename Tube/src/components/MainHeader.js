/**
 * @providesModule MainHeader
 */
import color from "color";
import React, {Component} from 'react';
import {View, Dimensions, Text, TouchableOpacity,StatusBar} from 'react-native';
import {Header, Left, Body, Right, Button,} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import LayoutStyle from 'LayoutStyle';
import {SCREEN_TITLE} from 'global';

export default class MainHeader extends Component {

    render() {
        const {onLeftPress, leftLabel, leftIcon, sceneKey, iconRight} = this.props;

        return (
            <View style={LayoutStyle.headerLayout}>
                <StatusBar
                    barStyle={'light-content'}
                />
                <View style={LayoutStyle.headerContainer}>
                    <View style={{left: 15,width:Dimensions.get('window').width * 0.15}}>
                        {
                            (onLeftPress)
                                ? <TouchableOpacity
                                style={[LayoutStyle.headerIconCotainer]}
                                onPress={() => onLeftPress()}>
                                { (leftIcon ) ? <Icon name={leftIcon} style={[LayoutStyle.headerIcon, {
                                    fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.03
                                }]}/> : <Text></Text> }
                                <Text style={{
                                    color: '#fff',
                                    alignSelf: "center",
                                    left: Dimensions.get('window').width * 0.015,
                                    fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.018
                                }}>{(leftLabel) ? leftLabel : <Text></Text>}</Text>
                            </TouchableOpacity>
                                : <Text></Text>
                        }

                    </View>
                    <View style={{flex:1,width:Dimensions.get('window').width}}>
                        <Text style={{
                            color: '#FFFFFF',
                            fontSize:(Dimensions.get('window').height + Dimensions.get('window').width) * 0.018,
                            alignSelf: "center",
                            alignContent: "center",
                            fontWeight:'bold',
                            marginTop: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.01
                        }}>{SCREEN_TITLE[sceneKey]}</Text>
                    </View>
                    <View style={{right: 0,width:Dimensions.get('window').width * 0.15}}>
                        {
                            (SCREEN_TITLE[sceneKey] != 'Info') ? <TouchableOpacity
                                style={[LayoutStyle.headerIconCotainer]}
                                >
                                <Icon name='cog' style={[LayoutStyle.headerIcon, {
                                    fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.03
                                }]}/>
                            </TouchableOpacity> : <Text></Text>
                        }
                    </View>
                </View>
            </View>
        );
    }
}
