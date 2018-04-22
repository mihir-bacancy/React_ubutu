const nodemailer = require('nodemailer');
const config = require('../config');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: config.mail.service,
    auth: {
        user: config.mail.username,
        pass: config.mail.password
    }
});

module.exports = {

    activationsMail: function(data, callback) {
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Tube" <no_reply@Tube.com>', // sender address
            to: data.email, // list of receivers
            subject: 'Tube Account Activate', // Subject line
            html: '<div>Please <a href="'+config.Host+'api/user/activate/'+data.code+'" target="__new">click here</a> to active your account.</div>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },

    forgotPasswordMail: function(data, callback) {
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Tube" <no_reply@Tube.com>', // sender address
            to: data.email, // list of receivers
            subject: 'Tube Reset password', // Subject line
            html: '<div>Please <a href="'+config.Host+'api/user/resetPassword/'+data.code+'" target="__new">click here</a> to active your account.</div>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },

};
