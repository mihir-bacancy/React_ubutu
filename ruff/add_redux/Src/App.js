import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './Redux/configureStore'; //Import the store
import Screen from './Screen' //Import the component file

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Screen/>
            </Provider>
        );
    }
}