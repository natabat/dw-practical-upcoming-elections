var express = require('express');
var router = express.Router();
var get_ocd = require('../ocd_id.js');
const axios = require('axios');
const turbovote_url = 'https://api.turbovote.org/elections/upcoming?district-divisions=';

const urldata = {
    host: 'api.turbovote.org',
    path: 'elections/upcoming',
    method: 'GET'
}

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Search Results', states: postalAbbreviations });
  });

router.post('/', function(req, res, next) {
    address = req.body;
	var ocd = get_ocd(address.street, address.street-2, address.city, address.state, address.zip);
    console.log('Sending turbovote request');
    axios.get(turbovote_url + ocd, {'content-type': 'application/json'})
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.error(error)
    });
});

module.exports = router;