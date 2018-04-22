import React, { Component } from 'react';
import { View, Text, Button, TextInput, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component {
    constructor(props){
        super(props);
        this.unsubsciber = null;
        this.state ={
            isAuthenticated: false,
            typedEmail :'',
            typedPassword:'',
            user:null,
        };
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
    _onAnonymousLogin = () => {
        firebase.auth().signInAnonymously()
            .then(() => {
                alert("Login SuccesFully......");
                this.setState({
                    isAuthenticated:true,
                });

            })
            .catch((error) => {
                alert(`login failed.Error=${error}`);
            })
    };
    _onRegister = async () => {
        await firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail,this.state.typedPassword)
            .then((loggedInUser) => {
                this.setState({user : loggedInUser})
                alert(`register with user:${JSON.stringify(loggedInUser.toJSON())}`);

            }).catch((error) => {
                alert(`register fail :${error}`);
            });
    };
    _onLogin = async () => {
        await firebase.auth().signInWithEmailAndPassword(this.state.typedEmail,this.state.typedPassword)
            .then((loggedInUser) => {
                this.setState({user : loggedInUser})
                alert(`Login with user:${JSON.stringify(loggedInUser.toJSON())}`);

            }).catch((error) => {
                alert(`LOgin fail :${error}`);
            });
    };
    render(){
        return(
            <View style = {{
                flex:1,
                alignItems:'center',
                backgroundColor:'white'
            }}>
                <Text style = {{
                    fontSize:20,
                    fontWeight:'bold',
                    textAlign:'center',
                    margin:40}}>Login With Firebase</Text>
                <Button
                    style ={{padding:10,
                        borderRadius:4,
                        backgroundColor:'green',
                        fontSize:18}}
                    onPress={this._onAnonymousLogin}
                    title = "LOGIN">Login</Button>
                <Text style = {{margin:20,fontSize:15}}>
                    {this.state.isAuthenticated == true ? 'Done':''}
                </Text>
                <TextInput style = {{height :40,
                    width:200,margin:10,
                    padding:10,
                    borderColor:'gray',
                    borderWidth:1,
                    color:'black'}}
                           keyboardType='email-address'
                           placeholder='Enter Your Email'
                           autoCapitalize='none'
                           onChangeText={
                               (text)=>{
                                   this.setState({typedEmail:text});
                               }
                           }/>
                <TextInput style = {{height :40,
                    width:200,margin:10,
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
                <View style = {{flexDirection:'row'}}>
                    <Button style = {{padding:10,
                        borderRadius:4,
                        margin:10,
                        backgroundColor:'green',
                        fontSize:17,
                        color:'white'}}
                            onPress={this._onRegister}
                            title = "Register">Register
                    </Button>
                    <Button style = {{padding:10,
                        borderRadius:4,
                        margin:10,
                        backgroundColor:'green',
                        fontSize:17,
                        color:'white'}}
                            onPress={this._onLogin}
                            title = "Login">Login
                    </Button>
                </View>
            </View>
        );
    }
}