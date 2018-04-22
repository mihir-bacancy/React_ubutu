import {Router,Scene,Stack}  from 'react-native-router-flux'
import React,{Component} from 'react';
import PersonalDetails from './Container/PersonalDetails';
import ProfilePic from './Container/ProfilePic';
import Login from './Container/Login';
import Details from './Container/Details';

const router = () => (
    <Router>
        <Stack key="root">
            <Scene key="PersonalDetails" component={PersonalDetails} title="Signup" intial={true} navigationBarStyle={{ backgroundColor: 'orange',borderColor:'black'}}/>
            <Scene key="ProfilePic" component={ProfilePic} title ="Image"navigationBarStyle={{ backgroundColor: 'orange'}}/>
            <Scene key="Login" component={Login} title="Login" navigationBarStyle={{ backgroundColor: 'orange'}}/>
            <Scene key="Details" component={Details} title = "Details" navigationBarStyle={{ backgroundColor: 'orange'}}/>
        </Stack>
    </Router>
);

export default router;
