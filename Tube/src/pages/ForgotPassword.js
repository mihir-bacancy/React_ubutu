import React, { Component } from 'react';
import { Text } from 'react-native';
import { Content, Button, Icon, Col, Row, Grid  } from 'native-base';
import { reduxForm } from 'redux-form';
import { FBLoginManager } from 'react-native-facebook-login';
import Wallpaper from '../components/Wallpaper';
import Logo from '../assets/images/logo.png';
import withToast from '../common/withToast';
import withLoader from '../common/withLoader';
import API from '../utils/AppUtil';
import { storeUser, emailRegex } from '../common/global';
import  ReduxField from '../components/ReduxField';
import LayoutStyle from '../assets/style/LayoutStyle';
import ForgotPasswordStyle from '../assets/style/ForgotPasswordStyle';
import { Actions } from 'react-native-router-flux';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this._doForgotPassword = this._doForgotPassword.bind(this);
    }

    _doForgotPassword = ({ email }) => {
        const { toast, loader } = this.props;
        loader(true);
        API.forgotPassword({email})
            .then((responseJson) => {
                const {status, message} = responseJson;
                loader(false);
                if (status) {
                    toast({text:message, type:'success'});
                } else {
                    toast({text : message, type : 'danger'});
                }
            });
    }

    render () {
        const { handleSubmit } = this.props;
        return (
            <Wallpaper>
                <Content>
                    <Grid style={{alignItems: 'center'}}>
                        <Row size={40}>
                            <Col style={LayoutStyle.logoContainer}>
                                <Logo/>
                            </Col>
                        </Row>
                        <Row size={60}>
                            <Col style={ForgotPasswordStyle.logoFormContainer}>
                                <ReduxField
                                    name="email"
                                    icon="envelope"
                                    placeholder={"Email Address"}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />
                                <Button block danger onPress={handleSubmit(this._doForgotPassword.bind(this))}>
                                    <Icon iconLeft name="envelope" size={35} color="white"/>
                                    <Text style={LayoutStyle.whiteText}>Submit</Text>
                                </Button>

                                <Button light block onPress={() => Actions.Login()}>
                                    <Text style={LayoutStyle.greyText}> Login Here</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Wallpaper>
        );
    }
}
const validate = values => {
    let errors = {};
    errors.email = !values.email
        ? 'Required'
        : !emailRegex.test(values.email)
        ? 'Invalid'
        : undefined;

    return errors;
};

const initialState = {
    email:"",

};

const withForm = reduxForm({
    form: 'forgotPasswordForm',
    validate,
    initialValues: initialState
});

export default withToast(withLoader(withForm(ForgotPassword)));
