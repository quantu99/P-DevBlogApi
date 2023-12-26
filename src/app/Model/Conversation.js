const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Conversation = new Schema({
    members: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});
module.exports = mongoose.model('Conversation', Conversation);
