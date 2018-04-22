import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content, Button, Icon, Col, Row, Grid } from 'native-base';
import { reduxForm } from 'redux-form';
import { FBLoginManager } from 'react-native-facebook-login';
import Wallpaper from '../components/Wallpaper';
import Logo from '../components/Logo';
import withToast from '../common/withToast';
import withLoader from '../common/withLoader';
import withUser from '../common/withUser';
import withLastAction from '../common/withLastAction';
import API from '../utils/AppUtil';
import { storeUser, emailRegex } from '../common/global';
import  ReduxField from '../components/ReduxField';
import LayoutStyle from '../assets/style/LayoutStyle';
import LoginStyle from '../assets/style/LoginStyle';
import { Actions } from 'react-native-router-flux';

class Login extends Component {

    constructor(props) {
        super(props);
        this._doLogin = this._doLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { user, lastAction } = nextProps;
        (user != null)
            ? (lastAction == null)
                ? Actions.Home()
                : Actions[lastAction.routeName](lastAction.params)
            : true;
    }

    _loginByType = (loginData) => {
        const { toast, setUser, loader } = this.props;
        loader(true);
        API.login(loginData)
            .then((responseJson) => {
                const {status} = responseJson;
                loader(false);
                if (status) {
                    const { data } = responseJson;
                    storeUser(data);
                    toast({text:'Login success.',type:'success'});
                    setUser(data);
                } else {
                    const {message} = responseJson;
                    toast({text : message, type : 'danger'});
                }
            });
    }

    _doLogin = ({ email, password }) => {
        this._loginByType({email,password,type:'manual'});
    }

    _doFacebookLogin = () => {
        FBLoginManager.loginWithPermissions(["email","public_profile"],(err, data) => {
            if (data != null) {
                const {credentials:{token:facebookToken}} = data;
                this._loginByType({facebookToken,type:'facebook'});
                FBLoginManager.logout((err, data) => {});
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
                            <Col style={LoginStyle.logoFormContainer}>
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

                                <View style={LayoutStyle.fullWidth}>
                                    <Text style={[LoginStyle.alignRight,LayoutStyle.greyText]} onPress={() => Actions.ForgotPassword()}> Forgot password?</Text>
                                </View>

                                <Button block danger onPress={handleSubmit(this._doLogin.bind(this))}>
                                    <Icon iconLeft name="envelope" size={35} color="white"/>
                                    <Text style={LayoutStyle.whiteText}>Login With Email</Text>
                                </Button>

                                <Button block iconLeft onPress={this._doFacebookLogin.bind(this)}>
                                    <Icon iconLeft name="facebook-official" size={35} color="white"/>
                                    <Text style={LayoutStyle.whiteText}>Login With Facebook </Text>
                                </Button>

                                <Button light block onPress={() => Actions.Register()}>
                                    <Text style={LayoutStyle.greyText}> Sign Up Here</Text>
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

    errors.password = !values.password
        ? 'Required'
        : values.password.length < 4
        ? 'Min 4 length'
        : undefined;

    return errors;
};

const initialState = {
    email:'chirag.vekariya@bacancytechnology.com',
    password:'chirag789'
};

const withForm = reduxForm({
    form: 'loginForm',
    validate,
    initialValues: initialState
});

export default withUser(withToast(withLastAction(withLoader(withForm(Login)))));
