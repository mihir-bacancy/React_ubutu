/**
 * @providesModule MarketCourseList
 */

import React, {Component} from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {Card, CardItem, Button, Icon, Col, Body, Row, Grid} from 'native-base';
import MarketPlaceStyle from 'MarketPlaceStyle';
import { Actions } from 'react-native-router-flux';
import { NOPREVIEW } from 'global';

export default class MarketCourseList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {courses, onSubscribe} = this.props;

        return (
            <Col>
                {
                    (courses.length > 0)
                        ?
                        courses.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => Actions.CourseInfo({courseId: item._id})}>
                                <Card >
                                    <CardItem cardBody>
                                        <Grid style={MarketPlaceStyle.courseGridContent}>
                                            <Row>
                                                <Col size={2} style={MarketPlaceStyle.courseColThumb}>
                                                    <Image style={MarketPlaceStyle.courseThumb} square
                                                           source={(item.image) ? {uri: item.image} : NOPREVIEW}/>
                                                </Col>
                                                <Col size={2} style={MarketPlaceStyle.courseContent}>
                                                    <Col>
                                                        <Text numberOfLines={2}
                                                              style={MarketPlaceStyle.courseTitle}>{item.title}</Text>
                                                        <Text numberOfLines={4}>{item.description}</Text>
                                                    </Col>
                                                </Col>
                                                <Col size={1} style={MarketPlaceStyle.courseSubscribe}>
                                                    <Button subscribeBtn danger transparent onPress={onSubscribe.bind(this,item._id)}>
                                                        <Icon name="plus"/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>))
                        :
                        <Body>
                        <Text>No Courses Found</Text>
                        </Body>
                }
            </Col>
        );
    }
}
