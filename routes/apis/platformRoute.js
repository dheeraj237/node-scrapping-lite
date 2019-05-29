const platformController = require('../../controllers/plateformCtrl');

const express = require('express');
let router = express.Router();
router.use('/get-products', platformController);
module.exports = router;