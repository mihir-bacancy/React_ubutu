/**
 * @providesModule CourseVideoList
 */

import React, { Component } from 'react';
import {Text,Image, View} from 'react-native';
import { Card, CardItem, Button, Icon, Col, Body} from 'native-base';
import CourseInfoStyle from 'CourseInfoStyle';
import { NOPREVIEW } from 'global';
import { Actions } from 'react-native-router-flux';

export default class CourseVideoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { videos } = this.props;
        return (
            <Col>
                {
                    (videos.length > 0)
                        ?
                         videos.map((item, index) =>  (
                            <View key={index}>
                                <Card >
                                    <CardItem  videoBody>
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <View style={CourseInfoStyle.courseImageContainer}>
                                                <Image style={CourseInfoStyle.videoThumb} square source={ (item.image) ? { uri : item.image} : NOPREVIEW} />
                                            </View>
                                            <View style={CourseInfoStyle.courseContent}>
                                                <View>
                                                    <Text numberOfLines={2} style={CourseInfoStyle.courseTitle}>{item.title}</Text>
                                                </View>
                                                <View style={{flex:1,flexDirection:'row',alignSelf:'flex-end',alignItems:'flex-end'}}>

                                                    <Button subscribeBtn danger transparent >
                                                        <Icon name="eye" style={{color:"#3F51B5"}} onPress={() => Actions.ViewingRoom({videoId:item._id})}/>
                                                    </Button>
                                                    <Button subscribeBtn danger transparent >
                                                        <Icon name="video-camera" onPress={() => Actions.TubeScreen({videoId:item._id})}/>
                                                    </Button>
                                                </View>
                                            </View>

                                        </View>
                                    </CardItem>
                                </Card>
                            </View>))
                        :
                        <Body>
                            <Text>No Videos Found</Text>
                        </Body>
                }
            </Col>
        );
    }
}
