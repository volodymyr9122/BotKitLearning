const request = require('request');

exports.addNewRefToDB = (id, ref) => {

    let options = {
        method: 'POST',
        url: `receive/add_reference`,
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
        url: `receive/add_user_ref_used`,
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
        url: `receive/add_user`,
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
            url: `receive/add_message`,
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
