import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNAv from './container/TabNAv';
import SignUp from './container/SignUp';
import History from './container/History';
import Login from './container/Login';
import EditUserProfile from './container/EditUserProfile';
import ChangePassword from './container/ChangePassword';
const App = StackNavigator({
    TabNAv: { screen:TabNAv,
        navigationOptions : {
            headerLeft : null
             }
        },
    SignUp: { screen: SignUp,
        navigationOptions : {
            title: 'SignUp',
            headerLeft : null,
            


        }},
    History:{screen :History,
        navigationOptions : {
            title: 'History',
            headerLeft : null
        }},
    Login :{screen:Login,
        navigationOptions : {
            title: 'LogIn',
            headerLeft : null
        }},
    EditUserProfile : {screen:EditUserProfile,
        navigationOptions : {
            title: 'EditProfile',
            headerLeft : null
        }},
    ChangePassword : {screen:ChangePassword,
        navigationOptions : {
            title: 'ChangePassword',
            headerLeft : null
        }},
});
export default App

