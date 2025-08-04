const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        mobileNumber: {
            type: String,
            required: [true, 'Mobile number is required'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'Country is required'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'Country is required'],
            trim: true
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['male', 'female', 'other'], // restrict to known values
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({ email: 1 });
userSchema.index({ mobileNumber: 1 });
userSchema.index({ createdAt: 1 });

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
