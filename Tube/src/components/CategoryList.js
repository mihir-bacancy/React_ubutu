/**
 * @providesModule CategoryList
 */

import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import {  Text, Button, Card } from 'native-base';
import MarketPlaceStyle from 'MarketPlaceStyle';

export default class CategoryList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { categories, onSelect, activeCat } = this.props;

        return (
            <ScrollView style={MarketPlaceStyle.categoryList}
                directionalLockEnabled={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    categories.map((item, index) => (
                        <Button key={index}  rounded danger small horizontal activeCat={(activeCat == index) ? true : false} onPress={onSelect.bind(this,index)}>
                            <Text>{item.title}</Text>
                        </Button>
                    ))
                }
            </ScrollView>
        );
    }
}
