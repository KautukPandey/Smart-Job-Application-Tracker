const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(`Error in database connection ${error}`);
        
    }
}

module.exports = connectDB