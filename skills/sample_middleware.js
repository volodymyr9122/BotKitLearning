const httpHandlers = require('../components/helpers/httpHandlers');


module.exports = function (controller) {
  controller.middleware.receive.use((bot, message, next) => {
    httpHandlers.addNewMessageToDB(message.sender.id, message.recipient.id, message.text);
    next();
  });
};
