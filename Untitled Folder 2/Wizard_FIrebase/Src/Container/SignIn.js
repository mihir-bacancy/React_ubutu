import React, { Component } from 'react';
import {View,  TextInput, ToastAndroid, StyleSheet,AsyncStorage,TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Container,
    Content,
    Text,
    Card,
    CardItem,
} from 'native-base';

import {reduxForm} from "redux-form";
const data = firebase.database().ref('/UserDetails');


 class SignIn extends Component {
    constructor(){
        super();
        this.unsubsciber = null;
        this.state ={
            isAuthenticated: false,
            user:null,
            typedEmail :'',
            typedPassword:'',
        };
        console.disableYellowBox = true;
    }
    componentDidMount(){
        this.unsubsciber = firebase.auth().onAuthStateChanged((changeuser)=>{
            this.setState({user:changeuser})
        });
    }
    componentWillUnmount(){
        if(this.unsubsciber){
            this.unsubsciber();
        }
    }
    _email = (text) => {
        this.setState({
            typedEmail: text
        });

    };

    _onLogin () {
        firebase.auth().signInWithEmailAndPassword(this.state.typedEmail,this.state.typedPassword)
            .then((loggedInUser) => {
                data.once('value')
                    .then(snapshot => {
                        snapshot.forEach((doc)=>{
                            if(doc.toJSON().email === loggedInUser.email){
                                AsyncStorage.setItem('userData',JSON.stringify(doc.toJSON()));
                                ToastAndroid.showWithGravity(
                                    'LogIn SuccessFully',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM
                                );
                                Actions.HomeScreen();
                            }
                        })

                    });
            }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }


        });
    };
    _onRegister(){
        Actions.PersonalDetails()
    };

    render(){
        return(
            <Container style = {{marginTop:100}}>
                <Content>
                    <Card style={{elevation:10}}>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <TextInput
                                        style = {{
                                            height :40,
                                            width:320,
                                            borderColor:'gray',
                                            borderWidth:1,
                                            color:'black',
                                        }}
                                        keyboardType='email-address'
                                        placeholder='Enter Your Email'
                                        autoCapitalize='none'
                                        onChangeText={this._email}
                                />
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <TextInput
                                    style =
                                        {{
                                            height :40,
                                            width:320,
                                            borderColor:'gray',
                                            borderWidth:1,
                                            color:'black'
                                    }}
                                    keyboardType='default'
                                    placeholder='Enter Your Password'
                                    secureTextEntry ={true}
                                    onChangeText={
                                        (text)=>{this.setState({typedPassword:text})}
                                    }
                                />
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity
                                    style = {{
                                        borderRadius:4,
                                        backgroundColor:'red',
                                        fontSize:17,
                                        color:'white',
                                        width:320,
                                        height:40
                                    }}
                                    onPress={() => this._onLogin()}
                                >
                                    <View style={{flexDirection: 'row', alignSelf:'center',marginTop:8}}>
                                        <View style={{paddingRight: 4}}>
                                            <Icon name={'envelope'} size={18} style={{color: 'white'}}/>
                                        </View>
                                        <View>
                                            <Text style={{fontWeight: 'bold', color: 'white' }}>Login With Email</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity
                                    style = {{
                                        borderRadius:4,
                                        backgroundColor:'blue',
                                        fontSize:17,
                                        color:'white',
                                        width:320,
                                        height:40
                                    }}

                                    
                                >
                                    <View style={{flexDirection: 'row', alignSelf:'center',marginTop:8}}>
                                        <View style={{paddingRight: 4}}>
                                            <Icon name={'facebook-square'} size={20} style={{color:'white'}} />
                                        </View>
                                        <View>
                                            <Text style={{fontWeight: 'bold', color: 'white' }}>Login With FaceBook</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity
                                    style = {{
                                        borderRadius:4,
                                        backgroundColor:'gray',
                                        fontSize:17,
                                        color:'white',
                                        width:320,
                                        height:40
                                    }}
                                    onPress={() => this._onRegister()}
                                >
                                    <View style={{flexDirection: 'row', alignSelf:'center',marginTop:8}}>
                                        <View>
                                            <Text style={{fontWeight: 'bold', color: 'white' }}>Sign Up Here</Text>
                                        </View>
                                        <View style={{paddingRight: 4 , paddingLeft:4}}>
                                            <Icon name={'angle-double-right'} size={20} style={{color:'white'}} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
            /*
            <View style = {{
                flex:1,
                alignItems:'center',
                backgroundColor:'white',

            }}>
            <View style = {{marginTop:220}}>
                <TextInput
                    style = {{
                        height :40,
                        width:250,
                        margin:10,
                        padding:10,
                        borderColor:'gray',
                        borderWidth:1,
                        color:'black',
                    }}
                    keyboardType='email-address'
                    placeholder='Enter Your Email'
                    autoCapitalize='none'
                    onChangeText={this._email}
                />
                <TextInput style = {{height :40,
                    width:250,margin:10,
                    padding:10,
                    borderColor:'gray',
                    borderWidth:1,
                    color:'black'}}
                           keyboardType='default'
                           placeholder='Enter Your Password'
                           secureTextEntry ={true}
                           onChangeText={
                               (text)=>{
                                   this.setState({typedPassword:text});

                               }
                           }
                />
            </View>
                <View style = {{flex:1,flexDirection:'row',marginTop:10}}>
                    <View style ={{flex:0.4,marginLeft:79}}>
                    <Button style = {{padding:10,
                        borderRadius:4,
                        margin:10,
                        backgroundColor:'green',
                        fontSize:17,
                        color:'white'}}
                            onPress={() => this._onLogin()}
                            title = "Login">Login
                    </Button>
                    </View>
                    <View style={{flex:0.2}}>
                    </View>
                <View style={{flex:0.4,marginRight:79}}>
                    <Button style = {{padding:10,
                        borderRadius:4,
                        margin:10,
                        backgroundColor:'orange',
                        fontSize:17,
                        color:'white'}}
                            onPress={() => this._onRegister()}
                            title = "Register">Register
                    </Button>

                </View>
                </View>
            </View>*/
        );
    }
}

export default reduxForm({
    form: 'WizardForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignIn);