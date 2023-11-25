const catchAsync = require('../utils/chtchasync');
const Task = require('../models/task.model');

exports.getAnalyticsTaskDateRange = catchAsync(async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const type = req.query.type;

    if (startDate && endDate && type) {
        return res.status(400).json({
            error: 'this endpoint either have type or it have start and end date as query param',
        });
    }

    if ((startDate && !endDate) || (!startDate && endDate)) {
        return res
            .status(400)
            .json({ error: 'Start date and end date are required.' });
    }

    if (!startDate && !endDate && !type) {
        return res.status(400).json({
            error: 'one of type or start date and and date is required',
        });
    }

    if (type) {
        switch (type) {
            case 'w':
                startDateTime = new Date();
                startDateTime.setDate(
                    startDateTime.getDate() - startDateTime.getDay()
                );
                endDateTime = new Date(startDateTime);
                endDateTime.setDate(endDateTime.getDate() + 6);
                break;
            case 'm':
                startDateTime = new Date();
                startDateTime.setDate(1);
                endDateTime = new Date(startDateTime);
                endDateTime.setMonth(endDateTime.getMonth() + 1);
                endDateTime.setDate(endDateTime.getDate() - 1);
                break;
            case 'y':
                startDateTime = new Date(new Date().getFullYear(), 0, 1);
                endDateTime = new Date(new Date().getFullYear(), 11, 31);
                break;
            default:
                return res.status(400).json({ error: 'Invalid input type.' });
        }
    }

    const stats = await Task.aggregate([
        {
            $match: {
                updatedAt: { $gte: startDateTime, $lte: endDateTime },
            },
        },
        {
            $group: {
                _id: null,
                totalTasks: { $sum: 1 },
                deletedTasks: {
                    $sum: { $cond: [{ $eq: ['$isDeleted', true] }, 1, 0] },
                },
                completedTasks: {
                    $sum: { $cond: [{ $eq: ['$completion', true] }, 1, 0] },
                },
                topTenUsers: { $addToSet: '$assigned_user' }, // Use $addToSet to get unique users
            },
        },
        {
            $project: {
                _id: 0,
                totalTasks: 1,
                deletedTasks: 1,
                completedTasks: 1,
                topTenUsers: {
                    $slice: ['$topTenUsers', 10],
                },
            },
        },
    ]);
    res.status(200).json({
        status: 'success',
        stats,
    });
});
