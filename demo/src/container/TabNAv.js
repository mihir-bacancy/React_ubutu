import React from 'react';
import {StyleSheet}from 'react-native';
import { TabNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen';
import ViewProfile from './ViewProfile';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabNAv = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions : {
            title: 'Home',
            headerLeft : null,
            tabBarIcon: <Icon name="home" size={30} color='white' />
        }
    },
    ViewProfile: {
        screen:ViewProfile,
        navigationOptions : {
            tabBarLabel: 'Profile',
            title : 'Profile',
            tabBarIcon: <Icon name="user" size={30} color='white' />
        }}
},{
    tabBarPosition : 'bottom',
    tabBarOptions :{
        showIcon: true,

    }
});
const styles = StyleSheet.create({
    icon :{
        width : 26,
        height: 26,
    }
})
export default TabNAv

