'use strict';

module.exports.subscribe = (event, context, callback) => {
  var email = "";
  try {
    email = JSON.parse(event.body).email;//Lambda Proxy integration send body as string. Lambda integration will require API and Method level mapping
  } catch (e) {
    console.log("not JSON");
    email = event.body.email;
  }
  var params = {
    Protocol: 'email', /* required */
    TopicArn: process.env.SNSTopicARN, /* required */
    Endpoint: email,
  };
  var AWS = require('aws-sdk');
  var sns = new AWS.SNS();
  var response;
  sns.subscribe(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Subscribe Event Failed:' + err,
          input: event,
        }),
      };
      callback(null, response);
    }
    else {
      // successful response
      console.log(data);
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Subscribe Event Succesful',
          input: event,
        }),
      };
      callback(null, response);
    }
  });

};
