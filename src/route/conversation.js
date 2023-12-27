const express = require('express');
const router = express.Router();
const conversationController = require('../app/Controller/ConversationController');
router.post('/new', conversationController.createNew);
router.get('/:id', conversationController.getUserConv);
router.get('/detail/:conversationId', conversationController.getDetailConv);
module.exports = router;
