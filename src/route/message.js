const express = require('express');
const router = express.Router();
const messageController = require('../app/Controller/MessageController');
router.post('/new', messageController.createNew);
router.get('/:conversationId', messageController.get);
module.exports = router;
