const mongoose = require('mongoose')

const CMSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    shortDescription: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    howItWorks: {
        type: String,
        required: true
    },

    whenToUse: [
        {
            useTitle: { type: String, required: true },
            useAbout: { type: String, required: true }
        }
    ],

    emotionalImpact: [
        {
            type: String,
            required: true
        }
    ],

    technicalSetup: [
        {
            type: String,
            required: true
        }
    ],

    videos: [
        {
            video: {
                type: String,
                required: true
            }
        }
    ],

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    favourite: {
        type:Boolean,
        default: false
    },

    notification: {
        type:Boolean,
        default: false
    }


})

module.exports = mongoose.model('CameraMovements', CMSchema)
