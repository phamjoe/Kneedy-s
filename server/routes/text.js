const express = require("express");
const router = express.Router();

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
    })
  });


  router.get('/webhooks/inbound-sms', handleInboundSms);
  router.post('/webhooks/inbound-sms', handleInboundSms);



  return router;
})()
