import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Radio } from 'native-base'
import styles from "../Resources/Styles/styles";

const RadioButton =({
    radios,
    input:{ value, onChange },
    meta: {touched, error, warning}
}) =>{
    return (
        <View>
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
            <View>
                {
                    touched && (
                        (error && <Text style={styles.errorText}>{error}</Text>) ||
                        (warning && <Text style={styles.warnText}>{warning}</Text>))
                }
            </View>
        </View>
    )
};

class RadioBtn extends Component {
    render() {
        const { checked, label } = this.props;
        return(
            <View style={{flexDirection: 'row'}}>
                <Radio selected={checked} onPress={this._handlePress}/>
                <Text>  {label}</Text>
            </View>
        );
    }

    _handlePress = () => this.props.onChange(this.props.value)
}

export default RadioButton