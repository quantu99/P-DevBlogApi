const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
let refreshTokens = [];
const AuthController = {
    // REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            // Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                avatar: req.body.avatar,
                password: hashed,
            });
            // Save user
            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // CREATE ACCESS TOKEN
    createAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_ACCESSKEY,
            { expiresIn: '20d' },
        );
    },
    // CREATE REFRESH TOKEN
    createRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_REFRESHKEY,
            { expiresIn: '365d' },
        );
    },
    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json('Wrong username');
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json('Wrong password');
            }
            if (user && validPassword) {
                const accessToken = AuthController.createAccessToken(user);
                const refreshToken = AuthController.createRefreshToken(user);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // REQUEST REFRESH TOKEN
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshToken.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESHKEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = AuthController.createAccessToken(user);
            const newRefreshToken = AuthController.createRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    },
    // LOGOUT
    logoutUser: async (req, res) => {
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        return res.status(200).json('log out success');
    },
};
module.exports = AuthController;
