module.exports = function(test, mmvp, delay_ms) {
  test('add and populate item triggers current add_action', function(t) {
    t.plan(3);
    var p = new mmvp();
    var expect_add_key, expect_add_value;
    var populate_fn_has_run = false;

    p.set_action({
      add: function(key, value) {
        expect_key = 'mykey';
        expect_value = 'myvalue';
      },
      populate: function() {
        populate_fn_has_run = true;
      }
    });

    setTimeout(function() { 
      t.equal(expect_key, 'mykey', 'Add fn was triggered with proper key');
      t.equal(expect_value, 'myvalue', 'Add fn was triggered with proper value'); 
      t.equal(populate_fn_has_run, true, 'Populate function fn runs when model becomes populated');
    }, delay_ms);
    p.initialize();
    p.sync({ 'mykey': 'myvalue' });
  });
};
