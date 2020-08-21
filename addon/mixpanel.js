import Ember from 'ember';

var mixpanel = window.mixpanel;

export default Ember.Mixin.create({
  content: mixpanel,

  people: function() {
    return Ember.ObjectProxy.extend({
      content: function() {
        if (mixpanel) {
          return mixpanel.people;
        }
      }.property(),

      set: function() {
        if (!this.get('content')) {
          return;
        }

        return this.get('content')['set'](arguments);
      },

      unknownProperty: function(key) {
        if (!this.get('content')) {
          return function() {};
        }

        return this.get('content')[key].bind(this.get('content'));
      }
    }).create();
  }.property(),

  unknownProperty: function(key) {
    if (!this.content) {
      return function() {};
    }

    var f = this._super(key);
    if (f) {
      return f.bind(this.content);
    }
    return f;
  }
});
