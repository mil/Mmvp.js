Mmvp.js
========
MVP does not have to be complicated.  Mmvp.js is a proof of concept JS micro (52 SLOC) MVP library which enables a 1-way binding of callback actions (empty, populate, update, and remove) to changes in a Javascript model. In operation, the model comes from an API (GET) and Mmvp simply acts as a presenter in rendering the view.

As far as _manipulating the model_ goes (POST), Mmvp holds _no politics_. Mmvp is _only_ for binding presentation callbacks (which update the view) to changes in a model. In this way Mmvp stakes itself as a drop-in, othagonal component of modular Javascript application design. Mmvp is for people who like looking but also laying down rail road tracks.

Using it
--------
**First**, set up your callbacks by creating a new Mmvp instance and calling the `.set_action({})` function:
```
var presenter = new Mmvp();
presenter.set_action({
    empty : function() {

    },
    populate : function() {
        // This 

    },
    add : function(added_item) {

    },
    update : function(updated_item) {

    }
    remove : function(removed_item) {
    }
});
```

**Next**, when the page loads (JQuery .ready, \<body onload\> etc.), call `.initialize`:
```
<body onload='presenter.initialize();'>
```

**Finally**, periodically call `.sync(new_model)` when you recieve new JSON representations of the model. For example, say you had a button that when clicked, issues a POST request to your API, and recieves back a new model (either as payload or as a seperate GET). You might do something like this:
```
$(".add_button").on("click", function() {
    $.ajax({
        data: $.("input.name").val(),
        url: "http://mygreatapi",
        success : function(new_model) {
            presenter.sync(new_model);
        }
    });
});
```

Questions
---------
- Is this just a 1-way binding system?
    * Yes, the presenter action callbacks are only called (to update the view) when told. As such, `.sync(model)` is always what making the magic happen. Changes in the view are blind to the model beyond being manipulated by the presenter action callbacks.


Dependency
----------
The reason why Mmvp is so small is because it makes use of a large number of nice utility functions provided by [_.js](http://underscorejs.org).

Demo
----
A working demo is coming soon.
