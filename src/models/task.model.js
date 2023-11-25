const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title is mediatory field!!'],
        },
        description: {
            type: String,
            required: [true, 'description is mediatory field!!'],
        },
        assigned_user: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        due_date: {
            type: Date,
            required: true,
        },
        completion: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            select: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
