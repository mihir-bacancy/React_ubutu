import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content, Button, Icon, H1, Col, Row, Grid } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Wallpaper from '../components/Wallpaper';
import Logo from '../components/Logo';
import withToast from '../common/withToast';
import withLastAction from '../common/withLastAction';
import withLoader from '../common/withLoader';
import withUser from '../common/withUser';
import LayoutStyle from '../assets/style/LayoutStyle';
import WelcomeStyle from '../assets/style/WelcomeStyle';

class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        const { user } = nextProps;
        return (user == null)
    }

    componentWillReceiveProps(nextProps) {
        const { user, lastAction, sceneKey} = nextProps;
        (user != null && sceneKey == 'Welcome')
            ? (lastAction == null)
                ? Actions.Home()
                : Actions.push(lastAction.routeName,lastAction.params)
            : true;
    }

    render () {
        return (
            <Wallpaper>
                <Content>
                    <Grid style={{alignItems: 'center'}}>
                        <Row size={40}>
                            <Col style={LayoutStyle.logoContainer}>
                                <Logo/>
                          </Col>
                        </Row>
                        <Row size={20}>
                            <Col style={WelcomeStyle.container}>
                                <H1>WELCOME TO</H1>
                                <H1> 2TUBE</H1>
                            </Col>
                        </Row>
                        <Row size={60}>
                            <Col style={WelcomeStyle.container}>
                                <Button block danger iconRight onPress={() => Actions.Login()}>
                                    <Icon iconLeft name="lock" size={35} color="white"/>
                                    <Text style={LayoutStyle.whiteText}>Login</Text>
                                </Button>
                                <Button block iconRight onPress={() => Actions.MarketPlace()}>
                                    <Text style={LayoutStyle.whiteText}>Skip Login For Now</Text>
                                    <Icon iconRight name="angle-double-right" size={35} color="white"/>
                                </Button>
                                <Button light block onPress={() => Actions.Info()}>
                                    <Text> Info </Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Wallpaper>
        );
    }
}

export default withUser(withToast(withLoader(withLastAction(Welcome))));
