import React from 'react';
import { View, Picker, Text } from 'native-base';
import styles from "../Resources/Styles/styles";

const DropDown = ({
    options,
    input:{ value, onChange },
    meta: {touched, error, warning}
}) => {
    return(
        <View>
            <View>
                <Picker
                    selectedValue={value}
                    onValueChange={onChange.bind(this)}
                >
                    {
                        options.map((opt, index) => (
                            <Picker.Item
                                key={index}
                                label={opt.label}
                                value={opt.value}
                            />
                        ))
                    }
                </Picker>
            </View>
            <View>
                {
                    touched && (
                        (error && <Text style={styles.errorText}>{error}</Text>) ||
                        (warning && <Text style={styles.warnText}>{warning}</Text>))
                }
            </View>
        </View>
    );
};

export default DropDown