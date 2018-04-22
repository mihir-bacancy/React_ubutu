import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {Radio} from 'native-base'

const radioButton =({ radios, input:{ value, onChange }}) =>{
    return (
        <View>
            {
                radios.map( (radio) =>
                    <RadioBtn
                        key={radio.label} {...radio}
                        onChange={onChange}
                        checked={radio.value === value}
                    />
                )
            }
        </View>
    )
};

class RadioBtn extends Component {
    render() {
        const { checked, label } = this.props;
        return(
            <View style={{flexDirection: 'row', padding: 1}}>
                <Radio selected={checked} onPress={this.handlePress}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontSize: 15}}>  {label}</Text>
                </View>
            </View>
        );
    }

    handlePress = () => this.props.onChange(this.props.value)
}

export default radioButton;