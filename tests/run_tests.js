var test = require('tape');
var mmvp = require('../index.js');
var delay_ms = 300;

require('./initialize.js')(test, mmvp, delay_ms);
require('./add_and_populate.js')(test, mmvp, delay_ms);
require('./add_populate_remove_and_empty.js')(test, mmvp, delay_ms);
