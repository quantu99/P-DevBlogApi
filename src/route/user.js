const express = require('express');
const router = express.Router();
const userController = require('../app/Controller/UserController');
router.get('/all', userController.getAllUser);
router.get('/:id', userController.getUserById);
module.exports = router;
