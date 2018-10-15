const request = require('request'),
      env = require('node-env-file'),
      httpHandlers = require('../components/helpers/httpHandlers');


module.exports = function(controller) {

  controller.middleware.receive.use(function(bot, message, next) {
    httpHandlers.addNewMessageToDB(message.sender.id, message.recipient.id, message.text)
    next();
});

}
