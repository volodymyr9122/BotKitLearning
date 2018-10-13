const request = require("request"),
      env = require('node-env-file');


module.exports = function(controller) {

  controller.middleware.receive.use(function(bot, message, next) {
    console.log('RCVD:', message.sender.id, message.recipient.id, message.text);
    addNewMessageToDB(message.sender.id, message.recipient.id, message.text)
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

 const addNewMessageToDB = (sender, recipient, text) => {
     if(text !== undefined){
        let options = {
            method: 'POST',
            url: `${process.env.myLink}/receive/add_message`,
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                sender,
                recipient,
                text
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });

     }
    };