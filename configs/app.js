const express = require('express');
const bodyParser = require('body-parser');

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (config, storage) => {
        let routes = require('../routes');
        // set all the server things
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        // add middleware to parse the json
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: false
        }));

        //Register Scrappong Job
        setInterval(async () => {
            await storage.setItem('lastUpdated', new Date().toString())
            console.log('========================================')
            console.log('cron > ', await storage.getItem('lastUpdated'));
            console.log('cron > ', await storage.getItem('data'));
        }, config.interval);


        // Set up routes
        routes.init(server);
    };


    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');
        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };
    return {
        create: create,
        start: start
    };
};