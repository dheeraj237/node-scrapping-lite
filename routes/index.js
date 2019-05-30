const plateformService = require('./plateformSrvc');
const router = require('express').Router();

const init = (server) => {
    server.get('*', function (req, res, next) {
        console.log('[Request] : ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.sendFile('/public/index.html');
    });

    router.get('/get-products/', plateformService.getAllProduct);
    router.post('/get-products/', plateformService.addData);
    router.get('/get-products/:platform', plateformService.getProductByPlatform);

    server.use(router)
}
module.exports = {
    init: init
};