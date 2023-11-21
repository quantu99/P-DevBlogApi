const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    description: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model('Comment', Comment);
