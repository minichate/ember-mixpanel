# ember-mixpanel

The goal of ember-mixpanel is to provide a Ember-friendly wrapper around the mixpanel library, along with a few helpers to help you track events. All you need to do is include the mixpanel library in your `index.html` file.

# Getting Started

This is an ember-cli addon, so all you need to do is

```bash
    npm install --save ember-mixpanel
```

After that, you should have a `mixpanel` dependency injected on your routes, controllers and views. You can do things like:

```javascript
    this.get('mixpanel.people.set')({
        '$email': 'foo@example.com',
        'foobar': 'baz'
    });
```

or:

```javascript
    this.get('mixpanel.track')( "I'm an event name", {
        'ember': 'great',
        'freshbooks': 'greatest'
    });
```

Note that `this.get('mixpanel.XXX')` accesses return a function (provided by the Mixpanel library), so you'll want to subsequently invoke that function with whatever arguments it takes. See https://mixpanel.com/help/reference/javascript-full-api-reference for a list of available methods.

## Click tracking

In Ember views, there is an additional method available on `this.mixpanel` called `trackClick`. Invoking that method with a javascript click event will track the click in Mixpanel with the following niceties:

`Ember.View` has been reopened to accept an optional `data-mixpanel-event` attribute. If this attribute is on the DOM element we'll use that as the event name in Mixpanel.

Try something like:

```javascript
    Ember.View.extend({
        instrumentClicks: function(e) {
            this.get('mixpanel').trackClick(e, {
                'additional': 'properties'
            })
        }.on('click')
    });
```

Supposing the underlying DOM element's markup is something like:

```html
    <div data-mixpanel-event="Foo Event Name">
       <checkbox name="helloworld" />
       <label for="helloworld">Hello, world!</label>
    </div>
```

Whenever the label, checkbox or div is clicked an event named `Click: Foo Event Name` will be logged in Mixpanel with the additional properties on it as described above. Neat!

Note: **ember-mixpanel** will walk up the DOM tree and use the `data-mixpanel-event` attribute from the closest parent to the element that was clicked on.

## Safety included

In some environments (development, testing, etc.) the `window.mixpanel` object might not exist. You don't need to guard against this case, since **ember-mixpanel** will neuter calls to Mixpanel methods if they can't be performed. You'll see a WARNING log entry in your browser's console if we can't find the `window.mixpanel` object.

# Licence

 This library is lovingly brought to you by the FreshBooks developers. We've released it under the MIT license.
