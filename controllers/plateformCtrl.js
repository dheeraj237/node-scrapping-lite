const express = require('express');
const plateformService = require('../services/plateformSrvc');
let router = express.Router();

router.get('/', plateformService.getAllProduct);
router.post('/', plateformService.addData);
router.get('/:platform', plateformService.getProductByPlatform);

module.exports = router;