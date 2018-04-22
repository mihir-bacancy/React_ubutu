const express = require('express');
const router = express.Router();
const CourseAction = require('../actions/CourseAction');
const Auth = require('../services/Auth');

router.get('/:courseId/video', CourseAction.getAllVideoByCourse);

router.get('/popular/:limit', CourseAction.getPopularCourse);

router.get('/subscribe', Auth.validateToken, CourseAction.userSubscribedCourse);

router.put('/:courseId/subscribe', Auth.validateToken, CourseAction.userSubscribe);

router.post('/:courseId/video', Auth.validateToken, CourseAction.uploadCourseVideo);

router.post('/:categoryId/createCourse', Auth.validateToken, CourseAction.userCreateCourse);
module.exports = router;
