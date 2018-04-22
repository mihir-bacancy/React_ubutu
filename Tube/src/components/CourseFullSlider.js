/**
 * @providesModule CourseFullSlider
 */

import React, {Component} from 'react';
import {ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Button, Row, Col, Icon, Body, Grid} from 'native-base';
import MarketPlaceStyle from 'MarketPlaceStyle';
import { Actions } from 'react-native-router-flux';
import { NOPREVIEW } from 'global';

export default class CourseSlider extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {courses, onSubscribe} = this.props;
        return (
            <Card >
                <Text style={MarketPlaceStyle.sliderTitle}>Top Rated Courses</Text>
                <ScrollView
                    style={MarketPlaceStyle.sliderContainer}
                    directionalLockEnabled={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        (courses.length > 0)
                            ?
                            courses.map((item, index) => (
                                <TouchableOpacity key={index}
                                                  onPress={() => Actions.CourseInfo({courseId: item._id})}>
                                    <Card slider>
                                        <CardItem cardBody>
                                            <Grid style={MarketPlaceStyle.courseGridContent}>
                                                <Col>
                                                    <Row size={1} style={MarketPlaceStyle.courseColThumb}>
                                                        <Image style={MarketPlaceStyle.sliderCourseImage} square
                                                               source={(item.image) ? {uri: item.image} : NOPREVIEW}/>
                                                    </Row>
                                                    <Row size={1} style={MarketPlaceStyle.sliderCourseTitle}>
                                                        <Row>
                                                            <Text style={MarketPlaceStyle.courseRowTitle} numberOfLines={1}>{item.title}</Text>
                                                        </Row>
                                                        <Button style={{flex: 1, alignSelf: 'flex-end'}} subscribeBtn danger transparent onPress={onSubscribe.bind(this,item._id)}>
                                                            <Icon name="plus"/>
                                                        </Button>
                                                    </Row>
                                                </Col>
                                            </Grid>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>))
                            :
                            <Body>
                            <Text>No Courses Found</Text>
                            </Body>
                    }
                </ScrollView>
            </Card>
        );
    }
}
