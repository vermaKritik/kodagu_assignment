const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

router
    .route('/')
    .post(taskController.createTask);

router
    .route('/:id')
    .get(taskController.getTask)
    .delete(taskController.deleteProduct)
    .patch(taskController.updateProducts);

module.exports = router;
