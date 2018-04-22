import {Router,Scene,Stack, ActionConst}  from 'react-native-router-flux'
import React,{Component} from 'react';
import PersonalDetails from './Container/PersonalDetails';
import ProfilePic from './Container/ProfilePic';
import Login from './Container/Login';
import Details from './Container/Details';
import SignIn from './Container/SignIn';
import HomeScreen from './Container/HomeScreen';
import FacebookLogin from './Container/FacebookLogin'

const router = () => (
    <Router>
        <Stack key="root">
            <Scene
                key="FacebookLogin"
                component={FacebookLogin}
                title = "FacebookLogin"
                navigationBarStyle={{ backgroundColor: 'orange'}}
                left = {()=> null}
                type={ActionConst.RESET}
            />
            <Scene
                key="SignIn"
                component={SignIn}
                title = "SignIn"
                navigationBarStyle={{ backgroundColor: 'orange'}}
                left = {()=> null}
                type={ActionConst.RESET}
            />
            <Scene
                key="HomeScreen"
                component={HomeScreen}
                title = "HomeScreen"
                navigationBarStyle={{ backgroundColor: 'orange'}}
                left = {()=> null}
                type={ActionConst.RESET}
            />
            <Scene
                key="PersonalDetails"
                component={PersonalDetails}
                title="Signup"
                navigationBarStyle = {{ backgroundColor: 'orange',borderColor:'black'}}
                left = {()=> null}
                type={ActionConst.RESET}
            />
            <Scene
                key="ProfilePic"
                component={ProfilePic}
                title ="Image"
                navigationBarStyle={{ backgroundColor: 'orange'}}
                left = {()=> null}
                type={ActionConst.RESET}
            />
            <Scene
                key="Login"
                component={Login}
                title="Login"
                navigationBarStyle={{ backgroundColor: 'orange'}}
                left = {()=> null}
                type={ActionConst.RESET}
            />
            <Scene
                key="Details"
                component={Details}
                title = "Details"
                navigationBarStyle={{ backgroundColor: 'orange'}}
                left = {()=> null}
                type={ActionConst.RESET}
            />
        </Stack>
    </Router>
);
export default router;
