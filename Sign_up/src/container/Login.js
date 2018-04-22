import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    Linking,
    ToastAndroid,
    Image
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '/home/hetali/Desktop/Progrmas/Sign_up/src/resources/style/signupstyle';
import stylesText from '../resources/style/textStyle';
export default class Login extends Component{
    state = {
            email: '',
            pwd : '',
            validUser : false,
    }
    _handleEmail = (text) => {
            this.setState({ email: text })
    }
    _handlePassword = (text) => {
        this.setState({pwd: text})
    }
    _saveData = async () => {
        try {
            const { email, pwd} = this.state;
            let user = {
                email: email,
                pwd: pwd,
            }
            if (email == '' || pwd == '') {
                Alert.alert('Enter all values');
            }
            else {
                const {navigate}=this.props.navigation
                userDetails = JSON.parse(await AsyncStorage.getItem('data'));
                let x = await userDetails.map((name) => {
                    if (email == name.email && pwd == name.pwd) {
                        AsyncStorage.setItem('LogIn',JSON.stringify(name))
                        this.state.validUser = true;
                        ToastAndroid.showWithGravity(
                            'LogIn SuccessFully',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        navigate('Home')
                    }
                    else{
                        this.state.validUser = false;
                    }
                })
            }
            if (!this.state.validUser) {
                Alert.alert('Enter Valid Values...')
            }
        }
        catch(err){
            Alert.alert(err)
        }
    }
    _clear=()=> {
        this.em.setNativeProps({text: ''});
        this.pw.setNativeProps({text: ''});
    }
    render() {
        const {navigate}=this.props.navigation
        return (
            <KeyboardAwareScrollView style={styles.login_container}>
                <View style={styles.image_class}>
                   <Image
                        source={require('/home/hetali/Desktop/Progrmas/Sign_up/src/resources/Images/Logo.png')}

                    />
                </View>
                <View style={{flex:1,marginTop:10}}>
                    <TextInput
                        placeholder="UserName"
                        onChangeText = {this._handleEmail}
                        style={styles.input}
                        ref={component => this.em = component}
                        onSubmitEditing={() => this.pw.focus()}

                    />
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={this._handlePassword}
                        style={styles.input}
                        ref={component => this.pw = component}
                    />
                </View>


                <View style={{flex:1,flexDirection:'row',marginTop:10}}>
                    <View style={{flex:0.4}}>
                        <Button
                            title="LogIn"
                            onPress={this._saveData.bind(this)}
                            color="orange"

                        />
                    </View>
                    <View style={{flex:0.2}}></View>
                    <View style={{flex:0.4}}>
                        <Button
                            title="Clear"
                            onPress={this._clear.bind(this)}
                            color="orange"

                        />
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'row',marginTop:20}}>
                    <View style={{flex:1}}>
                        <Text style = {stylesText.hyperlinkText}
                              onPress={() => navigate('SignUp')}>
                              FORGOT PASSWORD ?
                        </Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style = {stylesText.hyperlinkText}
                              onPress={() => navigate('SignUp')}>
                            CREATE NEW ACCOUNT ?
                        </Text>

                    </View>
                </View>
                <View style={styles.link1}>
                    <View>
                        </View>
                </View>

            </KeyboardAwareScrollView>

        );
    }

}

