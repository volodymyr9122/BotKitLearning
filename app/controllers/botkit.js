const Botkit = require('botkit');

let controller = Botkit.facebookbot({
  debug: true,
  access_token: process.env.FACEBOOK_PAGE_TOKEN,
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN
  //storage: db
})

// wait for a new user to join a channel, then say hi
const WelcomeMessage = controller.on('Welcome message ', function(bot, message) {
    bot.reply(message,'Welcome to the channel!');
});

exports.WelcomeMessage = WelcomeMessage
