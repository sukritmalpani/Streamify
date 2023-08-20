const mongoose = require('mongoose');
const { Schema } = mongoose
const ReqSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    link: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})
const Req = mongoose.model('Req', ReqSchema);
module.exports = Req