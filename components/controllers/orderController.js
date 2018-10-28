const  User = require('../models/user');

const newDate = function(date){
    let tmpDate = new Date(date);
    return tmpDate.getFullYear() + "-" +
           tmpDate.getMonth()+ "-" +
           tmpDate.getDate() + "-" +
           tmpDate.getHours() + "'" +
           tmpDate.getMinutes()
};






exports.add_product = ((req, res, next) => {
/*console.log('Req body product'+req.body.product+'goes here')
console.log('Req body product name'+req.body.product.name+'goes here')
console.log('Req body product salePrice'+req.body.product.salePrice+'goes here')
console.log('Req body product image'+req.body.product.image+'goes here')*/
User.findOne({userID: req.body.userID}).then((record)=>{
    record.orders.push({
        name:req.body.product.name,
        isOrderReceived:false,
        image:req.body.product.image,
        salePrice: req.body.product.salePrice,
        orderDate: newDate(Date.now()).trim()
    })
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

