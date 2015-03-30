var test = require('tape');
var mmvp = require('../index.js');

if (process.argv[2] == '--with-color') {
  var tap_spec = require('tap-spec');
  test.createStream().pipe(tap_spec()).pipe(process.stdout);
}

var delay_ms = 300;
require('./initialize.js')(test, mmvp, delay_ms);
require('./add_and_populate.js')(test, mmvp, delay_ms);
