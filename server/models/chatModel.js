const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    ids:{type:String},
    chat:[{
        type:String,
        required:true
    }]
})

const chatModel = mongoose.model("datachats",chatSchema)

module.exports = chatModel    
