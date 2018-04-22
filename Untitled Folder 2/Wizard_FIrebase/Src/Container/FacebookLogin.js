import { LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import React, { Component } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';

class FacebookLogin extends Component {

    _saveData = () => {
        console.log('sfda');
        LoginManager.logInWithReadPermissions(['public_profile'])
            .then((result) => {
                console.log(result);
                if(result.isCancelled){
                    alert('Login is cancelled')
                }
                else {
                    AccessToken.getCurrentAccessToken()
                        .then((data) => {
                            console.log(data)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this._saveData}
                >
                    <Text>fvhdguvh</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default FacebookLogin;