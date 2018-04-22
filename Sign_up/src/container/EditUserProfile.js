import React, {Component} from 'react';
import {
    Button,
    TextInput,
    View,
    AsyncStorage, Alert, ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '/home/hetali/Desktop/Progrmas/Sign_up/src/resources/style/signupstyle';
let name='';
let x;

export default class EditUserProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            fname: '',
            lname: '',
            email: ''
        }
    }
    componentWillMount(){
        const { params } = this.props.navigation.state;
        name=params.editdata;

        x = {
            fname: name.fname,
            lname :name.lname,
            email: name.email,
        }
        this.setState({
            fname: name.fname,
            lname :name.lname,
            email: name.email,
        })
    }

    _saveData = async () => {
        const {navigate}=this.props.navigation;
        const {fname, lname, email} = this.state;
        let data = JSON.parse(await AsyncStorage.getItem('data'))
        await data.map((user) => {
            if(user.email == x.email){
                user.fname=fname;
                user.lname=lname;
                user.email=email;
                AsyncStorage.setItem('data', JSON.stringify(data))
                ToastAndroid.showWithGravity(
                    'Update SuccessFully',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
                navigate('History')
                }
            })
    }
    render() {
        const {navigate}=this.props.navigation;

        return (
            <KeyboardAwareScrollView style={styles.signup_container}>

                <View style={{flex:1}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(fname) => this.setState({fname})}
                        onSubmitEditing={() => this.ln.focus()}
                        ref={component => this.fn = component}
                    >{name.fname}</TextInput>
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(lname) => this.setState({lname})}
                        onSubmitEditing={() => this.em.focus()}
                        ref={component => this.ln = component}
                    >{name.lname}</TextInput>
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        onChangeText={(email) => this.setState({email})}
                        style={styles.input}
                        onSubmitEditing={() => this.pw.focus()}
                        ref={component => this.em = component}
                    >{name.email}</TextInput>
                </View>
                <View style={{flex:1,flexDirection:'row',marginTop:20}}>
                    <View style={{flex:1}}>
                        <Button
                            title="save"
                            onPress={this._saveData.bind(name)}
                            color="orange"
                        />
                    </View>
                </View>
                <View style={{flex:6}}>

                </View>

            </KeyboardAwareScrollView>

        );
    }

}
