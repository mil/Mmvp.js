var Mmvp = (function(my) {
  var actions = {
    add      : function() {},
    remove   : function() {},
    update   : function() {},
    populate : function() {},
    empty    : function() {}
  }, 
  model = {};

  function sync(hash_with_unique_keys) { 
    var add_items = _.omit(hash_with_unique_keys, _.keys(model));
    var remove_items = _.omit(model, _.keys(hash_with_unique_keys));

    _.each(_.pick(model, _.keys(hash_with_unique_keys)), function(v,k) {
      _.each(_.keys(model[k]), function(key) {
        if (model[k][key] != hash_with_unique_keys[k][key]) {
          model[k] = hash_with_unique_keys[k];
          actions['update'](k,model[k]);
          return;
        }
      });
    });

    if (_.size(hash_with_unique_keys) == 0 && _.size(model) != 0) { actions['empty'](); }
    if (_.size(model) == 0 && _.size(hash_with_unique_keys) != 0) { actions['populate'](); }

    _.each(add_items, function(value, key) { actions['add'](key, value); });
    _.each(remove_items, function(value, key) { actions['remove'](key, value) });

    model = _.clone(hash_with_unique_keys);
    return true;
  }
  return {
    initialize : function() { actions.empty(); },
    set_action : function(new_hash) {
      if (actions['add']) { actions.add = new_hash.add; }
      if (actions['remove']) { actions.remove = new_hash.remove; }
      if (actions['populate']) { actions.populate = new_hash.populate; }
      if (actions['empty']) { actions.empty = new_hash.empty; }
    },
    sync : sync
  };
});
