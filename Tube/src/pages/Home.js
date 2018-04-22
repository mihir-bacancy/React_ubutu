import React, { Component } from 'react';
import {View, Image, Text} from 'react-native';
import withLoader from '../common/withLoader';
import { Actions } from 'react-native-router-flux';
import {Content, Card, CardItem, Button, Row, Col, Icon, Body, Grid} from 'native-base';
import { userLogout } from '../common/global';
import withUser from '../common/withUser';
import withToast from '../common/withToast';
import MainHeader from '../components/MainHeader';
import CourseSlider from '../components/CourseSlider';
import VideoList from '../components/VideoList';
import  FooterNav from '../components/FooterNav';
import HomeStyle from '../assets/style/HomeStyle';
import API from '../utils/AppUtil';
import CourseInfoStyle from '../assets/style/CourseInfoStyle';
import { size, NOPREVIEW } from '../common/global';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses:[],
            activeCourse:0,
            videos:[],
            selectedCourse:null
        }
        this._getSubscribedCourses = this._getSubscribedCourses.bind(this);
        this._gottoUploadTutorVideo = this._gottoUploadTutorVideo.bind(this);
    }

    componentWillMount() {
        this._getSubscribedCourses();
    }

    componentDidMount() {
        const {user} = this.props;
        setTimeout(() => {
            if (user == null) {
                Actions.Login();
            }
        },100);
    }

    _getSubscribedCourses = () => {
        const { activeCourse } = this.state;
        const {loader, toast, user} = this.props;
        if (user != null) {
            loader(true);

            API.getSubscribedCourses()
                .then((responseJson) => {
                    loader(false);
                    let {status, data} = responseJson;
                    if(status){
                        data = data.map((item) => (item.course));
                        this.setState({
                            courses:data
                        })
                    } else {
                        toast({type:'error',message:'Something went wrong! Please try again!'})
                    }
                    this._getVideos(activeCourse);
                });
        }
    }

    _getVideos = (courseIndex) => {
        const { courses } = this.state;
        const { loader, toast, user } = this.props;

        this.setState({activeCourse:courseIndex});
        this.setState({selectedCourse:courses[courseIndex]});

        if (courses.length > 0 && user != null) {
            loader(true);
            API.getVideoByCourse({courseId:courses[courseIndex]._id})
                .then((responseJson) => {
                    loader(false);
                    let {status, data} = responseJson;
                    (status) ? this.setState({
                        videos:data.videos
                    }) : toast({type:'error',message:'Something went wrong! Please try again!'});
                });
        }
    }

    _gotoRecord1 = (videoId) => {
        Actions.TubeScreen({videoId})
    }

    _gotoCourseMarketPlace = () => {
        Actions.MarketPlace();
    }

    _gotoViewAttempt = (videoId) => {
        Actions.ViewingRoom({videoId})
    }
    _gottoUploadTutorVideo = (courseId) => {
        Actions.UploadTutorVideo({courseId})
    }
    render () {
        const { courses, videos, activeCourse, selectedCourse } = this.state;
        return (
            <View style={HomeStyle.layout}>
                <MainHeader {...this.props} leftLabel="ADD" leftIcon="plus-circle" onLeftPress={this._gotoCourseMarketPlace.bind(this)}/>
                <Content>
                    <Grid style={{alignItems: 'center'}}>
                        <Row style={{marginBottom:10}}>
                            <CourseSlider activeCourse={activeCourse} courses={courses} onSelect={this._getVideos.bind(this)}/>
                        </Row>
                        <Row>
                        {
                            (selectedCourse != null)
                            ?

                                    <Card>
                                        <CardItem>
                                            <Grid style={HomeStyle.homeCourseContent}>
                                                <Col  style={HomeStyle.homeCourseColThumb}>
                                                    <Image style={HomeStyle.homeCourseThumb}
                                                           source={ (selectedCourse.image) ? {uri: selectedCourse.image} : NOPREVIEW}/>
                                                </Col>
                                                <Col  style={HomeStyle.courseContent}>
                                                    <Col>
                                                        <Text numberOfLines={1} style={HomeStyle.courseTitle}>{selectedCourse.title}</Text>
                                                        <Text numberOfLines={1} style={HomeStyle.courseDescription}>{selectedCourse.description}</Text>
                                                    </Col>
                                                </Col>
                                                <Col >
                                                    <Button style={{flex: 1, alignSelf: 'flex-end'}} transparent onPress={this._gottoUploadTutorVideo.bind(this,selectedCourse._id)}>
                                                        <Icon name="upload"/>
                                                    </Button>
                                                </Col>
                                            </Grid>
                                        </CardItem>
                                    </Card>

                            : true
                        }
                        </Row>
                        <Row>
                            <Col>
                                <VideoList videos={videos} onSelectRecord={this._gotoRecord1.bind(this)} onSelectView={this._gotoViewAttempt.bind(this)} />
                            </Col>
                        </Row>
                    </Grid>
                </Content>
                <FooterNav {...this.props}/>
            </View>
        );
    }
}

export default withToast(withUser(withLoader(Home)));
