/**
 * @providesModule VideoList
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
import { List, ListItem, Text, Body, Left, Icon, Row, Col, Thumbnail } from 'native-base';
import { NOPREVIEW } from 'global';
import LayoutStyle from 'LayoutStyle';

export default class VideoList extends Component {

    render() {
        const { videos , onSelectView, onSelectRecord } = this.props;
        return (
            <List>
                {
                    (videos.length > 0)
                        ? videos.map((item, index) => (
                            <ListItem thumbnail noBorder itemDivider key={index} >
                                <Left>
                                    <Thumbnail square size={30} source={ (item.image) ? {uri: item.image} : NOPREVIEW} />
                                </Left>
                                <Body>
                                    <Row>
                                        <Col>
                                            <Text>{item.title}</Text>
                                        </Col>
                                        <Icon name='eye' style={{color:"#3F51B5",fontSize: 20}} onPress={onSelectView.bind(this,item._id)} />
                                        <Icon name="video-camera" style={{color:"#d9534f",fontSize: 20}} onPress={onSelectRecord.bind(this,item._id)}/>
                                    </Row>
                                </Body>
                            </ListItem>
                        ))
                        : <ReactNative.Text style={LayoutStyle.emptyDataLabel}>No video found</ReactNative.Text>
                }
            </List>
        );
    }
}
