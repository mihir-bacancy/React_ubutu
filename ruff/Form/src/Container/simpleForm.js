import  React from 'react';
import {Actions} from 'react-native-router-flux'
import {
    Field,
    reduxForm,

} from 'redux-form';
import {
    TextInput,
    View

} from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Text,
    Icon,
    Card,
    CardItem,
    Body,
    Title ,
    CheckBox,
    ListItem

} from 'native-base';

import radioButton from '../Components/radioButton';
import  textInput  from'../Components/textInput'
import  textNumberInput  from'../Components/textNumberInput';
import  checkBox from '../Components/checkBox'



let _submit = (values) => {
    console.warn(values);
    Actions.secondScreen();

};

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





//underlineColorAndroid='transparent'
let  simpleForm  = (props) => {

    const {handleSubmit} = props;
    return (

        <Container>
            <Header>
                <Body>
                <Title>Sign Up</Title>
                </Body>
            </Header>
            <Content>
                <Card>
                    <CardItem>
                        <View style = {{marginBottom:7,flexDirection:'row'}}>
                            <View style = {{flex :0.3,paddingTop:15}}>
                                <Text>First Name</Text>
                            </View>
                            <View style = {{flex :0.7,borderWidth:2}}>
                                <Field name = "FirstName"
                                       component = {textInput}
                                       type="text"
                                       placeholder = "First Name"
                                       validate={[ required, maxLength15 ]}
                                />
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style = {{marginBottom:7,flexDirection:'row'}}>
                            <View style = {{flex :0.3,paddingTop:15}}>
                                <Text>Last Name</Text>
                            </View>
                            <View style = {{flex :0.7,borderWidth:2}}>
                                <Field name = "LastName"
                                       component = {textInput}
                                       type="text"
                                       placeholder = "Last Name"
                                       validate={[ required, maxLength15 ]}
                                />
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style = {{marginBottom:7,flexDirection:'row'}}>
                            <View style = {{flex :0.3,paddingTop:15}}>
                                <Text>Email</Text>
                            </View>
                            <View style = {{flex :0.7,borderWidth:2}}>
                                <Field name = "Email"
                                       component = {textInput}
                                       type={email}
                                       placeholder = "Email"
                                       validate={[email,required]}
                                       warn={aol}

                                />
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style = {{marginBottom:7,flexDirection:'row'}}>
                            <View style = {{flex :0.3}}>
                            <Text>Sex</Text>
                            </View>
                            <View style = {{flex :0.4}}>
                                <Field name = "Sex"
                                       component = {radioButton}
                                       radios = {
                                           [
                                               {
                                                   label:'Male',value:'Male'
                                               },

                                           ]
                                       }
                                       type = "text"

                                />
                            </View>
                            <View style = {{flex :0.3}}>
                                <Field name = "Sex"
                                       component = {radioButton}
                                       radios = {
                                           [
                                               {
                                                   label:'Female',value:'Female'
                                               }
                                           ]
                                       }
                                       type = "text"
                                />
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style = {{marginBottom:7,flexDirection:'row'}}>
                            <View style = {{flex :0.3,paddingTop:15}}>
                                <Text>Hobby</Text>
                            </View>
                            <View style = {{flex :0.4,flexDirection:'column',paddingLeft:25}}>

                                    <Field name = "Hobby"
                                           component = {checkBox}
                                           radios = {
                                               [
                                                   {
                                                       label:'Cooking',value:'Cooking'
                                                   },
                                                   {
                                                       label:'Travelling',value:'Travelling'
                                                   },


                                               ]
                                           }
                                           type = "text"

                                    />

                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style = {{marginBottom:7,flexDirection:'row'}}>
                            <View style = {{flex :0.3,paddingTop:15}}>
                                <Text>Age</Text>
                            </View>
                            <View style = {{flex :0.7,flexDirection:'column',borderWidth:2}}>
                                <Field name = "Age"
                                       component = {textNumberInput}
                                       placeholder = "Age"
                                       validate={[ required, number, minValue18 ]}
                                       warn={tooOld}
                                       type={number}
                                />

                            </View>
                        </View>
                    </CardItem>
                </Card>
                <View>
                    <Button bordered
                            onPress={handleSubmit(_submit)}
                            style = {{alignSelf:"center"}}>
                        <Text>Submit</Text>
                    </Button>

                </View>
            </Content>
        </Container>


    );
};
export default reduxForm({
    form : "simple"
})(simpleForm)