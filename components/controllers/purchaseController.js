const User = require('../models/user');

exports.get_purchases = ((req, res) => {
  User.findOne({ userID: req.params.userID })
    .then((record) => {
      if (record) {
        if (record.orders.length > 4) {
          const result = record.orders.slice(-4);
          res.send(result);
        } else if (record.orders.length > 1) {
          res.send(record.orders);
        } else if (record.orders.length === 1) {
          res.send({ message: 'You should buy more than 1 product to see your history' });
        } else {
          res.send({ message: 'You have bought nothing yet' });
        }
      } else {
        res.send({ message: 'You are not registered yet' });
      }
    });
});

exports.get_single_purchase = ((req, res) => {
  const reqOrder = decodeURIComponent(req.params.orderDate);
  User.findOne({ userID: req.params.userID })
    .then((record) => {
      const result = record.orders
        .filter(order => JSON.stringify(`${order.orderDate} `) === JSON.stringify(reqOrder));
      res.send(result);
    });
});
