const express = require('express');
const router = express.Router();
const UserAction = require('../actions/UserAction');
const Auth = require('../services/Auth');

router.post('/login', function (req, res) {
    switch(req.body.type) {
        case 'facebook':
            UserAction.facebookHandle(req, res);
            break;
        case 'manual':
            UserAction.manualLogin(req, res);
            break;
        default :
            res.status(200).json({status:false,message:'Invalid login type!'});
    }
});

router.post('/signup', function (req, res) {
    switch(req.body.type) {
        case 'facebook':
            UserAction.facebookHandle(req, res);
            break;
        case 'manual':
            UserAction.manualSignup(req, res);
            break;
        default :
            res.status(200).json({status:false,message:'Invalid signup type!'});
    }
});

router.get('/resetPassword/:code', UserAction.getResetPassword);

router.post('/resetPassword/:code', UserAction.resetPassword);

router.post('/forgotPassword', UserAction.forgotPassword);

router.get('/activate/:code', UserAction.accountActivate);

router.put('/profile', Auth.validateToken, UserAction.updateProfile);

router.post('/profileImage', Auth.validateToken, UserAction.uploadProfileImage);



module.exports = router;
