const catchAsync = require('../utils/chtchasync');
const Task = require('../models/task.model');
const handlerFactory = require('../services/handlerFactory.service');

exports.createTask = catchAsync(async (req, res, next) => {
    const task = await handlerFactory.createOne(Task, {
        ...req.body,
        createdBy: req.user._id,
    });

    res.status(201).json({
        status: 'Success',
        task,
    });
});

exports.getAllTask = catchAsync(async (req, res, next) => {
    const tasks = await handlerFactory.getAll(Task, req.query);

    res.status(200).json({
        status: 'success',
        length: tasks.length,
        tasks,
    });
});

exports.getTask = catchAsync(async (req, res) => {
    const task = await handlerFactory.findById(Task, req.params.id);

    res.status(201).json({
        status: 'success',
        task,
    });
});

exports.updateProducts = catchAsync(async (req, res) => {
    const task = await handlerFactory.updateOne(
        Task,
        { _id: req.params.id },
        req.body
    );

    res.status(201).json({
        status: 'success',
        task,
    });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    const task = await handlerFactory.updateOne(
        Task,
        { _id: req.params.id },
        { isDeleted: 'true' }
    );

    res.status(200).json({
        status: 'success',
        task,
    });
});
