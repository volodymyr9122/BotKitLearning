const   NPS = require('../models/nps')
        timeTransition = require('../helpers/timeTransition');

// Add nps question
exports.send_nps_result = ((req, res, next) => {

 NPS.countDocuments({
        userID: req.body.userID
    }, function (err, count) {
        if (count > 0) {
            //document exists
            res.send({
                "message": "your userID is already rigistered"
            });
        } else {


    let nps = new NPS({
        userID: req.body.userID,
        rate: req.body.rate,
        wasNPSquestionSend: true,
        timestamp: Date.now()
    })

    nps.save((err) => {
        if (!err) {
            return res.send(nps);
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

    };

});
});