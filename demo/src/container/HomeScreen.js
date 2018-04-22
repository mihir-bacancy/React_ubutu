import React from 'react';
import {Button, Text, View, TextInput, AsyncStorage, ToastAndroid, Alert} from 'react-native';
import styles from '/home/test/Desktop/programs/demo/src/resources/style/HomeScreenStyle';
let items = []
export default class HomeScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            name : '',

        }
    }
    componentWillMount = async () => {
        let x = JSON.parse(await AsyncStorage.getItem('LogIn'))
        if(x == null){
            const { navigate } = this.props.navigation
            navigate('Login')
        }
        else{
            this.setState({
                name: x.fname+' '+x.lname,
            })
        }
    }
    _confirmLogout = (text)=>{
        Alert.alert(
            'Are You Sure ?',
            '',
            [

                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: (t)=>this._logOut(text)},
            ],
            { cancelable: false }
        )

    }
    _logOut =async() => {
        await AsyncStorage.removeItem('LogIn')
        ToastAndroid.showWithGravity(
            'LogOut SuccessFully',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
        const { navigate } = this.props.navigation
        navigate('Login')
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text>{this.state.name}</Text>
                <View>
                    <Button
                            onPress={this._confirmLogout}
                            title="LogOut"
                    ></Button>
                </View>
            </View>
        );
    }
}
