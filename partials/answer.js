exports.main_menu = {
    "text": "Main menu",
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
}

exports.shareInviteFriend = (ref) =>({
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
})

exports.welcomeMessage = (id, bot) =>({

    /* bot.say({
                text: 'Look up and enjoy.More',
                channel: id // a valid facebook user id or phone number
            })*/
})


