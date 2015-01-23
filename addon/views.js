import Ember from 'ember';
import Mixpanel from 'ember-cli-mixpanel/mixpanel';

export default Ember.ObjectProxy.extend(Mixpanel, {
  trackClick: function(e, extras) {
    var target = e.toElement || e.relatedTarget || e.target;
    if (!target) { return; }

    target = Ember.$(target);

    var classList = target.attr('class');
    var eventName = target.closest('[data-mixpanel-event]')
        .data('mixpanel-event') || classList;

    var properties = {
      classNames: classList
    };

    if (!extras) extras = {};

    this.get('track')(
      'Click: ' + eventName,
      Ember.$.extend(properties, extras)
    );
  }
});
