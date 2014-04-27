function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
var todo_model = {};
var presenter_dom_identifier = "#viewpen";
var presenter = new Mmvp();
presenter.set_action({
  empty : function() {
    $("#items-container").remove();
    $(presenter_dom_identifier).append(
      "<div id='no-items'><h3>No Items!</h3><p>Hint: Add a new item.</p></div>"
    );
    $("#no-items").animate({opacity : 1 }, 300, 'ease-in');
  },
  populate : function() {
    $("#no-items").remove(); 
    $(presenter_dom_identifier).append("<div id='items-container'></div>");
  },
  add : function(new_model_key, new_model_value) {
    var checked = new_model_value == true ? "checked" : "";
    var new_div = $("<div><input type='checkbox' " + checked + "><span>" + new_model_value.text + "</span></div>");
    new_div.attr('id', new_model_key).prepend(
      $("<button class='remove'>&#150;</button>")
    );
    $("#items-container").prepend(new_div);
    new_div.animate({ opacity: 1 }, 300, 'ease-in');
  },
  remove : function(key_of_removed_item) {
    $("#" + key_of_removed_item).remove();
  },
  update : function(key_of_updated_model, updated_model_value) {
    if (updated_model_value.checked) {
      $("#" + key_of_updated_model).addClass("strikethrough");
    } else {
      $("#" + key_of_updated_model).removeClass("strikethrough");
    }
  }
});
$(function() {
  presenter.initialize();
  (function ui_callbacks() {
    // Remove Todo Button
    $(document).on("click", "button.remove", function(ev) {
      delete todo_model[$(ev.target).parent().attr('id')];
      presenter.sync(todo_model);
    });
    // Checkmark Todo
    $(document).on("click", "input[type='checkbox']", function(ev) {
      var is_checked = $(ev.target).is(":checked");
      todo_model[$(ev.target).parent().attr("id")]['checked'] = is_checked;
      presenter.sync(todo_model);
    });
    // Add a New Todo
    $("input").on("keypress", function(ev) {
      if (ev.which == 13) {
        var u = uuid();
        todo_model[u] = { 
          text    : $("input[type='text']").val(), 
          checked : false 
        };
        $("input").val("");
        presenter.sync(todo_model);
      }
    });
  })();
});
