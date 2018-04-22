const mongoose = require('mongoose');
const moment = require('moment');

const CategorySchema = new mongoose.Schema({
    title: String,
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const Category = mongoose.model('category', CategorySchema);

module.exports = {

    insert: function (data, callback) {
        data['createdAt'] = moment();
        data['updatedAt'] = moment();
        new Category(data).save( function(error, data){
            callback((error) ? false : data);
        });
    },

    getAll: function (callback) {
        Category.find({isActive:true}, function(error, data){
            callback((error) ? [] : (data == null) ? [] : data);
        });
    },

    findById: function (id, callback) {
        Category.findById(id, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findByTitle: function (title, callback) {
        Category.findOne({title}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
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
