import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    TextInput,
    Text,
    View,

    AsyncStorage,
    Alert,

    ToastAndroid,

} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '/home/hetali/Desktop/Progrmas/Sign_up/src/resources/style/signupstyle';

export default class ChangePassword extends Component{

    constructor(props) {
        super(props)
        this.state = {
            cpass: '',
            npass: '',
            repass: '',
            vpwd : '',
            vcpwd : ''
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
                npass: text,
                vpwd: '',
            })
        }
        else {
            this.setState({
                npass: '',
                vpwd: 'Enter valid Password '
            })
        }

        if(text === ''){
            this.setState({
                vpwd: '',
            })
        }
    }
    _checkConfirmPassword= (text) => {
        this.setState({
            vcpwd: '',
        })


        if(text === this.state.npass){
            this.setState({
                repass: text,
                vcpwd: '',
            })
        }
        else{
            this.setState({
                repass: '',
                vcpwd: 'Password do not match'
            })
        }
    }
    _saveData = async()=> {
        const {navigate}=this.props.navigation
            const {cpass,npass,repass} = this.state;
            this.setState({
                cpass: cpass,
                npass :npass,
                repass: repass
            })
            if (cpass != '' || npass != '' || repass != '') {
                let data = JSON.parse(await AsyncStorage.getItem('data'))
                await data.map((user) => {
                    if (user.pwd == cpass) {
                        user.pwd = npass
                        AsyncStorage.setItem('data', JSON.stringify(data))
                        AsyncStorage.setItem('LogIn', JSON.stringify(user))
                        console.log("Data..", user)
                        ToastAndroid.showWithGravity(
                            'Update SuccessFully',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        navigate('LogIn')
                    }
                })
            }
                else{
                    Alert.alert("CurrentPAssword Does NOT match.............")
                }

    }
    _clear=()=> {
        this.cpass.setNativeProps({text: ''});
        this.npass.setNativeProps({text: ''});
        this.repass.setNativeProps({text: ''});
    }
    render() {
        const {navigate}=this.props.navigation
        return (
            <KeyboardAwareScrollView style={styles.login_container}>
                <View style={{flex:1}}>
                    <TextInput
                        placeholder="CurrentPassword"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(cpass) => this.setState({cpass})}
                        onSubmitEditing={() => this.npass.focus()}
                        ref={component => this.cpass = component}


                    />
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        placeholder="NewPassword"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(npass) => this._checkPassword(npass)}
                        ref={component => this.vpwd = component}
                        ref={component => this.cpass = component}
                    />
                </View>
                <View>
                    <Text style = {{color :'red'}}>{this.state.vpwd}</Text>
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        placeholder="ConfirmPassword"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(repass) => this._checkConfirmPassword(repass)}
                        ref={component => this.repass = component}
                    />
                </View>
                <View>
                    <Text style = {{color :'red'}}>{this.state.vcpwd}</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',marginTop:10}}>
                    <View style={{flex:1}}>
                        <Button
                            title="Save"
                            onPress={this._saveData.bind(this)}
                            color="orange"
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Button
                            title="Clear"
                            onPress={this._clear.bind(this)}
                            color="orange"
                        />
                    </View>
                </View>

            </KeyboardAwareScrollView>

        );
    }

}

