import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './reducers/store';
import Screen from './Screen';

class App extends  Component{
    render(){
        return(
            <Provider store={store}>
                <Screen/>
            </Provider>
        )
    }
}
export default App