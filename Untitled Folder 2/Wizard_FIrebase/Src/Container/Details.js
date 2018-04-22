import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';
import { View,ToastAndroid,AsyncStorage,Image } from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Button,
    Text
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AllStyles from "../Resources/Styles/AllStyles";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../Reducers/Actions'
import firebase from 'react-native-firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const androidConfig = {
    clientId: "1015642926632-cb148p8nmoe8vcj2v51oh5me62uovac2.apps.googleusercontent.com",
    appId: "1:1015642926632:android:220859b8d91a6361",
    apiKey:"AIzaSyBVNWyMWR7ktk3IQH5dMfqaIaqwOj5ISJw",
    databaseURL:"https://form-6a67a.firebaseio.com/",
    storageBucket:"form-6a67a.appspot.com",
    messagingSenderId:"1015642926632",
    projectId:"form-6a67a",
    persistence : true,
    authDomain: "form-6a67a.firebaseio.com",
};firebase.initializeApp(androidConfig);

const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


const _uploadImage = ( uri, mime = 'img/jpg') => {
    return new Promise((resolve, reject) =>{
        const uploadUri = uri;
        const sessionId = new Date().getTime();
        const imageRef = storage.ref('images').child(`${sessionId}.jpg`);
        console.log(uploadUri.uri);

        fs.readFile(uploadUri.uri, 'base64')
            .then(() => {
                return imageRef.put(uploadUri.uri, {contentType: mime})
            })
            .then(() => {
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            })
    })
};


const rootRef = firebase.database().ref();
const userRef = rootRef.child('UserDetails');

class Details extends Component {
    constructor(props){
        super(props);
        this.state ={
            user:null,
            UserDetails :[],
        };
    }

    _saveData = async (values) => {
        firebase.auth().createUserWithEmailAndPassword(values.email,values.pass)

             .then((loggedInUser) => {

                 _uploadImage(values.profile)
                     .then((url) => {
                         userRef.child(loggedInUser.uid).set({
                             firstname: values.firstname,
                             lastname: values.lastname,
                             address: values.address,
                             city: values.city,
                             age: values.age,
                             gender: values.gender,
                             profile: url,
                             email: values.email,
                             pass: values.pass,
                         });
                         ToastAndroid.showWithGravity(
                             'SignUp SuccessFully',
                             ToastAndroid.SHORT,
                             ToastAndroid.BOTTOM
                         );

                         firebase.auth().signInWithEmailAndPassword(values.email,values.pass)
                             .then(() => {
                                 AsyncStorage.setItem('userData', JSON.stringify({
                                     firstname: values.firstname,
                                     lastname: values.lastname,
                                     address: values.address,
                                     city: values.city,
                                     age: values.age,
                                     gender: values.gender,
                                     profile: url,
                                     email: values.email,
                                     pass: values.pass,
                                 }));
                                 Actions.HomeScreen();
                             })
                     });
                 const user = firebase.auth().currentUser;
                 user.sendEmailVerification().then(function() {
                     alert("Email Send on." + user.email );
                 }).catch(function(error) {
                     alert (error)
                 });

             })
            .catch((error) => {
                 alert(`register fail :${error}`);
                 let errorCode = error.code;
                 let errorMessage = error.message;
                 alert(errorMessage);
                 alert(errorCode);
             });
    };


    render(){
        const {firstname,lastname,address,city,gender,age,email,profile} = this.props.user;
        const {handleSubmit} = this.props;
        return(
            <Container>
                <Content>
                <View style = {{
                    marginTop :10,
                    height: 180,
                    width: 180,
                    borderRadius: 180,
                    borderColor: 'gray',
                    borderWidth: 3,
                    marginBottom : 15,
                    justifyContent:'center',
                    alignSelf:'center'}}>
                    <Image source={profile}

                           style={AllStyles.imageStyle}/>
                </View>
                    <Card>
                        <CardItem>
                            <View style = {{marginBottom:7,flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold'}}>First Name:</Text>
                                </View>
                                <View style = {{flex :0.7,borderWidth:2}}>
                                    <Text style={{color:'orange'}}>{firstname}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{marginBottom:7,flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold'}}>Last Name:</Text>
                                </View>
                                <View style = {{flex :0.7,borderWidth:2}}>
                                    <Text style={{color:'orange'}}>{lastname}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{marginBottom:7,flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold'}}>City:</Text>
                                </View>
                                <View style = {{flex :0.7,borderWidth:2}}>
                                    <Text style={{color:'orange'}}>{city}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{marginBottom:7,flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold'}}>Address:</Text>
                                </View>
                                <View style = {{flex :0.7,borderWidth:2}}>
                                    <Text style={{color:'orange'}}>{address}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{marginBottom:7,flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold'}}>Gender:</Text>
                                </View>
                                <View style = {{flex :0.7,borderWidth:2}}>
                                    <Text style={{color:'orange'}}>{gender}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{marginBottom:7,flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold'}}>Age:</Text>
                                </View>
                                <View style = {{flex :0.7,borderWidth:2}}>
                                    <Text style={{color:'orange'}}>{age}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{marginBottom:7,flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold'}}>Email:</Text>
                                </View>
                                <View style = {{flex :0.7,borderWidth:2}}>
                                    <Text style={{color:'orange'}}>{email}</Text>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                    <View style = {{width:90,height:50,paddingTop:5,
                        paddingLeft:250}}>
                        <Button
                            onPress={handleSubmit(this._saveData.bind(this))}
                            style = {{backgroundColor:'orange',
                                borderRadius:10,
                                borderWidth:3,
                                borderColor:'black',
                                width :150}}>
                            <Text style={AllStyles.nativeButtonText}>Submit</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        form: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'WizardForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(Details));