const request = require('request');

exports.addNewRefToDB = (id, ref) => {

    let options = {
        method: 'POST',
        url: `${process.env.myLink}/receive/add_reference`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            id,
            ref
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });


};

exports.addUserRefUsedToDB = (ref, id) => {


    let options = {
        method: 'PUT',
        url: `${process.env.myLink}/receive/add_user_ref_used`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            ref,
            id
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
};

exports.addNewUserToDB = (first_name, last_name, userID) => {

    let options = {
        method: 'POST',
        url: `${process.env.myLink}/receive/add_user`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            userID,
            first_name,
            last_name
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });


};


exports.addNewMessageToDB = (sender, recipient, text) => {
    if (text !== undefined) {
        let options = {
            method: 'POST',
            url: `${process.env.myLink}/receive/add_message`,
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                sender,
                recipient,
                text
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });

    }
};


////////////////
exports.addUserProduct = (userID, product) => {
    console.log('addUserProduct product is '+product)
    let options = {
        method: 'PUT',
        url: `${process.env.myLink}/receive/add_product`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            userID,
            product
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });


};

exports.addUserCoordinates = (userID, coordinates) => {

    let options = {
        method: 'PUT',
        url: `${process.env.myLink}/receive/add_coordinates`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            userID,
            coordinates
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });


};

exports.addUserPhone = (userID, phone) => {

    let options = {
        method: 'PUT',
        url: `${process.env.myLink}/receive/add_user_phone`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            userID,
            phone
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });


};


//send NPS result
exports.sendNPSresult= (userID, rate) => {
     let options = {
        method: 'POST',
        url: `${process.env.myLink}/receive/send_nps_result`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        body: {
            userID,
            rate
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

}






/*, image_url, salePrice*/
/*console.log('addUserProduct user id'+userID)
console.log('addUserProduct product'+product)
console.log('addUserProduct product valueOf is   '+product.valueOf())
console.log('addUserProduct product toString is   '+product.toString())*/


/*:{
                product:name,
                image_url,
                salePrice
            }*/
