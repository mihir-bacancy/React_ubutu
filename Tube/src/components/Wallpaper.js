/**
 * @providesModule Wallpaper
 */

import React, { Component } from 'react';
import {
    Image
} from 'react-native';
import LayoutStyle from 'LayoutStyle';
import bgSrc from '../assets/images/loginWallpaper.png';

class Wallpaper extends Component {
    constructor() {
        super();
    }
    render() {

        return (

            <Image style={LayoutStyle.wallpaper} source={bgSrc}>
                {this.props.children}
            </Image>
        );
    }
}

export default Wallpaper;

