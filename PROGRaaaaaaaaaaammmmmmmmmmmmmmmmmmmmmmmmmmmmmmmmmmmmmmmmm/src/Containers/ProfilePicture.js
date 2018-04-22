import React from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import UploadImage from '../Components/UploadImage'
import Btn from "../Components/Btn";
import { Actions } from 'react-native-router-flux';

let _submit = (values) => {
    console.warn(values);
    Actions.LoginCredentials()
};

let ProfilePicture = (props) => {
    const { handleSubmit } = props;

    return(
        <View>

            <View>
                <Field name='ProfilePic' component={UploadImage} type='file'/>
            </View>

            <Btn onPress={handleSubmit(_submit)}> Next </Btn>

        </View>
    );
};

export default reduxForm({
    form: 'ReactNativeTest',
    destroyOnUnmount: false,
})(ProfilePicture)