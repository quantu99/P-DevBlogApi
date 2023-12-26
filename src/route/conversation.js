const express = require('express');
const router = express.Router();
const conversationController = require('../app/Controller/ConversationController');
router.post('/new', conversationController.createNew);
router.get('/:id', conversationController.getUserConv);
module.exports = router;
