const mongoose = require('mongoose');
const { Schema } = mongoose
const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;