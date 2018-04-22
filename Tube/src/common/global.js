/**
 * @providesModule global
 */

import { AsyncStorage, Dimensions } from 'react-native';

import { FBLoginManager } from 'react-native-facebook-login';
import nopreview from '../assets/images/nopreview.png';
export const API_BASE_URL = 'http://13.127.185.246:3000/api';
//export const API_BASE_URL = 'http://52.15.90.90:3000/api';

export const USER_STORAGE_KEY = '2TUBE_MEMBER_DATA';

export const storeUser = user => {
    AsyncStorage.setItem(USER_STORAGE_KEY,JSON.stringify(user));
}

export const getUser = async () => JSON.parse(await AsyncStorage.getItem(USER_STORAGE_KEY));

export const SCREEN_TITLE = {
    'Welcome': 'Welcome',
    'Login': 'Login',
    'ForgotPassword': 'Forgot Password',
    'Register': 'Register',
    'UserProfile': 'User Profile',
    'EditProfile': 'Edit Profile',
    'Home': 'Home',
    'MarketPlace': 'Market Place',
    'CourseInfo': 'Course Details',
    'ViewingRoom': 'Viewing Room',
    'Info': 'Info',
    'TubeScreen':'Tube Screen',
    'UploadTutorVideo': 'Upload Tutor Video'
};

export const userLogout = async (callback = false) => {
    await  AsyncStorage.removeItem(USER_STORAGE_KEY);
    await FBLoginManager.logout((err, data) => {});
    setTimeout(async () => {
        setTimeout(() => {
            (callback) ? callback(true) : true;
        },500);
    },500);
}

export const size = Dimensions.get('window');

export const getAuthToken = async (forAPICall = false) => {
    let AuthType = ((forAPICall) ? 'Bearer ':'');
    return  AuthType + JSON.parse(await AsyncStorage.getItem(USER_STORAGE_KEY)).token;
}

export const queryString = (obj) => {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export const formatAMPM = (date,isAMPM = false) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return (hours + ':' + minutes) + ((isAMPM) ? ampm:'');
}

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NOPREVIEW = nopreview;