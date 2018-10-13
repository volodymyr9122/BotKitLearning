const reference_controller = require('../controllers/referenceController'),
      user_controller = require('../controllers/userController'),
      message_controller = require('../controllers/messageController');

module.exports = function(webserver, controller) {

// ------------------------  ROUTES FOR MONGO  DB  -------------------------//

  //  routes used for reference schema
webserver.post('/receive/add_reference', reference_controller.add_reference);
webserver.put('/receive/add_user_ref_used', reference_controller.add_user_ref_used);
webserver.get('/receive/find_user_ref_generated/:ref', reference_controller.find_user_ref_generated);
  //  routes used for user schema
webserver.post('/receive/add_user', user_controller.add_user);
  //  routes used for message schema
webserver.post('/receive/add_message', message_controller.add_message);
}
