const   NPS = require('../models/nps'),
        User = require('../models/user'),
        request = require('request');


exports.send_nps_questin_API = ((req, res, next) => {
     User.findOne({
            userID: req.body.userID
        })
        .exec(function (err, userAvaible) {
            if (err) throw err;
            else if (userAvaible) {


        let options = {
        method: 'POST',
        url: `https://graph.facebook.com/me/messages?access_token=${process.env.page_token}`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
             recipient:{
                id:req.body.userID
            },

            message: {

        "text": "Would you recommend our bot to your friends ?",
        "quick_replies": [
        {
            "content_type": "text",
            "title": "1",
            "payload": "1"
        },
        {
            "content_type": "text",
            "title": "2",
            "payload": "2"
        },
        {
            "content_type": "text",
            "title": "3",
            "payload": "3"
        },
        {
            "content_type": "text",
            "title": "4",
            "payload": "4"
        },
        {
            "content_type": "text",
            "title": "5",
            "payload": "5"
        },
        {
            "content_type": "text",
            "title": "6",
            "payload": "6"
        },
        {
            "content_type": "text",
            "title": "7",
            "payload": "7"
        },
        {
            "content_type": "text",
            "title": "8",
            "payload": "8"
        },
        {
            "content_type": "text",
            "title": "9",
            "payload": "9"
        },
        {
            "content_type": "text",
            "title": "10",
            "payload": "10"
        },
     ]

             }
        },

        json: true
    };

    request(options, async function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
         try{
         let respon = await body;
        res.send(respon)
              }
    catch(e){
     console.log(e);
 }
    });

}


else {
res.send({message: 'Invalid userId'});
   }
 })

})