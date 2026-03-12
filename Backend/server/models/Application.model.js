const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobLink: String,
    status: {
        type: String,
        enum: ["Applied", "Interview", "Rejected", "Offer"],
        default: "Applied"
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    location: String,
    notes: String
},{timestamps:true})

module.exports = mongoose.model("Application",applicationSchema)