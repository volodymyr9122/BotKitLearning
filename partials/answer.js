exports.main_menu = {
    "text": "Main menu",
    "quick_replies": [
        {
            "content_type": "text",
            "title": "My purchases",
            "payload": "my_purchases",
            "image_url": "http://example.com/img/red.png"
      },
        {
            "content_type": "text",
            "title": "Shop",
            "payload": "shop",
            "image_url": "http://example.com/img/red.png"
      },
        {
            "content_type": "text",
            "title": "Favourites",
            "payload": "favourites",
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

exports.shareInviteFriend = (ref) => ({
    "type": "template",
    "payload": {
        "template_type": "generic",
        "elements": [
            {
                "title": `Your link for friends is ${ref}`,
                "subtitle": "Send link to 3 friends and get 1 product for free",
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
                                            "title": "BotKit2 best shop you ever visited",
                                            "subtitle": "Best products for low prices",
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
          },

            {
                "title": "Return",
                "subtitle": "Return to main menu",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "sample_get_started_payload"
            }
          ]
        }

        ]
    }
})


exports.shopCreator=(products) => ({

 "type": "template",
    "payload": {
        "template_type": "generic",
        "image_aspect_ratio": "square",
        "elements":
           products.map(product =>({
            title:product.name,
            image_url:product.image,

            "buttons":[
               {
                "type":"web_url",
                url:product.url,
                "title":"Info by product"
                },{
                "type":"postback",
                "title":"Purchases",
                "payload":"purchase"
               }
            ]


        }))
    }
 })







/*exports.shop = {
   "payload": {
  "template_type":"generic",
  "elements":[
       {
      "title":"<TITLE_TEXT>",
      "image_url":"<IMAGE_URL_TO_DISPLAY>",
      "subtitle":"<SUBTITLE_TEXT>",
      "default_action": {
        "type": "web_url",
        "url": "<DEFAULT_URL_TO_OPEN>",
        "messenger_extensions": "false",
        "webview_height_ratio": "<COMPACT | TALL | FULL>"
      },
      "buttons":[
         {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Details"
              },{
                "type":"postback",
                "title":"Buy",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }
      ]
    },

    <GENERIC_TEMPLATE>,
    ...
  ]
}
}*/