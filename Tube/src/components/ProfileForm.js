/**
 * @providesModule ProfileForm
 */

import React, { Component } from 'react';
import { Icon, Button } from 'native-base';
import { Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LayoutStyle from 'LayoutStyle';
import RegisterStyle from 'RegisterStyle';
import { emailRegex } from 'global';
import  ReduxField from 'ReduxField';
import { reduxForm } from 'redux-form';

class ProfileForm extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        const { handleSubmit, onSubmit } = this.props;
        return (
            <Grid style={{alignItems: 'center'}}>
                <Row size={70}>
                    <Col style={RegisterStyle.registerFormContainer}>
                        <ReduxField
                            name="firstName"
                            icon="user-o"
                            placeholder={"First Name"}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                        <ReduxField
                            name="lastName"
                            icon="user-o"
                            placeholder={"Last Name"}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                        <ReduxField
                            name="email"
                            icon="envelope"
                            placeholder={"Email Address"}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                        <ReduxField
                            name="oldPassword"
                            icon="lock"
                            placeholder={"Current Password"}
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                        />
                        <ReduxField
                            name="newPassword"
                            icon="lock"
                            placeholder={"New Password"}
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                        />
                        <ReduxField
                            name="confPassword"
                            icon="lock"
                            placeholder={"Confirm Password"}
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                        />

                        <Button  block danger onPress={handleSubmit(onSubmit)}>
                            <Icon iconLeft name="floppy-o" size={35} color="white"/>
                            <Text style={LayoutStyle.whiteText}>Save</Text>
                        </Button>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

const validate = values => {
    let errors = {};
    errors.firstName = !values.firstName
        ? 'Required'
        : values.firstName.length > 20
            ? 'Max 20 length'
            : undefined;

    errors.lastName = !values.lastName
        ? 'Required'
        : values.lastName.length > 20
            ? 'Max 20 length'
            : undefined;

    errors.email = !values.email
        ? 'Required'
        : !emailRegex.test(values.email)
            ? 'Invalid'
            : undefined;

    errors.oldPassword = values.oldPassword && values.oldPassword.length < 4
        ? 'Min 4 length'
        : undefined;

    errors.newPassword = values.oldPassword && !values.newPassword
        ? 'Required'
        : values.newPassword && values.newPassword.length < 4
            ? 'Min 4 length'
            : undefined;

    errors.confPassword =  values.oldPassword && !values.confPassword
        ? 'Required'
        : values.confPassword && values.confPassword.length < 4
            ? 'Min 4 length'
            : values.confPassword && values.confPassword != values.newPassword
                ? 'Password not match'
                : undefined;

    return errors;
};

const initialValues = {
        firstName:'',
        lastName:'',
        email:'',
        oldPassword:'',
        newPassword:'',
        confPassword:''
    };

const withForm = reduxForm({
    form: 'editProfile',
    enableReinitialize:true,
    validate,
    initialValues
});

export default withForm(ProfileForm);
