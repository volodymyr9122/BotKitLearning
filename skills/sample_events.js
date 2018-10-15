const refRandomGenerator = require('../components/helpers/refRandomGenerator'),
      httpHandlers = require('../components/helpers/httpHandlers'),
      answer = require('../partials/answer'),
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



    controller.on('facebook_referral', async (bot, message) => {
        try {
            let response = await fetch(`receive/find_user_ref_generated/${message.referral.ref}`);
            let user = await response.json()
            bot.say({
                text: 'Your link is activated',
                channel: user
            })
        } catch (e) {
            console.log(e)
        }
     httpHandlers.addUserRefUsedToDB(message.referral.ref, message.user)

        bot.reply(message, answer.main_menu);
    });

    controller.on('facebook_postback', async (bot, message) =>{
        if (message.payload == 'sample_get_started_payload') {
          try{
            let userReq = await fetch(`https://graph.facebook.com/${message.sender.id}?access_token=${process.env.page_token}&fields=first_name,last_name`)
             let {first_name, last_name, id} = await userReq.json()

             let ifNewUser = await fetch(`receive/is_user_in_DB/${parseInt(id)}`)
             let resIfNewUser = await ifNewUser.json();

            if(resIfNewUser === true ){
                  bot.say({
                  text: 'Look up and enjoy.More',
                  channel: id
                });
                  httpHandlers.addNewUserToDB (first_name, last_name, id);
                 }
               }
            catch(e){
                console.log(e)
         }
          bot.reply(message, answer.main_menu);
        }
    });

 controller.on('message_received',  (bot, message) => {
   if (message.quick_reply!==undefined) {
      if (message.quick_reply.payload === 'invite_friend') {
            let ref =  refRandomGenerator.randomRef()
            httpHandlers.addNewRefToDB(message.user, ref)
          bot.reply(message, {
                attachment: answer.shareInviteFriend(ref)
            });
        }
      }
    })
}

