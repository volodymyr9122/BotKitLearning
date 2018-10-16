 /*Log = require('log'),
      log = new Log('info'),*/
 const   Message = require('../models/message');



// Add message
exports.add_message = ((req, res, next) => {
console.log(req.body)

    let message = new Message({
        sender: req.body.sender,
        recipient: req.body.recipient,
        text: req.body.text,
        timestamp:Date.now()
    })

    message.save((err) => {
        if (!err) {
           /* log.info("message was saved");*/
            return res.send(message);
        } else {

            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
           /* log.error('Internal error (%d): (%s)', res.statusCode, err.message);*/

        }
    });

})