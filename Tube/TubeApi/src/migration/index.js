const CategoryModal = require('../model/category');
const CourseModal = require('../model/course');
const VideoModal = require('../model/video');
const appData = require('./dataset.json');

module.exports = {
    init: function() {
        appData.map(function(data) {
            CategoryModal.findByTitle(data['title'], function(findCategoryRes){
                (Object.keys(findCategoryRes).length == 0) && CategoryModal.insert(data, function(categoryRes) {
                    data['courses'].map(function(course){
                        course['categoryId'] = categoryRes._id;
                        CourseModal.findByTitle(course['title'], function(findCourseRes){
                            (Object.keys(findCourseRes).length == 0) && CourseModal.insert(course, function (courseRes) {
                                course['videos'].map(function(video) {
                                    video['courseId'] = courseRes._id;
                                    VideoModal.findByTitle(video['title'], function(findVideoRes){
                                        (Object.keys(findVideoRes).length == 0) && VideoModal.insert(video, function (videoRes) {});
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
};
