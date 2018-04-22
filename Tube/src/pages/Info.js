import React, {Component,} from 'react';
import {View, ScrollView, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import InfoSlideBar from '../components/InfoSlideBar';
import InfoStyle from '../assets/style/InfoStyle';
import {sliderWidth, itemWidth} from '../assets/style/InfoStyle';
import MainHeader from '../components/MainHeader';
import {Actions} from 'react-native-router-flux';

const slides = [
    {
        "_id": "595cddba97d92aeb02ed4815",
        "image": "https://images.pexels.com/photos/34950/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb",
    },
    {
        "_id": "595cddd297d92ad01fed481e",
        "image": "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?h=350&auto=compress&cs=tinysrgb",
    },
    {
        "_id": "595cddda97d92ad01fed481f",
        "image": "https://images.pexels.com/photos/230629/pexels-photo-230629.jpeg?h=350&auto=compress&cs=tinysrgb",
    },
    {
        "_id": "595cdde497d92ae302ed4817",
        "image": "https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg?h=350&auto=compress&cs=tinysrgb",
    },
    {
        "_id": "595cddda97d92ad01fed481f",
        "image": "https://images.pexels.com/photos/230629/pexels-photo-230629.jpeg?h=350&auto=compress&cs=tinysrgb",
    },
    {
        "_id": "595cdde497d92ae302ed4817",
        "image": "https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg?h=350&auto=compress&cs=tinysrgb",
    }
];

export default class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slides: slides,
            activeSlide: 0
        }

        this._getSlides = this._getSlides.bind(this);
        this._getPagination = this._getPagination.bind(this);
        this._gotoWelcome = this._gotoWelcome.bind(this);
        this.props.leftIcon = null;
    }

    _getSlides = () => {
        const {slides} = this.state;
        if (!slides.length) {
            return false;
        }
        return slides.map((slide, index) => {
            return (
                <InfoSlideBar
                    key={`carousel-slider-${index}`}
                    even={(index + 1) % 2 === 0}
                    data={slide}
                />
            );
        });
    }

    _getPagination = () => {

        const {slides, activeSlide} = this.state;
        return (
            <Pagination
                dotsLength={slides.length}
                activeDotIndex={activeSlide}
                containerStyle={InfoStyle.paginationContainerStyle}
                dotStyle={InfoStyle.paginationDotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    _gotoWelcome = () => {
        Actions.Welcome();
    }

    render() {
        return (
            <Image
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXy63OO-NLQ-OzO1J8aKM-N5jGxMBVWrGy1s1E-SJ5geOxCwV29A'}}
                style={InfoStyle.backgroundImage}>
                <View style={InfoStyle.container}>
                    <MainHeader {...this.props} leftIcon="chevron-left"
                                onLeftPress={this._gotoWelcome.bind(this)}/>
                    <ScrollView
                        style={InfoStyle.scrollView}
                        indicatorStyle={'white'}
                        scrollEventThrottle={200}
                    >

                        <Carousel onSnapToItem={(index) => this.setState({activeSlide: index}) }
                                  sliderWidth={sliderWidth}
                                  itemWidth={itemWidth}
                                  firstItem={1}
                                  inactiveSlideScale={0.94}
                                  inactiveSlideOpacity={0.6}
                                  enableMomentum={false}
                                  containerCustomStyle={InfoStyle.slider}
                                  contentContainerCustomStyle={InfoStyle.sliderContainer}
                                  showsHorizontalScrollIndicator={false}
                                  snapOnAndroid={true}
                                  removeClippedSubviews={false}
                        >
                            { this._getSlides() }
                        </Carousel>

                        { this._getPagination() }

                    </ScrollView>
                </View>
            </Image>
        )
    }
}

