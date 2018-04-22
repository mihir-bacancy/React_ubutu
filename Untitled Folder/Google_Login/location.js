import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coords: [],
            markers: [{
                coordinates: {
                    latitude: 23.030357,
                    longitude: 72.517845
                },
            },
                {
                    coordinates: {
                        latitude: 23.0665,
                        longitude: 72.5317
                    },
                }],

        }
    }

    componentDidMount() {

        this.getDirections("23.030357, 72.517845", "23.0665,72.5317")
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }

    render() {
        return (
            <View>
                <MapView style={styles.map} initialRegion={{
                    latitude:41.0082,
                    longitude:28.9784,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                    {this.state.markers.map((marker,index) => (
                        <MapView.Marker
                            key={index}
                            pinColor = {'blue'}
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
});

