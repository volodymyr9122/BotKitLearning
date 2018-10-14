const request = require('request'),
      env = require('node-env-file'),
      httpHandlers = require('../components/helpers/httpHandlers');


module.exports = function(controller) {

  controller.middleware.receive.use(function(bot, message, next) {
    console.log('RCVD:', message.sender.id, message.recipient.id, message.text);
    httpHandlers.addNewMessageToDB(message.sender.id, message.recipient.id, message.text)
    next();
});


    // controller.middleware.receive.use(function(bot, message, next) {
    //
    //     // do something...
    //     console.log('RCVD:', message);
    //     next();
    //
    // });
    //
    //
    // controller.middleware.send.use(function(bot, message, next) {
    //
    //     // do something...
    //     console.log('SEND:', message);
    //     next();
    //
    // });

}
