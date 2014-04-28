// Onload
$(function() {
  window.todo_model = {}, window.todo_presenter = new Mmvp();
  var presenter_dom_identifier = "#viewpen";

  // Setup User Interface Callbacks
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
    var item_add_counter = 0;
    $("input").on("keypress", function(ev) {
      if (ev.which == 13) {
        todo_model[item_add_counter++] = { 
          text    : $("input[type='text']").val(), 
          checked : false 
        };
        $("input").val("");
        todo_presenter.sync(todo_model);
      }
    });
  })();

    
  // Setup Presenter Callbacks
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


  // Initialize Mmvp Todo Presenter
  todo_presenter.initialize();
});
