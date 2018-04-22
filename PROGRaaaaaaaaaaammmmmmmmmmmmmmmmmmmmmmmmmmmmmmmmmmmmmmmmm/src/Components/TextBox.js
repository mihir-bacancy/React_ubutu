import React from 'react';
import { View, Item, Input, Label, Text } from 'native-base';
import styles from "../Resources/Styles/styles";

const TextBox = ({
    placeholder,
    secureTextEntry,
    type,
    input: { onChange, ...restInput },
    meta: {touched, error, warning}
}) => {
    return <View>
        <View>
            <Item floatingLabel>
                <Label>{placeholder}</Label>
                <Input
                    underlineColorAndroid='transparent'
                    secureTextEntry={secureTextEntry}
                    type={type}
                    onChangeText={onChange}
                    { ...restInput }
                />
            </Item>
        </View>
        <View>
            {
                touched && (
                    (error && <Text style={styles.errorText}>{error}</Text>) ||
                    (warning && <Text style={styles.warnText}>{warning}</Text>))
            }
        </View>
    </View>
};
export default TextBox;