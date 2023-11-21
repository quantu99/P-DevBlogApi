const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connect() {
    await mongoose.connect(process.env.MONGODB);
    try {
        console.log('Connected');
    } catch (err) {
        console.log('Failed');
    }
}
module.exports = { connect };
