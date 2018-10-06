//******SET UP MONGOOSE CONECTION
//import the mongoose module
const mongoose = require('mongoose');
//set up default mongoose connection
const mongoDB =`mongodb://${process.env.dbuser}:${process.env.dbpassword}@ds113003.mlab.com:13003/fbotlearning`;

const mongooseOptions = {
  useNewUrlParser: true
};
mongoose.connect(mongoDB,mongooseOptions);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+mongoDB);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+ err);
});


var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var debug = require('debug')('botkit:webserver');
var localtunnel = require('localtunnel');

module.exports = function(controller, bot) {


    var webserver = express();
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));

    // import express middlewares that are present in /components/express_middleware
    var normalizedPath = require("path").join(__dirname, "express_middleware");
    require("fs").readdirSync(normalizedPath).forEach(function(file) {
        require("./express_middleware/" + file)(webserver, controller);
    });

    webserver.use(express.static('public'));


    webserver.listen(process.env.PORT || 3000, null, function() {

        debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);

    });

    // import all the pre-defined routes that are present in /components/routes
    var normalizedPath = require("path").join(__dirname, "routes");
    require("fs").readdirSync(normalizedPath).forEach(function(file) {
      require("./routes/" + file)(webserver, controller);
    });

    controller.webserver = webserver;

    return webserver;

}
//localtunnel settings
/*
const tunnel = localtunnel(process.env.PORT, { subdomain: 'brown-rat-91' }, (err, tunnel) => {
    if (err) console.log(err)

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    tunnel.url;
});

tunnel.on('close', function() {
    // tunnels are closed
});
*/
