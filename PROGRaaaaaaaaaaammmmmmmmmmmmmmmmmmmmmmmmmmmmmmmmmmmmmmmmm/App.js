import React, { Component } from 'react';
import Main from './Main';
import store from './src/Redux/Store';
import { Provider } from 'react-redux';

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    }
}

export default App;