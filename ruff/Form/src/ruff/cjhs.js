import  React from 'react';
import {
    Field,
    reduxForm
} from 'redux-form';
import {
    TextInput,
    View,
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
    Radio,


} from 'native-base';

import radioButton from '../Components/radioButton';
import checkBox from './checkBox';
let _submit = (values) => {
    console.warn(values);
};
const renderInput = ({placeholder , input:{onChange, ...restInput}}) => {
    return <TextInput placeholder={placeholder} onChangeText={onChange}{...restInput}/>
};
const renderNumberInput = ({placeholder , input:{onChange, ...restInput}}) => {
    return <TextInput placeholder={placeholder} onChangeText={onChange}
                      keyboardType='phone-pad'{...restInput}/>
};
//underlineColorAndroid='transparent'
let  SimpleForm  = (props) => {

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
                                       component = {renderInput}
                                       type = "text"
                                       placeholder = "First Name"
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
                                       component = {renderInput}
                                       type = "text"
                                       placeholder = "Last Name"
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
                                       component = {renderInput}
                                       type = "text"
                                       placeholder = "Email"
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
                                                   label:'Travelling',value:'Travelling'

                                               }

                                           ]
                                       }
                                       type = "text"

                                />
                                <Field name = "Hobby"
                                       component = {checkBox}
                                       radios = {
                                           [
                                               {
                                                   label:'Cooking',value:'Cooking'

                                               }

                                           ]
                                       }
                                       type = "text"
                                />
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style = {{marginBottom:7,flexDirection:'row',borderWidth:3}}>
                            <View style = {{flex :0.3,paddingTop:15}}>
                                <Text>Age</Text>
                            </View>
                            <View style = {{flex :0.7,flexDirection:'column'}}>
                                <View style = {{flex:0.5}}>
                                    <Field name = "Age"
                                           component = {renderNumberInput}
                                    />
                                </View>

                                <View style = {{flex:0.2}}>
                                    <Button bordered
                                            onPress={handleSubmit(_submit)}
                                            component = {renderNumberInput}
                                            style = {{alignSelf:"flex-end",height:20,width:50,marginBottom:79}}>
                                        <Text style = {{fontWeight:'bold',fontSize:26,paddingTop:20,alignSelf:'center'}}>^</Text>
                                    </Button>
                                    <Button bordered
                                            onPress={handleSubmit(_submit)}
                                            component = {renderNumberInput}
                                            style = {{alignSelf:"flex-end",height:20,width:50,marginBottom:79}}>
                                        <Text style = {{fontWeight:'bold',fontSize:26,paddingTop:20,alignSelf:'center'}}>^</Text>
                                    </Button>

                                </View>
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
})(SimpleForm)