const requestPromise = require('request-promise');
const sha1 = require('sha1');
const moment = require('moment');
const randtoken = require('rand-token').generator({
    chars: 'a-z'
});
const path = require('path');
const mailService = require('../services/mail');
const UsersModal = require('../model/users');
const Auth = require('../services/Auth');
const s3BucketService = require('../services/S3Bucket');
const fs = require('fs');



module.exports = {
    facebookHandle : async function(req,res) {
        const options = {
            method: 'GET',
            uri: 'https://graph.facebook.com/me',
            qs: {
                access_token: req.body.facebookToken,
                fields : 'id,name,first_name,last_name,email,picture'
            }
        };
        requestPromise(options).then(async fbRes => {
            const fbResObj = JSON.parse(fbRes);
            if(typeof fbResObj.id != 'undefined') {
                (typeof fbResObj.email != 'undefined') ? UsersModal.findByEmail(fbResObj.email,function(findMailRes) {
                    if (Object.keys(findMailRes).length > 0) {
                        //Update token
                        findMailRes['isVerified'] = true;
                        UsersModal.update(findMailRes._id, findMailRes, async function(updateRes) {
                            updateRes['token'] = await Auth.encrypt(updateRes._id);
                            res.json({status:true,data:updateRes});
                        });
                    } else {
                        //Create user
                        userData = {
                            firstName : (typeof fbResObj.first_name != 'undefined') ? fbResObj.first_name : fbResObj.name.split(' ')[0],
                            lastName : (typeof fbResObj.last_name != 'undefined') ? fbResObj.last_name : fbResObj.name.split(' ')[1],
                            email : fbResObj.email,
                            isVerified : true,
                            profileImage : (typeof fbResObj.picture.data.url != 'undefined') ? fbResObj.picture.data.url : '' ,
                            password : sha1(randtoken.generate(10)),
                            verifyCode : randtoken.generate(20)
                        };

                        UsersModal.insert(userData, async function(insertUserRes) {
                            insertUserRes['token'] = await Auth.encrypt(insertUserRes._id);
                            res.json({status:true,data:insertUserRes});
                        });
                    }
                }) : res.json({status:false,message:'Email permission must be required!'});
            } else {
                res.json({status:false,message:'Invalid login!'});
            }
        }).catch(error => {
            res.json({status:false,message:'Invalid login!'});
        });
    },

    manualLogin: async function(req,res) {
        const { email, password } = req.body;
        await UsersModal.findByCredential(email, password, async function(loginRes) {
            if(Object.keys(loginRes).length > 0) {
                if (!loginRes.isVerified) {
                    res.json({status:false,message:'Please verify your account!'});
                } else {
                    loginRes['token'] = await Auth.encrypt(loginRes._id);
                    res.json({status:true,data:loginRes});
                }
            } else {
                res.json({status:false,message:'Invalid login!'});
            }
        });
    },

    manualSignup: function(req,res) {

        UsersModal.findByEmail(req.body.email,function(findMailRes) {
            if (Object.keys(findMailRes).length > 0) {
                res.json({status:false,message:'Email already used!'});
            } else {
                const { firstName, lastName, email, password } = req.body;
                //Create user
                const userData = {
                    firstName,
                    lastName,
                    email,
                    isVerified:true,
                    profileImage:'',
                    password: sha1(password),
                    verifyCode: randtoken.generate(20)
                };
                UsersModal.insert(userData, function(insertUserRes) {
                    if (Object.keys(insertUserRes).length > 0) {
                        res.json({status:true, message:'Sing up success!', data:insertUserRes});
                        //Send Mail Verify Account
                        /*const mailData = {
                            code: userData.verifyCode,
                            email: userData.email,
                        };

                        mailService.activationsMail(mailData,function(mailRes) {
                            res.json({status:true, message:'Sing up success! Please verify your account!'});
                        });*/
                    } else {
                        res.json({status:false, message:'Sing up fail! Please try again!'});
                    }
                });
            }
        });
    },

    getResetPassword: function(req, res) {
        new Promise((resolve, reject)=> {
            UsersModal.findByResetPasswordCode(req.params.code, function (resetPasswordCodeRes) {
                if (Object.keys(resetPasswordCodeRes).length > 0) {
                    resolve({status:true});
                } else {
                    resolve({status:false,message:'Reset password link has been expired!'});
                }
            });
        }).then(({status,message}) => {
                res.render(path.resolve(__dirname + '/../views/resetPassword'), {
                title: 'Tube Reset Password',
                status,
                message
            });
        });
    },

    resetPassword: function(req, res) {
        new Promise((resolve, reject)=> {
            UsersModal.findByResetPasswordCode(req.params.code, function (resetPasswordCodeRes) {
                if (Object.keys(resetPasswordCodeRes).length > 0) {
                    if (req.body.password && req.body.confirmPassword) {
                        if((req.body.password !== '' || req.body.confirmPassword != '') && req.body.password != req.body.confirmPassword) {
                            resolve({status:true,message:'Password does not match!'});
                        } else {
                            resetPasswordCodeRes['password'] = sha1(req.body.password);
                            resetPasswordCodeRes['resetPasswordCode'] = '';
                            UsersModal.update(resetPasswordCodeRes._id, resetPasswordCodeRes, function (updateRes) {
                                (!updateRes)
                                    ? resolve({status:false, message:'Update password fail! Please try again!'})
                                    : resolve({status:true, message:'Your password has been updated successfully'});
                            });
                        }
                    } else {
                        resolve({status:true});
                    }
                } else {
                    resolve({status:false,message:'Reset password link has been expired!'});
                }
            });
        }).then(({status,message}) => {
                res.render(path.resolve(__dirname + '/../views/resetPassword'), {
                title: 'Tube Reset Password',
                status,
                message
            });
        });
    },

    forgotPassword: function(req, res) {
        new Promise((resolve, reject)=> {
            (req.body.email) ? UsersModal.findByEmail(req.body.email, function (userByMailRes) {
                if (Object.keys(userByMailRes).length > 0) {
                    userByMailRes['resetPasswordCode'] = randtoken.generate(40);
                    UsersModal.update(userByMailRes._id, userByMailRes, function (updateRes) {
                        if (!updateRes) {
                            resolve({status:false, message:'Forgot password fail! Please try again!'});
                        } else {
                            //Send Mail Forgot Password
                            const mailData = {
                                code: userByMailRes.resetPasswordCode,
                                email: userByMailRes.email,
                            };

                            mailService.forgotPasswordMail(mailData,function(mailRes) {
                                resolve({status:true, message:'Forgot password link has been sent to your mail!'});
                            });
                        }
                    });
                } else {
                    resolve({status:false, message:'Email does not exists!'});
                }
            }) : resolve({status:false, message:'Email must be required!'});
        }).then((response) => {
            res.json(response);
        });
    },

    accountActivate: function(req, res) {
        new Promise((resolve, reject)=> {
            UsersModal.findByVerifyCode(req.params.code, function (verifyCodeRes) {
                if (Object.keys(verifyCodeRes).length > 0) {
                    verifyCodeRes['isVerified'] = true;
                    verifyCodeRes['verifyCode'] = null;
                    UsersModal.update(verifyCodeRes._id, verifyCodeRes, function (updateRes) {
                        (!updateRes)
                            ? resolve('Activation fail! Please try again!')
                            : resolve('Your account has been activated');
                    })
                } else {
                    resolve('Activation link has been expired!');
                }
            });
        }).then((message) => {
            res.render(path.resolve(__dirname + '/../views/accountActivate'), {
                title: 'Tube Account verify',
                message:message
            });
        });
    },

    updateProfile: function(req, res) {
        let loggedUser = req.user;
        const {firstName, lastName, altName, email, bio, paypalId, twitter, oldPassword, newPassword} = req.body;
        new Promise((resolve, reject)=> {
            if (loggedUser) {
                //Check old password
                if (oldPassword != '' && sha1(oldPassword) != loggedUser.password) {
                    resolve({status:false,message:'Old password does not match! Please enter correct old password!'});
                }
                //Check email exist
                UsersModal.findByEmailWithId(email,loggedUser._id,(checkMailResult) => {
                    if(Object.keys(checkMailResult).length > 0) {
                        resolve({status:false,message:'Email already used! Please try with other email!'});
                    } else {
                        loggedUser['firstName'] = firstName;
                        loggedUser['lastName'] = lastName;
                        loggedUser['altName'] = altName;
                        loggedUser['email'] = email;
                        loggedUser['bio'] = bio;
                        loggedUser['paypalId'] = paypalId;
                        loggedUser['twitter'] = twitter;
                        loggedUser['password'] = (newPassword != '' && oldPassword != '') ? sha1(newPassword) : loggedUser.password;

                        UsersModal.update(loggedUser._id, loggedUser, function (updateRes) {
                            (!updateRes)
                                ? resolve({status:false,message:'Update profile fail! Please try again!'})
                                : resolve({status:true,message:'Profile updated successfully'});
                        });
                    }
                });
            } else {
                resolve({status:false,message:'Update profile fail! Please try again!'});
            }
        }).then((response) => {
                res.json(response);
        });
    },

    uploadProfileImage: function(req, res) {
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
                res.json({status:false,message:'Fail to upload profile image! Please try again!'});
            });

            file.on('end', function() {
                // Concat the chunks into a Buffer
                var finalBuffer = Buffer.concat(this.fileRead);
                const { profileImage, _id } = req.user;

                const UploadImageKey = (profileImage != '')
                    ? profileImage.split('/').slice(-1)[0]
                    : _id + '_' + moment().format('x') + '.' + filename.split('.').slice(-1)[0];

                s3BucketService.profileImage({Key:UploadImageKey,Body:finalBuffer}, (s3Response) => {
                    if(!s3Response) {
                        res.json({status:false,message:'Fail to upload profile image! Please try again!'});
                    } else {
                        req.user['profileImage'] = s3Response;
                        UsersModal.update(_id, req.user, (updateResponse) => {
                            (!updateResponse)
                                ? res.json({status:false,message:'Fail to upload profile image! Please try again!'})
                                : res.json({status:true,message:'Profile image upload successfully', data: s3Response});
                        });
                    }
                });
            });

        });
    }
};
