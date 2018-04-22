/**
 * @providesModule MyToast
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notificationPop } from "ReduxActions";
import { Text } from 'react-native';
import Toast from 'react-native-simple-toast';
import LayoutStyle from 'LayoutStyle';

class MyToast extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: false,
            message:''
        };
    }

    componentWillReceiveProps({toast, removeToast}) {
        try {
            if (toast !== this.props.toast) {
                if (toast) {
                    // Add a Toast on screen.
                    Toast.showWithGravity(toast.text,Toast.SHORT,Toast.BOTTOM);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Text style={LayoutStyle.empty}/>
        );
    }
}

const mapStateToProps = state => ({
    toast: state.toast ? state.toast[state.toast.length - 1] : null
});

const mapDispatchToProps = dispatch => ({
    removeToast: () => {
        dispatch(notificationPop());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyToast);
