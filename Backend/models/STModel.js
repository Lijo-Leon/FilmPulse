const mongoose = require('mongoose')

const STScheme = new mongoose.Schema({
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

    whyItUsed: {
        type: String,
        required: true
    },

    whenToUse: [
        {
            stUseTitle: { type: String, required: true },
            stUseAbout: { type: String, required: true }
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
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('ShotTypes', STScheme)