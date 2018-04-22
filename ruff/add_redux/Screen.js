import {Router,Scene,Stack}  from 'react-native-router-flux'
import React,{Component} from 'react';
import DispatchPerson from './DispatchPerson';
import home from './home';
const router = () => (
    <Router>
        <Stack key="root">
            <Scene key="home" component={home} title="SignUp" intial={true}/>
            <Scene key="DispatchPerson" component={DispatchPerson} title="Details" />

        </Stack>
    </Router>
);
export default router;