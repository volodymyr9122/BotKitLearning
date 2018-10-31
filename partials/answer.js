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
            "title": "NPS",
            "payload": "nps",
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


exports.shopCreator = function (products) {

return {
 "type": "template",
    "payload": {
        "template_type": "generic",
        "image_aspect_ratio": "square",
        "elements":
           products.map(function(product) {

            return{

            title:product.name,
            image_url:product.image,
            subtitle:product.salePrice,
            "buttons":[
               {
                "type":"web_url",
                url:product.url,
                "title":"Info by product"
                },
                {
                "type":"postback",
                "title":"Buy",
                "payload": JSON.stringify(product)
               }
            ]
            }

        })
    }}
}



exports.phone = {
    "text": "Please share your  phone",
    "payload":"location",
    "quick_replies": [
        {
            "content_type":"user_phone_number"
      }
     ]
}

exports.location = {
    "text": "Please share your  location",
    "quick_replies": [
        {
            "content_type":"location"
      }
     ]
}



exports.purchasesCreator = (products) => ({
    "type": "template",
      "payload": {
        "template_type": "list",
        "top_element_style": "compact",
        "elements":
           products.map(product =>({

               title:product.name,
               subtitle: `Date: ${product.orderDate}  \n
                          Price: ${product.salePrice}`,

            "buttons":[
              {
                "type":"postback",
                "title":"Show",
                "payload":`${product.orderDate} `
               }
            ]

           })),


         "buttons": [
          {
            "title": "Return to main menu",
            "type": "postback",
            "payload": "sample_get_started_payload"
          }
        ]
      }

})




////
exports.singlePurchasedCreator = (product) => ({

 "type": "template",
    "payload": {
        "template_type": "generic",
        "image_aspect_ratio": "square",
        "elements":[
           ({
            title:product[0].name,
            image_url:product[0].image,
            subtitle:product[0].salePrice,

            "buttons":[
            {
            "type":"postback",
            "title":"Buy",
            "payload": JSON.stringify(product[0])
            },
            {
            "title": "Return to My Purchases",
            "type": "postback",
            "payload": "my_purchases"
             }
            ],


        })]

    }
 })


exports.nps_rating = {
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


/*exports.shopCreator=(products) => ({

 "type": "template",
    "payload": {
        "template_type": "generic",
        "image_aspect_ratio": "square",
        "elements":
           products.map(product =>({
            title:product.name,
            image_url:product.image,
            subtitle:product.salePrice,

            "buttons":[
               {
                "type":"web_url",
                url:product.url,
                "title":"Info by product"
                },
                {
                "type":"postback",
                "title":"Buy",
                "payload": JSON.stringify(product)
               }
            ]


        }))
    }
 })*/