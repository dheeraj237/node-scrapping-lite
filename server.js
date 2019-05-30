const server = require('./app')();
const config = require('./configs/config');
const storage = require('./storage');

//create the basic server setup 
server.create(config, storage);

//start the server
server.start();