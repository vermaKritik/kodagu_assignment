const express = require('express');
const populateController  = require("../controllers/populate.controller");

const router = express.Router();

router.route("/").get(populateController.populateDataBase);
router.route("/users").get(populateController.populateUsers);
router.route("/tasks").get(populateController.populateTasks);

module.exports = router;