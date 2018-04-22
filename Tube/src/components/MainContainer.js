/**
 * @providesModule MainContainer
 */

import React, { Component, AsyncStorage } from 'react';
import { View } from 'react-native';
import withUser from 'WithUser';
import withLoader from 'WithLoader';
import MyToast from 'MyToast';
import Loader from 'Loader';
import LayoutStyle from 'LayoutStyle';
import { getUser } from 'global';

class MainContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps,prevProps) {
    }

    async componentWillMount() {
        const { setUser } = this.props;
        setUser(await getUser());
    }

    render() {

        const { loaderState } = this.props;

        return (
            <View style={(loaderState == true) ? LayoutStyle.mainContainerWithLoader : LayoutStyle.mainContainer}>
                <Loader />
                <MyToast />
            </View>
        );
    }
}

export default withUser(withLoader(MainContainer));
