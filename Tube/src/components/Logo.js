/**
 * @providesModule Logo
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import LayoutStyle from 'LayoutStyle';
import logoSrc from '../assets/images/logo.png';

export default Logo = () => (
        <Image style={LayoutStyle.logoImage} source={logoSrc} />
);

