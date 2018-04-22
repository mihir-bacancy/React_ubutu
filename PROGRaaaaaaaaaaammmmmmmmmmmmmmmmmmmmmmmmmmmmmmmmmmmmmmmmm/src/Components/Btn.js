import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const Btn = (props) => {
    return(
        <View style={{alignItems: 'center', padding: 5}}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={{alignItems: 'center', padding: 5, borderWidth: 0.5, width: 80, borderRadius: 3}}>
                    <Text> {props.children} </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Btn