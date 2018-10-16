 const  Reference = require('../models/reference');



// Add reference
exports.add_reference = ((req, res, next) => {
console.log(req.body)

    Reference.countDocuments({ref: req.body.ref}, function (err, count){
    if(count>0){
        //document exists
       res.send({"message" : "your link is already activated"});
    }else
      {
       let reference = new Reference({
        id: req.body.id,
        userRefUsed: req.body.userRefUsed,
        ref: req.body.ref,
        timestamp:Date.now()
    })

    reference.save((err) => {
        if (!err) {
            return res.send(reference);
        } else {

            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }

        }
    });

   }
});

});

//Update user userRefUsed field in user
exports.add_user_ref_used = ((req, res, next) => {

  Reference.findOneAndUpdate({ref:req.body.ref}, {userRefUsed:req.body.id}, {new: true},
    function(err, reference){
     if(err){
        console.log("Something wrong when updating data!");
     }
    /*log.info("refUsed  field was updated");*/
      res.send(reference)
});

});


//Find user userRefUsed who generated ref link
exports.find_user_ref_generated = ((req, res, next) => {

   Reference.findOne({ref:req.params.ref})
    .exec(function(err, reference) {
    if (err) throw err;

    /*log.info("SenderID of ref link was found");*/
    res.send(reference.id);
});

})

