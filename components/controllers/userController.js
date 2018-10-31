 const  User = require('../models/user');

exports.add_user = ((req, res, next) => {

    User.countDocuments({
        userID: req.body.userID
    }, function (err, count) {
        if (count > 0) {
            //document exists
            res.send({
                "message": "you are already rigistered"
            });
        } else {
            let user = new User({
                userID: req.body.userID,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            })

            user.save((err) => {
                if (!err) {
                    return res.send(user);
                } else {

                    if (err.name === 'ValidationError') {
                        res.statusCode = 400;
                        res.send({
                            error: 'Validation error'
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({
                            error: 'Server error'
                        });
                    }

                }
            });

        }
    });

});

exports.is_user_in_DB = ((req, res, next) => {
    User.findOne({
            userID: req.params.userID
        })
        .exec(function (err, userAvaible) {
            if (err) throw err;
            else if (userAvaible) {
                res.send(false)
            } else {
                res.send(true)
            }
        })

})


exports.is_userPhone_in_DB = ((req, res, next) => {
    User.findOne({userID: req.params.userID})
        .exec(function (err, userAvaible) {
            if (err) throw err;
            else if(!userAvaible){
                res.send("you are not added to user DB")
            }
            else if (userAvaible.phone) {
                res.send(true)
            } else {
                res.send(false)
            }
        })

})


//Update  phone field in user
exports.add_user_phone = ((req, res, next) => {

  User.findOneAndUpdate({userID:req.body.userID}, {phone:req.body.phone}, {new: true},
    function(err, user){
     if(err){
        if (err) throw err;
        return;
     }

      res.send(user)
});

});



