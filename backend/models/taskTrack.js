const mongoose = require("mongoose");

const taskTrackSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed', 'cancelled'],
            required: [true, 'Status is required'],
            default: "pending"
        },
        remarks: {
            type: String,
            trim: true,
            default: ''
        },

    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

taskTrackSchema.index({ createdAt: 1 });

module.exports = mongoose.model("TaskTrack", taskTrackSchema);
