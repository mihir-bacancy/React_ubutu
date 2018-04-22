const mongoose = require('mongoose');
const moment = require('moment');
const sha1 = require('sha1');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    altName: String,
    isVerified: Boolean,
    verifyCode: String,
    resetPasswordCode: String,
    email: String,
    password: String,
    bio: String,
    paypalId: String,
    profileImage: String,
    twitter: String,
    createdAt: Date,
    updatedAt: Date,
    token: String
});

const Users = mongoose.model('users', UserSchema);

module.exports = {

    insert: function (userData, callback) {
        userData['createdAt'] = moment();
        userData['updatedAt'] = moment();
        new Users(userData).save( function(error, data){
            callback((error) ? false : data);
        });
    },

    findById: function (id, callback) {
        Users.findById(id, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findByCredential: function (email,password , callback) {
        Users.findOne({email, password:sha1(password)}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findByEmail: function (email, callback) {
        Users.findOne({email}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findByEmailWithId: function (email, docId, callback) {
        Users.findOne({email,_id: {$ne : docId}}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findByVerifyCode: function (verifyCode, callback) {
        Users.findOne({verifyCode}, function(error, data){
            callback((error) ? {} : (data == null) ? {} : data);
        });
    },

    findByResetPasswordCode: function (resetPasswordCode, callback) {
        Users.findOne({resetPasswordCode}, function(error, data){
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
