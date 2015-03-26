var test = require('tape');
var mmvp = require('./index.js');

var delay_ms = 300;
test('mmvp.initialize runs empty action', function(t) {
  t.plan(1);
  var p = new mmvp();
  var init_fn_has_run = false;
  p.set_action({
    empty: function() {
      init_fn_has_run = true;
    }
  });
  setTimeout(function() { t.equal(init_fn_has_run, true); }, delay_ms);
  p.initialize();
});

test('adding an item triggers current add_action', function(t) {
  t.plan(2);
  var p = new mmvp();
  var expect_key, expect_value;
  p.set_action({
   add: function(key, value) {
      expect_key = 'mykey';
      expect_value = 'myvalue';
    }
  });
  setTimeout(function() { 
    t.equal(expect_key, 'mykey');
    t.equal(expect_value, 'myvalue'); 
  }, delay_ms);
  p.initialize();
  p.sync({ 'mykey': 'myvalue' });
});
