import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Polyline from '@mapbox/polyline';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coords: [],
            markers: [
                {
                    coordinates: {
                        latitude: 23.0665,
                        longitude: 72.5317
                    },
                }],
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            }
        );
        this._getDirections("23.030357, 72.517845", "23.0665,72.5317")
    };
    _getDirections = async (startLoc, destinationLoc) => {
        try {
            alert("in try")
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            alert(typeof resp+"respnkni")
            let respJson = await JSON.parse(resp);
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch (error) {
            alert(error)
            return error
        }
    };
    render() {
        return (
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    region={this.state.region}
                >
                    <MapView.Marker
                        coordinate={this.state.region}
                    />
                    {this.state.markers.map((marker, index) => (
                        <MapView.Marker
                            key={index}
                            pinColor={'blue'}
                            coordinate={marker.coordinates}
                        />
                    ))}
                    <MapView.Polyline
                        coordinates={this.state.coords}
                        strokeWidth={4}
                        strokeColor="red"/>

                </MapView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    container: {
        height: '100%',
        width: '100%',
    }
});

