const mongoose = require('mongoose');
const config = require('config');
const connectionURL = config.get('mongoURI');
const databaseName = config.get('dbName');

const connectDB = async () => {
    try {
        await mongoose.connect(`${connectionURL}/${databaseName}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('connected to mongodb')
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

module.exports = connectDB;