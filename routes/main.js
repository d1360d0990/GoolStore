const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();


router.get('/', mainController.showIndex);

module.exports = router;