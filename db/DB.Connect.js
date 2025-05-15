const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected`);
    } catch (err){
        console.log("Error connecting DB",err)
    }
}

module.exports = connectDB;