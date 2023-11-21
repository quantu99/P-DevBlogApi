const express = require('express');
const router = express.Router();
const authController = require('../app/Controller/AuthController');
const middlewareController = require('../app/Controller/Middleware');
// REGISTER
router.post('/register', authController.registerUser);
// LOGIN
router.post('/login', authController.loginUser);
// REQUEST REFRESH TOKEN
router.post('/refresh', authController.requestRefreshToken);
// LOGOUT
router.post('/logout', middlewareController.verifyToken, authController.logoutUser);

module.exports = router;
