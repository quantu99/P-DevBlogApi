const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = new Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model('Message', Message);
