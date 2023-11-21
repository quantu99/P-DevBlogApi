const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const MiddlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESSKEY, (err, user) => {
                if (err) {
                    console.log(err);
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },
};
module.exports = MiddlewareController;
