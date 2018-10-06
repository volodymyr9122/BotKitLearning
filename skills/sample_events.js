const refRandomGenerator = require('../components/controllers/refRandomGenerator'),
    userController = require('../components/controllers/referenceController'),
    request = require("request"),
    fetch = require('node-fetch');

module.exports = function (controller) {

    // look for sticker, image and audio attachments
    // capture them, and fire special events
    controller.on('message_received', function (bot, message) {

        if (!message.text) {
            if (message.sticker_id) {
                controller.trigger('sticker_received', [bot, message]);
                return false;
            } else if (message.attachments && message.attachments[0]) {
                controller.trigger(message.attachments[0].type + '_received', [bot, message]);
                return false;
            }
        }

    });

    controller.on('sticker_received', function (bot, message) {
        bot.reply(message, 'Cool sticker.');
    });

    controller.on('image_received', function (bot, message) {
        bot.reply(message, 'Nice picture.');
    });

    controller.on('audio_received', function (bot, message) {
        bot.reply(message, 'I heard that!!');
    });

    /**	 * Handle facebook referal messenger event	 * Find all needed entities and send message to sender if founded	 */

    controller.on('facebook_referral', async (bot, message) => {
        try {
            let resonse = await fetch(`http://localhost:8000/receive/find_user_ref_generated/${message.referral.ref}`);
            let user = await resonse.json()
            //console.log('User sended ref link ' + user)
            bot.say({
                text: 'Your referal link was used',
                channel: user // a valid facebook user id or phone number
            })
        } catch (e) {
            console.log(e)
        }


        addUserRefUsedToDB(message.referral.ref, message.user)
        bot.reply(message, {
            "text": "Your link is activated",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "My purchases",
                    "payload": "<POSTBACK_PAYLOAD>",
                    "image_url": "http://example.com/img/red.png"
      },
                {
                    "content_type": "text",
                    "title": "Shop",
                    "payload": "<POSTBACK_PAYLOAD>",
                    "image_url": "http://example.com/img/red.png"
      },
                {
                    "content_type": "text",
                    "title": "Favourites",
                    "payload": "<POSTBACK_PAYLOAD>",
                    "image_url": "http://example.com/img/red.png"
      },
                {
                    "content_type": "text",
                    "title": "To invite a friend",
                    "payload": "invite_friend",
                    "image_url": "http://example.com/img/red.png"
      }
     ]
        });

    });

    controller.on('facebook_postback', function (bot, message) {
        if (message.payload == 'sample_get_started_payload') {
            bot.reply(message, {
                "text": "Look up and enjoy!",
                "quick_replies": [
                    {
                        "content_type": "text",
                        "title": "My purchases",
                        "payload": "<POSTBACK_PAYLOAD>",
                        "image_url": "http://example.com/img/red.png"
      },
                    {
                        "content_type": "text",
                        "title": "Shop",
                        "payload": "<POSTBACK_PAYLOAD>",
                        "image_url": "http://example.com/img/red.png"
      },
                    {
                        "content_type": "text",
                        "title": "Favourites",
                        "payload": "<POSTBACK_PAYLOAD>",
                        "image_url": "http://example.com/img/red.png"
      },
                    {
                        "content_type": "text",
                        "title": "To invite a friend",
                        "payload": "invite_friend",
                        "image_url": "http://example.com/img/red.png"
      }
     ]
            });
        }
    });

    controller.on('message_received', async (bot, message) => {
        if (message.quick_reply.payload === 'invite_friend') {
            let ref = await refRandomGenerator.randomRef()
            addNewUserToDB(message.user, ref)
            bot.reply(message, {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "BotKit2 best shop you ever visited",
                                "subtitle": "Best products for low prices.",
                                "image_url": "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-1/p200x200/42229935_313826186086023_3070061778734940160_n.png?_nc_cat=106&oh=aec985adc9c85f51d11272cb7632f3c4&oe=5C610DCA",
                                "buttons": [
                                    {
                                        "type": "element_share",
                                        "share_contents": {
                                            "attachment": {
                                                "type": "template",
                                                "payload": {
                                                    "template_type": "generic",
                                                    "elements": [
                                                        {
                                                            "title": "It worth visiting",
                                                            "subtitle": "Hey buddy you should see it",
                                                            "image_url": "https://bot.peters-hats.com/img/hats/fez.jpg",
                                                            "default_action": {
                                                                "type": "web_url",
                                                                "url": `http://m.me/313826116086030?ref=${ref}`
                                                            },
                                                            "buttons": [
                                                                {
                                                                    "type": "web_url",
                                                                    "url": `http://m.me/313826116086030?ref=${ref}`,
                                                                    "title": `join us your ref is ${ref}`
                            }
                          ]
                        }
                      ]
                                                }
                                            }
                                        }
              }
            ]
          }
        ]
                    }
                }
            });
        }

    })


    const addNewUserToDB = (id, ref) => {

        let options = {
            method: 'POST',
            url: 'http://localhost:8000/receive/add_user',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                id,
                ref
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });


    };

    const addUserRefUsedToDB = (ref, id) => {


        let options = {
            method: 'POST',
            url: 'http://localhost:8000/receive/add_user_ref_used',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                ref,
                id
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    };

}
