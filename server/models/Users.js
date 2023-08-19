const mongoose = require('mongoose');
const { Schema } = mongoose
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    isPublisher
})
const User = mongoose.model('User', UserSchema);
module.exports = User