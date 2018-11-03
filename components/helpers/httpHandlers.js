const request = require('request');

exports.addNewRefToDB = (id, ref) => {
  const options = {
    method: 'POST',
    url: `${process.env.myLink}/receive/add_reference`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      id,
      ref,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};

exports.addUserRefUsedToDB = (ref, id) => {
  const options = {
    method: 'PUT',
    url: `${process.env.myLink}/receive/add_user_ref_used`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      ref,
      id,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};

exports.addNewUserToDB = (first_name, last_name, userID) => {
  const options = {
    method: 'POST',
    url: `${process.env.myLink}/receive/add_user`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      userID,
      first_name,
      last_name,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};


exports.addNewMessageToDB = (sender, recipient, text) => {
  if (text !== undefined) {
    const options = {
      method: 'POST',
      url: `${process.env.myLink}/receive/add_message`,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: {
        sender,
        recipient,
        text,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);

      console.log(body);
    });
  }
};


// //////////////
exports.addUserProduct = (userID, product) => {
  console.log(`addUserProduct product is ${product}`);
  const options = {
    method: 'PUT',
    url: `${process.env.myLink}/receive/add_product`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      userID,
      product,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};

exports.addUserCoordinates = (userID, coordinates) => {
  const options = {
    method: 'PUT',
    url: `${process.env.myLink}/receive/add_coordinates`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      userID,
      coordinates,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};

exports.addUserPhone = (userID, phone) => {
  const options = {
    method: 'PUT',
    url: `${process.env.myLink}/receive/add_user_phone`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      userID,
      phone,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};


// send NPS result
exports.sendNPSresult = (userID, rate) => {
  const options = {
    method: 'POST',
    url: `${process.env.myLink}/receive/send_nps_result`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      userID,
      rate,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};


// send NPS question API
exports.sendNPSquestinAPI = (userID) => {
  const options = {
    method: 'POST',
    url: `${process.env.myLink}/receive/send_nps_questin_API`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: {
      userID,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
};
