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

            }
            else if (message.attachments[0].type === 'location') {
                bot.reply(message, 'Your order was received');
            }
            else if (message.attachments && message.attachments[0]) {
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
            let response = await fetch(`${process.env.myLink}/receive/find_user_ref_generated/${message.referral.ref}`);
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
        //console.log(message)
        if (message.payload == 'sample_get_started_payload') {

          try{
            let userReq = await fetch(`https://graph.facebook.com/${message.sender.id}?access_token=${process.env.page_token}&fields=first_name,last_name`)
             let {first_name, last_name, id} = await userReq.json()

             let ifNewUser = await fetch(`${process.env.myLink}/receive/is_user_in_DB/${parseInt(id)}`)
             let resIfNewUser = await ifNewUser.json();

            if(resIfNewUser === true ){
                  httpHandlers.addNewUserToDB (first_name, last_name, id);
                 }
               }
            catch(e){
                console.log(e)
         }
          bot.reply(message, answer.main_menu);
        }
        else if(message.payload ==='invite_friend'){
           let ref =  refRandomGenerator.randomRef()
            httpHandlers.addNewRefToDB(message.user, ref)
           bot.reply(message, {
            attachment: answer.shareInviteFriend(ref)
            });
        }
        else if(message.payload ==='shop'){
            try{
                let data = await fetch(`https://api.bestbuy.com/v1/products((categoryPath.id=abcat0204000))?apiKey=${process.env.apiKey}&sort=image.asc&show=image,name,url,thumbnailImage&pageSize=7&format=json`)
                let response = await data.json()
                let gallery = answer.shopCreator(response.products)
                bot.reply(message, {attachment: gallery});
            }
            catch(e){
                console.log(e)
            }

        }

        else if(message.postback.title ==='Buy'){
           bot.reply(message, answer.phone);
        }

    });

 controller.on('message_received',  async (bot, message) => {


   if (message.quick_reply!==undefined) {

    const re= /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/gmi;
    const phonePayload = message.quick_reply.payload;
    const match = phonePayload.match(re);

        if(match){
          bot.reply(message, answer.location);
        }

        else  if (message.quick_reply.payload === 'invite_friend') {
            let ref =  refRandomGenerator.randomRef()
            httpHandlers.addNewRefToDB(message.user, ref)
          bot.reply(message, {
                attachment: answer.shareInviteFriend(ref)
            });
        }

        else if(message.quick_reply.payload ==='shop'){
        try{
        let data = await
        fetch(`https://api.bestbuy.com/v1/products((categoryPath.id=abcat0204000))?apiKey=${process.env.apiKey}&sort=image.asc&show=image,name,url,thumbnailImage&pageSize=7&format=json`)
                let response = await data.json()
               // console.log(response.products)
                let gallery = answer.shopCreator(response.products)
                bot.reply(message, {attachment: gallery});
            }
            catch(e){
                console.log(e)
            }

        }


      }
    })
}

