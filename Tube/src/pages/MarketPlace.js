import React, { Component } from 'react';
import {View} from 'react-native';
import withLoader from '../common/withLoader';
import withUser from '../common/withUser';
import withToast from '../common/withToast';
import withLastAction from '../common/withLastAction';
import { Content, Row, Grid } from 'native-base';
import { userLogout } from '../common/global';
import MainHeader from '../components/MainHeader';
import CourseFullSlider from '../components/CourseFullSlider';
import CategoryList from '../components/CategoryList';
import MarketCourseList from '../components/MarketCourseList';
import  FooterNav from '../components/FooterNav';
import MarketPlaceStyle from '../assets/style/MarketPlaceStyle';
import API from '../utils/AppUtil';
import { Actions } from 'react-native-router-flux';

class MarketPlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            courses:[],
            popular:[],
            activeCat:0
        }
        this._getCategories = this._getCategories.bind(this);
        this._getCourses = this._getCourses.bind(this);
        this._subscribeCourse = this._subscribeCourse.bind(this);
    }

    componentWillMount(){
       // this._getPopularCourses();
        this._getCategories();
    }

    _getCategories = () => {
        const {loader, toast} = this.props;
        loader(true);
        API.getCategory()
            .then((responseJson) => {
                loader(false);
                const {status, data} = responseJson;
                (status) ? this.setState({
                    categories:data
                }) : toast({type:'error',message:'Something went wrong! Please try again!'});
                this._getCourses(0);
            });
    }

    _getCourses = (courseIndex) => {
        const { loader, toast } = this.props;
        const { categories } = this.state;
        loader(true);
        (categories.length > 0) && API.getCoursesByCategory({courseId:categories[courseIndex]._id})
            .then((responseJson) => {
                loader(false);
                const {status, data} = responseJson;
                (status) ? this.setState({
                    courses:data,
                    activeCat:courseIndex
                }) : toast({type:'error',message:'Something went wrong! Please try again!'});
            });
    }
/*
    _getPopularCourses = () => {
        const { loader, toast } = this.props;
        loader(true);
        API.getPopularCourses({limit:5})
            .then((responseJson) => {
                loader(false);
                const {status, data} = responseJson;
                (status) ? this.setState({
                    popular:data,
                }) : toast({type:'error',message:'Something went wrong! Please try again!'});
                this._getCategories();
            });
    }
*/
    _subscribeCourse = (courseId) => {
        const { loader, toast, user, setLastAction } = this.props;
        if (user != null) {
            loader(true);
            API.subscribeToCourse({courseId: courseId})
                .then((responseJson) => {
                    loader(false);
                    const {status, message} = responseJson;
                    (status) ? toast({type: 'success', text: message}) : toast({type: 'error', text: message});
                });
        } else {
            toast({type: 'success', text: 'Login required!'});
            setLastAction({routeName:'MarketPlace',params:{}});
            Actions.Login();
        }
    }

    render () {
        const { categories, courses, activeCat, popular } = this.state;
        return (
            <View style={MarketPlaceStyle.layout}>
                <MainHeader {...this.props}/>
                <Content>
                    <Grid style={{alignItems: 'flex-start'}}>
                        { /*<Row>
                            <CourseFullSlider {...this.props} courses={popular} onSubscribe={this._subscribeCourse}/>
                        </Row> */}
                        <Row style={{marginBottom:10}}>
                            <CategoryList categories={categories} activeCat={activeCat} onSelect={this._getCourses.bind(this)} />
                        </Row>
                        <Row>
                            <MarketCourseList {...this.props} courses={courses} onSubscribe={this._subscribeCourse}/>
                        </Row>
                    </Grid>
                </Content>
                <FooterNav {...this.props}/>
            </View>
        );
    }
}

export default withUser(withLoader(withLastAction(withToast(MarketPlace))));
