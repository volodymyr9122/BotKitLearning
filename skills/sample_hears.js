/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/
const wordfilter = require('wordfilter');
const refRandomGenerator = require('../components/helpers/refRandomGenerator');


const httpHandlers = require('../components/helpers/httpHandlers');


const answer = require('../partials/answer');


module.exports = function (controller) {
  /* Collect some very simple runtime stats for use in the uptime/debug command */
  const stats = {
    triggers: 0,
    convos: 0,
  };

  controller.on('heard_trigger', () => {
    stats.triggers++;
  });

  controller.on('conversationStarted', () => {
    stats.convos++;
  });


  controller.hears(['^uptime', '^debug'], 'message_received', (bot, message) => {
    bot.createConversation(message, (err, convo) => {
      if (!err) {
        convo.setVar('uptime', formatUptime(process.uptime()));
        convo.setVar('convos', stats.convos);
        convo.setVar('triggers', stats.triggers);

        convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
        convo.activate();
      }
    });
  });

  controller.hears(['^say (.*)', '^say'], 'message_received', (bot, message) => {
    if (message.match[1]) {
      if (!wordfilter.blacklisted(message.match[1])) {
        bot.reply(message, message.match[1]);
      } else {
        bot.reply(message, '_sigh_');
      }
    } else {
      bot.reply(message, 'I will repeat whatever you say.');
    }
  });
  // my app
  controller.hears(['to invite a friend'], 'message_received', (bot, message) => {
    const ref = refRandomGenerator.randomRef();
    httpHandlers.addNewRefToDB(message.user, ref);
    bot.reply(message, {
      attachment: answer.shareInviteFriend(ref),
    });
  });

  controller.hears(['main menu'], 'message_received', (bot, message) => {
    bot.reply(message, answer.main_menu);
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Utility function to format uptime */
  function formatUptime(uptime) {
    let unit = 'second';
    if (uptime > 60) {
      uptime /= 60;
      unit = 'minute';
    }
    if (uptime > 60) {
      uptime /= 60;
      unit = 'hour';
    }
    if (uptime != 1) {
      unit += 's';
    }

    uptime = `${parseInt(uptime)} ${unit}`;
    return uptime;
  }
};
