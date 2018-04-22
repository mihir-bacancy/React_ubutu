import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'

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
            webClientId:"595677694614-046tko63n63m89hlhpcvmf00nl1i7upi.apps.googleusercontent.com"
        })
            .then(() => {
                // you can now call currentUserAsync()
            });
    }

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
                <TouchableOpacity onPress={this._signIn}>
                    <Text>Login with Gmail</Text>
                </TouchableOpacity>
            </View>
        )
    }

}