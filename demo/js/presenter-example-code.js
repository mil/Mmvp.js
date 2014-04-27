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
function pp_model() {
  function spaces(number) {
    var sp = "";
    for (var i = 0; i < number; i++) {
      sp = sp + " ";
    }
    return sp;
  }
  function recurse_obj(obj, depth) {
    var ret = spaces(depth) + "{";

    depth += 2;
    var number_of_keys = 0;
    for (key in obj) { number_of_keys++; }

    var i = 0;
    for (key in obj) {
      ret += "\n" + spaces(depth) + key + " : ";
      ret += (typeof obj[key] == "object") ? 
        recurse_obj(obj[key], depth) : obj[key];
      i++; if (i < number_of_keys) { ret += ","; }
    }

    depth -= 2
    ret += "\n" + spaces(depth) + "}";
    return ret;
  }

  return recurse_obj(todo_model, 0);
}
function lightbox(selector_to_activate) {

}


// This is the most basic code you could use
// to set up an Mmvp instance.
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
  update : function(key_of_updated_model) {
    console.log("RUNNINg update action");
  }
});
// Zepto's version of document.onload
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

  // Not part of todo implementation for mmvp, just for demo page
  (function syntax_highlighter() {
    SyntaxHighlighter.all();
  })();
  (function tab_switcher() {
    $("section#demo h3").on("click", function(ev) {
      if (!$(ev.target).hasClass('active')) {


        $("section#demo h3.active").removeClass('active');
        $("section#demo section#switcher section.active").removeClass('active');

        var new_tab = $(ev.target).attr('class');
        if (new_tab == 'model') {
          $("section.model").html("<pre class='brush: js;'>" + pp_model() + "</pre>");
          SyntaxHighlighter.highlight();
        }

        $("section#demo h3." + new_tab).addClass('active');
        $("section#demo section#switcher section." + new_tab).addClass('active');

      }
    });
  })();
 
});
