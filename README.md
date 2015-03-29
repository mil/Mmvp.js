> **Mmvp.js is going through a rework to become an npm-module capable of browserifying and to also be usable with node proper**... _for the time being, `old/Mmvp.js` is not seasoned and tested, but may fill your needs_

Mmvp.js 
========
[![Build Status](https://travis-ci.org/mil/Mmvp.js.svg?branch=master)](https://travis-ci.org/mil/Mmvp.js) [![Dependency Status](https://gemnasium.com/mil/Mmvp.js.svg)](https://gemnasium.com/mil/Mmvp.js)

Mmvp is a javascript microlibrary which provides an API to create presenters which may bind callback functions (`add`, `remove`, `empty`, `populate`, and `update`) to be triggered in reaction to changes in a model.  The library is tiny, weighing in a 60SLOC and works both in node.js and the browser.

The hello world presenter looks like:
```js
var presenter = new Mmvp();
var model = {};

presenter.set_action({
    add: function(key, value) {
        console.log(
            "key '" + key + "' added with value '" + value + "'"
        );
    }
});

model.item_a = "hello world";
presenter.sync(model);
// console.log reports: key 'item_a' added with value 'hello world'
```


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
