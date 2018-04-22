/**
 * @providesModule CourseSlider
 */

import React, {Component} from 'react';
import ReactNative , {ScrollView} from 'react-native';
import {Text,Button} from 'native-base';
import LayoutStyle from 'LayoutStyle';

export default class CourseSlider extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {courses, onSelect, activeCourse} = this.props;
        return (
            <ScrollView
                directionalLockEnabled={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    (courses.length > 0)
                        ? courses.map((item, index) => (
                            <Button key={index} rounded danger small horizontal
                                    activeCat={(activeCourse == index) ? true : false} onPress={onSelect.bind(this, index)}>
                                <Text>{item.title}</Text>
                            </Button>
                        ))
                        : <ReactNative.Text style={LayoutStyle.emptyDataLabel}>No subscribed course found</ReactNative.Text>

                }
            </ScrollView>
        );
    }
}
