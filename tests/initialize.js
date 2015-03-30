module.exports = function(test, mmvp, delay_ms) {
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
};
