import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './Reducers/Store';
import Screen from './Screen';
import * as firebase from 'react-native-firebase';

class App extends  Component{
    componentWillMount(){

        firebase.initializeApp({
            apiKey: ' AIzaSyBxvmnvIA8oTvS81QxyPE6WEc1zaTtzra8',
            databaseURL: 'https://form-c18a0.firebaseio.com/',
            authDomain: ' form-c18a0.firebaseapp.com ',
        });

    }

    render(){
        return(
            <Provider store={store}>
                <Screen/>
            </Provider>
        )
    }
}
export default App