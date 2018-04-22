import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const btn = (props) => {
    return(
        <View>
        <TouchableOpacity onPress={props.onPress}>

                <Text style={{color: '#FF4500'}}> { props.children } </Text>

        </TouchableOpacity>
        </View>
    );
};

export default btn