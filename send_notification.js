'use strict';

module.exports.sendDailyDadJoke = (event, context, callback) => {

  const snsPublish = require('aws-sns-publish');
  const https = require('https');
  var joke = "";
  var options = {
    host: 'icanhazdadjoke.com',
    headers: {
      'Accept': 'application/json'
    }
  };
  https.get(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log("joke returned from api:" + JSON.parse(chunk).joke);
      joke = JSON.parse(chunk).joke;
      if (joke != "") {
        snsPublish(joke, { arn: process.env.SNSTopicARN }).then(messageId => {
          console.log(messageId);
        });
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Message Sent, Check your email',
            input: event,
          }),
        };
        callback(null, response);
      }
      else {
        const response = {
          statusCode: 500,
          body: JSON.stringify({
            message: 'Something went wrong while fetching joke',
            input: event,
          }),
        };
        callback(null, response);
      }
    });

  }).on('error', (e) => {
    console.error(e);
  });
};