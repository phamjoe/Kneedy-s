const express = require("express");
const router = express.Router();
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function handleInboundSms(request, response) {
  const params = Object.assign(request.query, request.body)
  console.log(params)
  response.status(204).send()
}

module.exports = (() => {
  router.post('/', (req, res) => {
    req.on('data', (e) => {
      e = JSON.parse(e);
      console.log(e.number, e.message);
      client.messages
        .create({
          body: e.message,
          from: '+16474934161',
          to: '+1' + e.number,
        })
        .then(message => console.log(message.sid))
        .done();
    })
  });


  router.get('/inbound-sms', handleInboundSms);
  router.post('/inbound-sms', handleInboundSms);



  return router;
})();
