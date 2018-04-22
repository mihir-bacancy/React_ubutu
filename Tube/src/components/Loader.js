/**
 * @providesModule Loader
 */

import React, { Component } from 'react';
import { connect } from "react-redux";
import { View,Dimensions} from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import Orientation from 'react-native-orientation';
class Loader extends Component {
    constructor() {
        super(...arguments);
        this.state= {
            orientation: (Dimensions.get('window').height>Dimensions.get('window').width) ? 'PORTRAIT' : 'LANDSCAPE'
        };
    }

    componentDidMount() {
        Orientation.addSpecificOrientationListener((specificOrientation)=>{this._updateOrientation(specificOrientation)});
    }

    componentWillUnmount() {
        Orientation.removeSpecificOrientationListener((specificOrientation)=>{this._updateOrientation(specificOrientation)});
    }

    _updateOrientation = (specificOrientation) => {
        (Dimensions.get('window').height>Dimensions.get('window').width) ? this.setState({orientation: 'PORTRAIT'}) : this.setState({orientation: 'LANDSCAPE'});
    }

    componentWillReceiveProps({loader}) {
        if (loader == true) {
            loaderHandler.showLoader("Loading");
        } else {
            setTimeout(() => {
                //loaderHandler.hideLoader();
            },500);
        }
    }

    render() {
        return (
            <View style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                flex:1,
                position:'absolute',
                right:0,
                zIndex:999
            }}>
                <BusyIndicator />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    loader: state.loader ? state.loader : false
});

export default connect(mapStateToProps)(Loader);
