import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import CourseInfo from './pages/CourseInfo';
import ViewingRoom from './pages/ViewingRoom';
import Info from './pages/Info';
import TubeScreen from './pages/TubeScreen';
import UploadTutorVideo from './pages/UploadTutorVideo';

export default () => (
    <Router>
        <Scene key="root">
            <Scene  type="replace" key="Welcome" component={Welcome} hideNavBar={true} initial />
            <Scene  type="replace" key="Login" component={Login} hideNavBar={true}/>
            <Scene  type="replace" key="ForgotPassword" component={ForgotPassword} hideNavBar={true}/>
            <Scene  type="replace" key="Register" component={Register} hideNavBar={true}/>
            <Scene  type="replace" key="UserProfile" component={UserProfile} hideNavBar={true}/>
            <Scene  type="replace" key="EditProfile" component={EditProfile} hideNavBar={true}/>
            <Scene  type="replace" key="Home" component={Home} hideNavBar={true}/>
            <Scene  type="replace" key="MarketPlace" component={MarketPlace} hideNavBar={true}/>
            <Scene  type="replace" key="CourseInfo" component={CourseInfo} hideNavBar={true}/>
            <Scene  type="replace" key="ViewingRoom" component={ViewingRoom} hideNavBar={true}/>
            <Scene  type="replace" key="Info" component={Info} hideNavBar={true}/>
            <Scene  type="replace" key="TubeScreen" component={TubeScreen} hideNavBar={true}/>
            <Scene  type="replace" key="UploadTutorVideo" component={UploadTutorVideo} hideNavBar={true}/>
        </Scene>
    </Router>
);
