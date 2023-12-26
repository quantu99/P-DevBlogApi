const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = new Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
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
