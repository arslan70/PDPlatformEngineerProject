'use strict';

module.exports.subscribe = (event, context, callback) => {
  var params = {
    Protocol: 'email', /* required */
    TopicArn: 'arn:aws:sns:us-east-1:392467327966:DailyDadJokesTopic', /* required */
    Endpoint: event.body.email,
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
