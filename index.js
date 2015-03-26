var clone_deep = require('lodash.clonedeep');
var for_each = require('lodash.foreach');
var is_equal = require('lodash.isequal');
var keys = require('lodash.keys');
var size = require('lodash.size');
var omit = require('lodash.omit');
var pick = require('lodash.pick');

module.exports = function() {
  var actions = {}, model = {};
  for_each(['add', 'remove', 'update', 'populate', 'empty'], function(a) {
    actions[a] = function() {};
  });

  function sync(hash_with_unique_keys) { 
    var add_items = omit(hash_with_unique_keys, keys(model));
    var remove_items = omit(model, keys(hash_with_unique_keys));

    for_each(pick(model, keys(hash_with_unique_keys)), function(v,k) {
      var changed = false;
      if (typeof(model[k] === "object")) {
        if (is_equal(model[k], hash_with_unique_keys[k])) {
          changed = true; } } else { if (model[k] != hash_with_unique_keys[k]) {
          changed = true;
        }
      }
      if (changed) {
        model[k] = hash_with_unique_keys[k];
        actions['update'](k,model[k]);
        return;
      }
    });

    if (size(hash_with_unique_keys) == 0 && size(model) != 0) { 
      actions['empty'](); 
    }
    if (size(model) == 0 && size(hash_with_unique_keys) != 0) { 
      actions['populate'](); 
    }

    for_each(remove_items, function(value, key) { actions['remove'](key, value) });
    for_each(add_items, function(value, key) { actions['add'](key, value); });

    model = clone_deep(hash_with_unique_keys);
    return true;
  }
  return {
    sync: sync,
    get_model: function() { return model; },
    initialize: function() { actions.empty(); },
    set_action: function(new_hash) {
      for_each(new_hash, function(v,k) {
        if (actions[k]) { actions[k] = v; }
      });
    }
  };
};
