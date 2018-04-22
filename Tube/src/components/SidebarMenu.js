/**
 * @providesModule SidebarMenu
 */
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native'

export default class SidebarMenu extends Component {

    render() {
        return (
            <ScrollView >
                <Text >Control Panel</Text>
                <TouchableOpacity >
                    <Text>Close Drawer</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
