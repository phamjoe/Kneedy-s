require('dotenv').config();
const express = require("express");
const router = express.Router();
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function handleInboundSms(request, response) {
  const params = Object.assign(request.query, request.body)
  console.log(params.Body);
  client.messages
    .create({
      body: "It's gonna take " + params.Body + " minutes.",
      from: '+16474934161',
      to: '+12267007741',
    })
    .then(message => console.log(message.sid))
    .done(() => {
      response.status(204).send();
    });

}

module.exports = (() => {
  router.post('/', (req, res) => {
    console.log(req.data);
    req.on('data', (e) => {
      e = JSON.parse(e);
      e.forEach((el) => {
        console.log(el.number, el.message);
        client.messages
          .create({
            body: el.message,
            from: '+16474934161',
            to: '+1' + el.number,
          })
          .then(message => console.log(message.sid))
          .done(() => {});
      });
    })
    res.end();
  });
  router.post('/inbound-sms', handleInboundSms);



  return router;
})();
