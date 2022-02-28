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

router.post('/', function(req, res, next) {
    address = req.body;
	var ocd = get_ocd(address['street'], address['street-2'], address['city'], address['state'], address['zip']);
    console.log('Sending turbovote request');
    axios.get(`${turbovote_url}${ocd}`, {headers: {'Accept': 'application/json'}})
    .then(results => {
        res.render('elections', 
            {place: `${address['street']} ${address['street-2']} ${address['city']}, ${address['state']} ${address['zip']}`,
            elections: results.data.map(simplify_election)});
    })
    .catch(error => {
        console.error(error)
    });
});

// simplify the elections results sent to the front end so the UI doesn't have to change if the return format changes
// this could also use a unit test
function simplify_election(election)
{
    // not sure if the api can return more than one district-division per election when called with specific district divisions
    // may need to rework this if so
    var early_voting = election['district-divisions'][0]['voting-methods'].filter(v => v['type']=='early-voting')[0];

    // TODO: expand the simplified version and the template for more detail on registration methods, etc
    return {
        description: election['description'],
        date: election['date'],
        polling_place_url: election['polling_place_url'],
        early_start: early_voting['start']
    }
}

module.exports = router;