const  User = require('../models/user');

exports.add_product = ((req, res, next) => {

User.findOne({userID: req.body.userID}).then((record)=>{
    record.orders.push({product:req.body.product, isOrderReceived:false })
    record.save((err) => {
                if (!err) {
                    return res.send(record);
                }else {

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
   })

  });
});

exports.add_coordinates = ((req, res, next) => {

   User.findOne({userID: req.body.userID})
       .then((record)=>{
       let notDelivered = record.orders.filter((order)=>{
        if(order.isOrderReceived===false){
        order.coordinates = req.body.coordinates,
        order.isOrderReceived= true

      }})

      record.save((err) => {
                if (!err) {
                    return res.send(record);
                }else {

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
   })
   })

})
 //console.log(order)
