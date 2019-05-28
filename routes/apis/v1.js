const platformController = require('../../controllers/plateformCtrl');

const express = require('express');
let router = express.Router();
router.use('/', platformController);
module.exports = router;