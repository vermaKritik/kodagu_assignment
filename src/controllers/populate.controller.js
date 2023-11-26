const mongoose = require('mongoose');
const staticUserData = require('../data/users.json');
const staticTaskData = require('../data/task.json');
const User = require('../models/user.model');
const Task = require('../models/task.model');

exports.populateDataBase = async (req, res, next) => {
    try {
        await User.deleteMany({});
        await Task.deleteMany({});

        const insertedUsers = await User.insertMany(staticUserData, {
            validateBeforeSave: false,
        });
        const insertedTasks = await Task.insertMany(staticTaskData, {
            validateBeforeSave: false,
        });

        res.status(201).json({
            status: 'success',
            metadata: {
                users_size: insertedUsers.length,
                tasks_size: insertedTasks.length,
            },
            data: {
                users: insertedUsers,
                tasks: insertedTasks,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.populateUsers = async (req, res, next) => {
    try {
        await User.deleteMany({});

        const insertedUsers = await User.insertMany(staticUserData, {
            validateBeforeSave: false,
        });

        res.status(201).json({
            status: 'success',
            metadata: {
                users_size: insertedUsers.length,
            },
            data: {
                users: insertedUsers,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.populateTasks = async (req, res, next) => {
    try {
        await Task.deleteMany({});

        const insertedTasks = await Task.insertMany(staticTaskData, {
            validateBeforeSave: false,
        });

        res.status(201).json({
            status: 'success',
            metadata: {
                tasks_size: insertedTasks.length,
            },
            data: {
                tasks: insertedTasks,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};
