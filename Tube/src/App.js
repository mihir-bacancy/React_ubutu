import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import store from 'ReduxStore';
import MainContainer from 'MainContainer';
import Routes from "./Routes";

export default function App() {
    return (
        <Provider store={ store }>
            <StyleProvider style={getTheme(material)}>
                <View style={{flex:1}}>
                    <MainContainer />
                    <Routes />
                </View>
            </StyleProvider>
        </Provider>
    );
}
