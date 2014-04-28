// sourced: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

var todo_model = {}, 
    presenter_dom_identifier = "#viewpen", 
    todo_presenter = new Mmvp();

// Setting up the presenter callbacks
todo_presenter.set_action({
  empty : function() {
    $("#items-container").remove();
    var no_items_el = $("<div id='no-items'>");
    no_items_el.append("<h4>No Items!</h4>").append("<p>Hint: Add a new item.</p>");
    $(presenter_dom_identifier).append(no_items_el);
    no_items_el.animate({opacity : 1 }, 300, 'ease-in');
  },
  populate : function() {
    $("#no-items").remove(); 
    $(presenter_dom_identifier).append("<div id='items-container'>");
  },
  add : function(new_model_key, new_model_value) {
    var checked = new_model_value == true ? "checked" : "";
    var new_div_el = $("<div>");
    var checkbox = $("<input type='checkbox'>");
    checkbox.attr("checked", (checked ? "" : null));
    var span = $("<span>").text(new_model_value.text);
    var remove_btn = $("<button class='remove'>").html("&#150;");
    new_div_el.attr('id', new_model_key).append(checkbox, span, remove_btn);

    $("#items-container").prepend(new_div_el);
    new_div_el.animate({ opacity: 1 }, 300, 'ease-in');
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

// Onload
$(function() {
  todo_presenter.initialize();
  (function ui_callbacks() {
    // Remove Todo Button
    $(document).on("click", "button.remove", function(ev) {
      delete todo_model[$(ev.target).parent().attr('id')];
      todo_presenter.sync(todo_model);
    });
    // Checkmark Todo
    $(document).on("click", "input[type='checkbox']", function(ev) {
      var is_checked = $(ev.target).is(":checked");
      todo_model[$(ev.target).parent().attr("id")]['checked'] = is_checked;
      todo_presenter.sync(todo_model);
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
        todo_presenter.sync(todo_model);
      }
    });
  })();
});
