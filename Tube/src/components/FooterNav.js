/**
 * @providesModule FooterNav
 */

import React, {Component} from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import LayoutStyle from 'LayoutStyle';

export default class FooterNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {user, sceneKey} = this.props;
        return (
            <View style={{
                height: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.05,
            }}>
                <View style={LayoutStyle.footerLayout}>
                    <View style={LayoutStyle.footerContainer}>
                        <TouchableOpacity
                            style={[LayoutStyle.footerIconCotainer, {paddingVertical: Dimensions.get('window').height * 0.02}]}
                            onPress={() => Actions.MarketPlace()}>
                            <Icon name="th"
                                  style={
                                      (sceneKey == 'MarketPlace')
                                          ?
                                          [LayoutStyle.footerIcon, {
                                              fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.02,
                                              color: '#3F51B5'
                                          }]
                                          :
                                          [LayoutStyle.footerIcon, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.02}]
                                  }/>
                            <Text style={
                                (sceneKey == 'MarketPlace')
                                    ?
                                    [LayoutStyle.footerIconText, {
                                        fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.012,
                                        color: '#3F51B5'
                                    }]
                                    :
                                    [LayoutStyle.footerIconText, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.012}]
                            }>Market Place</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[LayoutStyle.footerIconCotainer, {paddingVertical: Dimensions.get('window').height * 0.02}]}
                            onPress={() => Actions.Home()}>
                            <Icon name="home"
                                  style={
                                      (sceneKey == 'Home')
                                          ?
                                          [LayoutStyle.footerIcon, {
                                              fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.02,
                                              color: '#3F51B5'
                                          }]
                                          :
                                          [LayoutStyle.footerIcon, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.02}]
                                  }/>
                            <Text style={
                                (sceneKey == 'Home')
                                    ?
                                    [LayoutStyle.footerIconText, {
                                        fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.012,
                                        color: '#3F51B5'
                                    }]
                                    :
                                    [LayoutStyle.footerIconText, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.012}]
                            }>Home</Text>
                        </TouchableOpacity>

                        {
                            (user != null)
                                ?
                                <TouchableOpacity
                                    style={[LayoutStyle.footerIconCotainer, {paddingVertical: Dimensions.get('window').height * 0.02}]}
                                    onPress={() => Actions.UserProfile()}>
                                    <Icon name="user"
                                          style={
                                              (sceneKey == 'UserProfile')
                                                  ?
                                                  [LayoutStyle.footerIcon, {
                                                      fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.02,
                                                      color: '#3F51B5'
                                                  }]
                                                  :
                                                  [LayoutStyle.footerIcon, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.02}]
                                          }/>
                                    <Text style={
                                        (sceneKey == 'UserProfile')
                                            ?
                                            [LayoutStyle.footerIconText, {
                                                fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.012,
                                                color: '#3F51B5'
                                            }]
                                            :
                                            [LayoutStyle.footerIconText, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.012}]
                                    }>Profile</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={[LayoutStyle.footerIconCotainer, {paddingVertical: Dimensions.get('window').height * 0.02}]}
                                    onPress={() => Actions.Login()}>
                                    <Icon name="lock"
                                          style={[LayoutStyle.footerIcon, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.02}]}/>
                                    <Text
                                        style={[LayoutStyle.footerIconText, {fontSize: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.012}]}>Login</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        );
    }
}
