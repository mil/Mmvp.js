// This is here to generate unique keys for the (Add New Item) button
// in a REST API, you likely would already have fields/keys for uniquly
// identifying items or resources
// uuid sourced from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

// This is the most basic code you could use
// to set up an Mmvp instance.
var model = {};
var presenter_dom_identifier = "#viewpen";
var presenter = new Mmvp();
presenter.set_action({
  empty : function() {
    $(presenter_dom_identifier).html(
      "<h3>No Items!</h3><p>Hint: hit the (+) button!</p>"
    );
  },
  populate : function() {
    $(presenter_dom_identifier).html("");
  },
  add : function(new_model_key, new_model_value) {
    console.log(new_model_value);
    var new_div = $("<div></div>");
    new_div.attr('id', new_model_key).append(
      $("<button class='remove'>Remove</button>")
    );
    $(presenter_dom_identifier).append(new_div);
  },
  remove : function(key_of_removed_item) {
    $("#" + key_of_removed_item).remove();
  },
  update : function(key_of_updated_model) {
    console.log("RUNNINg update action");
  }
});

// Zepto's version of document.onload
$(function() {
  presenter.initialize();

  $("button#add").on("click", function() {
    var new_key = uuid();
    var checked = Math.round(Math.random()) == 1;
    model[new_key] = { identifier : new_key, checked : checked };
    presenter.sync(model);
  });
  $(document).on("click", "button.remove", function(ev) {
    delete model[$(ev.target).parent().attr('id')];
    presenter.sync(model);
  });
  $("button#clear").on("click", function() {
    presenter.sync(model = {});
  });
});
