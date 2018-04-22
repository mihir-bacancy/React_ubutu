const mongoose = require('mongoose');
const moment = require('moment');

const CourseSchema = new mongoose.Schema({
    title: String,
    userId: String,
    categoryId: mongoose.Schema.ObjectId,
    description: String,
    paid: Boolean,
    price: Number,
    identifier: String,
    product: String,
    image: String,
    video: String,
    createdAt: Date,
    updatedAt: Date,
});

const Course = mongoose.model('course', CourseSchema);

module.exports = {

    insert: function (data, callback) {
        data['createdAt'] = moment();
        data['updatedAt'] = moment();
        new Course(data).save( function(error, data){
            callback((error) ? false : data);
        });
    },

    getByCategoryId: function (categoryId, callback) {
        Course.find({categoryId}, function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        });
    },

    getAll: function (callback) {
        Course.find({isActive:true}, function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        });
    },

    findByTitle: function (title, callback) {
        Course.findOne({title}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findById: function (id, callback) {
        Course.findById(id, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findAllByLimit: function (limit, callback) {
        Course.find(function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        }).limit(parseInt(limit));
    },

    update: function (id, data, callback) {
        this.findById(id, function(responseData) {
            if(Object.keys(responseData).length > 0) {

                Object.keys(data).map(dataKey => {
                    responseData[dataKey] = data[dataKey];
                });

                responseData['updatedAt'] = moment();

                responseData.save( function(error, data) {
                    callback((error) ? false : data);
                });
            } else {
                callback(false);
            }
        });
    },
};
