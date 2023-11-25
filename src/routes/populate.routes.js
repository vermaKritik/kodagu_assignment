const express = require('express');
const populateController  = require("../controllers/populate.controller");

const router = express.Router();

router.route("/").get(populateController.pushUsers);

module.exports = router;