//*****SET UP MONGOOSE CONECTION
//import the mongoose module
const mongoose = require('mongoose');
//set up default mongoose connection
const mongoDB = `mongodb://${process.env.dbuser}:${process.env.dbpassword}${process.env.dblink}`;

const mongooseOptions = {
    useNewUrlParser: true
};
mongoose.connect(mongoDB, mongooseOptions);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + mongoDB);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});


const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const debug = require('debug')('botkit:webserver');


module.exports = function (controller, bot) {


    const webserver = express();
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({
        extended: true
    }));

    // import express middlewares that are present in /components/express_middleware
    var normalizedPath = require("path").join(__dirname, "express_middleware");
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        require("./express_middleware/" + file)(webserver, controller);
    });

    webserver.use(express.static('public'));

    const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;
    webserver.listen(process.env.PORT || 8000, null, function () {

        debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 8000);

    });

    // import all the pre-defined routes that are present in /components/routes
    var normalizedPath = require("path").join(__dirname, "routes");
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        require("./routes/" + file)(webserver, controller);
    });


    controller.webserver = webserver;

    return webserver;

}
