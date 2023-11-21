const express = require('express');
const router = express.Router();
const commentController = require('../app/Controller/CommentController');
router.post('/', commentController.createNewComment);
module.exports = router;
