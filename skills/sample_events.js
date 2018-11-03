const fetch = require('node-fetch');


const answer = require('../partials/answer');


const httpHandlers = require('../components/helpers/httpHandlers');


const refRandomGenerator = require('../components/helpers/refRandomGenerator');

module.exports = function (controller) {
  // look for sticker, image and audio attachments
  // capture them, and fire special events
  controller.on('message_received', (bot, message) => {
    if (!message.text) {
      if (message.sticker_id) {
        controller.trigger('sticker_received', [bot, message]);
        return false;
      }
      if (message.attachments[0].type === 'location') {
        httpHandlers.addUserCoordinates(message.sender.id, message.attachments[0].payload.coordinates);
        bot.reply(message, 'Your order was received');
      } else if (message.attachments && message.attachments[0]) {
        controller.trigger(`${message.attachments[0].type}_received`, [bot, message]);
        return false;
      }
    }
  });

  controller.on('sticker_received', (bot, message) => {
    bot.reply(message, 'Cool sticker.');
  });

  controller.on('image_received', (bot, message) => {
    bot.reply(message, 'Nice picture.');
  });

  controller.on('audio_received', (bot, message) => {
    bot.reply(message, 'I heard that!!');
  });


  controller.on('facebook_referral', async (bot, message) => {
    try {
      const response = await fetch(`${process.env.myLink}/receive/find_user_ref_generated/${message.referral.ref}`);
      const user = await response.json();
      bot.say({
        text: 'Your link is activated',
        channel: user,
      });
    } catch (e) {
      console.log(e);
    }
    httpHandlers.addUserRefUsedToDB(message.referral.ref, message.user);
    bot.reply(message, answer.main_menu);
  });

  controller.on('facebook_postback', async (bot, message) => {
    if (message.payload === 'sample_get_started_payload') {
      try {
        const userReq = await fetch(`https://graph.facebook.com/${message.sender.id}?access_token=${process.env.page_token}&fields=first_name,last_name`);
        const { first_name, last_name, id } = await userReq.json();

        const ifNewUser = await fetch(`${process.env.myLink}/receive/is_user_in_DB/${parseInt(id)}`);
        const resIfNewUser = await ifNewUser.json();

        if (resIfNewUser === true) {
          httpHandlers.addNewUserToDB(first_name, last_name, id);
        }
      } catch (e) {
        console.log(e);
      }
      bot.reply(message, answer.main_menu);
    } else if (message.payload === 'invite_friend') {
      const ref = refRandomGenerator.randomRef();
      httpHandlers.addNewRefToDB(message.user, ref);
      bot.reply(message, {
        attachment: answer.shareInviteFriend(ref),
      });
    } else if (message.payload === 'shop') {
      try {
        const data = await fetch(`https://api.bestbuy.com/v1/products((categoryPath.id=abcat0204000))?apiKey=${process.env.apiKey}&sort=image.asc&show=image,name,url,thumbnailImage,salePrice&pageSize=7&format=json`);
        const response = await data.json();

        const gallery = answer.shopCreator(response.products);
        bot.reply(message, { attachment: gallery });
      } catch (e) {
        console.log(e);
      }
    } else if (message.postback.title === 'Buy') {
      const products = JSON.parse(message.postback.payload);
      httpHandlers.addUserProduct(message.sender.id, products);
      try {
        const ifUserPhone = await fetch(`${process.env.myLink}/receive/is_userPhone_in_DB/${parseInt(message.sender.id)}`);
        const resIfUserPhone = await ifUserPhone.json();

        if (resIfUserPhone === true) {
          bot.reply(message, answer.location);
        } else {
          bot.reply(message, answer.phone);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (message.postback.title === 'Show') {
      try {
        const response = await fetch(`${process.env.myLink}/receive/get_single_purchase/${parseInt(message.sender.id)}/${encodeURIComponent(message.postback.payload)}`);
        const currentMyPurchase = await response.json();
        const oneItemGallery = answer.singlePurchasedCreator(currentMyPurchase);
        bot.reply(message, { attachment: oneItemGallery });
      } catch (e) {
        console.log(e);
      }
    } else if (message.postback.payload === 'my_purchases') {
      try {
        const data = await
        fetch(`${process.env.myLink}/receive/get_purchases/${message.user}`);
        const response = await data.json();

        const keyVal = Object.keys(response);

        if (keyVal[0] === 'message') {
          bot.reply(message, response.message);
        } else {
          const purchases = answer.purchasesCreator(response);
          bot.reply(message, { attachment: purchases });
        }
      } catch (e) {
        console.log(e);
      }
    }
  });

  controller.on('message_received', async (bot, message) => {
    if (message.quick_reply !== undefined) {
      const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/gmi;

      const phonePayload = message.quick_reply.payload;
      const match = phonePayload.match(re);

      if (match && phonePayload.length > 2) {
        httpHandlers.addUserPhone(message.sender.id, phonePayload);
        bot.reply(message, answer.location);
      }

      if (match && phonePayload.length === 1) {
        if (message.quick_reply.payload === '8' || message.quick_reply.payload === '9' || message.quick_reply.payload === '10') {
          const ref = refRandomGenerator.randomRef();
          httpHandlers.addNewRefToDB(message.user, ref);
          bot.reply(message, {
            attachment: answer.shareInviteFriend(ref),
          });
        } else {
          httpHandlers.sendNPSresult(message.sender.id, message.quick_reply.payload);
          bot.reply(message, 'Thank you. We will be better');
        }
      } else if (message.quick_reply.payload === 'invite_friend') {
        const ref = refRandomGenerator.randomRef();
        httpHandlers.addNewRefToDB(message.user, ref);
        bot.reply(message, {
          attachment: answer.shareInviteFriend(ref),
        });
      } else if (message.quick_reply.payload === 'nps') {
        bot.reply(message, answer.nps_rating);
      } else if (message.quick_reply.payload === 'shop') {
        try {
          const data = await
          fetch(`https://api.bestbuy.com/v1/products((categoryPath.id=abcat0204000))?apiKey=${process.env.apiKey}&sort=image.asc&show=image,name,url,thumbnailImage,salePrice&pageSize=7&format=json`);
          const response = await data.json();
          const gallery = answer.shopCreator(response.products);
          bot.reply(message, { attachment: gallery });
        } catch (e) {
          console.log(e);
        }
      } else if (message.quick_reply.payload === 'my_purchases') {
        try {
          const data = await
          fetch(`${process.env.myLink}/receive/get_purchases/${message.user}`);
          const response = await data.json();

          const keyVal = Object.keys(response);
          if (keyVal[0] === 'message') {
            bot.reply(message, response.message);
          } else {
            const purchases = answer.purchasesCreator(response);
            bot.reply(message, { attachment: purchases });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  });
};
