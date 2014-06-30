Mmvp.js
========
MVP does not have to be complicated.  Mmvp.js is a proof of concept JS micro MVP library giving you 1-way bindings of callback actions (empty, populate, update, and remove) to changes in a Javascript model. In a real-world application, the model would come from an API (GET) and Mmvp simply acts as the presenter in rendering the view via the callback functions.

[Demo](http://userbound.com/interfaces/Mmvp.js)
[Source](https://raw.githubusercontent.com/mil/Mmvp.js/master/Mmvp.js)


Using it
--------
**First**, create a new presenter and set your callback functions via the `.set_action({})` method:
```
var my_presenter = new Mmvp();
my_presenter.set_action({
    empty : function() {
    },
    populate : function() {
    },
    add : function(added_item_key, add_item_value) {
    },
    update : function(updated_item_key, updated_item_value) {
    }
    remove : function(removed_item) {
    }
});
```

**Next**, when the page loads (JQuery .ready, \<body onload\> etc.), call `.initialize`:
```
$(function() {
    my_presenter.initialize();
});
```

**Lastly**, periodically resync the model with `.sync(new_model)` when you receive new JSON representations of your model. For example, say you had a button that when clicked, issues a POST request to your API and receives back a new model (for the following example as part of the response payload). You might do something like this:
```
$(".add_button").on("click", function() {
    $.ajax({
        data: $.("input.name").val(),
        url: "http://mygreatjson.api",
        success : function(response) {
            presenter.sync(response.new_model);
        }
    });
});
```

Dependency
----------
Mmvp is relies on utility functions provided by [_.js](http://underscorejs.org).
JQuery or anything like that is not required.
