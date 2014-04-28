var code_window = null;
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
function spawn_code_window() {
  var content = $("#code").html();
  code_window = open('', 'Mmvp.js Source', 'height=720,width=720');
  $("body", code_window.document).html("");
  code_window.document.write(content);
  $("body", code_window.document).attr("id", "code-window");
  $("h3", code_window.document).on("click", function(ev) {
    if ($(ev.target).text() == "Todo.js") {
      activate_code_window("todo");
    } else {
      activate_code_window("mmvp");
    }
  });
}
function activate_code_window(mmvp_or_todo) {
  spawn_code_window();
  if (mmvp_or_todo === 'todo') {
    $("body", code_window.document).addClass("todo").removeClass("mmvp");
  } else if (mmvp_or_todo === 'mmvp') {
    $("body", code_window.document).addClass("mmvp").removeClass("todo");
  }
}
$(function() {
  (function code_window_callbacks() { 
    $("a#todo-src").on("click", function() { activate_code_window('todo'); return false; });
    $("a#mmvp-src").on("click", function() { activate_code_window('mmvp'); return false; });
  })();
  (function syntax_highlighter() { SyntaxHighlighter.all(); })();
  (function tab_switcher_callbacks() {
    $("section#demo h3").on("click", function(ev) {
      if (!$(ev.target).hasClass('active')) {


        $("section#demo h3.active").removeClass('active');
        $("section#demo section#switcher section.active").removeClass('active');

        var new_tab = $(ev.target).attr('class');
        if (new_tab == 'model') {
          $("section.model").html("<pre class='brush: js; toolbar: false;'>" + pp_model() + "</pre>");
          SyntaxHighlighter.highlight();
        }

        $("section#demo h3." + new_tab).addClass('active');
        $("section#demo section#switcher section." + new_tab).addClass('active');
      }
    });
  })();
});
