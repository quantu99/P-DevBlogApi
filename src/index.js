const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const database = require('./database');
const authRoute = require('./route/auth');
const postRoute = require('./route/post');
const commentRoute = require('./route/comment');
dotenv.config();
const PORT = process.env.PORT;
database.connect();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ROUTE
app.use('/v1/auth', authRoute);
app.use('/v1/post', postRoute);
app.use('/v1/comment', commentRoute);
app.listen(PORT || 9000, () => {
    console.log(`This app is running on http://localhost:${PORT}`);
});