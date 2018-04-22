import React from 'react';
import {StyleSheet}from 'react-native';
import { TabNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen';
import ViewProfile from './ViewProfile';
import Academics from './Academics';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabNAv = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions : {
            title: 'HOME',
            headerLeft : null,

            tabBarIcon: <Icon name="home" size={30} color='darkblue' />
        }
    },
    ViewProfile: {
        screen:ViewProfile,
        navigationOptions : {
            tabBarLabel: 'Profile',
            title : 'PROFILE',
            tabBarIcon: <Icon name="user" size={30} color='darkblue' />
        }},
    Academics: {
        screen:Academics,
        navigationOptions : {
            tabBarLabel: 'Academics',
            title : 'ACADEMICS',
            tabBarIcon: <Icon name="graduation-cap" size={30} color='darkblue' />
        }}
},{
    tabBarPosition : 'bottom',
    tabBarOptions :{
        showIcon: true,
        style: {
            backgroundColor: 'darkgray',
            borderTopWidth: 1,
            borderTopColor: 'white'
        },
    }
});
const styles = StyleSheet.create({
    icon :{
        width : 26,
        height: 26,
    },
    head: {
        backgroundColor:'darkgray',
        color: 'white',
        fontFamily: "Lato-Regular",
    }
})
export default TabNAv

