import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { Text, View, Thumbnail } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import styles from '.././Resources/Styles/styles';

let source;

const UploadImage = ({meta: {touched, error, warning}}) => {

    const _uploadPic = () => {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                source = { uri: response.uri };
            }
        });
    };

    return(
        <View>
            <View>
                <TouchableOpacity onPress={_uploadPic}>
                    <View>
                        { ( source === '' || source === undefined )
                            ? <Text>Select a Photo</Text>
                            : <Thumbnail large source={source}/>
                        }
                    </View>
                </TouchableOpacity>
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

export default UploadImage