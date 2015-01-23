import Ember from 'ember';
import Views from 'ember-mixpanel/views';
import Controllers from 'ember-mixpanel/controllers';
import Routes from 'ember-mixpanel/routes';

export default {
  name: 'mixpanel',

  initialize: function(container, application) {
    Ember.View.reopen({
      attributeBindings: ['data-mixpanel-event']
    });

    if (!window.mixpanel) {
      Ember.Logger.warn('Mixpanel library not found on page');
    }

    application.register('mixpanel:views', Views, { instantiate: true });
    application.register('mixpanel:controllers', Controllers, { instantiate: true });
    application.register('mixpanel:routes', Routes, { instantiate: true });
    application.inject('view', 'mixpanel', 'mixpanel:views');
    application.inject('controller', 'mixpanel', 'mixpanel:controllers');
    application.inject('route', 'mixpanel', 'mixpanel:routes');
  }
};
