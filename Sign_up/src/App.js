import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNAv from './container/TabNAv';
import SignUp from './container/SignUp';
import History from './container/History';
import Login from './container/Login';
import EditUserProfile from './container/EditUserProfile';
import ChangePassword from './container/ChangePassword';
import LIstAcademic from './container/LIstAcademic';
import EditAcademicList from './container/EditAcademicList';

const App = StackNavigator({
    TabNAv: { screen:TabNAv,
        navigationOptions : {
            headerLeft : null
             }
        },
    SignUp: { screen: SignUp,
        navigationOptions : {
            title: 'SIGN UP',
            headerLeft : null

        }},
    History:{screen :History,
        navigationOptions : {
            title: 'HISTORY'
        }},
    Login :{screen:Login,
        navigationOptions : {
            title: 'LOGIN',
            headerLeft : null
        }},
    EditUserProfile : {screen:EditUserProfile,
        navigationOptions : {
            title: 'EDIT PROFILE',
            headerLeft : null
        }},
    ChangePassword : {screen:ChangePassword,
        navigationOptions : {
            title: 'CHANGE PASSWORD',
            headerLeft : null
        }},
    LIstAcademic : {screen:LIstAcademic,
        navigationOptions : {
            title: 'ACADEMIC DETAILS'
        }},
    EditAcademicList :{screen:EditAcademicList,
    navigationOptions:{
        title :'EDIT ACADEMIC LIST'
    }}
});
export default App

