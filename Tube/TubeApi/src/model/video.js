const mongoose = require('mongoose');
const moment = require('moment');

const VideoSchema = new mongoose.Schema({
    title: String,
    userId: String,
    courseId: mongoose.Schema.ObjectId,
    parentVideoId: mongoose.Schema.ObjectId,
    free: Boolean,
    image: String,
    video: String,
    createdAt: Date,
    updatedAt: Date
});

const Video = mongoose.model('video', VideoSchema);

module.exports = {

    insert: function (data, callback) {
        data['createdAt'] = moment();
        data['updatedAt'] = moment();
        new Video(data).save( function(error, data){
            callback((error) ? false : data);
        });
    },

    getByCourseId: function (courseId, isParentVideo = false, callback) {
        Video.find({courseId, "parentVideoId": {$exists: isParentVideo}}, function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        });
    },

    getAll: function (callback) {
        Video.find(function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        });
    },

    findByTitle: function (title, callback) {
        Video.findOne({title}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findById: function (id, callback) {
        Video.findById(id, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findAttemptByIdAndUserId: function (parentVideoId, userId, callback) {
        Video.find({parentVideoId, userId}, function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        });
    },

    update: function (id, data, callback) {
        this.findById(id, function(responseData) {
            if(Object.keys(responseData).length > 0) {

                Object.keys(data).map(dataKey => {
                    responseData[dataKey] = data[dataKey];
                });

                responseData['updatedAt'] = moment();

                responseData.save( function(error, data){
                    callback((error) ? false : data);
                });
            } else {
                callback(false);
            }
        });
    },
};
