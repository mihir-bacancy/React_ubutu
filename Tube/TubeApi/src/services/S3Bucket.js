const config = require('../config');
const AWS = require('aws-sdk');

AWS.config.set('credentials', config.s3bucket);

const s3Bucket = new AWS.S3();

module.exports = {

    profileImage: async function (data, callback) {

        data['Bucket'] = config.profileImageBucket;
        data['ACL'] = "public-read";

        const getObjectParams = {Key:data.Key,Bucket:config.profileImageBucket};

        new Promise( async (resolve, reject)=> {
            s3Bucket.putObject(data, function(err, data){
                (err == null)
                    ?   s3Bucket.getSignedUrl('getObject',getObjectParams, function(err, url){
                            (err == null) ? resolve(url.split('?')[0]) : resolve(false);
                        })
                    : resolve(false);
            });
        }).then((response) => {
            callback(response);
        });
    },

    userAttemptVideo: async function (data, callback) {

        data['Bucket'] = config.videoAttemptBucket;
        data['ACL'] = "public-read";

        const getObjectParams = {Key:data.Key,Bucket:config.videoAttemptBucket};

        new Promise( async (resolve, reject)=> {
            s3Bucket.putObject(data, function(err, data){
                (err == null)
                    ? s3Bucket.getSignedUrl('getObject',getObjectParams, function(err, url){
                    (err == null) ? resolve(url.split('?')[0]) : resolve(false);
                })
                    : resolve(false);
            });
        }).then((response) => {
            callback(response);
        });
    },

    caurseVideo: async function (data, callback) {

        data['Bucket'] = config.videoBucket;
        data['ACL'] = "public-read";

        const getObjectParams = {Key:data.Key,Bucket:config.videoBucket};

        new Promise( async (resolve, reject)=> {
            s3Bucket.putObject(data, function(err, data){
            (err == null)
                ?   s3Bucket.getSignedUrl('getObject',getObjectParams, function(err, url){
                (err == null) ? resolve(url.split('?')[0]) : resolve(false);
            })
                : resolve(false);
        });
    }).then((response) => {
            callback(response);
    });
    },

    videoThumb: async function (data, callback) {

        data['Bucket'] = config.thumb;
        data['ACL'] = "public-read";

        const getObjectParams = {Key:data.Key,Bucket:config.thumb};

        new Promise( async (resolve, reject)=> {
            s3Bucket.putObject(data, function(err, data){
            (err == null)
                ?   s3Bucket.getSignedUrl('getObject',getObjectParams, function(err, url){
                (err == null) ? resolve(url.split('?')[0]) : resolve(false);
            })
                : resolve(false);
        });
    }).then((response) => {
            callback(response);
    });
    },

    courseImage: async function (data, callback) {

        data['Bucket'] = config.courseImage;
        data['ACL'] = "public-read";

        const getObjectParams = {Key:data.Key,Bucket:config.thumb};

        new Promise( async (resolve, reject)=> {
            s3Bucket.putObject(data, function(err, data){
                (err == null)
                    ?   s3Bucket.getSignedUrl('getObject',getObjectParams, function(err, url){
                    (err == null) ? resolve(url.split('?')[0]) : resolve(false);
                })
                    : resolve(false);
            });
        }).then((response) => {
            callback(response);
        });
    },
};
