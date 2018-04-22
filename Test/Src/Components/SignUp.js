import React from 'react';
import {connect} from 'react-redux';
import {addPerson} from '../Redux/Action';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
}from 'react-native';
import {Actions}from 'react-native-router-flux'
class SignUp extends React.Component{
    state = {
        FirstName :'',
        LastName :'',
        Address :'',
        City : ''
    }
    addPerson = () =>{
        if(this.state.FirstName === '')return;
        this.props.dispatchAddPerson({
            fname :this.state.FirstName,
            lname : this.state.LastName,
            add : this.state.Address,
            city :this.state.City

        });
        this.setState({
            FirstName :'',
            LastName :'',
            Address :'',
            City : ''

        });
        Actions.AllValues();
    }
    updateFirstName = (FirstName) => {
        this.setState({FirstName})
    }
    updateLastName = (LastName) => {
        this.setState({LastName})
    }
    updateAddress = (Address) => {
        this.setState({Address})
    }
    updateCity = (City) => {
        this.setState({City})
    }
    render (){
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>People</Text>
                <TextInput
                    onChangeText = {text => this.updateFirstName(text)}
                    style={styles.input}
                    value={this.state.FirstName}
                    placeholder="FirstName"
                />
                <TextInput
                    onChangeText = {text => this.updateLastName(text)}
                    style={styles.input}
                    value={this.state.LastName}
                    placeholder="LastName"
                />
                <TextInput
                    onChangeText = {text => this.updateAddress(text)}
                    style={styles.input}
                    value={this.state.Address}
                    placeholder="Address"
                />
                <TextInput
                    onChangeText = {text => this.updateCity(text)}
                    style={styles.input}
                    value={this.state.City}
                    placeholder="City"
                />
                <TouchableHighlight
                    underlayColor = "red"
                    style = {styles.button}
                    onPress ={this.addPerson}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableHighlight>
                {
                    this.props.people.map((person,index)=>(
                        <View key = {index}>
                            <Text>FirstName :{person.fname}</Text>
                            <Text>LastName :{person.lname}</Text>
                            <Text>Address :{person.add}</Text>
                            <Text>City :{person.city}</Text>
                        </View>

                    ))
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 55,
        borderRadius: 3,
        padding: 5,
        marginTop: 12,
    },
    button: {
        backgroundColor: '#ff9900',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
    },
    person: {
        marginTop: 12,
    },
});
function mapStateToProps(state){
    return {
        people :state.people.people
    }
}
function mapDispatchToProps(dispatch){
    return{
        dispatchAddPerson:(person) => dispatch(addPerson(person)),

    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps

)(SignUp)