import React, { Component } from 'react';
import { Content, Icon, Button, Body,Row } from 'native-base';
import { View, Image, Text} from 'react-native';
import withToast from '../common/withToast';
import withLoader from '../common/withLoader';
import withUser from '../common/withUser';
import API from '../utils/AppUtil';
import { size, storeUser, emailRegex } from '../common/global';
import InnerHeader from '../components/InnerHeader';
import UserProfileStyle from '../assets/style/UserProfileStyle';
import ProfileForm from '../components/ProfileForm';
import ImagePicker from 'react-native-image-picker';
import LayoutStyle from '../assets/style/LayoutStyle';
import avatarSrc from '../assets/images/logo.png';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            avatarSource: (this.props.user.profileImage == '') ? avatarSrc : { uri: this.props.user.profileImage},
            profileImageNew:''
        };

        this._updateProfile = this._updateProfile.bind(this);
        this._updateAvatar = this._updateAvatar.bind(this);
        this._cancelAvatar = this._cancelAvatar.bind(this);

    }

    _selectPhotoTapped = () => {
        const options = {
            title: 'Choose Profile Picture',
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take Photo',
            chooseFromLibraryButtonTitle: 'Choose from Gallery',
            cameraType: 'back',
            mediaType: 'photo',
            aspectX: 2,
            aspectY: 1,
            quality: 0.2,
            angle: 0,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, ({uri,fileName,error} ) => {

            (uri != null)
                ? this.setState({
                        avatarSource: {uri},
                        profileImageNew: { uri, filename :fileName, name:fileName,  }
                    })
                : this.props.toast({text:error, type:'error'})
        });
    }

    _updateProfile = (profileData) => {
        const {profileImageNew, avatarSource} = this.state;
        const { toast, loader, setUser } = this.props;
        const {user:{firstName, lastName, email, ...rest}} = this.props;
        loader(true);

        API.updateProfile(profileData)
            .then((responseJson) => {
                loader(false);
                const {status, message} = responseJson;
                if (status) {
                        const {firstName, lastName, email} = profileData;
                        storeUser({firstName, lastName, email, ...rest});
                        toast({text:message, type:'success'});
                        setUser({firstName, lastName, email, ...rest});

                } else {
                    toast({text:message, type:'danger'});
                }
            });
    }

    _updateAvatar = () => {
        const {profileImageNew} = this.state;
        const { toast, loader, setUser } = this.props;
        const { user:{firstName, lastName, email, ...rest} } = this.props;
        loader(true);

        API.updateAvatar(profileImageNew)
            .then((responseJson) => {
                loader(false);
                const {status, message, data} = responseJson;
                if (status) {
                    const profileImage = data;
                    storeUser({firstName, lastName, email, profileImage, ...rest});
                    toast({text:message, type:'success'});
                    setUser({firstName, lastName, email, profileImage, ...rest});
                    this.setState({
                        avatarSource : { uri :profileImage}
                    })
                } else {
                    toast({text:message, type:'danger'});
                }
            });
    }

    _cancelAvatar = () => {
        const {profileImage} = this.props.user;
        this.setState({
            avatarSource: (profileImage == '') ? avatarSrc : { uri: profileImage},
            profileImageNew:''
        })
    }

    _renderAvatarBtn() {
        return (
            <Row >
                <Button danger rounded iconRight small onPress={this._updateAvatar.bind(this)}>
                    <Text style={LayoutStyle.whiteText}>Update</Text>
                </Button>
                <Button dark rounded iconRight small>
                    <Text style={LayoutStyle.whiteText} onPress={this._cancelAvatar.bind(this)}>Cancel</Text>
                </Button>
            </Row>
        );
    }

    render () {

        let {avatarSource,profileImageNew} = this.state;
        const { user:{firstName, lastName, email} } = this.props;
        const editUserProfileValue = {
            initialValues : {firstName,lastName,email,oldPassword:'',newPassword:'',confPassword:''}
        }

        return (
            <View style={UserProfileStyle.layout}>
                <InnerHeader {...this.props}/>
                 <Content>
                     <Body>
                        <Row style={UserProfileStyle.avatarContainer}>
                            <Image style={UserProfileStyle.avatar} source={avatarSource} />
                            <Icon iconBlue name="edit" style={{position:'absolute',right:5,zIndex:99999,bottom:5}} onPress={this._selectPhotoTapped.bind(this)}/>
                        </Row>

                         { (profileImageNew != '')
                             ?
                             this._renderAvatarBtn()
                             :
                             <Text/>
                         }

                     </Body>
                     <ProfileForm {...editUserProfileValue} {...this.props} onSubmit={this._updateProfile}/>
                 </Content>
            </View>
        );
    }
}

export default withUser(withToast(withLoader(EditProfile)));
