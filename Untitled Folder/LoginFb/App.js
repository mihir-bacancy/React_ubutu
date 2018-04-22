import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import {GoogleSignin} from 'react-native-google-signin';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
        })
            .catch((err) => {
                console.log("Play services error", err.code, err.message);
            })
        GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
            webClientId:"1092749155468-sd6b134r5pp0f0cf15a7d8p62d8u314a.apps.googleusercontent.com"
                })
                .then(() => {
                    // you can now call currentUserAsync()
                });
    }

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
    _signIn=()=>{
        GoogleSignin.signIn()
            .then((user) => {
                console.log(user);
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
       /* GoogleSignin.getCurrentAccessToken()
            .then((token) => {
                console.log(token);
            })
            .catch((err) => {
                console.log(err);
            })
            .done();*/
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={this._saveData}>
                    <Text>Login with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._signIn}>
                    <Text>Login with Gmail</Text>
                </TouchableOpacity>
            </View>
        )
    }

}