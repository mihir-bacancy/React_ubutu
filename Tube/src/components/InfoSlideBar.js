/**
 * @providesModule InfoSlideBar
 */
import React, {Component} from 'react';
import {
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import InfoStyle from 'InfoStyle';


export default class InfoSlideBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={InfoStyle.slideInnerContainer}
            >
                <View key={this.props.data._id} style={[InfoStyle.imageContainer, InfoStyle.imageContainerEven]}>
                    <Image source={{uri: this.props.data.image}} style={InfoStyle.image}/>
                </View>
            </TouchableOpacity>
        );
    }
}