import {Router,Scene,Stack}  from 'react-native-router-flux'
import React,{Component} from 'react';
import simpleForm from './src/Container/simpleForm';
import secondScreen from './src/Container/secondScreen';
const router = () => (
    <Router>
        <Stack key="root">
            <Scene key="simpleForm" component={simpleForm} title="SignUp" intial={true}/>
            <Scene key="secondScreen" component={secondScreen} title="Image" />

        </Stack>
    </Router>
);
export default router;