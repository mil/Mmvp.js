Mmvp.js 
========
[![Build Status](https://travis-ci.org/mil/Mmvp.js.svg?branch=master)](https://travis-ci.org/mil/Mmvp.js) [![Dependency Status](https://gemnasium.com/mil/Mmvp.js.svg)](https://gemnasium.com/mil/Mmvp.js)

Mmvp, or &micro;-MVP, is a javascript model-view-presenter library for binding callback functions (`add`, `remove`, `empty`, `populate`, and `update`) to be triggered in reaction to changes in a model.  

A hello world presenter using Mmvp might look like:
```js
var presenter = new Mmvp(), model = {};
presenter.set_action({
  add: function(key, value) {
    console.log("Key [" + key + "] added with value [" + value + "]");
  }
});
model.item_a = "hello world";
presenter.sync(model);
// console.log: 
// 'key [item_a] added with value [hello world]'
```

The Mmvp library itself is tiny (weighing in at rougly 50SLOC), designed to work in the browser and Node.js.

Usage 
-----
### To Instantiate a Presenter
```js
var my_presenter = new Mmvp();
```

### Presenter.set\_action(_callbacks\_hash_)
```js
var my_presenter = new Mmvp();
my_presenter.set_action({
    add: function(key, value) {
    }
})
```

### Presenter.sync(model\_hash)
```js
my_presenter.sync({
    'hello': 'world'
})
```


Contributing
------------
[![Sauce Test Status](https://saucelabs.com/browser-matrix/milessa.svg?auth=72a439c4bd43950824f2aaa24d0e5859)](https://saucelabs.com/u/milessa)

Tests are written in Tape.
