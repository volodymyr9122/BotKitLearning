const debug = require('debug')('botkit:incoming_webhooks');
const  reference_controller = require('../controllers/referenceController');
const  user_controller = require('../controllers/userController');

module.exports = function(webserver, controller) {

    debug('Configured POST /facebook/receive url for receiving events');
    webserver.post('/facebook/receive', function(req, res) {

        // NOTE: we should enforce the token check here

        // respond to Slack that the webhook has been received.
        res.status(200);
        res.send('ok');

        const bot = controller.spawn({});

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res, bot);

    });

    debug('Configured GET /facebook/receive url for verification');
    webserver.get('/facebook/receive', function(req, res) {
        if (req.query['hub.mode'] == 'subscribe') {
            if (req.query['hub.verify_token'] == controller.config.verify_token) {
                res.send(req.query['hub.challenge']);
            } else {
                res.send('OK');
            }
        }
    });


    // ------------------------ WEB INTERFACE ROUTES FOR MONGO  DB  -------------------------//

  //  routes used for reference schema
webserver.post('/receive/add_reference', reference_controller.add_reference);
webserver.put('/receive/add_user_ref_used', reference_controller.add_user_ref_used);
webserver.get('/receive/find_user_ref_generated/:ref', reference_controller.find_user_ref_generated);
  //  routes used for user schema
webserver.post('/receive/add_user', user_controller.add_user);
/*webserver.get(`https://graph.facebook.com/${message.sender.id}?access_token=${process.env.page_token}&fields=first_name,last_name`, user_controller.add_user);*/
}