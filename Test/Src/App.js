import React,{Component} from 'react';
import {Provider} from 'react-redux';
import store from './Redux/Store';
//import SignUp from './Components/SignUp';
import Screen from './Screen'

export default class App extends Component{
  render (){
    return(
        <Provider store = {store}>
          <Screen/>
        </Provider>
    );
  }

}