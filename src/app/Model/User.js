const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema(
    {
        username: { type: String, require: true, unique: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        avatar: { type: String },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('User', User);
