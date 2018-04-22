import React, { Component } from 'react';
import { Content, Icon, Button, Col, Row, Grid } from 'native-base';
import { Text } from 'react-native';
import { FBLoginManager } from 'react-native-facebook-login';
import Wallpaper from '../components/Wallpaper';
import Logo from '../components/Logo';
import withToast from '../common/withToast';
import withLoader from '../common/withLoader';
import withLastAction from '../common/withLastAction';
import withUser from '../common/withUser';
import API from '../utils/AppUtil';
import LayoutStyle from '../assets/style/LayoutStyle';
import RegisterStyle from '../assets/style/RegisterStyle';
import { size, storeUser, emailRegex } from '../common/global';
import  ReduxField from '../components/ReduxField';
import { reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';

class Register extends Component {

    constructor(props) {
        super(props);
        this._doRegister = this._doRegister.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { user, lastAction} = nextProps;
        (user != null)
            ? (lastAction == null)
                ? Actions.Home()
                : Actions.push(lastAction.routeName,lastAction.params)
            : true;
    }

    _registerByType = (signupData) => {
        const { toast, loader, setUser } = this.props;
        loader(true);
        API.register(signupData)
            .then((responseJson) => {
                loader(false);
                const {status, message, data } = responseJson;
                if (status) {
                    if(signupData.type == 'facebook') {
                        storeUser(data);
                        setUser(data);
                    } else {
                        toast({text:message, type:'success'});
                        //Actions.Login();
                        // No need to activate account via email
                        storeUser(data);
                        setUser(data);
                    }
                } else {
                    toast({text:message, type:'danger'});
                }
            });
    }

    _doFacebookRegister = () => {
        FBLoginManager.loginWithPermissions(["email","public_profile"],(err, data) => {
            if (data != null) {
                const {credentials:{token:facebookToken}} = data;
                this._registerByType({facebookToken,type:'facebook'});
                FBLoginManager.logout((err, data) => {});
            }
        });
    }

    _doRegister = ({firstName, lastName, email, password }) => {
        this._registerByType({ firstName, lastName, email, password, type:'manual' });
    }

    render () {
        const { handleSubmit } = this.props;

        return (
            <Content>
                <Wallpaper>

                    <Grid style={{alignItems: 'center'}}>
                        <Row size={30}>
                            <Col style={LayoutStyle.logoContainer}>
                                <Logo/>
                            </Col>
                        </Row>
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
                                    name="password"
                                    icon="lock"
                                    placeholder={"Password"}
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

                                <Button  block danger onPress={handleSubmit(this._doRegister.bind(this))}>
                                    <Icon iconLeft name="envelope" size={35} color="white"/>
                                    <Text style={LayoutStyle.whiteText}>Sign Up With Email</Text>
                                </Button>

                                <Button block iconLeft onPress={this._doFacebookRegister.bind(this)}>
                                    <Icon iconLeft name="facebook-official" size={35} color="white"/>
                                    <Text style={LayoutStyle.whiteText}>Sign Up With Facebook</Text>
                                </Button>

                                <Button light block onPress={() => Actions.Login()}>
                                    <Text style={LayoutStyle.greyText}> Login Here</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                </Wallpaper>
            </Content>
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

    errors.password = !values.password
        ? 'Required'
        : values.password.length < 4
            ? 'Min 4 length'
            : undefined;

    errors.confPassword = !values.confPassword
        ? 'Required'
        : values.confPassword.length < 4
            ? 'Min 4 length'
            : values.confPassword != values.password
                ? 'Password not match'
                : undefined;

    return errors;
};

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confPassword:''
};

const withForm = reduxForm({
    form: 'registerForm',
    validate,
    initialValues: initialState
});

export default withUser(withToast(withLoader(withLastAction(withForm(Register)))));
