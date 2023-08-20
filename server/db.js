const mongoose = require('mongoose')
const mongoURI = process.env.DATABASE_URL;

const mongoDB = async () => {
    try {
        console.log("hello")
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