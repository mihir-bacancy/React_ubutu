import React from 'react';
import {Button, Text, Image, View, TextInput, TouchableOpacity, AsyncStorage, CheckBox,StyleSheet, Alert, ToastAndroid,Picker} from 'react-native';
import styles1 from '/home/test/Desktop/programs/demo/src/resources/style/ViewStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import styles from "../resources/style/signupstyle";
const selectCity = [
    {
        label: 'Ahmedabad',
        value: 'Ahmedabad',
    },
    {
        label: 'Surat',
        value: 'Surat',
    },
    {
        label: 'Porbandar',
        value: 'Porbandar',
    },
    {
        label: 'Vadodra',
        value: 'Vadodra',
    },
    {
        label: 'Pune',
        value: 'Pune',
    },
    {
        label: 'Maharastra',
        value: 'Maharastra',
    },
    {
        label: 'Rajastahan',
        value: 'Rajastahan',
    },

];
let x;
export default class HomeScreen extends React.Component {
    static navigationOptions = {
    }
    constructor(){
        super();
        this.state = {
            fname : '',
            lname : '',
            email : '',
            pwd :'',
            contact :'',
            city : '',
            fnameDisable : false,
            lnameDisable : false,
            emailDisable : false,
            contactDisable :false ,
            cityDisable :false,
            avatarSource: {},
            language: '',
            selectedItem: undefined,
            selected1: 'Ahmedabad',
            cphoto : '',
            cdraw : '',
            creading : ''
        }
    }
    _selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 180,
            maxHeight: 180,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    _onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
        console.log("value ",this.state.selected1)
    }
    componentWillMount = async () => {
        const { navigate } = this.props.navigation
        try {
            let source = {uri : '/home/test/Desktop/programs/demo/src/resources/Images/home.png'}
            x = JSON.parse(await AsyncStorage.getItem('LogIn'))
            //console.warn(x)
            console.log("sfhvaqhsjhqvf",x)
            if(x.photoUrl) {
                this.setState({
                    fname : x.fname,
                    lname : x.lname,
                    email : x.email,
                    avatarSource : x.photoUrl,
                    contact : x.contact,
                    city : x.city1,
                })
            }
            else {
                this.setState({
                    fname: x.fname,
                    lname: x.lname,
                    email: x.email,
                    contact: x.contact,
                    avatarSource: source,
                    city : x.city1,
                })
            }
        }catch(err){
            navigate('Login');
        }

    }
    _saveData = async()=> {
        if(this.state.fnameDisable) {
            const {fname, lname, email, contact} = this.state;
            this.setState({
                fname: fname,
                lname :lname,
                email: email,
                contact : contact,
            })
            if (fname != '' || lname != '' || email != '') {
                let data = JSON.parse(await AsyncStorage.getItem('data'))
                await data.map((user) => {
                    if(user.email == x.email) {
                        user.fname = fname;
                        user.lname = lname;
                        user.email = email;
                        user.photoUrl = this.state.avatarSource;
                        user.contact = this.state.contact;
                        user.city1 =this.state.selected1;
                        AsyncStorage.setItem('data', JSON.stringify(data))
                        AsyncStorage.setItem('LogIn', JSON.stringify(user))
                        console.log("Data..",user)
                        ToastAndroid.showWithGravity(
                            'Update SuccessFully',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        this.setState({
                            fnameDisable: false,
                            lnameDisable: false,
                            emailDisable: false,
                            contactDisable :false,

                        })
                    }
                })
            }
        }
        else{
            //this.state.isEnable = true;
            this.setState({
                fnameDisable: true,
                lnameDisable: true,
                emailDisable: true,
                contactDisable :true,

            })

        }
    }
    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation
        return (
            <KeyboardAwareScrollView>

                <View style={styles1.container_View}>
                    <View style={styles1.Circle}>
                        <TouchableOpacity onPress={this._selectPhotoTapped.bind(this)}>
                            <Image source={this.state.avatarSource} style={{height:175,width:175,borderRadius:180}}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles1.style_View}>
                        <View>
                            <Text style={styles1.baseText}>FirstName :</Text>
                            <TextInput
                                editable={false}
                                underlineColorAndroid='transparent'
                                editable={this.state.fnameDisable}
                                onChangeText={(fname) => this.setState({fname})}
                                style={styles1.text_Input} >
                                {this.state.fname}
                                </TextInput>
                        </View>
                    </View>
                    <View style = {styles1.style_View}>
                        <View>
                            <Text style={styles1.baseText}>LastName :</Text>
                            <TextInput editable={false}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(lname) => this.setState({lname})}
                                  editable={this.state.lnameDisable}
                                  style={styles1.text_Input} >
                                {this.state.lname}
                                </TextInput>
                        </View>
                    </View>
                    <View style = {styles1.style_View}>
                        <View>
                            <Text style={styles1.baseText}>Email :</Text>
                            <TextInput editable={false}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(email) => this.setState({email})}
                                  editable={this.state.emailDisable}
                                  style={styles1.text_Input} >
                                {this.state.email}
                                </TextInput>
                        </View>
                    </View>
                    <View style = {styles1.style_View}>
                        <View>
                            <Text style={styles1.baseText}>Contact No :</Text>
                            <TextInput editable={false}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(contact) => this.setState({contact})}
                                       editable={this.state.contactDisable}
                                       style={styles1.text_Input} >
                                {this.state.contact}
                            </TextInput>
                        </View>
                    </View>
                    <View style = {styles1.style_View}>
                    <View>
                        <Text style={styles1.baseText}>Select City :</Text>

                        <Picker
                            editable={false}
                            style = {{width :200}}
                            selectedValue={this.state.city?this.state.city:this.state.selected1}
                            onValueChange={this._onValueChange.bind(this)}
                            editable={this.state.cityDisable}>
                            {selectCity.map((i, index) => (
                                <Picker.Item key={index} label={i.label} value={i.value} />
                            ))}
                        </Picker>

                    </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            //value={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })}
                        />
                        <Text style={{marginTop: 5}}>Hobbies </Text>
                    </View>
                    <View style={{ flexDirection: 'column',marginLeft:25}}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                checked={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.cphoto})}
                            />
                            <Text style={{marginTop: 5}}>Photography </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                //value={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.cdraw })}
                            />
                            <Text style={{marginTop: 5}}>Drawing </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                //value={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.creading })}
                            />
                            <Text style={{marginTop: 5}}>Reading </Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row',marginTop:20}}>
                        <View style={{flex:1}}>
                            <Button
                                title={this.state.fnameDisable?'Save':'Edit Profile'}
                                onPress={this._saveData.bind()}
                                color="green"
                            />
                        </View>
                    </View>
                    <View style={styles.link1}>
                        <View style={{marginTop:20}}>
                            <Text style = {{color : 'blue'}}
                                  onPress={() => navigate('ChangePassword')}>
                                Change Password ?
                            </Text>
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>
        );
    }
}
