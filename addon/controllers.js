import Ember from 'ember';
import Mixpanel from 'ember-mixpanel/mixpanel';

export default Ember.ObjectProxy.extend(Mixpanel, {
});
