const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    cat: [
        {
            type: String,
        },
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
});
module.exports = mongoose.model('Post', Post);
