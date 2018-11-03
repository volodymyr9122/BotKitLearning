const Reference = require('../models/reference');


// Add reference
exports.add_reference = ((req, res) => {
  console.log(req.body);

  Reference.countDocuments({ ref: req.body.ref }, (err, count) => {
    if (count > 0) {
      // document exists
      res.send({ message: 'your link is already activated' });
    } else {
      const reference = new Reference({
        id: req.body.id,
        userRefUsed: req.body.userRefUsed,
        ref: req.body.ref,
        timestamp: Date.now(),
      });

      reference.save((err) => {
        if (!err) {
          return res.send(reference);
        }

        if (err.name === 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
      });
    }
  });
});

// Update user userRefUsed field in user
exports.add_user_ref_used = ((req, res) => {
  Reference.findOneAndUpdate({ ref: req.body.ref }, { userRefUsed: req.body.id }, { new: true },
    (err, reference) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }
      /* log.info("refUsed  field was updated"); */
      res.send(reference);
    });
});


// Find user userRefUsed who generated ref link
exports.find_user_ref_generated = ((req, res) => {
  Reference.findOne({ ref: req.params.ref })
    .exec((err, reference) => {
      if (err) throw err;

      /* log.info("SenderID of ref link was found"); */
      res.send(reference.id);
    });
});
