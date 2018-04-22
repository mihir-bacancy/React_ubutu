const express = require('express');
const router = express.Router();
const VideoAction = require('../actions/VideoAction');
const Auth = require('../services/Auth');

router.get('/:videoId', VideoAction.getVideoById);

router.get('/:videoId/attempt', Auth.validateToken, VideoAction.getVideoAttemptById);

router.post('/:videoId/attempt', Auth.validateToken, VideoAction.uploadUserAttempt);


module.exports = router;
