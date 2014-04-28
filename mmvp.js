// dep: _.js
var Mmvp = (function(my) {
  var actions = {}, model = {};
  _.each(['add', 'remove', 'update', 'populate', 'empty'], function(a) {
    actions[a] = function() {};
  });

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

    if (_.size(hash_with_unique_keys) == 0 && _.size(model) != 0) { 
      actions['empty'](); 
    }
    if (_.size(model) == 0 && _.size(hash_with_unique_keys) != 0) { 
      actions['populate'](); 
    }

    _.each(add_items, function(value, key) { actions['add'](key, value); });
    _.each(remove_items, function(value, key) { actions['remove'](key, value) });

    model = JSON.parse(JSON.stringify(hash_with_unique_keys));
    return true;
  }
  return {
    sync       : sync,
    get_model  : function() { return model; },
    initialize : function() { actions.empty(); },
    set_action : function(new_hash) {
      _.each(new_hash, function(v,k) {
        if (actions[k]) { actions[k] = v; }
      });
    }
  };
});
