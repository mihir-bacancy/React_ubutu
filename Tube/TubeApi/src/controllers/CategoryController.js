const express = require('express');
const router = express.Router();
const CategoryAction = require('../actions/CategoryAction');
const Auth = require('../services/Auth');

router.get('/', CategoryAction.getAllCategory);

router.get('/:categoryId/course', CategoryAction.getAllCourseByCategory);

module.exports = router;
