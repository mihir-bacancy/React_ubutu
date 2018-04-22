import React, { Component } from 'react';
import {TouchableOpacity, Text} from 'react-native'

const btn = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <Text> { props.children } </Text>
        </TouchableOpacity>
    );
}

export default btn