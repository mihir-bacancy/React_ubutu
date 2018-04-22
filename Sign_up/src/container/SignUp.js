import React, { Component } from 'react';
import {
    Button,
    TextInput,
    Text,
    View,
    AsyncStorage,
    Alert, ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesText from '../resources/style/textStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '/home/hetali/Desktop/Progrmas/Sign_up/src/resources/style/signupstyle';
let userDetails = [];
let validUser = true;
export default class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            fname:'',
            lname:'',
            email:'',
            pwd:'',
            cpwd:'',
            cfname : '',
            clname :'',
            cemail :'',
            vpwd : '',
            ccpwd :'',
            data:'',


        }
    }
   _checkFname = (text) => {

        this.setState({
            cfname: '',
        })

        const FL = /^[a-zA-Z]+$/
        if (FL.test(text)) {
            this.setState({
                fname: text,
            })
        }
        else {
            this.setState({
                fname: '',
                cfname: 'Enter only alphabets'
            })
        }

        if(text === ''){
            this.setState({
                cfname: '',
            })
        }
    }

    _checkLname = (text) => {
        this.setState({
            clname: '',
        })

        const FL = /^[a-zA-Z]+$/
        if (FL.test(text)) {
            this.setState({
                lname: text,
            })
        }
        else {
            this.setState({
                lname: '',
                clname: 'Enter only alphabets'
            })
        }

        if(text === ''){
            this.setState({
                clname: '',
            })
        }
    }

    _checkEmail = (text    ) => {
        this.setState({
            cemail: '',
        })

        const FL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/
        if (FL.test(text)) {
            this.setState({
                email: text,
            })
        }
        else {
            this.setState({
                email: '',
                cemail: 'Enter valid Email'
            })
        }

        if(text === ''){
            this.setState({
                cemail: '',
            })
        }
    }

    _checkPassword = (text) => {
        this.setState({
            vpwd: '',
        })

        //const FL = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[a-zA-Z0-9]{8,}$/
       const FL =/^[a-zA-Z0-9!@#$%^&*]{8,16}$/
        if (FL.test(text)) {
            this.setState({
                pwd: text,
                vpwd: '',
            })
        }
        else {
            this.setState({
                pwd: '',
                vpwd: 'Enter valid Password '
            })
        }

        if(text === ''){
            this.setState({
                cpwd: '',
            })
        }
    }

    _checkConfirmPassword= (text) => {
        this.setState({
            ccpwd: '',
        })


        if(text === this.state.pwd){
            this.setState({
                cpwd: text,
                ccpwd: '',
            })
        }
        else{
            this.setState({
                cpwd: '',
                ccpwd: 'Passwords do not match'
            })
        }
    }
    _saveData = async () => {
        try {
            const {fname, lname, email, pwd,cpwd} = this.state;
            let user = {
                fname: fname,
                lname: lname,
                email: email,
                pwd: pwd,
            }
            if (fname == '' || lname == '' || email == '' || pwd == '' || cpwd =='') {
                Alert.alert('Enter all values');
                this._clear()
            }
            else {
                userDetails = JSON.parse(await AsyncStorage.getItem('data'));
                let x = await userDetails.map((name) => {
                    if (email === name.email) {
                        validUser = false
                        Alert.alert('EmailId already exists')
                    }
                })
                if (validUser === true) {
                    userDetails.push(user)
                    AsyncStorage.setItem('data', JSON.stringify(userDetails))
                    ToastAndroid.showWithGravity(
                        'SignUp SuccessFully',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                    this._clear()
                                    }
            }
        }
        catch(err){
            const {fname, lname, email, pwd} = this.state;
            let usr = {
                fname: fname,
                lname: lname,
                email: email,
                pwd: pwd,
            }
            userDetails = []
            userDetails.push(usr)
            AsyncStorage.setItem('data', JSON.stringify(userDetails))
            ToastAndroid.showWithGravity(
                'SignUp SuccessFully',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            this._clear()
        }
    }
    _clear=()=> {
        this.fn.setNativeProps({text: ''});
        this.ln.setNativeProps({text: ''});
        this.em.setNativeProps({text: ''});
        this.pw.setNativeProps({text: ''});
        this.cpw.setNativeProps({text: ''});
    }
    render() {
        const {navigate}=this.props.navigation
        return (
            <KeyboardAwareScrollView style={styles.signup_container}>
                    <View style={{flex:1}}>
                        <TextInput
                            placeholder="First Name"
                            style={styles.input}
                            onChangeText={(fname) => this._checkFname(fname)}
                            onSubmitEditing={() => this.ln.focus()}
                            ref={component => this.fn = component}
                        />
                    </View>
                    <View>
                        <Text style = {{color :'red'}}>{this.state.cfname}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <TextInput
                            placeholder="Last Name"
                            style={styles.input}
                            onChangeText={(lname) => this._checkLname(lname)}
                            onSubmitEditing={() => this.em.focus()}
                            ref={component => this.ln = component}
                        />
                    </View>
                    <View>
                        <Text style = {{color :'red'}}>{this.state.clname}</Text>
                    </View>

                <View style={{flex:1}}>

                    <TextInput
                        placeholder="Email"
                        onChangeText={(email) => this._checkEmail(email)}
                        style={styles.input}
                        onSubmitEditing={() => this.pw.focus()}
                        ref={component => this.em = component}
                    />
                </View>
                <View>
                    <Text style = {{color :'red'}}>{this.state.cemail}</Text>
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(pwd) => this._checkPassword(pwd)}
                        style={styles.input}
                        onSubmitEditing={() => this.cpw.focus()}
                        ref={component => this.pw = component}
                    />
                </View>
                <View>
                    <Text style = {{color :'red'}}>{this.state.vpwd}</Text>
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="ConfirmPassword"
                        onChangeText={(cpwd) => this._checkConfirmPassword(cpwd)}
                        style={styles.input}

                        ref={component => this.cpw = component}
                    />
                </View>
                <View>
                    <Text style = {{color :'red'}}>{this.state.ccpwd}</Text>
                </View>

                <View style={{flex:1,flexDirection:'row',marginTop:10}}>
                    <View style={{flex:1}}>
                        <Button
                            title="save"
                            onPress={this._saveData.bind(this)}
                            color="orange"
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Button
                            title="show"
                            onPress={() => navigate('History', this.state.key)}
                            color="orange"
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Button
                            title="Clear"
                            onPress={this._clear}
                            color="orange"
                        />
                    </View>
                </View>
                <View style={styles.link1}>
                    <View style={{marginTop:20,flexDirection:'row'}}>
                        <Text style = {stylesText.hyperlinkText}
                            onPress={() => navigate('Login')}>
                            LogIn Here
                        </Text>
                        <View style={{paddingRight: 4,paddingLeft:6,paddingTop:3}}>
                            <Icon name={'sign-in'} size={20}/>
                        </View>
                    </View>
                </View>
                <View style={{flex:6}}>

                </View>

            </KeyboardAwareScrollView>

        );
    }

}

