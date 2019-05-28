const server = require('./configs/app')();
const config = require('./configs/config');
const storage = require('./configs/storage');

//setting initial data to storage
storage.setItem('data', [{
    "name": "Dheeraj",
    "email": "dheeraj@gmail.com"
}])

//create the basic server setup 
server.create(config, storage);

//start the server
server.start();