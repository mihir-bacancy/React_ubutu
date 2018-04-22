import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity,AsyncStorage,Button,Alert} from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
'using strict'

let arr2 = []
let arr = []
export default class History  extends Component{
    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
    }
    constructor(props){
        super(props)
        this.state={
            array2 : []
        }
    }
    /*componentWillMount = async() => {
        //await AsyncStorage.clear();
        Alert.alert("dhfuhdu")
        let userDetails = JSON.parse(await AsyncStorage.getItem('user'))
        Alert.alert("fdvrav",userDetails)
        console.log("my data",userDetails)
        this.setState({
            tblData: userDetails
        })
    }
/*
AsyncStorage.multiGet(keys, (err, stores) => {
    stores.map((result, i, store) => {
      // get at each store's key/value so you can work with it
      let key = store[i][0];
      let value = store[i][1];
    });
  });
*/
 /*componentWillMount = async() => {
        try {
            Alert.alert("in try")
            let user1 = await AsyncStorage.getItem('user');
            console.log("user1",user1);
            parsed = JSON.parse(user1);
            console.log("parsed",parsed);
            console.log("parsed.fname",parsed[0])

            let arr = [
                parsed[0][0],
                parsed[0][1],
                parsed[0][2],
                parsed[0][3]
            ]

            console.log("arr",arr)
            array1.push(arr);
            console.log("array1",array1)
            this.setState({
                tblData: array1
            })


        }catch(error){
            alert(error);
        }
    }
        /*   async _loadInitialState() {
               try {
                   let user = await AsyncStorage.getItem('key');
                    parsed = JSON.parse(user);
                   if (user !== null ){
                       alert("FirstName=>"+ parsed.fname);
                       alert("Email=>"+parsed.email);
                     let  arr= [
                           parsed.fname,
                           parsed.lname,
                           parsed.email
                       ]
                       array1.push(arr);
                     alert(array1);
                   } else {
                       alert("RN")
                   }
               } catch (error) {
                   alert(error);
               }
           }
       */

        /* async _loadInitialState() {
          /*       array1 = []
              Promise.all(AsyncStorage.getAllKeys().then(ks => {
                 console.log("ks"+ks);
                 // return here
                 return ks.map(async (k) => {
                     console.log(k);
                     try {
                         let  user = await AsyncStorage.getItem(k);
                         console.log(user);
                         parsed = JSON.parse(user);
                         console.log(parsed);

                         let arr= [
                             parsed.fname,
                             parsed.lname,
                             parsed.email
                         ]

                         array1.push(arr);
                         console.log(array1);

                         this.setState({
                             array2: array1
                         })
     //    await AsyncStorage.clear();
       //  console.log(await AsyncStorage.getAllKeys())
     }*/
    componentWillMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState(){
        const {navigate}=this.props.navigation
        arr2 = []
        let user = JSON.parse(await AsyncStorage.getItem('data'))
         let x = user.map((name) => {
             arr = [
                name.fname,
                name.lname,
                name.email,
                name.pwd,
                 <TouchableOpacity
                     onPress={() => navigate('EditUserProfile',{editdata:name})}
                     style={styles.buttonStyle}>
                     <Text>Edit</Text>
                 </TouchableOpacity>,
                 <TouchableOpacity
                     onPress={(t)=>this._confirmDeteletData(name)}
                     style={styles.buttonStyle}>
                     <Text>Delete</Text>
                 </TouchableOpacity>

            ]
            arr2.push(arr)

        })
        this.setState({
            array2: arr2
        })
        //await AsyncStorage.clear();
        //console.log('All: ' + AsyncStorage.getAllKeys())
    }
    _confirmDeteletData = (text)=>{
        Alert.alert(
            'Are You Sure ?',
            '',
            [

                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: (t)=>this._deleteData(text)},
            ],
            { cancelable: false }
        )

    }

_deleteData= async (t) => {
    const {navigate}=this.props.navigation
    let user = JSON.parse(await AsyncStorage.getItem('data'))
    let y=user.map((name,index) => {
        if(name.email == t.email){

            user.splice(index,1)
        }
        console.log("user",user)
    })
    AsyncStorage.setItem('data', JSON.stringify(user))
    if(user.length == 0){
        this.setState({
            array2 : []
        })
    } else{
        arr2 = []
          let z =user.map((name) => {
             arr = [
                 name.fname,
                 name.lname,
                 name.email,
                 name.pwd,
                 <TouchableOpacity
                     onPress={() => navigate('EditUserProfile',{editdata:name})}
                     style={styles.buttonStyle}>
                     <Text>Edit</Text>
                 </TouchableOpacity>,
                 <TouchableOpacity
                     onPress={(t)=>this._confirmDeteletData(name)}
                     style={styles.buttonStyle}>
                     <Text>Delete</Text>
                 </TouchableOpacity>
             ]
              arr2.push(arr)

          })
        this.setState({
            array2: arr2
        })
    }
    }
    render()
        {
            const tableHead = ['First Name', 'Last Name', 'Email Id','Password','Edit','Delete'];
            return (
                <View>
                    <Table>
                        <Row data={tableHead}/>
                        <Rows data={this.state.array2}/>
                    </Table>
                </View>
            );
        }

    }
const styles = StyleSheet.create({
    buttonStyle :{
        height:30,
        width:40,
        marginHorizontal:10,
        backgroundColor:'red',
        alignItems:'center'
    }
})

