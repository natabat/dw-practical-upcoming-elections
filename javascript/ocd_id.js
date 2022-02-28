const ocd_prefix = 'ocd-division/';
const ocd_us_prefix = 'country:us/';
const ocd_state_prefix = 'state:';
const ocd_place_prefix = 'place:';

function get_ocd_city(city) {
    return city.toLowerCase().replaceAll(' ', '_');
}

module.exports = function get(street1, street2, city, state, zip) {
    // TODO: geolocate address for more specific divisions
    var state_ocd = `${ocd_prefix}${ocd_us_prefix}${ocd_state_prefix}${state.toLowerCase()}`;
    return `${state_ocd},${state_ocd}/${ocd_place_prefix}${get_ocd_city(city)}`;
}