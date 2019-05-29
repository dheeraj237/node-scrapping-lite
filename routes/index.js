const apiRoute = require('./apis/platformRoute');

const init = (server) => {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.sendFile('/public/index.html');
    });

    // registering routes
    server.use('/api', apiRoute);
}
module.exports = {
    init: init
};