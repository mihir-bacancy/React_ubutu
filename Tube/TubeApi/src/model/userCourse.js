const mongoose = require('mongoose');
const moment = require('moment');

const UserCourseSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    courseId: {type:mongoose.Schema.ObjectId,ref:'course'},
    createdAt: Date,
    updatedAt: Date,
});

const UserCourse = mongoose.model('user_course', UserCourseSchema);

module.exports = {

    keyReplace: function(data, oldKey, newKey) {
        return JSON.parse(JSON.stringify(data).replace(new RegExp(oldKey,"g"), newKey))
    },

    insert: function (data, callback) {
        data['createdAt'] = moment();
        data['updatedAt'] = moment();
        new UserCourse(data).save( function(error, data){
            callback((error) ? false : data);
        });
    },

    findById: function (id, callback) {
        UserCourse.findById(id, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findByUserId: function (userId, callback) {
        const that = this;
        UserCourse.find({userId}, function(error, data){
            callback((error) ? [] : (data == null) ? [] : that.keyReplace(data,'courseId','course'));
        }).populate('courseId');
    },

    findByCourseId: function (courseId, callback) {
        UserCourse.find({courseId}, function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        });
    },

    findByUserAndCourseId: function (userId, courseId, callback) {
        UserCourse.findOne({courseId, userId}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    update: function (id, data, callback) {
        this.findById(id, function(userData) {
            if(Object.keys(userData).length > 0) {

                Object.keys(data).map(userKey => {
                    userData[userKey] = data[userKey];
                });

                userData['updatedAt'] = moment();

                userData.save( function(error, data){
                    callback((error) ? false : data);
                });
            } else {
                callback(false);
            }
        });
    },
};
