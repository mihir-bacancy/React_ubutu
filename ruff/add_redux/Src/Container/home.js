import React from 'react';
import {connect} from 'react-redux';
import {addPerson,deletePerson} from "../Redux/actions";
import {Actions}from 'react-native-router-flux'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
} from 'react-native';
import {reduxForm,Field} from "redux-form";
import Textinput from '../Components/Textinput'
const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined;
const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined;


class Home extends React.Component{
    state = {
        firstname : '',
	    lastname :'',
        address :'',
        city :''
    }
    addPerson = (a) => {
        const {firstname, lastname, address, city } = this.state;
        console.warn('a',a);
        this.props.dispatchAddPerson({
            firstname,lastname,address,city
        });
         this.setState({firstname:'',
			lastname:'',address:'',city:''});
        Actions.DispatchPerson();
    }

    updateFirstName = (txt) => {
        this.setState({firstname: txt})
    }
    updateLastName = (lastname) => {
        this.setState({lastname})
    }
    updateAddress = (address) => {
        this.setState({address})
    }
    updateCity = (city) => {
        this.setState({city})
    }
    render (){
        const { handleSubmit } = this.props;
        return (
            <View style = {styles.container}>
                <Field name = "firstName"
                       component = {Textinput}
                       type="text"
                       placeholder = "First Name"
                       validate={[ required, maxLength15 ]}

                />
                <TextInput
                   onChangeText = {text => this.updateLastName(text)}
                   style = {styles.input}
                   value = {this.state.lastname}
                   placeholder = "Last Name"
                />
                <TextInput
                    onChangeText = {text => this.updateAddress(text)}
                    style = {styles.input}
                    value = {this.state.address}
                    placeholder = "Address"
                />
                <TextInput
                    onChangeText = {text => this.updateCity(text)}
                    style = {styles.input}
                    value = {this.state.city}
                    placeholder = "City"
                />
                <TouchableHighlight
                    underlayColor = "red"
                    style = {styles.button}
                    onPress = {handleSubmit(this.addPerson)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>

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
        people : state.people.people ? state.people.people : null
    }
}
function mapDispatchToProps (dispatch){
    return{
        dispatchAddPerson : (person) => dispatch(addPerson(person)),

    }
}
/*const signupForm = reduxForm ({
    form :'Home'
})

export default  signupForm(connect(
    mapStateToProps,
    mapDispatchToProps,
))(Home)*/
export default reduxForm({
    form : 'SignUp'
})(connect(mapStateToProps,mapDispatchToProps)(Home));

