const VideoModal = require('../model/video');
const UserCourseModal = require('../model/userCourse');
const s3BucketService = require('../services/S3Bucket');
const moment = require('moment');
const qs = require('querystring');

module.exports = {

    getVideoById: function(req,res) {
        const { videoId } = req.params;
        new Promise((resolve, reject)=> {
            VideoModal.findById(videoId, function (videoRes) {
                resolve({status:true,data:videoRes});
            });
        }).then((response) => {
            res.json(response);
        });
    },

    getVideoAttemptById: function(req,res) {
        const { params:{videoId}, user } = req;
        new Promise((resolve, reject)=> {
            VideoModal.findById(videoId, function (videoRes) {
                let {_id,title,courseId,free,video} = videoRes;
                let responseData = {_id,title,courseId,free,video};
                VideoModal.findAttemptByIdAndUserId(videoId, user._id, function (videoRes) {
                    responseData['attempts'] = videoRes;
                    resolve({status:true,data:responseData});
                });
            });
        }).then((response) => {
            res.json(response);
        });
    },

    uploadUserAttempt: function (req,res) {
        const { params:{videoId}, user } = req;
        let postData = {};

        req.busboy.on('field', function(fieldname, value) {
            postData[fieldname] = value;
        });

        new Promise((resolve, reject)=> {
            VideoModal.findById(videoId, function (videoRes) {
                (Object.keys(videoRes).length == 0)
                    ? resolve({status:false,message:'Video does not exist!'})
                    : UserCourseModal.findByUserAndCourseId(user._id, videoRes.courseId, function(userCourseRes) {

                        //Auto subscribe
                        if (Object.keys(userCourseRes).length == 0) {
                            UserCourseModal.insert({userId:user._id,courseId:videoRes.courseId}, () => {});
                        }
                        //Upload attempt on S3Bucket
                        req.files = {};
                        req.pipe(req.busboy);
                        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

                            // Create the initial array containing the stream's chunks
                            file.fileRead = [];

                            file.on('data', function(chunk) {
                                // Push chunks into the fileRead array
                                this.fileRead.push(chunk);
                            });

                            file.on('error', function(err) {
                                res.json({status:false,message:'Fail to upload video! Please try again!'});
                            });

                            file.on('end', function() {
                                // Concat the chunks into a Buffer
                                var finalBuffer = Buffer.concat(this.fileRead);
                                const { _id } = req.user;
                                const UploadVideoKey = _id + '_' + moment().format('x') + '.' + filename.split('.').slice(-1)[0];
                                s3BucketService.userAttemptVideo({Key:UploadVideoKey,Body:finalBuffer}, (s3Response) => {
                                    if(!s3Response) {
                                        res.json({status:false,message:'Fail to upload video! Please try again!'});
                                    } else {

                                        const attemptVideo = {
                                            title: postData['title'],
                                            userId: _id,
                                            courseId: videoRes.courseId,
                                            parentVideoId: videoId,
                                            free: postData['free'],
                                            video: s3Response,
                                        };

                                        VideoModal.insert(attemptVideo, (videoInsertRes) => {
                                            (!videoInsertRes)
                                                ? res.json({status:false,message:'Fail to upload video! Please try again!'})
                                                : res.json({status:true,message:'Video uploaded successfully',data : s3Response});
                                        });
                                    }
                                });
                            });

                        });
                    });
            });
        }).then((response) => {
            res.json(response);
        });
    }

};
