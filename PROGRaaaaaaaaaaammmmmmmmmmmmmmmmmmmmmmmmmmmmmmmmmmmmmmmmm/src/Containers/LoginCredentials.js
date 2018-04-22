import React from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import TextBox from '../Components/TextBox';
import Btn from '../Components/Btn';
import * as  validate from './validate';
import * as warn from './warn'

let _submit = (values) => {
    console.warn(values);
    Actions.ReviewData()
};

const LoginCredentials = (props) => {
    const { handleSubmit } = props;

    return(
        <View>

            <View>
                <Field
                    name='email'
                    component={TextBox}
                    placeholder = 'Email Id'
                    type={validate.email}
                    validate={[validate.email,validate.required]}
                    warn={warn.aol}
                />
            </View>

            <View>
                <Field
                    name='Password'
                    component={TextBox}
                    secureTextEntry={true}
                    placeholder = 'Password'
                    type='text'
                    validate={[validate.pwd, validate.required]}
                />
            </View>

            <Btn onPress={handleSubmit(_submit)}> Next </Btn>

        </View>
    );
};

export default reduxForm({
    form: 'ReactNativeTest',
    destroyOnUnmount: false,
})(LoginCredentials)