var Mmmvc = (function(my) {
  var add_action = function() {}, 
  remove_action = function() {}, 
  empty_action = function() {},
  populate_action = function() {}, 
  model = {};

  function sync(hash_with_unique_keys) { 
    var add_items = _.omit(hash_with_unique_keys, _.keys(model));
    var remove_items = _.omit(model, _.keys(hash_with_unique_keys));

    _.each(_.pick(model, _.keys(hash_with_unique_keys)), function(v,k) {
      _.each(_.keys(model[k]), function(key) {
        if (model[k][key] != hash_with_unique_keys[k][key]) {
          model[k] = hash_with_unique_keys[k];
          update_action(k,model[k]);
          return;
        }
      });
    });

    if (_.size(hash_with_unique_keys) == 0 && _.size(model) != 0) { empty_action(); }
    if (_.size(model) == 0 && _.size(hash_with_unique_keys) != 0) { populate_action(); }

    _.each(add_items, function(value, key) { add_action(key, value); });
    _.each(remove_items, function(value, key) { remove_action(key, value) });

    model = hash_with_unique_keys;
  }
  return {
    set_empty_action    : function(action) { empty_action    = action; },
    set_populate_action : function(action) { populate_action = action; },
    set_add_action      : function(action) { add_action      = action; },
    set_remove_action   : function(action) { remove_action   = action; },
    set_update_action   : function(action) { update_action   = action; },
    sync : sync,
    initialize : function() { empty_action(); }
  };
});
