import React, { Component } from 'react'
import { View, Text,TextInput } from 'react-native';
const textNumberInput = ({placeholder , input:{onChange, ...restInput},type,meta: { touched, error, warning }}) => {
    return (
        <View><TextInput placeholder={placeholder} onChangeText={onChange}
                         keyboardType='phone-pad'{...restInput} underlineColorAndroid='transparent'/>
            {touched && ((error && <Text style={{color:'red'}}>{error}</Text>) || (warning && <Text style={{color:'red'}}>{warning}</Text>))}
        </View>
    )};
export default textNumberInput;