const express = require('express');
const router = express.Router();
const _ = require('lodash');
const config = require('../config/env');
const crypto = require('crypto');


let events = [];

router.get('/', function (req, res, next) {
  res.json(events);
});

router.post('/', function (req, res, next) {
  // Validate that the request body is an array
  if (!_.isArray(req.body)) {
    console.log("Bad Request: Expected JSON array");
    res.sendStatus(400);
    return;

  }


  // Extract signature from X-GTD-Signature header
  let signature = req.get('X-GTD-Signature');

  if (!signature) {
    // If no signature is provided in the header the request is unauthorized
    console.log('Unauthorized: Missing X-GTD-Signature header');
    res.sendStatus(401);
    return;
  }

  // Calculate the HMAC signature on the body
  let calculatedSignature = crypto.createHmac('sha1', config.sharedSecret).update(JSON.stringify(req.body)).digest('hex');
  if (calculatedSignature === signature) {
    // The signatures match so the shared secret in this server matches the one used by the SIP subscription service
    console.log('Received events: %s', JSON.stringify(req.body));
    events = _.concat(events, req.body);
    res.sendStatus(201);
  } else {
    // The HMAC sigatures are different so request is not authorized
    console.log('Unauthorized: HMAC signature does not match expected value');
    res.sendStatus(401);
  }
});

module.exports = router;
