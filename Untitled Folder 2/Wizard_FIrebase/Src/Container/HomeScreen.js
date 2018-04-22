import React, { Component } from 'react';
import {
    View,
    ToastAndroid,
    AsyncStorage,
    Image,
    Button,
    StyleSheet,
    TextInput
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AllStyles from "../Resources/Styles/AllStyles";
import firebase from 'react-native-firebase';

const rootRef = firebase.database().ref();
const userRef = rootRef.child('UserDetails');

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state ={
            firstname : '',
            lastname :'',
            city : '',
            address:'',
            gender :'',
            age:'',
            profile :'',
            email:'',
        };
    }

    /*_editProfile = async () => {
        this.setState({isEnable: true})
        if (this.state.isEnable) {
            const {firstname, lastname, city, address} = this.state;
            this.setState({
                firstname: firstname,
                lastname: lastname,
                city: city,
                address: address,
            });
            if (firstname != '' || lastname != '' || city != '' || address != '') {
                const user = firebase.auth().currentUser;
                const {firstname, lastname, city, address, gender, age, email} = this.state;
                userRef.child(user.uid).set({
                    firstname: firstname,
                    lastname: lastname,
                    address: address,
                    city: city,
                    age: age,
                    gender: gender,
                    email: email,

                });
                ToastAndroid.showWithGravity(
                    'Update SuccessFully',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
                this.setState({
                    isEnable: false,
                })
            }
            else {
                this.setState({
                    isEnable: true,
                })
            }
        }
    };*/

    _logOut = async () => {
        await firebase.auth().signOut()
            .then(() => {
                ToastAndroid.showWithGravity(
                    'LogOut SuccessFully',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
                AsyncStorage.removeItem('userData')
                Actions.SignIn()

            })
            .catch((err) => {
                alert(err)
            })
    };

    async componentWillMount(){
        if(
            await AsyncStorage.getItem('userData') !== '' &&
            await AsyncStorage.getItem('userData') !==  null &&
            await AsyncStorage.getItem('userData') !== undefined
        ){
            let userDetails = JSON.parse(await AsyncStorage.getItem('userData'));
            this.setState({
                firstname:userDetails.firstname,
                lastname:userDetails.lastname,
                city:userDetails.city,
                address:userDetails.address,
                gender:userDetails.gender,
                age:userDetails.age,
                profile:{uri : userDetails.profile},
                email:userDetails.email
            })
         }
        else{
            Actions.SignIn();
        }
    }
    render(){
        const { firstname,lastname,city,address,gender,age,profile,email} = this.state;

        return(
            <Container>
                <Content>
                    <View style = {Styles.view_image}>
                        <Image source={profile}
                               style={AllStyles.imageStyle}/>
                    </View>
                    <Card>
                         <CardItem>
                                <View style = {{flexDirection:'row'}}>
                                    <View style = {{flex :0.3}}>
                                        <Text style={{fontWeight:'bold',marginTop:15}}>First Name:</Text>
                                    </View>
                                    <View style = {{flex :0.7}}>
                                        <TextInput
                                            editable={false}
                                            editable={this.state.isEnable}
                                            onChangeText={(firstname) => this.setState({firstname})}
                                        >{firstname}</TextInput>
                                    </View>
                                </View>
                            </CardItem>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold',marginTop:15}}>Last Name:</Text>
                                </View>
                                <View style = {{flex :0.7}}>
                                    <TextInput
                                        editable={false}
                                        editable={this.state.isEnable}
                                        onChangeText={(lastname) => this.setState({lastname})}
                                    >{lastname}</TextInput>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold',marginTop:15}}>City:</Text>
                                </View>
                                <View style = {{flex :0.7}}>
                                    <TextInput
                                        editable={false}
                                        editable={this.state.isEnable}
                                        onChangeText={(city) => this.setState({city})}
                                    >{city}</TextInput>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold',marginTop:15}}>Address:</Text>
                                </View>
                                <View style = {{flex :0.7}}>
                                    <TextInput
                                        editable={false}
                                        editable={this.state.isEnable}
                                        onChangeText={(address) => this.setState({address})}
                                    >{address}</TextInput>

                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold',marginTop:15}}>Gender:</Text>
                                </View>
                                <View style = {{flex :0.7}}>
                                    <TextInput
                                        editable={false}
                                    >{gender}</TextInput>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold',marginTop:15}}>Age:</Text>
                                </View>
                                <View style = {{flex :0.7}}>
                                    <TextInput
                                        editable={false}
                                    >{age}</TextInput>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style = {{flexDirection:'row'}}>
                                <View style = {{flex :0.3}}>
                                    <Text style={{fontWeight:'bold',marginTop:15}}>Email:</Text>
                                </View>
                                <View style = {{flex :0.7}}>
                                    <TextInput
                                        editable={false}
                                    >{email}</TextInput>
                                </View>
                            </View>
                        </CardItem>

                    </Card>
                    <View style = {{
                        paddingTop:5,
                        flex:1, flexDirection:'row'}}>
                        <View  style = {Styles.view_btn}>
                            <Button
                                onPress={this._logOut}
                                title = "LogOut"
                                style = {{padding:10,backgroundColor:'orange',}}

                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default HomeScreen

const Styles = StyleSheet.create({
    view_btn :{
        flex:0.5,
        borderRadius:5,
        borderWidth:2,
        borderColor:'gray',


    },
    view_image :{
        marginTop :10,
        height: 180,
        width: 180,
        borderRadius: 180,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom : 15,
        justifyContent:'center',
        alignSelf:'center'
    },
    view_text : {
        marginBottom:7,
        flexDirection:'row'
    }
})