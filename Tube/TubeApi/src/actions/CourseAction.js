const CourseModal = require('../model/course');
const CategoryModal = require('../model/category');
const UserCourseModal = require('../model/userCourse');
const VideoModal = require('../model/video');
const s3BucketService = require('../services/S3Bucket');
const moment = require('moment');
const Thumbler = require('thumbler');
const Auth = require('../services/Auth');
const fs = require('fs');

module.exports = {

    getAllVideoByCourse: function(req, res) {
        const { courseId } = req.params;
        new Promise((resolve, reject)=> {
            CourseModal.findById(courseId, function(courseRes) {
                let { _id,title, price, description, image, video, paid, identifier, product} = courseRes;
                let responseData = { _id,title, price, description, image, video, paid, identifier, product};
                VideoModal.getByCourseId(courseId, false,function (videoRes) {
                    responseData['videos'] = videoRes;
                    resolve({status:true,data:responseData});
                });
            })
        }).then((response) => {
            res.json(response);
        });
    },

    userSubscribe: function (req, res) {
        const { params:{courseId}, user } = req;
        new Promise((resolve, reject)=> {
            CourseModal.findById(courseId,function (courseRes) {
                if(Object.keys(courseRes).length > 0) {
                    UserCourseModal.findByUserAndCourseId(user._id, courseId, function (userCourseRes) {
                        (Object.keys(userCourseRes).length > 0)
                            ? resolve({status:false,message:'You are already subscribed!'})
                            : UserCourseModal.insert({userId:user._id,courseId}, function(userCourseInsertRes) {
                                (!userCourseInsertRes)
                                    ? resolve({status:false,message:'Fail to subscribe course! Please try again!'})
                                    : resolve({status:true,message:'You are successfully subscribed'});
                            });
                    });
                } else {
                    resolve({status:false,message:'Course does not exists!'});
                }
            });
        }).then((response) => {
            res.json(response);
        });
    },

    getPopularCourse: function (req, res) {
        const { params:{limit} } = req;
        new Promise((resolve, reject)=> {
            CourseModal.findAllByLimit(limit, function (courseRes) {
                resolve({status:true, data:courseRes});
            });
        }).then((response) => {
            res.json(response);
        });
    },

    userSubscribedCourse: function (req, res) {
        const { user } = req;
        new Promise((resolve, reject)=> {
            UserCourseModal.findByUserId(user._id, function (courseRes) {
                resolve({status:true, data:courseRes});
            });
        }).then((response) => {
            res.json(response);
        });
    },

    uploadCourseVideo: function (req,res) {

      /*let tempPath = 'temp/20170811_114423.jpeg';
      Thumbler({
          type: 'video',
          input: 'https://s3.amazonaws.com/2tube.bucket/attempt/20170811_114423.mp4',
          output: tempPath,
          time: '00:00:05',
      }, function(err, path){
          console.log('path',path)
      });*/

        const { params:{courseId}, user } = req;
        const { _id } = req.user;
        let postData = {};
        let keyName = _id + '_' + moment().format('x');

        req.busboy.on('field', function(fieldname, value) {
            postData[fieldname] = value;
        });

        new Promise((resolve, reject)=> {
            CourseModal.findById(courseId,function (courseRes) {
            (Object.keys(courseRes).length == 0)
                ? resolve({status:false,message:'Course does not exist!'})
                : UserCourseModal.findByUserAndCourseId(user._id, courseRes._id, function(userCourseRes) {

                //Auto subscribe
                if (Object.keys(userCourseRes).length == 0) {
                    UserCourseModal.insert({userId:user._id,courseId:courseRes._id}, () => {});
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

                        const UploadVideoKey = keyName + '.' + filename.split('.').slice(-1)[0];
                        console.log('UploadVideoKey',UploadVideoKey);
                        s3BucketService.caurseVideo({Key:UploadVideoKey,Body:finalBuffer}, (s3Response) => {
                            if(!s3Response) {
                            res.json({status:false,message:'Fail to upload video! Please try again!'});
                        } else {
                            const attemptVideo = {
                                title: postData['title'],
                                userId: _id,
                                courseId: courseRes._id,
                                free: postData['free'],
                                image: null,
                                video: s3Response
                            };

                            VideoModal.insert(attemptVideo, (videoInsertRes) => {
                            if(!videoInsertRes) {
                                res.json({status: false, message: 'Fail to upload video! Please try again!'})
                            } else {
                                  let tempPath = 'temp/'+ keyName + '.jpeg';
                                  Thumbler({
                                      type: 'video',
                                      input: s3Response,
                                      output: tempPath,
                                      time: '00:00:05',
                                  }, function(err, path){
                                      if(!err) {
                                          fs.readFile(tempPath, function (err, data) {
                                              if (!err) {
                                                  var base64data = new Buffer(data, 'binary');
                                                  const UploadThumbKey = _id + '_' + moment().format('x') + '.jpeg';
                                                  s3BucketService.videoThumb({Key:UploadThumbKey,Body:base64data}, (thumbResponse) => {
                                                      if(thumbResponse) {
                                                        let video = [];
                                                        video['image'] = thumbResponse;
                                                        VideoModal.update(videoInsertRes._id, video, (updateResponse) => {
                                                            if(updateResponse) {
                                                                fs.unlink(tempPath, function(error) {
                                                                    if (error) {
                                                                        console.log('Not deleted');
                                                                    } else {
                                                                        console.log('Deleted');
                                                                    }
                                                                  });
                                                              }
                                                        });
                                                      }
                                                  });
                                               }
                                          });
                                      }
                                  });
                              res.json({status: true, message: 'Video uploaded successfully', data : s3Response});
                            }
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
    },

    userCreateCourse: function (req,res) {

        const { params:{categoryId}} = req;
        const { _id } = req.user;
        let postData = {};
        let keyName = _id + '_' + moment().format('x');
        let imageUrl = '';
        req.pipe(req.busboy);
        req.busboy.on('field', function(fieldname, value) {
            console.log('filed1',fieldname);
            postData[fieldname] = value;
        });


        new Promise((resolve, reject)=> {
            CategoryModal.findById(categoryId,function (categoryRes) {
                if(Object.keys(categoryRes).length == 0) {
                     resolve({status: false, message: 'Category does not exist!'})
                } else {
                    req.files = {};
                    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

                        // Create the initial array containing the stream's chunks
                        file.fileRead = [];

                        file.on('data', function (chunk) {
                            // Push chunks into the fileRead array
                            this.fileRead.push(chunk);
                        });

                        file.on('error', function (err) {
                            res.json({status: false, message: 'Fail to upload video! Please try again!'});
                        });

                        file.on('end', function () {
                            // Concat the chunks into a Buffer
                            var finalBuffer = Buffer.concat(this.fileRead);

                            const UploadImageKey = keyName + '.' + filename.split('.').slice(-1)[0];
                            console.log('UploadImageKey', UploadImageKey);

                            s3BucketService.courseImage({Key:UploadImageKey,Body:finalBuffer}, (s3Response) => {
                                if(!s3Response) {
                                    imageUrl = '';
                                } else {
                                    imageUrl = s3Response;
                                }
                            });

                        });

                    });
                    console.log('imageUrl123',imageUrl);
                    console.log('filed123',postData);
                }
            });
        }).then((response) => {
            res.json(response);
        });
    }

};
