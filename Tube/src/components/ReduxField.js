/**
 * @providesModule ReduxField
 */

import React, { Component } from 'react';
import { Item, Input, Icon } from 'native-base';
import { Text } from 'react-native';
import { Field } from 'redux-form';
import LayoutStyle from '../assets/style/LayoutStyle';

class ReduxField extends Component {

    _renderComponent = ({ input, icon, placeholder, autoCorrect, autoCapitalize, secureTextEntry,  meta: { touched, error, warning } }) => {

        const hasError = (typeof error !== 'undefined' ? true : false);

        return (
            <Item error={hasError && touched}>
                {
                    (icon) ? <Icon name={icon} /> : <Text style={LayoutStyle.empty}/>
                }
                <Input {...input}
                       placeholder={placeholder}
                       autoCorrect={autoCorrect}
                       autoCapitalize={autoCapitalize}
                       secureTextEntry={secureTextEntry}
                />
                { hasError &&  touched ? <Text style={{color:'darkred'}}>{error}</Text> : <Text style={LayoutStyle.empty}/>}
            </Item>
        )
    }


    render() {

        const { name, type, icon, secureTextEntry, placeholder, autoCorrect, autoCapitalize } = this.props;

        return (
            <Field
                name={name}
                icon={icon}
                type={type}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                component={this._renderComponent}
            />
        );
    }

}

export default ReduxField;
