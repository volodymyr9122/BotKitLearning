const Log = require('log'),
      log = new Log('info'),
      Reference = require('../models/Reference');



// Add user
exports.add_user = ((req, res, next) => {
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
            log.info("new reference was link created");
            return res.send(reference);
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

//Update user userRefUsed field in user
exports.add_user_ref_used = ((req, res, next) => {

  Reference.findOneAndUpdate({ref:req.body.ref}, {$set:{userRefUsed:req.body.id}}, {new: true},
    function(err, doc){
     if(err){
        console.log("Something wrong when updating data!");
     }
   console.log(doc);
});

});


//Find user userRefUsed who generated ref link
exports.find_user_ref_generated = ((req, res, next) => {

   Reference.findOne({ref:req.params.ref})
    .exec(function(err, reference) {
    if (err) throw err;

    console.log(typeof reference.id);
    res.send(reference.id);
});

})

