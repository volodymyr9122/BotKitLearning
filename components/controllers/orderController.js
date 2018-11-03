const User = require('../models/user');


const newDate = function (date) {
  const tmpDate = new Date(date);
  return `${tmpDate.getFullYear()}-${
    tmpDate.getMonth()}-${
    tmpDate.getDate()}-${
    tmpDate.getHours()}'${
    tmpDate.getMinutes()}`;
};


exports.add_product = ((req, res) => {
  User.findOne({ userID: req.body.userID }).then((record) => {
    record.orders.push({
      name: req.body.product.name,
      isOrderReceived: false,
      image: req.body.product.image,
      salePrice: req.body.product.salePrice,
      orderDate: newDate(Date.now()).trim(),
    });
    record.save((err) => {
      if (!err) {
        return res.send(record);
      }

      if (err.name === 'ValidationError') {
        res.statusCode = 400;
        res.send({
          error: 'Validation error',
        });
      } else {
        res.statusCode = 500;
        res.send({
          error: 'Server error',
        });
      }
    });
  });
});

exports.add_coordinates = ((req, res) => {
  User.findOne({ userID: req.body.userID })
    .then((record) => {
      const notDelivered = record.orders.filter((order) => {
        if (order.isOrderReceived === false) {
          order.coordinates = req.body.coordinates,
          order.isOrderReceived = true;
        }
      });

      record.save((err) => {
        if (!err) {
          return res.send(record);
        }

        if (err.name === 'ValidationError') {
          res.statusCode = 400;
          res.send({
            error: 'Validation error',
          });
        } else {
          res.statusCode = 500;
          res.send({
            error: 'Server error',
          });
        }
      });
    });
});
