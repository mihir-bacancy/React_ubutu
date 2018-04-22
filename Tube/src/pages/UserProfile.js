import React, {Component} from 'react';
import {View, Text} from 'react-native';
import withLoader from '../common/withLoader';
import {Card, CardItem, Content, Icon, Button, Body, Thumbnail, Col, Row, Grid} from 'native-base';
import {userLogout} from '../common/global';
import withUser from '../common/withUser';
import MainHeader from '../components/MainHeader';
import  FooterNav from '../components/FooterNav';
import UserProfileStyle from '../assets/style/UserProfileStyle';
import LayoutStyle from '../assets/style/LayoutStyle';
import avatarSrc from '../assets/images/logo.png';
import {Actions} from 'react-native-router-flux';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: (this.props.user.profileImage == '') ? avatarSrc : {uri: this.props.user.profileImage}
        };
        this._logout = this._logout.bind(this);
    }

    _logout = () => {
        const {setUser} = this.props;
        userLogout(() => {
            setUser(null);
            Actions.Login();
        });
    }

    render() {
        const {user} = this.props;
        return (
            <View style={UserProfileStyle.layout}>
                <MainHeader/>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Grid style={UserProfileStyle.cardContainer}>
                                <Row size={1}>
                                    <Thumbnail large source={this.state.avatarSource}/>
                                </Row>
                                <Row size={1}>
                                    <Text style={[LayoutStyle.greyText, UserProfileStyle.styleName]}>{ (user != null) ? `${user.firstName} ${user.lastName}` : '' }</Text>
                                </Row>
                                <Row size={1}>
                                    <Text style={UserProfileStyle.styleEmail}>{ (user != null) ? user.email : ''}</Text>
                                </Row>
                                <Row size={1}>
                                    <Button transparent small center onPress={() => Actions.EditProfile()}>
                                        <Icon name="edit" onPress={() => Actions.EditProfile()} iconBlue/>
                                    </Button>
                                </Row>
                            </Grid>
                        </CardItem>
                    </Card>

                    <Grid>
                        <Row>
                            <Col/>
                            <Col>
                                <Button light block onPress={this._logout.bind(this)}>
                                    <Text style={LayoutStyle.greyText}>Logout</Text>
                                </Button>
                            </Col>
                            <Col/>
                        </Row>
                    </Grid>
                </Content>
                <FooterNav {...this.props}/>
            </View>
        );
    }
}

export default withUser(withLoader(UserProfile));
