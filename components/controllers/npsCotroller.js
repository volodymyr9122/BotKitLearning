const NPS = require('../models/nps');


// Add nps question
exports.send_nps_result = ((req, res) => {
  NPS.countDocuments({
    userID: req.body.userID,
  }, (err, count) => {
    if (count > 0) {
      // document exists
      res.send({
        message: 'your userID is already rigistered',
      });
    } else {
      const nps = new NPS({
        userID: req.body.userID,
        rate: req.body.rate,
        wasNPSquestionSend: true,
        timestamp: Date.now(),
      });

      nps.save((err) => {
        if (!err) {
          return res.send(nps);
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
