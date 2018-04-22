import {Router,Scene,Stack}  from 'react-native-router-flux'
import React,{Component} from 'react';
import AllValues from './Components/AllValues';
import SignUp from './Components/SignUp';
const router = () => (
    <Router>
        <Stack key="root">
            <Scene key="SignUp" component={SignUp} title="SignUp" intial={true}/>
            <Scene key="AllValues" component={AllValues} title="Details" />
        </Stack>
    </Router>
);
export default router;