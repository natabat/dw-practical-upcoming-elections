var tap = require('tap');
var get_ocd = require('../ocd_id.js');

tap.equal(
  get_ocd('', '', 'Wayland', 'MA', ''),
  'ocd-division/country:us/state:ma,ocd-division/country:us/state:ma/place:wayland',
  'Wayland, MA checks out'
);

tap.equal(
  get_ocd('', '', 'New York', 'NY', ''),
  'ocd-division/country:us/state:ny,ocd-division/country:us/state:ny/place:new_york',
  'New York, NY checks out'
);

tap.equal(
  get_ocd('', '', 'West Palm Beach', 'FL', ''),
  'ocd-division/country:us/state:fl,ocd-division/country:us/state:fl/place:west_palm_beach',
  'West Palm Beach, FL checks out'
);

