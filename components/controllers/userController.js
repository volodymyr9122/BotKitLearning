const Log = require('log'),
      log = new Log('info'),
      User = require('../models/User');

exports.add_user = ((req, res, next) => {
console.log(req.body)

    User.countDocuments({userID: req.body.userID}, function (err, count){
    if(count>0){
        //document exists
       res.send({"message" : "you are already rigistered"});
    }else
      {
       let user = new User({
           userID: req.body.userID,
           first_name:req.body.first_name,
           last_name:req.body.last_name
    })

    user.save((err) => {
        if (!err) {
            log.info("new user was created");
            return res.send(user);
        } else {

            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error (%d): (%s)', res.statusCode, err.message);

        }
    });

   }
});

});