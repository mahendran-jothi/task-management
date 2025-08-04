const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
        },
        totalTask: {
            type: Number,
            required: [true, 'Total task is required'],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            enum: ['pending', 'in_progress', 'completed','cancelled'],
            default: "pending"
        },
    },
    {
        timestamps: true,
    }
);

taskSchema.index({ name: 1 });
taskSchema.index({ createdAt: 1 });
taskSchema.index({ updatedAt: 1 });

// Create and export the Task model
module.exports = mongoose.model("Task", taskSchema);
