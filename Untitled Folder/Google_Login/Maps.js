import React, { Component } from "react";
import {  StyleSheet, View } from "react-native";
import { Container, Text } from "native-base";
import MapView  from 'react-native-maps'


class Maps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: 37.78825,
            longitude: -122.4324,
            error:null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("wokeeey");
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }


    render() {

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        error:this.state.error,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>
                <Text>iud8s</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Maps;