var deep_clone = require('lodash/lang/cloneDeep');
var for_each = require('lodash/collection/forEach');
var is_equal = require('lodash/lang/isEqual');
var keys = require('lodash/object/keys');
var size = require('lodash/collection/size');
var omit = require('lodash/object/omit');
var difference = require('lodash/array/difference');

module.exports = function() {
  var actions = {}, model = {};
  for_each(['add', 'remove', 'update', 'populate', 'empty'], function(a) {
    actions[a] = function() {};
  });

  function values_are_equal(a, b) {
    return typeof(a === "object") ? is_equal(a, b) : (a === b);
  }
  function sync(hash_with_unique_keys) {
    if (size(hash_with_unique_keys) === 0 && size(model) > 0) {
      actions['empty']();
    }
    if (size(model) === 0 && size(hash_with_unique_keys) > 0) {
      actions['populate']();
    }
    for_each(omit(hash_with_unique_keys, keys(model)), function(value, key) {
      actions['add'](key, value);
    });
    for_each(omit(model, keys(hash_with_unique_keys)), function(value, key) {
      actions['remove'](key, value);
      delete model[key];
    });
    for_each(model, function(value, key) {
      if (values_are_equal(model[key], hash_with_unique_keys[key])) {
        actions['update'](key, hash_with_unique_keys[key]);
      }
    });
    return model = deep_clone(hash_with_unique_keys);
  }

  return {
    sync: sync,
    get_model: function() { return model; },
    get_action: function() { return actions; },
    initialize: function() { actions.empty(); },
    set_action: function(new_hash) {
      for_each(new_hash, function(v,k) {
        if (actions[k]) { actions[k] = v; }
      });
    }
  };
};
