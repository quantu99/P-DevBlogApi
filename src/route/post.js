const express = require('express');
const router = express.Router();
const postController = require('../app/Controller/PostController');
router.get('/all', postController.getAllPosts);
router.get('/:id', postController.getSinglePost);
router.post('/', postController.createNewPost);
module.exports = router;
