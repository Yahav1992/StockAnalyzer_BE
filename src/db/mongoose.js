const mongoose = require('mongoose');

require("dotenv").config();

const connectionURL = process.env.MONGO_URI;
const databaseName = process.env.DB_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(`${connectionURL}/${databaseName}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('connected to mongodb')
    } catch (e) {
        console.log(e.message, process.env.MONGO_URI, process.env.DB_NAME, process.env);
        process.exit(1);
    }
}

module.exports = connectDB;