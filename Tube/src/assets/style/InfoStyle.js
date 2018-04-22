/**
 * @providesModule InfoStyle
 */

import { StyleSheet } from 'react-native';
import { size } from 'global';

function wp (percentage) {
    const value = (percentage * size.width) / 100;
    return Math.round(value);
}

const slideHeight = (size.height * 0.4);
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = size.width;
export const itemWidth = (slideWidth + (itemHorizontalMargin * 2));

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight+150,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
    },
    imageContainerEven: {
        backgroundColor: '#969490'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: entryBorderRadius,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
    },
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        // backgroundColor: '#969490'
    },
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    scrollView: {
        flex: 1,
        paddingTop: 70
    },
    paginationContainerStyle:{
        // backgroundColor: '#969490'
    },
    paginationDotStyle:{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
    backgroundImage:{
        flex: 1,
        width: size.width,
        height: size.height,
        justifyContent: 'center',
        alignItems: 'center',
    }
});