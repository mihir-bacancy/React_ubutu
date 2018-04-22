import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import UserDetails from './src/Containers/UserDetails';
import ProfilePicture from './src/Containers/ProfilePicture';
import LoginCredentials from './src/Containers/LoginCredentials';
import ReviewData from './src/Containers/ReviewData';
import styles from './src/Resources/Styles/styles'

const Main = () => {
    return (
        <Router
            navigationBarStyle={styles.header}
            titleStyle={styles.navTitle}
        >
            <Scene key='root'>
                <Scene
                    key="UserDetails"
                    component={UserDetails}
                    title="User Details"
                    initial
                />
                <Scene
                    key="ProfilePicture"
                    component={ProfilePicture}
                    title="Profile Picture"
                />
                <Scene
                    key="LoginCredentials"
                    component={LoginCredentials}
                    title="Login Credentials"
                />
                <Scene
                    key="ReviewData"
                    component={ReviewData}
                    title="Review Data"
                />
            </Scene>
        </Router>
    );
};

export default Main