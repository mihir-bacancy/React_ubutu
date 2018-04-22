import React,{ Component } from 'react';
import {View, Text, FlatList,TextInput, TouchableOpacity,Platform} from 'react-native';
import firebase from 'react-native-firebase';

const androidConfig = {
    clientId: "334407040873-e339omhgqdlvuc54tvs7hpm1hn9s73ud.apps.googleusercontent.com",
    appId: "1:334407040873:android:858fc365246ddbf7",
    apiKey:"AIzaSyDY5erNwUJ0VNXKS-0Ey3wvJbe_LTmJMys",
    databaseURL:"https://loginfirebase-2f407.firebaseio.com/",
    storageBucket:"loginfirebase-2f407.appspot.com",
    messagingSenderId:"334407040873",
    projectId:"loginfirebase-2f407",
    persistence : true,

};
/*const userApp = firebase.initializeApp(
    Platform.OS === androidConfig,
    'userApp'
);*/
const rootRef = firebase.database().ref();
const userRef = rootRef.child('Person');

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = ({
            Person  : [],
            firstname:'',
            lastname:'',
            email:'',
            pass:'',
            cpass:'',
            loading :false,
        });
    }
    componentDidMount() {
        userRef.on('value',(childSnapshot)=> {
            const Person = [];
            childSnapshot.forEach((doc)=>{
                Person.push({
                    key :doc.key,
                    firstname:doc.toJSON().firstname
                });
                this.setState({
                    Person :Person,
                    loading:false,
                });

            });
        });

    }
    _onPressAdd = () => {
        if(this.state.firstname.trim()===''){
            alert('person name is blank');
            return ;
        }
        userRef.push({
            firstname:this.state.firstname
        });
    }
    render(){
        return (
            <View style = {{ flex:1,marginTop:10}}>
                <View style = {{backgroundColor:'green',
                    flexDirection:'row',
                    justifyContent:'flex-end',
                    alignItems:'center',
                    height :64}}
                >
                    <TextInput style ={{
                        height :40,
                        width:200,
                        margin:10,
                        padding:10,
                        borderColor:'white',
                        borderWidth:1,
                        color:'white'
                    }}
                               keyboardType ='default'
                               placeholderTextColor='white'
                               placeholder="Enter FirstName"
                               onChangeText ={
                                   (text) => {
                                       this.setState({firstname: text})
                                   }
                               }
                               value={this.state.firstname}
                    />
                    <TouchableOpacity
                        style = {{marginRight:10}}
                        onPress={this._onPressAdd}
                    >
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.Person}
                    renderItem={({item,index})=>{
                        return (
                            <Text
                                style = {{
                                    fontSize:20,
                                    fontWeight:'bold',
                                    margin:10}}
                            >{item.firstname}
                            </Text>
                        )
                    }}/>
            </View>
        );
    }
}