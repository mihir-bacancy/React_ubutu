import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk'


export default class App extends Component{

    _saveData = () => {
        LoginManager.logInWithReadPermissions(['public_profile'])
            .then((result) => {
                console.log("in then")
                if(result.isCancelled){
                    alert('Login is cancelled')
                }
                else{
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
    };
    render(){
        return(
            <View>
                <TouchableOpacity onPress={this._saveData}>
                    <Text>Login with Facebook</Text>
                </TouchableOpacity>
            </View>
        )
    }

}