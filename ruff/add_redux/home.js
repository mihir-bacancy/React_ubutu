import React from 'react';
import {connect} from 'react-redux';
import {addPerson,deletePerson} from "./actions";
import {Actions}from 'react-native-router-flux'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
} from 'react-native';

class Home extends React.Component{
    state = {
        inputValue : '',
	    lastname :'',
    }
    addPerson = () => {
        if(this.state.inputValue === '')return;
        this.props.dispatchAddPerson({
            name:this.state.inputValue,
	        lname:this.state.lastname
        });
        this.setState({inputValue:'',
			lastname:''});
        Actions.DispatchPerson();
    }
    deletePerson = (person) => {
        this.props.dispatchdeletePerson(person)
    }
    updateInput = (inputValue) => {
        this.setState({inputValue})
    }
    updateInputt = (lastname) => {
        this.setState({lastname})
    }
    render (){
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>people</Text>
                <TextInput
                    onChangeText = {text => this.updateInput(text)}
                    style = {styles.input}
                    value = {this.state.inputValue}
                    placeholder = "NAme"
                />
                <TextInput
                    onChangeText = {text => this.updateInputt(text)}
                    style = {styles.input}
                    value = {this.state.lastname}
                    placeholder = "Last NAme"
                />
                <TouchableHighlight
                    underlayColor = "red"
                    style = {styles.button}
                    onPress = {this.addPerson}>
                    <Text style={styles.buttonText}>Add Person</Text>
                </TouchableHighlight>
                {
                    this.props.people.map((person,index)=>(
                        <View key = {index}>
                            <Text>Name : {person.name}</Text>
                            <Text>Last NAme:{person.lname}</Text>
                            <Text onPress = {() => this.deletePerson(person)}>Delete Person</Text>
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

function mapStateToProps (state){
    return{
        people : state.people.people
    }
}
function mapDispatchToProps (dispatch){
    return{
        dispatchAddPerson : (person) => dispatch(addPerson(person)),
        dispatchdeletePerson : (person) => dispatch(deletePerson(person))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)
