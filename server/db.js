const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://malpanisukrit:12345@cluster0.td4fo6n.mongodb.net/?retryWrites=true&w=majority"

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
        })
        console.log("MongoDB Connected")
        const fetched_data = await mongoose.connection
            .db.collection("Users")
            .find({})
            .toArray()
        global.users = fetched_data;
    }
    catch (err) {
        console.log(err)
    }
}
module.exports = mongoDB