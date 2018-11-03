const request = require('request');


const User = require('../models/user');


exports.send_nps_questin_API = ((req, res) => {
  User.findOne({
    userID: req.body.userID,
  })
    .exec((err, userAvaible) => {
      if (err) throw err;
      else if (userAvaible) {
        const options = {
          method: 'POST',
          url: `https://graph.facebook.com/me/messages?access_token=${process.env.page_token}`,
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
          },
          body: {
            recipient: {
              id: req.body.userID,
            },

            message: {

              text: 'Would you recommend our bot to your friends ?',
              quick_replies: [
                {
                  content_type: 'text',
                  title: '1',
                  payload: '1',
                },
                {
                  content_type: 'text',
                  title: '2',
                  payload: '2',
                },
                {
                  content_type: 'text',
                  title: '3',
                  payload: '3',
                },
                {
                  content_type: 'text',
                  title: '4',
                  payload: '4',
                },
                {
                  content_type: 'text',
                  title: '5',
                  payload: '5',
                },
                {
                  content_type: 'text',
                  title: '6',
                  payload: '6',
                },
                {
                  content_type: 'text',
                  title: '7',
                  payload: '7',
                },
                {
                  content_type: 'text',
                  title: '8',
                  payload: '8',
                },
                {
                  content_type: 'text',
                  title: '9',
                  payload: '9',
                },
                {
                  content_type: 'text',
                  title: '10',
                  payload: '10',
                },
              ],

            },
          },

          json: true,
        };

        request(options, async (error, response, body) => {
          if (error) throw new Error(error);

          console.log(body);
          try {
            const respon = await body;
            res.send(respon);
          } catch (e) {
            console.log(e);
          }
        });
      } else {
        res.send({ message: 'Invalid userId' });
      }
    });
});
