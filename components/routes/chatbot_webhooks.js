const reference_controller = require('../controllers/referenceController'),
      user_controller = require('../controllers/userController'),
      message_controller = require('../controllers/messageController'),
      order_controller = require('../controllers/orderController');

module.exports = function(webserver, controller) {

// ------------------------  ROUTES FOR MONGO  DB  -------------------------//

  //  routes used for reference schema
webserver.post('/receive/add_reference', reference_controller.add_reference);
webserver.put('/receive/add_user_ref_used', reference_controller.add_user_ref_used);
webserver.get('/receive/find_user_ref_generated/:ref', reference_controller.find_user_ref_generated);
  //  routes used for user schema
webserver.post('/receive/add_user', user_controller.add_user);
webserver.put('/receive/add_user_phone', user_controller.add_user_phone);
webserver.get('/receive/is_user_in_DB/:userID', user_controller.is_user_in_DB);
webserver.get('/receive/is_userPhone_in_DB/:userID', user_controller.is_userPhone_in_DB);
  //  routes used for message schema
webserver.post('/receive/add_message', message_controller.add_message);
//  routes used for order schema
webserver.put('/receive/add_product', order_controller.add_product);
webserver.put('/receive/add_coordinates', order_controller.add_coordinates);
}
