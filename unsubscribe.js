'use strict';

module.exports.unsubscribe = (event, context, callback) => {
  var AWS = require('aws-sdk');
  var sns = new AWS.SNS();
  var response = {
    statusCode: 404,
    body: JSON.stringify({
      message: 'email address not found',
      input: event,
    }),
  };

  var params = {
    TopicArn: 'arn:aws:sns:us-east-1:392467327966:DailyDadJokesTopic'
  };
  sns.listSubscriptionsByTopic(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log("data:" + JSON.stringify(data));           // successful response
      data.Subscriptions.forEach(function (value) {
        console.log(value.Endpoint);
        if (value.Endpoint == event.body.email) {
          console.log("Email address matched. Unsubscribing!")
          var params1 = {
            SubscriptionArn: value.SubscriptionArn
          };
          sns.unsubscribe(params1, function (err, data) {
            if (err) {
              console.log(err, err.stack); // an error occurred
              response = {
                statusCode: 500,
                body: JSON.stringify({
                  message: 'UnSubscribe Event Failed:' + err,
                  input: event,
                }),
              };
              callback(null, response);

            }
            else {
              // successful response from unsubscribe operation
              console.log(data);
              response = {
                statusCode: 200,
                body: JSON.stringify({
                  message: 'UnSubscribe Event Succesful',
                  input: event,
                }),
              };
              callback(null, response);

            }
          });
        }
      });

    }
  });

};
